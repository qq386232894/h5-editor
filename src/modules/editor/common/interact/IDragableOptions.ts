/**
 * create by 给力叔 2017/9/27
 */
import {IDraggableResult} from "../dragable/IDraggableResult";
import {Draggable} from "./Draggable";

export interface IDragableOptions{
  allowForm?:any,//就是点击哪里才能触发拖拽,但是无效,奇葩,demo里面又有效 todo 阅读interactjs的源码
  elementRect?:{top,right,bottom,left},
  onMove?:(result:IDraggableResult)=>void;
  onEnd?:(result:IDraggableResult)=>void;
  onStart?:(result:IDraggableResult)=>void;
  customMove?:(event,dragabble:Draggable)=>void;
  target:any;
  autoScroll?:boolean;
}
