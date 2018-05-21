//初始化数据
function tabbarinit() {
  return [
    {
      "id":0,
      "pagePath": "/pages/index/index",
      "iconPath": "/images/1.png",
      "selectedIconPath": "/images/1.png",
      "text": "首页"
    },
    {
      "id": 1,
      "pagePath": "/pages/invitation/index",
      "iconPath": "/images/2.png",
      "selectedIconPath": "/images/2.png",
      "text": "邀请函"
    },
    {
      "id": 2,
      "pagePath": "/pages/map/index",
      "iconPath": "/images/3.png",
      "selectedIconPath": "/images/3.png",
      "text": "酒店导航"
    },
    {
      "id": 3,
      "pagePath": "/pages/bless/index",
      "iconPath": "/images/4.png",
      "selectedIconPath": "/images/4.png",
      "text": "好友祝福"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

function onGetUserInfo(event){
  console.log(event);
  //wx.setStorageSync("userInfo", event);
  var index = event.currentTarget.id;
  wx.redirectTo({
    url: tabbarinit()[index]['pagePath']
  })
}

function tap(event){
  var index = event.currentTarget.id;
  wx.redirectTo({
    url: tabbarinit()[index]['pagePath']
  })
}
module.exports = {
  tabbar: tabbarmain,
  onGetUserInfo: onGetUserInfo,
  tap:tap
}