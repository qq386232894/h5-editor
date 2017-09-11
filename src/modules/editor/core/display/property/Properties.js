/**
 * Created by 给力叔 on 2017/9/8.
 */
import {AnimationConfig} from "../config/AnimationConfig";
import {Devices} from "../../device/Devices";

export class Properties {
  id = "";              //id
  alias = "";           //别称
  type = "";            //类型

  /**
   * 样式
   */
  _style ={[Devices.PC]:{}};

  /**
   * 动画的设置
   * @type {AnimationConfig}
   */
  animation = new AnimationConfig();

  /**
   * 获取组件的样式,todo 目前只支持PC样式
   */
  get style(){
    return this._style[Devices.PC];
  }

  set style(value){
    this._style[Devices.PC] = value;
  }
}
