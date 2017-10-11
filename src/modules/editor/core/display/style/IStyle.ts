/**
 * Created by 给力叔 on 2017/9/14.
 * 设定组件支持的样式
 */
import {Color} from "../../../common/colorPicker/Color";

type StyleValue = string & number;
export interface IStyle{
  width:number;
  top:number;
  left:number;
  height:number;
  rotate:number;
  color?:Color;
  lineHeight?:number;
  backgroundImage?:string;
}
