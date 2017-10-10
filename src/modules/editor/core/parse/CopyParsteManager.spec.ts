/**
 * create by 给力叔 2017/9/21
 */
import {DisplayComponentFactory} from "../factorys/display/DisplayComponentFactory";
import {ComponentText, GLS_COMPONENT_TEXT} from "../display/text/ComponentText";
import {Project} from "../project/Project";
import {Scene} from "../scene/Scene";
import {Stage} from "../display/stage/Stage";
import {DisplayComponent} from "../display/DisplayComponent";
import {CopyPasteManager} from "./CopyPasteManager";
import {ComponentImage, GLS_COMPONENT_IMAGE} from "../display/image/ComponentImage";

describe("CopyPasteManager",function () {
  DisplayComponentFactory.getInstance().registerComponent(GLS_COMPONENT_IMAGE, ComponentImage)
  let project = new Project();
  let scene = new Scene();
  project.scenes.push(scene);
  let stage = scene.stage = new Stage();
  let image:DisplayComponent = DisplayComponentFactory.getInstance().createComponent(project,GLS_COMPONENT_IMAGE);
  stage.addChild(image);
  image.props.selected = true;

  describe("init",function () {
    it("没初始化,拷贝就出错",function () {
      expect(function () {
        CopyPasteManager.getInstance().copy();
      }).toThrow();
    })
    it("没初始化,粘贴就出错",function () {
      expect(function () {
        CopyPasteManager.getInstance().paste();
      }).toThrow();
    })
    it("根据项目初始化",function () {
      CopyPasteManager.getInstance().init(project);
    })
  })

  describe("copy",function () {
    it("正常拷贝",function () {
      CopyPasteManager.getInstance().copy();
    })
  })

  describe("copy",function () {
    it("正常粘贴",function () {
      CopyPasteManager.getInstance().paste();
    })
  })
})
