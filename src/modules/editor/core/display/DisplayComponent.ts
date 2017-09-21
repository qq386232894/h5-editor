/**
 * Created by 给力叔 on 2017/9/8.
 */
import {Properties} from "./property/Properties";
import {utils} from "../../../../common/utils";
export class DisplayComponent {
  /**
   * 组件的所有属性,这个属性最终会保存在服务器,其他属性都不会保存在服务器.
   * @type {Properties}
   */
  props = new Properties();
  parent = null;
  element:HTMLElement;

  /**
   * 渲染出组件的位置,大小,角度
   */
  renderBounding(){
    this.element.style.cssText = this.props.boundingStyle;
  }

  /**
   * 从另外一个组件进行初始化
   * @param {DisplayComponent} target
   */
  initFromComponent(target:DisplayComponent){
    let props:Properties = utils.copy(target.props);
    props.id = this.props.id;
    Object.assign(this.props,props);
    this.props.selected = true;
  }
}
