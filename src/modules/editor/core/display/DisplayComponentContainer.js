/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponent} from "./DisplayComponent";
export class DisplayComponentContainer extends DisplayComponent {
  /**
   * 存储所有的子节点
   * @type {Array<DisplayComponent>}
   */
  children = [];
  addChild(child){
    return this.addChildAt(child,this.numChildrens);
  }

  /**
   * 获取子节点的总数
   * @return {Number}
   */
  get numChildrens(){
    return this.children.length;
  }

  /**
   * 在指定的位置添加子节点
   * @param child {DisplayComponent}
   * @param index {number}
   * @return {boolean}
   */
  addChildAt(child,index){
    if(index < 0 || index > this.numChildrens){
      throw new RangeError("添加的位置超出范围");
    }

    if(child == this){
      throw new Error("不能添加自己为子节点");
    }

    this.checkChild(child);

    if(!this.hasChild(child)){
      this.children.splice(index,0,child);
      child.parent = this;
      return true;
    }else{
      throw new Error("子节点已经包含在该容器中");
    }
  }

  /**
   * 移除子节点
   * @param child
   * @return {boolean}
   */
  removeChild(child){
    this.checkChild(child);
    if(this.hasChild(child)){
      delete child.parent;
      this.children.splice(this.getChildAt(child));
      return true;
    }else{
      return false;
    }
  }

  /**
   * 检查是否是支持的子节点
   * @param child {DisplayComponent}
   */
  checkChild(child){
    if(!(child instanceof DisplayComponent)){
      throw new Error("只支持DisplayComponent");
    }
  }

  /**
   * 获取指定位置的子节点
   * @param index
   * @return {DisplayComponent}
   */
  getChildAt(index){
    if(index < 0 || index >= this.children.length){
      throw new Error("获取的位置超出范围");
    }
    return this.children[index];
  }

  /**
   * 判断是否包含指定的子节点
   * @param child
   * @return {DisplayComponent}
   */
  hasChild(child){
    this.checkChild(child);
    return this.children.includes(child);
  }
}
