/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponentRegisterInfo} from "./DisplayComponentRegisterInfo";
import {DisplayComponent} from "../../display/DisplayComponent";
import {Properties} from "../../display/property/Properties";
import {Project} from "../../project/Project";

export class DisplayComponentFactory {
  /**
   * @type {DisplayComponentFactory}
   * @private
   */
  static _instance = null;

  _registerComponents: { [key: string]: DisplayComponentRegisterInfo } = {};

  /**
   * 已经创建的组件的哈希表
   * @type {Map<{[key:string]:DisplayComponent}>}
   */
  _createdComponents = new Map();

  constructor() {
    if (DisplayComponentFactory._instance) {
      throw new Error("DisplayComponentFactory不能实例化!");
    }
    DisplayComponentFactory._instance = this;
  }

  /**
   * 获取工厂的单例
   * @return {DisplayComponentFactory}
   */
  static getInstance() {
    if (!DisplayComponentFactory._instance) {
      return new DisplayComponentFactory();
    }
    return DisplayComponentFactory._instance;
  }

  /**
   * 注册组件
   * @param {String} type
   * @param {DisplayComponent} component
   */
  registerComponent(type: string, component: DisplayComponent, alias: string = "组件") {
    this.checkType(type);

    if (this.getRegisterComponent(type)) {
      throw new Error("该组件已经注册过");
    }

    if (!component) {
      throw new Error("component不能为空");
    }

    let info = new DisplayComponentRegisterInfo();
    info.type = type;
    info.component = component;
    info.alias = alias;
    this._registerComponents[type] = info;
  }

  /**
   * 检查组件类型
   */
  checkType(type: string) {
    if (typeof type !== "string" || !type) {
      throw new Error("请提供有效的类型");
    }
  }

  /**
   * 为某个项目创建组件
   * @param {string} type
   * @returns {DisplayComponent}
   */
  createComponent(project:Project,type: string,id:string = ""): DisplayComponent {
    this.checkType(type);
    if (this.getRegisterComponent(type)) {
      let info = this._registerComponents[type];
      let component = new info.component();
      let props: Properties = component.props;
      props.type = type;   //这一行必须在id之前，因为id要根据组件类型来生成
      props.id = id || this.generateUUID(component,project);
      this._createdComponents.set(component.props.id, component);
      return component;
    } else {
      throw new Error(`组件未注册,不能创建:${type}`);
    }
  }

  /**
   * @param component {DisplayComponent}
   */
  generateUUID(component,project:Project) {
    return component.props.type + (++ project.numComponentCreated);
  }

  /**
   * 获取注册过的组件
   * @param type
   * @return {DisplayComponentRegisterInfo}
   */
  getRegisterComponent(type) {
    this.checkType(type);
    return this._registerComponents[type];
  }

  /**
   * 根据id获取创建的组件
   * @param id
   */
  getCreatedComponent(id) {
    if (!this._createdComponents.has(id)) {
      throw new Error(`id为${id}的组件没创建过`);
    }
    return this._createdComponents.get(id);
  }
}
