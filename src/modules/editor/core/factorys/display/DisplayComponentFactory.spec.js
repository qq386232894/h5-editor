/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponentFactory} from "./DisplayComponentFactory";
import {ComponentText} from "../../display/text/ComponentText";
describe('DisplayComponentContainer', () => {
  let instance = DisplayComponentFactory.getInstance();
  it('不能实例化DisplayComponentFactory', () => {
    expect(function () {
      new DisplayComponentFactory();
    }).throw();
  });

  it("DisplayComponentFactory.checkType参数类型必须是有效的字符串",()=>{
    expect(function () {
      instance.checkType(null);
    }).throw();

    expect(function () {
      instance.checkType(undefined);
    }).throw();

    expect(function () {
      instance.checkType(0);
    }).throw();

    expect(function () {
      instance.checkType(true);
    }).throw();

    expect(function () {
      instance.checkType("");
    }).throw();
  });

  it("DisplayComponentFactory是个单例",()=>{
    expect(instance == DisplayComponentFactory.getInstance()).equals(true);
  });

  it("DisplayComponentFactory.registerComponent参数type必须是有效的字符串",()=>{
    expect(function () {
      instance.registerComponent();
    }).throw();
  })

  it("DisplayComponentFactory.registerComponent参数component不能为空",()=>{
    expect(function () {
      instance.registerComponent("ComponentText");
    }).throw();
  });

  it("DisplayComponentFactory.registerComponent参数displayComponent不能为空",()=>{
    expect(function () {
      instance.registerComponent("ComponentText",ComponentText);
    }).throw();
  });

  it("DisplayComponentFactory.registerComponent参数editorComponent不能为空",()=>{
    expect(function () {
      instance.registerComponent("ComponentText",ComponentText,{});
    }).throw();
  });

  it("DisplayComponentFactory.registerComponent",()=>{
    instance.registerComponent("ComponentText",ComponentText,{},{});
  });

  it("DisplayComponentFactory.getRegisterComponent参数type必须是有效的字符串",()=>{
    expect(function () {
      instance.getRegisterComponent()
    }).throw();

    expect(function () {
      instance.getRegisterComponent("")
    }).throw();
  });

  it("DisplayComponentFactory.getRegisterComponent",()=>{
    expect(instance.getRegisterComponent("ComponentText")).not.to.be.empty;
  });

  it("DisplayComponentFactory.createComponent",()=>{
    expect(instance.createComponent("ComponentText") instanceof ComponentText).to.be.true;
  });
});

