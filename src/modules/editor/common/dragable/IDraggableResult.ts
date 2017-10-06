/**
 * create by 给力叔 2017/9/27
 */
import {Draggable} from "../interact/Draggable";

export interface IDraggableResult {
  event: Event;
  position: { x: number, y: number };
  draggable: Draggable;
}
