/**
 * Created by 给力叔 on 2017/9/8.
 */
import {Properties} from "./property/Properties";
export class DisplayComponent {
  /**
   * 组件的所有属性,这个属性最终会保存在服务器,其他属性都不会保存在服务器.
   * @type {Properties}
   */
  props = new Properties();
  parent = null;
}
