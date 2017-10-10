/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponentFactory} from "./DisplayComponentFactory";
import {ComponentText,GLS_COMPONENT_TEXT} from "../../display/text/ComponentText";
import {Project} from "../../project/Project";
describe('DisplayComponentFactory', () => {
  let project = new Project();
  let instance = DisplayComponentFactory.getInstance();
  describe("#heckType",function () {
    it("参数类型必须是有效的字符串",()=>{
      expect(function () {
        instance.checkType(null);
      }).toThrow();

      expect(function () {
        instance.checkType(undefined);
      }).toThrow();

      expect(function () {
        instance.checkType(0);
      }).toThrow();

      expect(function () {
        instance.checkType(true);
      }).toThrow();

      expect(function () {
        instance.checkType("");
      }).toThrow();
    });
  })

  describe("检查单例",function () {
    it('不能实例化DisplayComponentFactory', () => {
      expect(function () {
        new DisplayComponentFactory();
      }).toThrow();
    });

    it("#getInstance",function () {
      expect(instance == DisplayComponentFactory.getInstance()).toEqual(true);
    })
  })

  describe("#registerComponent",function () {
    it("参数type必须是有效的字符串",function () {
      expect(function () {
        instance.registerComponent();
      }).toThrow();
    })

    it("参数component不能为空",function () {
      expect(function () {
        instance.registerComponent(GLS_COMPONENT_TEXT);
      }).toThrow();
    })

    it("正常注册组件",function () {
      instance.registerComponent(GLS_COMPONENT_TEXT,ComponentText,"文本");
    })
  })

  describe("#getRegisterComponent",function () {
    it("参数type必须是有效的字符串",()=>{
      expect(function () {
        instance.getRegisterComponent()
      }).toThrow();

      expect(function () {
        instance.getRegisterComponent("")
      }).toThrow();
    });

    it("获取到ComponentText",()=>{
      expect(instance.getRegisterComponent(GLS_COMPONENT_TEXT)).toBeDefined();
    });
  })

  describe("#createComponent",function () {
    it("创建ComponentText成功",()=>{
      expect(instance.createComponent(project,GLS_COMPONENT_TEXT) instanceof ComponentText).toBeTruthy();
    });
  })

  describe("#getCreatedComponent",function () {
    it("正常获取创建的组件",function () {
      let component = instance.createComponent(project,GLS_COMPONENT_TEXT);
      expect(instance.getCreatedComponent(component.props.id)).toEqual(component);
      expect(function () {
        instance.getCreatedComponent(111)
      }).toThrow();
    })
  })
});

