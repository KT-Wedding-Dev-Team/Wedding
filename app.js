// app.js
App({
  logIn: function() {
    let that = this;
    wx.checkSession({
      success: function(e) {
        if (!that.globalData.token){
            wx.getStorage({
              key: 'token',
              success: function (res) {
                that.globalData.token = res.data;
              },
              fail: function (res){
                that.callLogIn();
              }
            })
            
        }
      },
      fail: function() {
        that.callLogIn();
      },
    });
  },

  callLogIn: function (){
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: that.globalData['api_server'] + '/users/login',
            data: {
              'js_code': res.code,
            },
            method: 'GET',
            header: {
              'Accept': 'application/json',
            },
            success: function (res) {
              that.globalData.token = res.data['token'];
              that.globalData.user = res.data['user'];
              wx.setStorage({
                key: 'token',
                data: res.data['token'],
              });
            },
          });
        } else {
        }
      },
    });
  },
  /**
     * 接口公共访问方法
     * @param {Object} urlPath 访问路径
     * @param {Object} params 访问参数（json格式）
     * @param {Object} requestCode 访问码，返回处理使用
     * @param {Object} onSuccess 成功回调
     * @param {Object} onErrorBefore 失败回调
     * @param {Object} onComplete 请求完成（不管成功或失败）回调
     * @param {Object} isVerify 是否验证重复提交
     * @param {Object} requestType 请求类型（默认POST）
     * @param {Object} retry 访问失败重新请求次数（默认1次）
     */
  webCall: function (urlPath, params, onSuccess, onErrorBefore, onComplete,requestType, retry, token) {
    var params = arguments[1] ? arguments[1] : {};
    var onSuccess = arguments[2] ? arguments[2] : function () { };
    var onErrorBefore = arguments[3] ? arguments[3] : this.onError;
    var onComplete = arguments[4] ? arguments[4] : this.onComplete;
    var requestType = arguments[5] ? arguments[5] : "POST";
    var retry = arguments[6] ? arguments[6] : 1;
    var that = this;

    wx.request({
      url: urlPath,
      data: params,
      method: requestType, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: token? {
        'content-type': requestType == 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
        'authorization':token,
      } : {'content-type': requestType == 'POST' ? 'application/x-www-form-urlencoded' : 'application/json'}, // 设置请求的 header
      success: function (res) {
        onSuccess(res);
      },
      fail: function (res) {
        retry--;
        if (retry > 0) return that.webCall(urlPath, params, onSuccess, onErrorBefore, onComplete, requestType, retry, token);
      },
      complete: function (res) {
        onComplete(res);
      },
    })
  },
  playBackgroundAudioInLoop: function(url, title, imgUrl){
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: url,
      title: title,
      coverImgUrl: imgUrl,
    });
    var manager = wx.getBackgroundAudioManager();
    manager.onEnded(function(){
      playBackgroundAudioInLoop(url, title, imgUrl);
    });
    
  },
  onLaunch: function() {
    this.globalData.hasLoggedIn=true;
    this.logIn();
    
  },

  onShow: function(){   
    this.globalData.hasLoggedIn = false;

  },

  share: function(){
    return {
      title: 'Louise & Tian Wedding',
      imageUrl: 'https://cdn.orchid9.com/share.jpg',
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon:'success',
        });
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        });
      },
    };
  },
  globalData: {
    hasLoggedIn:false,
    api_server: 'https://api.orchid9.com',
    cdn_server: 'https://cdn.orchid9.com',
    token:null,
    user:{
      nick_name:null,
      real_name:null,
      so_name:null,
      location:'nyc',
    }
  },
});

