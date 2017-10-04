/**
 * create by 给力叔 2017/9/27
 * 实现拖拽的指令
 * todo 此类其实可以继续封装成完全通用的
 */
import Vue from 'vue'
import {IDragableOptions} from "../interact/IDragableOptions";
import {Draggable} from "../interact/Draggable";

export default Vue.directive('draggable', {
  inserted: function (el, binding) {
    let value: IDragableOptions = binding.value || {};
    value.target = el;
    (<any>binding).instance = new Draggable(binding.value);
  },
  unbind(el, binding) {
    binding && (<any>binding).instance && (<any>binding).instance.destroy();
  }
});
