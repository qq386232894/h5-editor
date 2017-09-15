/**
 * Created by 给力叔 on 2017/9/8.
 */
import {Scene} from "../scene/Scene";

export class Project {
  id:string = "";         //id
  name:string = "";       //名称
  creator:string = "";    //创建者
  /**
   * 一个也没由多个场景组成
   * @type {Array<Scene>}
   */
  scenes:Array<Scene> = [];

  /**
   * 所选的场景
   * @type {Scene}
   */
  selectedScene:Scene = null;
}
