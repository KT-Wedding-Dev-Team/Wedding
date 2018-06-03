// pages/invitation/index.js
var animation = wx.createAnimation({
  duration: 1000,
  timingFunction: 'ease',
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{}
  },

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
    setInterval(function () {
      this.setData({
        animationData: animation.scale(1.1).step().scale(0.95).step().export()
      });
    }.bind(this), 2000);


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

  userInfoHandler: function(event){
    console.log(event);
  },
});
