/**
 * Created by 给力叔 on 2017/9/8.
 */
import {Properties} from "./property/Properties";
import {utils} from "../../../../common/utils";
import {IStyle} from "./style/IStyle";
import {Devices} from "../device/Devices";
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
    this.element.style.cssText = this.boundingStyle;
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

  /**
   * 获取组件的样式,todo 目前只支持PC样式
   */
  get style():IStyle {
    return this.props._style[Devices.PC];
  }

  set style(value) {
    this.props._style[Devices.PC] = value;
  }

  /**
   * 获取大小位置,角度的样式
   * @returns {string}
   */
  get boundingStyle():string {
    let style = this.style;
    let resetTranslate = " translate3d(0,0,0)";
    return `
    position:absolute;
    top:${style.top}px;
    left:${style.left}px;
    width:${style.width}px;
    height:${style.height}px;
    transform:rotateZ(${style.rotate}deg)${resetTranslate};
    -ms-transform:rotateZ(${style.rotate}deg)${resetTranslate};
    -moz-transform:rotateZ(${style.rotate}deg)${resetTranslate};
    -webkit-transform:rotateZ(${style.rotate}deg)${resetTranslate};
    -o-transform:rotateZ(${style.rotate}deg)${resetTranslate};
    `;
  }

  get componentSelectStyle():string {
    let style = this.style;
    return `
    position:absolute;
    top:0px;
    left:0px;
    width:${style.width}px;
    height:${style.height}px;
      `;
  }
}
