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
    cdn_server: app.globalData['cdn_server'],
    animationData:{},
    interval_timer_id: null,
    show_letter:true,
    invitation_url: null,
    nick_name:null,
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
    entrees_no_emoji: [
      'Beef',
      'Sea Bass',
      'Veg.'
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
      nickName = nickName.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])|\s/g, "").toLowerCase();
      if (nickName==''){
        nickName = 'empty';
      }
      app.globalData.user.nick_name= nickName;
      wx.showLoading({
        title: '正在打开请柬',
        mask: true,
      });
      app.webCall(app.globalData['api_server'] + '/actions/get_invitation', { 'nick_name': nickName}, this.onGetInvitationSuccess, this.onGetInvitationFail, this.onGetInvitationComplete, 'GET', 5, app.globalData['token']);
    } 
    else {
      wx.showModal({
        title: '提示',
        content: '邀请函需授权才能打开',
        confirmColor: "#F5BBCB",
        showCancel:false,
      })
    }
  },
  previewImage: function (e) {
    wx.previewImage({
      current: this.data.cdn_server+'/' +this.data.invitation_url, // 当前显示图片的http链接
      urls: [this.data.cdn_server + '/' + this.data.invitation_url], // 需要预览的图片http链接列表
    })
  },
  prevItem: function () {
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
    
  },
  formSubmit: function (e) {
    //validation
    var err = this.validateForm(e.detail.value);
    if (err){
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 900
      })
    }
    else {
      var form_data = e.detail.value;
      form_data['nick_name'] = app.globalData.user.nick_name;
      form_data['attendance'] = (this.data.attendance_index+1)%3;
      if (form_data['attendance'] >0){
        form_data['entree_one'] = this.data.entrees_no_emoji[this.data.entree];
        form_data['entree_two'] = this.data.entrees_no_emoji[this.data.so_entree];
        form_data['paper_invitation'] = this.data.paper_invitation;
      }
      //convert empty string to null
      for (var key in form_data) {
        if (form_data[key] === ''){
          form_data[key] = null;
        }
      }
      app.webCall(app.globalData['api_server'] + '/actions/submit_rsvp', form_data, this.onSubmitFormSuccess, this.onSubmitFormFail, this.onSubmitFormComplete, 'POST', 5, app.globalData['token']);

    }

  },
  
  validateForm: function(values){
    if (this.data.attendance_index==null){
      return '请选择出席人数';
    }
    if (this.data.attendance_index<2){
      if (!values.name_one){
        return'请输入姓名';
      }
      if (this.data.entree==null) {
        return'请选择主菜';
      }
      if (this.data.attendance_index ==1){
        if (!values.name_two) {
          return '请输入伴侣的姓名';
        }
        if (this.data.so_entree == null) {
          return '请选择伴侣的主菜';
        }
      }
      if (this.data.paper_invitation){
        if (!values.street) {
          return '请输入街道地址';
        }
        if (!values.city) {
          return '请输入城市';
        }
        if (!values.state) {
          return '请输入州/省';
        }
        if (!values.zip) {
          return '请输入邮编';
        }
      }

    }
    return null;

  },
  onGetInvitationSuccess: function(res){
    this.setData({ 
      'show_letter': false,
      'invitation_url': res.data['invitation_url'],
      'real_name': res.data['real_name'],
      'so_name': res.data['so_name'],
      'count':res.data['count'],
      'location':res.data['location'],

       });
  },
  onGetInivationFail: function(res){

  },
  onGetInvitationComplete: function(res){
    wx.hideLoading();
  },

  onSubmitFormSuccess: function(res){
    var that = this;
    wx.showToast({
      title: res.data.message,
      icon: 'none',
      duration: 2000,
    });
    this.prevItem();


  },
  onSubmitFormFail: function (res) {
    wx.showToast({
      title: '请再次提交！',
      icon: 'none',
      duration: 900
    })
  },
  onSubmitFormComplete: function (res) {

  },

  
});
