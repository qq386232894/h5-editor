/**
 * Created by LXFA on 2017/10/4/004.
 */
import {Project} from "../../project/Project";
import {Scene} from "../../scene/Scene";
import {ISceneProperties} from "../../scene/ISceneProperties";
import {GLS_COMPONENT_STAGE, Stage} from "../../display/stage/Stage";
import {DisplayComponentFactory} from "../display/DisplayComponentFactory";

export class SceneService {
  static _instance: SceneService = null;

  constructor() {
    if (SceneService._instance) {
      throw new Error("SceneFactory不能实例化!");
    }
    SceneService._instance = this;
  }

  /****
   * 获取工厂的单例
   * @returns {SceneService}
   */
  static getInstance() {
    if (!SceneService._instance) {
      return new SceneService();
    }
    return SceneService._instance;
  }

  createScene(project: Project, sceneProperties?: ISceneProperties) {
    let scene = new Scene();
    if (!sceneProperties) {
      scene.props.id = (++project.numSceneCreated).toString();
      scene.props.name = `场景${scene.props.id}`;
    } else {
      scene.props = sceneProperties;
    }
    scene.stage = DisplayComponentFactory.getInstance().createComponent(GLS_COMPONENT_STAGE);
    return scene;
  }
}
