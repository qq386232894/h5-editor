/**
 * Created by 给力叔 on 2017/10/4/004.
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
import {Debounce} from "../../../../../common/utils/Debounce";
import {Injectable} from "angular2-decorators-for-vue";
export interface IDisplayComponentData {
  props: Properties;
  children?: Array<IDisplayComponentData>;
}

@Injectable()
export class SceneService {
  private _debounce = new Debounce(50);
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
    scene.destroy();

    axios.get("/api/getScene?id=" + scene.props.id).then((result) => {
      let data: IDisplayComponentData = result.data;
      let stage;
      if (data.props) {
        stage = this.createComponent(project, data);
      } else {
        stage = DisplayComponentFactory.getInstance().createComponent(project, GLS_COMPONENT_STAGE);
      }
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

  /**
   * 保存场景
   * @param {Project} project
   * @param {Scene} scene
   * @returns {AxiosPromise}
   */
  save(project: Project, scene: Scene) {
    let formData = utils.mapTree(scene.stage, function (component: DisplayComponent) {
      return {props: component.props};
    });
    formData.id = scene.props.id;
    formData.projectId = project.id;
    return axios.put("/api/saveScene", formData);
  }

  /**
   * 删除场景
   * @param {Project} project
   * @returns {Promise<AxiosResponse>}
   */
  deleteScene(project: Project) {
    return axios.delete(utils.getRequestPath('/api/deleteScene', {id: project.selectedScene.props.id})).then((result) => {
      if (result.data !== false) {
        project.removeSelectedScene();
      }
    });
  }

  /**
   * 新增一个空白场景
   * @param {Project} project
   */
  addScene(project: Project) {
    let index = project.scenes.indexOf(project.selectedScene) + 1;
    axios.put(utils.getRequestPath('/api/addScene', {index: index, projectId: project.id})).then(() => {
      let scene = this.createScene(project);
      let scenes = project.scenes;
      scenes.splice(index, 0, scene);
    });
  }

  /**
   * 拷贝场景
   * @param {Project} project
   */
  copyScene(project: Project) {
    let selectedScene = project.selectedScene;
    axios.put(utils.getRequestPath('/api/copyScene', {id: selectedScene.props.id})).then((result) => {
      let data = result.data;
      let scene = this.createScene(project);
      scene.props.id = data.id;
      scene.props.name = data.name;
      let scenes = project.scenes;
      scenes.splice(project.scenes.indexOf(selectedScene) + 1, 0, scene);
    });
  }

  /**
   * 更换场景的位置
   * @param {number} oldIndex
   * @param {number} newIndex
   */
  changeScene(oldIndex:number,newIndex:number){
    axios.post(utils.getRequestPath('/api/changeSceneIndex', {oldIndex: oldIndex,newIndex:newIndex})).catch((result) => {
      //todo 失败就是要回档咯
    });
  }

  /**
   * 修改场景的名称
   * @param {Scene} scene
   */
  changeSceneName(scene:Scene){
    this._debounce.handle(()=>{
      axios.put(utils.getRequestPath('/api/changeSceneName', {id: scene.props.id,name:scene.props.name}));
    })
  }
}
