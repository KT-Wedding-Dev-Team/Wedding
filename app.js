// app.js
App({
  onLaunch: function () {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code){
            that.globalData.code = res.code;
            wx.setStorage({
              key: "session",
              data: res.code
            })
            console.log(res.code);
            wx.getUserInfo({
              success: function (res) {
                console.info(res);
                that.globalData.userInfo = res.userInfo;
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          }
          else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }

        }
      });
    }
  },
  globalData: {
    userInfo: null,
    code: null,
    appid: 'wx05e14043c678217c',
    server: 'https://tianandlouise.applinzi.com/test/pets'
  }
});

