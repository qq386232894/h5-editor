/**
 * Created by 给力叔 on 2017/9/8.
 */
import {StyleConfig} from "./config/StyleConfig";
import {AnimationConfig} from "./config/AnimationConfig";
import {Properties} from "./property/Properties";
export class DisplayComponent {
  style = new StyleConfig();
  animation = new AnimationConfig();
  props = new Properties();
  parent = null;
}
