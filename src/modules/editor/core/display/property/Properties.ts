/**
 * Created by 给力叔 on 2017/9/8.
 */
import {AnimationConfig} from "../config/AnimationConfig";
import {Devices} from "../../device/Devices";
import {IStyle} from "../style/IStyle";

export class Properties {
  id = "";              //id
  alias = "";           //别称
  type = "";            //类型

  selected = false;    //是不是选中了

  /**
   * 样式
   */
  _style = {[Devices.PC]: {} as any};

  /**
   * 动画的设置
   * @type {AnimationConfig}
   */
  animation = new AnimationConfig();

  /**
   * 获取组件的样式,todo 目前只支持PC样式
   */
  get style():IStyle {
    return this._style[Devices.PC];
  }

  set style(value) {
    this._style[Devices.PC] = value;
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
