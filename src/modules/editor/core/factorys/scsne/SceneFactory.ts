/**
 * Created by LXFA on 2017/10/4/004.
 */
import {Project} from "../../project/Project";
import {Scene} from "../../scene/Scene";
import {ISceneConfig} from "../../scene/ISceneConfig";
import {Stage} from "../../display/stage/Stage";

export class SceneFactory {
  static _instance: SceneFactory = null;

  constructor() {
    if (SceneFactory._instance) {
      throw new Error("SceneFactory不能实例化!");
    }
    SceneFactory._instance = this;
  }

  /****
   * 获取工厂的单例
   * @returns {SceneFactory}
   */
  static getInstance() {
    if (!SceneFactory._instance) {
      return new SceneFactory();
    }
    return SceneFactory._instance;
  }

  createScene(project: Project, sceneConfig?: ISceneConfig) {
    let scene = new Scene();
    if (!sceneConfig) {
      scene.config.id = (++project.numSceneCreated).toString();
      scene.config.name = `场景${scene.config.id}`;
    } else {
      scene.config = sceneConfig;
    }
    scene.stage = new Stage();
    return scene;
  }
}
