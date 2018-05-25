//index.js
//获取应用实例
const app = getApp();
var template = require('../../template/template.js');
Page({
  data: {
    userInfo: {},
    code: 1,
    isPlayingMusic: true,
    slideList: [],

  },
  onLoad: function () {
    template.tabbar('tabBar', 2, this);//0表示第一个tabbar
    var that = this;
    // app.getUserInfo(function(userInfo){
    //     console.log(userInfo);
    //     that.setData({
    //       userInfo: userInfo
    //     })
    //   })
    // wx.getUserInfo({
    //   success: function (res) {

    //   }
    // })

    wx.request({
      url: 'https://api.orchid9.com/actions/media_info',
      method: 'GET',
      header: {
        'Accept': 'application/json',
      },
      success: function (res) {
        // wx.playBackgroundAudio({
        //   dataUrl: res.data.music_url,
        //   title: '',
        //   coverImgUrl: ''
        // })

        that.setData({
          //mainInfo: res.data.mainInfo,
          slideList: res.data.slideList,
          music_url: res.data.music_url,
        });
      },
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  tap: function(event){
    template.tap(event);
  },
  getUserInfo: function (event) {
    template.onGetUserInfo(event);
  },
  onShareAppMessage: function (res) {
    var that = this;
    console.log('lol');
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
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
  play: function (event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false,
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: '',
      });
      this.setData({
        isPlayingMusic: true,
      });
    }
  },
});

