/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponent} from "./DisplayComponent";
import {DisplayComponentContainer} from "./DisplayComponentContainer";

describe('DisplayComponentContainer', () => {
  let child = new DisplayComponent();
  let parent = new DisplayComponentContainer();
  describe("#addChild", () => {
    parent.addChild(child);
    it("不能添加自己为子节点", function () {
      expect(function () {
        parent.addChild(parent)
      }).toThrow();
    })

    it("不能重复添加", function () {
      expect(function () {
        parent.addChild(child)
      }).toThrow();
    })
  })

  describe("#getChildAt", function () {
    it("正常获取子节点", function () {
      expect(parent.getChildAt(0)).toEqual(child);
    })
    it("不能超出范围", function () {
      expect(function (value) {
        parent.getChildAt(10);
      }).toThrow();
      expect(function () {
        parent.getChildAt(-1);
      }).toThrow();
    })
  })

  describe("#hasChild", function () {
    it('包含child', () => {
      expect(parent.hasChild(child)).toEqual(true);
    })
  })

  describe("#numChildrens", function () {
    it("子节点数为1", () => {
      expect(parent.numChildrens).toEqual(1);
    });
  })

  describe("#removeChild", function () {
    it("移除子节点成功,返回true", function () {
      expect(parent.removeChild(child)).toEqual(true);
    })

    it("子节点数为0", function () {
      expect(parent.numChildrens).toEqual(0);
    })

    it("再次移除子节点,返回false", function () {
      expect(parent.removeChild(child)).toEqual(false);
    })

    it("参数child不能为空", function () {
      expect(function () {
        parent.removeChild(null)
      }).toThrow();
    })
  })
  describe("#addChildAt", function () {
    it("参数index不能小于0", function () {
      expect(function () {
        parent.addChildAt(child, -1)
      }).toThrow();
    })
    it("参数index不能超过最大值", function () {
      expect(function () {
        parent.addChildAt(child, this.numChildrens + 1)
      }).toThrow();
    })

    it("正常添加子节点", function () {
      expect(parent.addChildAt(child, 0)).toEqual(true);

      expect(parent.hasChild(child)).toEqual(true);
    })
  })
})
