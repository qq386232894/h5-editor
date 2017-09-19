/**
 * Created by 给力叔 on 2017/9/18
 */
import {Rect} from "./Rect";

describe("Rect",function () {
  document.body.style.margin = "0";
  document.body.innerHTML = `<div id="rect" style="width: 100px;height: 100px;left: 100px;top: 100px;position: absolute"></div>`;
  let element = document.getElementById("rect");
  let clientRect = element.getBoundingClientRect();
  let rect = new Rect(clientRect);
  describe("#top",function () {
    it("top相等",function () {
      expect(rect.top).toEqual(clientRect.top);
    })
  })

  describe("#right",function () {
    it("right相等",function () {
      expect(rect.right).toEqual(clientRect.right);
    });
  })

  describe("#bottom",function () {
    it("bottom相等",function () {
      expect(rect.bottom).toEqual(clientRect.bottom);
    });
  })

  describe("#left",function () {
    it("left相等",function () {
      expect(rect.left).toEqual(clientRect.left);
    });
  })

  describe("#centerX",function () {
    it("centerX为150",function () {
      expect(rect.centerX).toEqual(150);
    });
  })

  describe("#centerY",function () {
    it("centerY为150",function () {
      expect(rect.centerY).toEqual(150);
    });
  })
})
