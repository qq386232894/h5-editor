/**
 * create by 给力叔 2017/9/12
 */
export const utils = {
  //todo 写单元测试测试这个类
  findCloseElementByClass:function (target,className) {
    if(!target){
      return null;
    }
    if(target && target.classList && target.classList.contains(className)){
      return target;
    }else{
      return utils.findCloseElementByClass(target.parentNode,className);
    }
  }
}
