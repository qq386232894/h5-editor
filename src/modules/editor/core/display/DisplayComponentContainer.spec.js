/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponent} from "./DisplayComponent";
import {DisplayComponentContainer} from "./DisplayComponentContainer";
import {Polyfills} from "../../../../polyfills/Polyfills";

describe('DisplayComponentContainer', () => {
  let child = new DisplayComponent();
  let parent = new DisplayComponentContainer();
  describe("#addChild", () => {
    parent.addChild(child);
    it("不能添加自己为子节点", function () {
      expect(function () {
        parent.addChild(parent)
      }).throw();
    })

    it("不能重复添加", function () {
      expect(function () {
        parent.addChild(child)
      }).throw();
    })
  })

  describe("#getChildAt", function () {
    it("正常获取子节点", function () {
      expect(parent.getChildAt(0)).equals(child);
    })
    it("不能超出范围", function () {
      expect(function () {
        parent.getChildAt(10);
      }).throw("获取的位置超出范围");
      expect(function () {
        parent.getChildAt(-1);
      }).throw("获取的位置超出范围");
    })
  })

  describe("#hasChild", function () {
    it('包含child', () => {
      expect(parent.hasChild(child)).equals(true);
    })
  })

  describe("#numChildrens", function () {
    it("子节点数为1", () => {
      expect(parent.numChildrens).equals(1);
    });
  })

  describe("#removeChild", function () {
    it("移除子节点成功,返回true", function () {
      expect(parent.removeChild(child)).equals(true);
    })

    it("子节点数为0", function () {
      expect(parent.numChildrens).equals(0);
    })

    it("再次移除子节点,返回false", function () {
      expect(parent.removeChild(child)).equals(false);
    })

    it("参数child不能为空", function () {
      expect(function () {
        parent.removeChild(null)
      }).throw();
    })
  })
  describe("#addChildAt", function () {
    it("参数index不能小于0", function () {
      expect(function () {
        parent.addChildAt(child, -1)
      }).throw();
    })
    it("参数index不能超过最大值", function () {
      expect(function () {
        parent.addChildAt(child, this.numChildrens + 1)
      }).throw();
    })

    it("正常添加子节点",function () {
      expect(parent.addChildAt(child, 0)).equals(true);

      expect(parent.hasChild(child)).equals(true);
    })
  })
})
