/**
 * Created by 给力叔 on 2017/9/8.
 * 组件的属性，最终会存储在服务器里，不要在这个类里面增加任何方法，因为这个类最终会被JSON数据覆盖掉
 */
import {Devices} from "../../device/Devices";
import {IStyle} from "../style/IStyle";
import {AnimationConfig} from "../config/AnimationConfig";

export class Properties {
  id = "";                                          //id
  alias = "";                                      //别称
  type = "";                                        //类型
  selected = false;                                //是不是选中了
  _style = {[Devices.PC]: {} as IStyle};            //样式
  animationConfigs: Array<AnimationConfig> = [];   //动画的配置
}
