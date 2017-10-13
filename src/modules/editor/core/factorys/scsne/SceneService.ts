/**
 * Created by LXFA on 2017/10/4/004.
 */
import {Project} from "../../project/Project";
import {Scene} from "../../scene/Scene";
import {ISceneProperties} from "../../scene/ISceneProperties";
import {GLS_COMPONENT_STAGE, Stage} from "../../display/stage/Stage";
import {DisplayComponentFactory} from "../display/DisplayComponentFactory";
import {utils} from "../../../../../common/utils";
import {DisplayComponent} from "../../display/DisplayComponent";
import axios from 'axios';
import {Properties} from "../../display/property/Properties";
import {DisplayComponentContainer} from "../../display/DisplayComponentContainer";
import {ProjectService} from "../../project/ProjectService";

export interface IDisplayComponentData {
  props: Properties;
  children?: Array<IDisplayComponentData>;
}

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
      for (let key of Object.keys(sceneProperties)) {
        scene.props[key] = sceneProperties[key];
      }
    }
    scene.stage = DisplayComponentFactory.getInstance().createComponent(project, GLS_COMPONENT_STAGE);
    return scene;
  }

  load(project: Project, scene: Scene) {
    axios.get("/api/scene/" + scene.props.id).then((result) => {
      let data: IDisplayComponentData = result.data;
      let stage = this.createComponent(project, data);
      scene.stage = stage as Stage;
    })
  }

  createComponent(project: Project, data: IDisplayComponentData): DisplayComponent {
    let component = DisplayComponentFactory.getInstance().createComponent(project, data.props.type, data.props.id);

    //继承服务器的属性
    for (let key of Object.keys(data.props)) {
      component.props[key] = data.props[key];
    }

    if (utils.isArray(data.children)) {
      data.children.forEach((childData: IDisplayComponentData) => {
        let child = this.createComponent(project, childData);
        (<DisplayComponentContainer>component).addChild(child);
      })
    }
    return component;
  }

  save(project: Project, scene: Scene, newScene: boolean = false) {
    let formData = utils.mapTree(scene.stage, function (component: DisplayComponent) {
      return {props: component.props};
    });
    formData.id = scene.props.id;
    formData.projectId = project.id;
    let method = newScene ? axios.post : axios.put;
    return method.call(axios, "/api/scene/" + (newScene ? '' : scene.props.id), JSON.stringify(formData), {
      headers: {'Content-Type': "application/json"}
    });
  }

  deleteScene(project: Project) {
    //todo 移除场景，是要后端来移除
    let scene = project.removeSelectedScene();
    return axios.delete('/api/scene/' + scene.props.id).then(() => {
      ProjectService.getInstance().save(project);
    });
  }

  addScene(project: Project) {
    let scene = SceneService.getInstance().createScene(project);
    let scenes = project.scenes;
    if (project.selectedScene) {
      scenes.splice(project.scenes.indexOf(project.selectedScene) + 1, 0, scene);
    } else {
      scenes.push(scene);
    }

    //todo 场景创建是要靠后端来创建的，而不是发两个请求
    ProjectService.getInstance().save(project).then(() => {
      return SceneService.getInstance().save(project, scene, true);
    }).catch(() => {
      scenes.splice(scenes.indexOf(scene), 1);
    });
  }

  copyScene(project: Project) {
    //todo 拷贝场景，说白了，就是后端把当前场景的数据拿出来，然后复制一份，后面保证新的场景的id唯一就好了
  }
}
