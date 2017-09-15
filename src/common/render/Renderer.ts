/**
 * create by 给力叔 2017/9/13
 * dom渲染器,主要为了做兼容处理
 */
export const NAMESPACE_URIS = {
  'xlink': 'http://www.w3.org/1999/xlink',
  'svg': 'http://www.w3.org/2000/svg',
  'xhtml': 'http://www.w3.org/1999/xhtml',
  'xml': 'http://www.w3.org/XML/1998/namespace'
};
export const Renderer = {
  /**
   * 不断的往上找,找出包含类名的元素
   * @param target
   * @param className
   * @returns {HTMLElement}
   */
  findCloseElementByClass: function (target, className) {
    if (!target || !className) {
      return null;
    }
    if (target && target.classList && Renderer.hasClass(target, className)) {
      return target;
    } else {
      return Renderer.findCloseElementByClass(target.parentNode, className);
    }
  },
  /**
   * 获取位置和大小
   * @param target
   * @returns {*|ClientRect}
   */
  getBoundingClientRect(target) {
    return target.getBoundingClientRect();
  },
  /**
   * 获取屏幕宽度
   * @returns {Number|number}
   */
  getWindowWidth() {
    return window.innerWidth || document.body.clientWidth;
  },
  /**
   * 获取屏幕高度
   * @returns {Number|number}
   */
  getWindowHeight() {
    return window.innerHeight || document.body.clientHeight;
  },
  /**
   * 创建元素
   * @param name
   * @param namespace 可能取值:xlink,svg,xhtml,xml
   * @returns {Element}
   */
  createElement(name, namespace) {
    if (namespace) {
      return document.createElementNS(NAMESPACE_URIS[namespace], name);
    }

    return document.createElement(name);
  },
  /**
   * 创建注释
   * @param value
   * @returns {Comment}
   */
  createComment(value) {
    return document.createComment(value);
  },
  /**
   * 创建文本节点
   * @param value
   * @returns {Text}
   */
  createText(value) {
    return document.createTextNode(value);
  },
  /**
   * 添加子节点
   * @param parent
   * @param newChild
   */
  appendChild(parent, newChild) {
    parent.appendChild(newChild);
  },
  /**
   * 插入子节点
   * @param parent
   * @param newChild
   * @param refChild
   */
  insertBefore(parent, newChild, refChild) {
    if (parent) {
      parent.insertBefore(newChild, refChild);
    }
  },
  /**
   * 移除子节点
   * @param parent
   * @param oldChild
   */
  removeChild(parent, oldChild) {
    if (parent) {
      parent.removeChild(oldChild);
    }
  },
  /**
   * 获取父节点
   * @param node
   * @returns {Renderer.parentNode|Node|*|parentNode}
   */
  parentNode(node) {
    return node.parentNode;
  },
  /**
   * 获取节点的下一个相邻节点
   * @param node
   * @returns {Renderer.nextSibling|*|Node|nextSibling}
   */
  nextSibling(node) {
    return node.nextSibling;
  },
  /**
   * 设置元素的属性
   * @param el
   * @param name
   * @param value
   * @param namespace
   */
  setAttribute(el, name, value, namespace) {
    if (namespace) {
      el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ':' + name, value);
    } else {
      el.setAttribute(name, value);
    }
  },
  /**
   * 移除元素属性
   * @param el
   * @param name
   * @param namespace
   */
  removeAttribute(el, name, namespace) {
    if (namespace) {
      el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
    } else {
      el.removeAttribute(name);
    }
  },
  /**
   * 添加class
   * @param el
   * @param name
   */
  addClass(el, name) {
    el.classList.add(name);
  },
  /**
   * 移除class
   * @param el
   * @param name
   */
  removeClass(el, name) {
    el.classList.remove(name);
  },
  /**
   * 判断元素是否包含某个类
   * @param el
   * @param name
   * @returns {boolean}
   */
  hasClass(el, name) {
    return el.classList.contains(name);
  },
  /**
   * 设置样式
   * @param el
   * @param style
   * @param value
   * @param hasVendorPrefix
   * @param hasImportant
   */
  setStyle(el, style, value, hasVendorPrefix, hasImportant) {
    if (hasVendorPrefix || hasImportant) {
      el.style.setProperty(style, value, hasImportant ? 'important' : '');
    } else {
      el.style[style] = value;
    }
  },
  /**
   * 移除样式
   * @param el
   * @param style
   * @param hasVendorPrefix
   */
  removeStyle(el, style, hasVendorPrefix) {
    if (hasVendorPrefix) {
      el.style.removeProperty(style);
    } else {
      // IE requires '' instead of null
      // see https://github.com/angular/angular/issues/7916
      el.style[style] = '';
    }
  },
  /**
   * 事件监听
   * @param target
   * @param eventName
   * @param callback
   */
  listen(target, eventName, callback) {
    target.addEventListener(eventName, callback);
  }
}
