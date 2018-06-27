// app.js
App({
  logIn: function(cb) {
    let that = this;
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
                url: that.globalData['server'] +'/users/login',
                data: {
                  'js_code': res.code,
                },
                method: 'GET',
                header: {
                  'Accept': 'application/json',
                },
                success: function(res) {
                  console.log(res.data);
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
  checkCompatibility(){

    console.log(wx.canIUse("cover-view"));
    console.log(wx.canIUse("button.getUserInfo"));
  },
  onLaunch: function() {
    console.log(wx.getSystemInfoSync());
    this.checkCompatibility();
    this.logIn(function() {});
  },
  globalData: {
    sessionKey: null,
    userInfo: null,
    server: 'https://api.orchid9.com',
  },
});

