const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cdn_server: app.globalData['cdn_server'],
    location:'nyc',
    countdown:{
      duration:null,
      day: null,
      hour: null,
      min: null,
      second: null,
    },
  },
  interval_timer_id: null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.data.location = app.globalData['user'].location;
    if (!this.videoContext){
      this.videoContext = wx.createVideoContext('myVideo');
    }
    this.videoContext.play();
    if (this.interval_timer_id){
      clearInterval(this.interval_timer_id);
    }
    app.webCall(app.globalData['api_server'] + '/actions/get_duration', {}, this.onGetDurationSucess, function () { }, function () { }, "GET", 5);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  pauseHandler: function(e) {
    this.videoContext.play();
  },

  onGetDurationSucess: function(res) {
    if (res.data.duration){
      this.formatDuration(res.data.duration);
      this.interval_timer_id = setInterval(function(){
        var duration = this.data.countdown.duration-1;
        this.formatDuration(duration);
      }.bind(this), 1000);
    };

  },
  formatDuration: function(duration){
    var days = ~~(duration / 86400);
    var remainder = duration % 86400;
    var hours = ~~(remainder / 3600);
    remainder = remainder % 3600;
    var mins = ~~(remainder / 60);
    var seconds = ~~(remainder % 60);
    this.setData({
      'countdown':{
        duration:duration,
        day: days,
        hour:hours,
        min:mins,
        second: seconds,
      }
    })
  }


});
