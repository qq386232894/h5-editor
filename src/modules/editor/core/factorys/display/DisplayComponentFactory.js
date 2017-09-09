/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponentRegisterInfo} from "./DisplayComponentRegisterInfo";
export class DisplayComponentFactory {
  /**
   * @type {DisplayComponentFactory}
   * @private
   */
  static _instance = null;

  /**
   *
   * @type {{String:DisplayComponentRegisterInfo}}
   * @private
   */
  _registerComponents = {};

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
   * @param type {String}
   * @param component {DisplayComponent}
   */
  registerComponent(type, component, displayComponent, editorComponent) {
    this.checkType(type);

    if (this.getRegisterComponent(type)) {
      throw new Error("该组件已经注册过");
    }

    if (!component) {
      throw new Error("component不能为空");
    }

    if (!displayComponent) {
      throw new Error("displayComponent不能为空");
    }

    if (!editorComponent) {
      throw new Error("editorComponent不能为空");
    }

    let info = new DisplayComponentRegisterInfo();
    info.type = type;
    info.component = component;
    info.displayComponent = displayComponent;
    info.editorComponent = editorComponent;
    this._registerComponents[type] = info;
  }

  checkType(type){
    if(typeof type !== "string" || !type){
      throw new Error("请提供有效的类型");
    }
  }

  /**
   * 创建组件
   * @param type {String}
   * @return {DisplayComponentFactory}
   */
  createComponent(type) {
    this.checkType(type);
    if (this.getRegisterComponent(type)) {
      /**
       * @type {DisplayComponentRegisterInfo}
       */
      let info = this._registerComponents[type];
      return new info.component();
    } else {
      throw new Error(`组件创建失败:${type}`);
    }
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
}
