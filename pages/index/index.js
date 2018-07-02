// index.js
// 获取应用实例
const app = getApp();
Page({
  data: {
    isPlayingMusic: true,
    cdn_server: app.globalData['cdn_server'],
    music_url:null,
    music_title:null,
    music_cover_img_url:null,
  },
  onLoad: function() {
    let that = this;
    wx.request({
      url: app.globalData['api_server'] + '/actions/media_info',
      method: 'GET',
      header: {
        'Accept': 'application/json',
      },
      success: function(res) {
        var music_url = app.globalData['cdn_server'] + '/' + encodeURIComponent(res.data.music_url);
        var music_title = that.baseName(res.data.music_url);
        var music_cover_img_url = app.globalData['cdn_server'] + '/' + "cover_images/" + encodeURIComponent(music_title+'.jpg').replace("'", "%27");
        if (that.data.isPlayingMusic) {
          app.playBackgroundAudioInLoop(music_url, music_title,music_cover_img_url);
          var manager = wx.getBackgroundAudioManager();
          manager.onPause(function () {
            that.setData({
              isPlayingMusic: false,
            })
          });
          manager.onStop(function () {
            that.setData({
              isPlayingMusic: false,
            })
          });
          manager.onPlay(function () {
            that.setData({
              isPlayingMusic: true,
            })
          })
        };
        that.setData({
          slideList: res.data.slideList,
          music_url: music_url,
          music_title: music_title,
          music_cover_img_url: music_cover_img_url,
        });
      },
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    var manager = wx.getBackgroundAudioManager(); 
    var that = this;
    manager.onPause(function () {
      that.setData({
        isPlayingMusic: false,
      })
    });
    manager.onStop(function () {
      that.setData({
        isPlayingMusic: false,
      })
    });
    manager.onPlay(function () {
      that.setData({
        isPlayingMusic: true,
      })
    });
    this.setData ({
      isPlayingMusic: manager.paused == undefined ? this.data.isPlayingMusic: !manager.paused,
    })
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  onShareAppMessage: function(res) {
    return app.share();
  },
  play: function(event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false,
      });
    } else {
      app.playBackgroundAudioInLoop(this.data.music_url, this.data.music_title, this.data.music_cover_img_url);
      this.setData({
        isPlayingMusic: true,
      });
      var that = this;
      var manager = wx.getBackgroundAudioManager();
      manager.onPause(function () {
        that.setData({
          isPlayingMusic: false,
        })
      });
      manager.onStop(function () {
        that.setData({
          isPlayingMusic: false,
        })
      });
      manager.onPlay(function(){
        that.setData({
          isPlayingMusic: true,
        })
      })
    }
  },

  baseName: function (str){
    var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
    return base;
  },
});

