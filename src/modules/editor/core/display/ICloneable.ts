/**
 * Created by 给力叔 on 2017/10/19/019.
 * 原型模式，超级简单的一个模式
 */
import {Project} from "../project/Project";

export interface ICloneable<T>{
  clone:(project:Project)=>T;
}
