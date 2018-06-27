// pages/invitation/index.js
const app = getApp();
var animation = wx.createAnimation({
  duration: 200,
  timingFunction: 'ease-in-out',
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{},
    interval_timer_id: null,
    show_letter:true,
    invitation_url: null,
    real_name: null,
    so_name:null,
    swiper:{
      current: 0,
      length:2,
    },
    attendance_index:null,
    attendances:[
      '💃 | 🕺',
      '👭 | 👬 | 👫',
      '虽不能至, 然心向往之',
    ],
    entree:null,
    so_entree: null,
    entrees:[
      '牛肉🥩',
      '海鲈鱼🐟',
      '素食🥗'
    ],
    attendance_as_hidden: true,
    entree_as_hidden:true,
    so_entree_as_hidden: true,

    paper_invitation: false,

    
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
    if (this.data['interval_timer_id']){
      clearInterval(this.data['interval_timer_id']);
    };
    var current_timer_id = 
      setInterval(function () {
        this.setData({
          animationData: animation.scale(1.1).step().scale(0.95).step().scale(1.1).step().scale(0.95).step().export()
        })
      }.bind(this), 1500);
    this.setData ({
      interval_timer_id: current_timer_id,
      });
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

  /**
   * Handle get userinfo event
   */
  userInfoHandler: function(event){
    console.log(event);
    let that = this;
    //use accept to give info
    if (event['detail']['userInfo']){
      var nickName = event['detail']['userInfo']['nickName'];
      wx.showToast({
        title: 'Loading',
        icon: 'loading',
        duration: 2000
      });
      wx.request({
        url: app.globalData['server'] + '/actions/get_invitation',
        data: {
          'nick_name': nickName,
        },
        method: 'GET',
        header: {
          'Accept': 'application/json',
        },
        success: function (res) {
          that.setData({ 'show_letter': false, 'invitation_url': res.data['invitation_url'], 'real_name': res.data['real_name'], 'so_name': res.data['so_name'] });
          console.log(that.data);
        },
        complete: function (res) {
          wx.hideToast();
        }
      });
    } 
    else {
      wx.showModal({
        title: '提示',
        content: '请重新点击邀请函并授权',
        confirmColor: "#F5BBCB",
        showCancel:"false",
      })
    }
  },
  previewImage: function (e) {
    wx.previewImage({
      current: this.data.invitation_url, // 当前显示图片的http链接
      urls: [this.data.invitation_url], // 需要预览的图片http链接列表
    })
  },
  prevItem: function (e) {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current >0 ? current-1: current;
    this.setData({'swiper': swiper});
  },
  nextItem: function (e) {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < swiper.length-1 ? current + 1 : current;
    this.setData({ 'swiper': swiper });
  },
  swiperChange: function (e) {
    if (e.detail.current == 1){
      wx.setNavigationBarTitle({
        title: '回执',
      })
    }
    else if (e.detail.current == 0) {
      wx.setNavigationBarTitle({
        title: '请帖',
      })
    }
    if (e.detail.source != ''){
      var swiper = this.data.swiper;
      swiper.current =e.detail.current;
      this.setData({ 'swiper': swiper });
    }
  },
  attendanceASItemTap: function (e) {
    this.setData({
      'attendance_index':e.currentTarget.dataset.name,
      'attendance_as_hidden': !this.data.attendance_as_hidden
    })
  },
  attendanceASChange: function (e) {
    this.setData({
      'attendance_as_hidden': !this.data.attendance_as_hidden
    });
  },
  entreeASItemTap: function (e) {
    this.setData({
      'entree': e.currentTarget.dataset.name,
      'entree_as_hidden': !this.data.entree_as_hidden
    })
  },
  entreeASChange: function (e) {
    this.setData({
      'entree_as_hidden': !this.data.entree_as_hidden
    });
  },
  soEntreeASItemTap: function (e) {
    this.setData({
      'so_entree': e.currentTarget.dataset.name,
      'so_entree_as_hidden': !this.data.so_entree_as_hidden
    })
  },
  soEntreeASChange: function (e) {
    this.setData({
      'so_entree_as_hidden': !this.data.so_entree_as_hidden
    });
  },
  paperInvitationChange: function(e){
    this.setData({
      'paper_invitation': e.detail.value.length > 0,
    });
    
  }
  
});
