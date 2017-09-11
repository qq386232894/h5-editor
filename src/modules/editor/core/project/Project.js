/**
 * Created by 给力叔 on 2017/9/8.
 */
export class Project {
  id = "";         //id
  name = "";       //名称
  creator = "";    //创建者
  /**
   * 一个也没由多个场景组成
   * @type {Array<Scene>}
   */
  scenes = [];

  /**
   * 所选的场景
   * @type {Scene}
   */
  selectedScene = null;
}
