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
   * @param type {String}
   * @param component {DisplayComponent}
   */
  registerComponent(type, component) {
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
   * @return {DisplayComponent}
   */
  createComponent(type) {
    this.checkType(type);
    if (this.getRegisterComponent(type)) {
      /**
       * @type {DisplayComponentRegisterInfo}
       */
      let info = this._registerComponents[type];
      let component = new info.component();
      component.props.id = this.generateUUID(component);
      this._createdComponents.set(component.props.id,component);
      return component;
    } else {
      throw new Error(`组件未注册,不能创建:${type}`);
    }
  }

  /**
   * @param component {DisplayComponent}
   */
  generateUUID(component){
    let id;
    do{
      id = component.props.type + Math.floor(Math.random() * 999999999);
    }while(this._createdComponents.has(id));
    return id;
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
  getCreatedComponent(id){
    if(!this._createdComponents.has(id)){
      throw new Error(`id为${id}的组件没创建过`);
    }
    return this._createdComponents.get(id);
  }
}
