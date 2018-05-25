// app.js
/* global App wx*/
App({
  logIn: function(cb) {
    wx.checkSession({
      success: function(e) {
        console.log('session 未过期');
        cb();
      },
      fail: function() {
        console.log('session 过期了');
        wx.login({
          success: function(res) {
            if (res.code) {
              wx.request({
                url: 'https://api.orchid9.com/users/login?js_code=' + res.code,
                method: 'GET',
                header: {
                  'Accept': 'application/json',
                },
                success: function(res) {
                  console.log(res.data);
                  // wx.playBackgroundAudio({
                  //   dataUrl: res.data.music_url,
                  //   title: '',
                  //   coverImgUrl: ''
                  // })
                  wx.setStorage({
                    key: 'generated_session_key',
                    data: res.data['generated_session_key'],
                  });
                  cb();
                },
              });
            } else {
              console.log('获取用户登录态失败：' + res.errMsg);
            }
          },
        });
      },
    });
  },
  getUserInfo: function(cb) {
    let that = this;
    this.logIn(function() {
      if (that.globalData.userInfo) {
        typeof cb == 'function' && cb(that.globalData.userInfo);
      } else {
        wx.getUserInfo({
          success: function(res) {
            that.globalData.userInfo = res.userInfo;
            typeof cb == 'function' && cb(that.globalData.userInfo);
          },
        });
      }
    });
  },
  onLaunch: function() {
    this.logIn(function() {});
  },
  globalData: {
    sessionKey: null,
    userInfo: null,
    server: 'https://api.orchid9.com',
  },
});

