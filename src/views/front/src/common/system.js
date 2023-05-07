export function isAuth(tableName, key) {
  let role = localStorage.getItem("UserTableName");
  let menus = [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-copy","buttons":["新增","查看","修改","删除"],"menu":"会员","menuJump":"列表","tableName":"huiyuan"}],"menu":"会员管理"},{"child":[{"appFrontIcon":"cuIcon-wenzi","buttons":["新增","查看","修改","删除"],"menu":"房间类型","menuJump":"列表","tableName":"fangjianleixing"}],"menu":"房间类型管理"},{"child":[{"appFrontIcon":"cuIcon-explore","buttons":["新增","查看","修改","删除"],"menu":"房间信息","menuJump":"列表","tableName":"fangjianxinxi"}],"menu":"房间信息管理"},{"child":[{"appFrontIcon":"cuIcon-flashlightopen","buttons":["查看","修改","删除","审核","办理入住","每月营收"],"menu":"预定记录","menuJump":"列表","tableName":"yudingjilu"}],"menu":"预定记录管理"},{"child":[{"appFrontIcon":"cuIcon-link","buttons":["查看","修改","删除"],"menu":"入住记录","menuJump":"列表","tableName":"ruzhujilu"}],"menu":"入住记录管理"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["查看","修改","删除","审核"],"menu":"评价记录","menuJump":"列表","tableName":"pingjiajilu"}],"menu":"评价记录管理"},{"child":[{"appFrontIcon":"cuIcon-brand","buttons":["查看","修改"],"menu":"关于我们","tableName":"aboutus"},{"appFrontIcon":"cuIcon-taxi","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"},{"appFrontIcon":"cuIcon-newshot","buttons":["查看","修改"],"menu":"轮播图管理","tableName":"config"},{"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"公告信息","tableName":"news"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-newshot","buttons":["查看","房间预订"],"menu":"房间信息列表","menuJump":"列表","tableName":"fangjianxinxi"}],"menu":"房间信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-flashlightopen","buttons":["查看","支付"],"menu":"预定记录","menuJump":"列表","tableName":"yudingjilu"}],"menu":"预定记录管理"},{"child":[{"appFrontIcon":"cuIcon-link","buttons":["查看","退房评价"],"menu":"入住记录","menuJump":"列表","tableName":"ruzhujilu"}],"menu":"入住记录管理"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["查看"],"menu":"评价记录","menuJump":"列表","tableName":"pingjiajilu"}],"menu":"评价记录管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-newshot","buttons":["查看","房间预订"],"menu":"房间信息列表","menuJump":"列表","tableName":"fangjianxinxi"}],"menu":"房间信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"会员","tableName":"huiyuan"}];
  for(let i=0;i<menus.length;i++){
    if(menus[i].tableName==role){
      for(let j=0;j<menus[i].frontMenu.length;j++){
          for(let k=0;k<menus[i].frontMenu[j].child.length;k++){
            if(tableName==menus[i].frontMenu[j].child[k].tableName){
              let buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
              return buttons.indexOf(key) !== -1 || false
            }
          }
      }
    }
  }
  return false;
}

/**
 *  * 获取当前时间（yyyy-MM-dd hh:mm:ss）
 *   */
export function getCurDateTime() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate(),
    hour = currentTime.getHours(),
    minute = currentTime.getMinutes(),
    second = currentTime.getSeconds();
    return year + "-" + month + "-" + day + " " +hour +":" +minute+":"+second;
}

/**
 *  * 获取当前日期（yyyy-MM-dd）
 *   */
export function getCurDate() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
    return year + "-" + month + "-" + day;
}
