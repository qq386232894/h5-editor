/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponentFactory} from "./DisplayComponentFactory";
import {ComponentText} from "../../display/text/ComponentText";
describe('DisplayComponentFactory', () => {
  let instance = DisplayComponentFactory.getInstance();

  describe("#heckType",function () {
    it("参数类型必须是有效的字符串",()=>{
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
  })

  describe("检查单例",function () {
    it('不能实例化DisplayComponentFactory', () => {
      expect(function () {
        new DisplayComponentFactory();
      }).throw();
    });

    it("#getInstance",function () {
      expect(instance == DisplayComponentFactory.getInstance()).equals(true);
    })
  })

  describe("#registerComponent",function () {
    it("参数type必须是有效的字符串",function () {
      expect(function () {
        instance.registerComponent();
      }).throw();
    })

    it("参数component不能为空",function () {
      expect(function () {
        instance.registerComponent("ComponentText");
      }).throw();
    })

    it("参数displayComponent不能为空",function () {
      expect(function () {
        instance.registerComponent("ComponentText",ComponentText);
      }).throw();
    })

    it("参数editorComponent不能为空",function () {
      expect(function () {
        instance.registerComponent("ComponentText",ComponentText,{});
      }).throw();
    })

    it("正常注册组件",function () {
      instance.registerComponent("ComponentText",ComponentText,{},{});
    })
  })

  describe("#getRegisterComponent",function () {
    it("参数type必须是有效的字符串",()=>{
      expect(function () {
        instance.getRegisterComponent()
      }).throw();

      expect(function () {
        instance.getRegisterComponent("")
      }).throw();
    });

    it("获取到ComponentText",()=>{
      expect(instance.getRegisterComponent("ComponentText")).not.to.be.empty;
    });
  })

  describe("#createComponent",function () {
    it("创建ComponentText成功",()=>{
      expect(instance.createComponent("ComponentText") instanceof ComponentText).to.be.true;
    });
  })
});

