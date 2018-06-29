// index.js
// 获取应用实例
const app = getApp();
Page({
  data: {
    isPlayingMusic: false,
    cdn_server: app.globalData['cdn_server'],
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
        var music_url = app.globalData['cdn_server'] + '/'+ res.data.music_url;
        if (that.data.isPlayingMusic) {
          wx.playBackgroundAudio({
            dataUrl: music_url,
            title: '',
            coverImgUrl: '',
          });
        };
        that.setData({
          slideList: res.data.slideList,
          music_url: music_url,
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

