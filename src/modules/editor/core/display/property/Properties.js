/**
 * Created by 给力叔 on 2017/9/8.
 */
import {StyleConfig} from "../config/StyleConfig";
import {AnimationConfig} from "../config/AnimationConfig";

export class Properties {
  id = "";              //id
  alias = "";           //别称
  type = "";            //类型

  /**
   * 样式,todo 这里设计成支持多平台的版本
   * @type {StyleConfig}
   */
  style = new StyleConfig();

  /**
   * 动画的设置
   * @type {AnimationConfig}
   */
  animation = new AnimationConfig();
}
