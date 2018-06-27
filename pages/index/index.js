// index.js
// 获取应用实例
const app = getApp();
Page({
  data: {
    isPlayingMusic: false,
  },
  onLoad: function() {
    let that = this;
    console.log(app.globalData);
    wx.request({
      url: app.globalData['api_server'] + '/actions/media_info',
      method: 'GET',
      header: {
        'Accept': 'application/json',
      },
      success: function(res) {
        if (that.data.isPlayingMusic) {
          wx.playBackgroundAudio({
            dataUrl: res.data.music_url,
            title: '',
            coverImgUrl: '',
          });
        };
        that.setData({
          slideList: res.data.slideList,
          music_url: res.data.music_url,
        });
      },
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  onShareAppMessage: function(res) {
    let that = this;
    console.log('lol');
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function(res) {
        wx.showToast({
          title: '分享成功',
        });
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        });
      },
    };
  },
  play: function(event) {
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

