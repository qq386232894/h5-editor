/**
 * create by 给力叔 2017/9/13
 * 事件监听和抛出
 * 原作者 mrdoob / http://mrdoob.com/
 * 改成typescript版本
 */
import {GlsEvent} from "./GlsEvent";

export type Listener = (event?: GlsEvent) => void;

export class EventDispatcher {
  _listeners: { [key: string]: Array<Listener> };

  addEventListener(type: string, listener: Listener): () => void {
    if (this._listeners === undefined) this._listeners = {};
    var listeners = this._listeners;
    if (listeners[type] === undefined) {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
    return () => {
      this.removeEventListener(type, listener);
    }
  }

  hasEventListener(type: string, listener: Listener) {
    if (this._listeners === undefined) return false;
    var listeners = this._listeners;
    return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
  }

  removeEventListener(type: string, listener: Listener) {
    if (this._listeners === undefined) return;
    var listeners = this._listeners;
    var listenerArray = listeners[type];
    if (listenerArray !== undefined) {
      var index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }

  dispatchEvent(event: GlsEvent) {
    if (this._listeners === undefined) return;
    var listeners = this._listeners;
    var listenerArray = listeners[event.type];
    if (listenerArray !== undefined) {
      event.target = this;
      var array = listenerArray.slice(0);
      for (var i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
    }
  }
}
