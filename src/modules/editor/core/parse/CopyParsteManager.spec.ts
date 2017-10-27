/**
 * create by 给力叔 2017/9/21
 */
import {DisplayComponentFactory} from "../factorys/display/DisplayComponentFactory";
import {Project} from "../project/Project";
import {Scene} from "../scene/Scene";
import {Stage} from "../display/stage/Stage";
import {DisplayComponent} from "../display/DisplayComponent";
import {CopyPasteManager} from "./CopyPasteManager";
import {ComponentImage, GLS_COMPONENT_IMAGE} from "../display/image/ComponentImage";
import {Inject} from "angular2-decorators-for-vue";

describe("CopyPasteManager",function () {
  DisplayComponentFactory.getInstance().registerComponent(GLS_COMPONENT_IMAGE, ComponentImage)
  let project = new Project();
  let scene = new Scene();
  project.scenes.push(scene);
  let stage = scene.stage = new Stage();
  let image:DisplayComponent = DisplayComponentFactory.getInstance().createComponent(project,GLS_COMPONENT_IMAGE);
  stage.addChild(image);
  image.props.selected = true;

  class Tester{
    @Inject(CopyPasteManager)
    CopyPasteManager:CopyPasteManager;
  }

  let tester = new Tester();

  describe("init",function () {
    it("没初始化,拷贝就出错",function () {
      expect(function () {
        tester.CopyPasteManager.copy();
      }).toThrow();
    })
    it("没初始化,粘贴就出错",function () {
      expect(function () {
        tester.CopyPasteManager.paste();
      }).toThrow();
    })
    it("根据项目初始化",function () {
      tester.CopyPasteManager.init(project);
    })
  })

  describe("copy",function () {
    it("正常拷贝",function () {
      tester.CopyPasteManager.copy();
    })
  })

  describe("copy",function () {
    it("正常粘贴",function () {
      tester.CopyPasteManager.paste();
    })
  })
})
