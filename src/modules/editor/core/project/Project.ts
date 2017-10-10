/**
 * Created by 给力叔 on 2017/9/8.
 */
import {Scene} from "../scene/Scene";

export class Project {
  id: string = "";                      //id
  name: string = "";                    //名称
  creator: string = "";                //创建者
  numSceneCreated: number = 0;        //该项目创建过多少个场景
  numComponentCreated: number = 0;   //该项目创建过多少个组件啊
  /**
   * 一个也没由多个场景组成
   * @type {Array<Scene>}
   */
  scenes: Array<Scene> = [];

  /**
   * 所选的场景
   * @type {Scene}
   */
  selectedScene: Scene = null;

  /**
   * 删除所选的场景
   * @returns {boolean}
   */
  removeSelectedScene(): Scene {
    if (this.scenes.length == 1) {
      return null;
    }
    //找出相邻的场景
    let removedScene = this.selectedScene;
    let index = this.scenes.indexOf(this.selectedScene);
    let selectScene = this.scenes[index + 1] || this.scenes[index - 1];
    //选中相邻的场景
    this.selectedScene = selectScene;
    //删除当前场景
    this.scenes.splice(index, 1);
    return removedScene;
  }
}
