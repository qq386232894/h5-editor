/**
 * create by 给力叔 2017/9/13
 */
import polyfills from "../../polyfills/Polyfills";
import {Renderer} from "./Renderer";

describe("Renderer",function () {
  document.body.innerHTML = `
  <div id="outer" class="outer">
    <div id="inner" class="inner"></div>
  </div>
  `
  let outer = document.getElementById("outer");
  let inner = document.getElementById("inner");


  describe("findCloseElementByClass",function () {
    it("参数target为空,就返回空",function () {
      expect(Renderer.findCloseElementByClass()).to.be.null;
    })

    it("参数className为空,就返回空",function () {
      expect(Renderer.findCloseElementByClass(inner)).to.be.null;
    })

    it("找到outer节点",function () {
      expect(Renderer.findCloseElementByClass(inner,"outer")).to.be.equals(outer);
    })
  })
})
