/**
 * create by 给力叔 2017/9/21
 */
import {DisplayComponent} from "../display/DisplayComponent";
import {Project} from "../project/Project";
import {DisplayComponentFactory} from "../factorys/display/DisplayComponentFactory";

export class CopyPasteManager {
  static _instance: CopyPasteManager;

  //已经拷贝的内容
  copies: Array<DisplayComponent> = [];

  _project: Project;

  constructor() {
    CopyPasteManager._instance = this;
  }

  static getInstance() {
    if (!CopyPasteManager._instance) {
      return new CopyPasteManager();
    } else {
      return CopyPasteManager._instance;
    }
  }

  /**
   * 必须初始化项目,不然不能复制东西
   * @param project
   */
  init(project) {
    this._project = project;
  }

  get project():Project{
    if(!this._project){
      throw new Error("CopyPasteManager必須使用CopyPasteManager.getInstance().init(project)初始化项目进来");
    }
    return this._project;
  }

  /**
   * 是不是有复制东西
   * @returns {boolean}
   */
  hasCopies(): boolean {
    return !!this.copies.length;
  }

  /**
   * 复制
   */
  copy() {
    if (this.project && this.project.selectedScene) {
      this.copies = this.project.selectedScene.selectedComponents;
    }
  }

  /**
   * 粘贴
   */
  paste() {
    if (this.project && this.project.selectedScene) {
      let selectedScene = this.project.selectedScene;
      selectedScene.clearSelection();
      this.copies.forEach((component:DisplayComponent)=>{
        let copy:DisplayComponent = DisplayComponentFactory.getInstance().createComponent(component.props.type);
        copy.initFromComponent(component);
        copy.style.left += 5;
        copy.style.top += 5;
        this.project.selectedScene.stage.addChild(copy);
        copy.props.selected = true;
      })
    }
  }
}
