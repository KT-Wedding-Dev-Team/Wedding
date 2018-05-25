//初始化数据
function tabbarinit() {
  return [
    {
      "id": 0,
      "pagePath": "/pages/invitation/index",
      "iconPath": "/images/3.png",
      "selectedIconPath": "/images/3_selected.png",
      "text": "邀请函",
    },
    {
      "id": 1,
      "pagePath": "/pages/groomsmen/index",
      "iconPath": "/images/1.png",
      "selectedIconPath": "/images/1_selected.png",
      "text": "伴郎",
    },
    {
      "id": 2,
      "pagePath": "/pages/index/index",
      "iconPath": "/images/0.png",
      "selectedIconPath": "/images/0_selected.png",
      "text": "首页",
    },
    {
      "id": 3,
      "pagePath": "/pages/bridesmaids/index",
      "iconPath": "/images/2.png",
      "selectedIconPath": "/images/2_selected.png",
      "text": "伴娘",
    },
    {
      "id": 4,
      "pagePath": "/pages/transportation/index",
      "iconPath": "/images/4.png",
      "selectedIconPath": "/images/4_selected.png",
      "text": "交通",
    },
  ];
}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath'];//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar;
  that.setData({ bindData });
}

function onGetUserInfo(event){
  console.log(event);
  //wx.setStorageSync("userInfo", event);
  var index = event.currentTarget.id;
  wx.redirectTo({
    url: tabbarinit()[index]['pagePath'],
  });
}

function tap(event){
  var index = event.currentTarget.id;
  wx.redirectTo({
    url: tabbarinit()[index]['pagePath'],
  });
}
module.exports = {
  tabbar: tabbarmain,
  onGetUserInfo: onGetUserInfo,
  tap: tap,
};
