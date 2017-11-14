/**
 * Created by 给力叔 on 2017/9/8.
 * 此类抄自angular1
 */
function isType(target, typeString) {
  return typeof target === typeString;
}

var getPrototypeOf = Object.getPrototypeOf,
  toString = Object.prototype.toString,
  slice = [].slice,
  splice = [].splice,
  push = [].push,
  hasOwnProperty = {}.hasOwnProperty,
  TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/;
export class utils {
  public static isUndefined(target):target is undefined {
    return isType(target, "undefined");
  }

  public static isDefined = function (value){
    return typeof value !== 'undefined';
  }

  public static isString(target) : target is string{
    return isType(target, "string");
  }

  public static isNumber(target) : target is number{
    return isType(target, "number");
  }

  public static toInt(str): number {
    return parseInt(str, 10);
  }

  public static isNaN = Number.isNaN || function isNumberNaN(num) {
    // eslint-disable-next-line no-self-compare
    return num !== num;
  }

  public static noop = function () {

  }

  public static isObject = function (value: any) : value is Object{
    // http://jsperf.com/isobject4
    return value !== null && typeof value === 'object';
  }

  public static isBlankObject = function (value) {
    return value !== null && typeof value === 'object' && !getPrototypeOf(value);
  }

  public static isDate = function (value) : value is Date{
    return toString.call(value) === '[object Date]';
  }

  public static isArray = Array.isArray;

  public static isFunction = function (value) : value is Function{
    return typeof value === 'function';
  }

  public static isRegExp = function (value) : value is RegExp{
    return toString.call(value) === '[object RegExp]';
  }

  public static isWindow = function (obj) {
    return obj && obj.window === obj;
  }

  public static isFile = function (obj) : obj is File{
    return toString.call(obj) === '[object File]';
  }

  public static isFormData = function (obj) : obj is FormData{
    return toString.call(obj) === '[object FormData]';
  }

  public static isBlob = function (obj) {
    return toString.call(obj) === '[object Blob]';
  }

  public static isBoolean = function (value) : value is boolean{
    return typeof value === 'boolean';
  }
  public static trim = function (value) :string{
    return utils.isString(value) ? value.trim() : value;
  };

  public static isElement = function (node){
    return !!(node &&
      (node.nodeName  // We are a direct element.
        || (node.prop && node.attr && node.find)));  // We have an on and find method part of jQuery API.
  }

  public static nodeName = function (element) {
    return utils.lowercase(element.nodeName || (element[0] && element[0].nodeName));
  }

  public static lowercase = function (string){
    return utils.isString(string) ? string.toLowerCase() : string;
  };

  public static uppercase = function (string){
    return utils.isString(string) ? string.toUpperCase() : string;
  };

  public static isArrayLike = function (obj) {

    // `null`, `undefined` and `window` are not array-like
    if (obj == null || utils.isWindow(obj)) return false;

    // arrays, strings and jQuery/jqLite objects are array like
    // * jqLite is either the jQuery or jqLite constructor function
    // * we have to check the existence of jqLite first as this method is called
    //   via the forEach method when constructing the jqLite object in the first place
    if (utils.isArray(obj) || utils.isString(obj)) return true;

    // Support: iOS 8.2 (not reproducible in simulator)
    // "length" in obj used to prevent JIT error (gh-11508)
    var length = 'length' in Object(obj) && obj.length;

    // NodeList objects (with `item` method) and
    // other objects with suitable length characteristics are array-like
    return utils.isNumber(length) &&
      (length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item === 'function');

  }

  public static isTypedArray = function (value) {
    return value && utils.isNumber(value.length) && TYPED_ARRAY_REGEXP.test(toString.call(value));
  }

  public static isArrayBuffer = function (obj) {
    return toString.call(obj) === '[object ArrayBuffer]';
  }

  public static forEach = function forEach(obj, iterator, context?) {
    var key, length;
    if (obj) {
      if (utils.isFunction(obj)) {
        for (key in obj) {
          if (key !== 'prototype' && key !== 'length' && key !== 'name' && obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else if (utils.isArray(obj) || utils.isArrayLike(obj)) {
        var isPrimitive = typeof obj !== 'object';
        for (key = 0, length = obj.length; key < length; key++) {
          if (isPrimitive || key in obj) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context, obj);
      } else if (utils.isBlankObject(obj)) {
        // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
        for (key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      } else if (typeof obj.hasOwnProperty === 'function') {
        // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else {
        // Slow path for objects which do not have a method `hasOwnProperty`
        for (key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      }
    }
    return obj;
  }

  public static copy = function copy(source, destination?) {
    var stackSource = [];
    var stackDest = [];

    if (destination) {
      if (utils.isTypedArray(destination) || utils.isArrayBuffer(destination)) {
        throw new Error('Can\'t copy! TypedArray destination cannot be mutated.');
      }
      if (source === destination) {
        throw new Error('Can\'t copy! Source and destination are identical.');
      }

      // Empty the destination object
      if (utils.isArray(destination)) {
        destination.length = 0;
      } else {
        utils.forEach(destination, function (value, key) {
          if (key !== '$$hashKey') {
            delete destination[key];
          }
        });
      }

      stackSource.push(source);
      stackDest.push(destination);
      return copyRecurse(source, destination);
    }

    return copyElement(source);

    function copyRecurse(source, destination) {
      // var h = destination.$$hashKey;
      var key;
      if (utils.isArray(source)) {
        for (var i = 0, ii = source.length; i < ii; i++) {
          destination.push(copyElement(source[i]));
        }
      } else if (utils.isBlankObject(source)) {
        // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
        for (key in source) {
          destination[key] = copyElement(source[key]);
        }
      } else if (source && typeof source.hasOwnProperty === 'function') {
        // Slow path, which must rely on hasOwnProperty
        for (key in source) {
          if (source.hasOwnProperty(key)) {
            destination[key] = copyElement(source[key]);
          }
        }
      } else {
        // Slowest path --- hasOwnProperty can't be called as a method
        for (key in source) {
          if (hasOwnProperty.call(source, key)) {
            destination[key] = copyElement(source[key]);
          }
        }
      }
      // utils.setHashKey(destination, h);
      return destination;
    }

    function copyElement(source) {
      // Simple values
      if (!utils.isObject(source)) {
        return source;
      }

      // Already copied values
      var index = stackSource.indexOf(source);
      if (index !== -1) {
        return stackDest[index];
      }

      if (utils.isWindow(source)) {
        throw new Error(
          'Can\'t copy! Making copies of Window instances is not supported.');
      }

      var needsRecurse = false;
      var destination = copyType(source);

      if (destination === undefined) {
        destination = utils.isArray(source) ? [] : Object.create(getPrototypeOf(source));
        needsRecurse = true;
      }

      stackSource.push(source);
      stackDest.push(destination);

      return needsRecurse
        ? copyRecurse(source, destination)
        : destination;
    }

    function copyType(source) {
      switch (toString.call(source)) {
        case '[object Int8Array]':
        case '[object Int16Array]':
        case '[object Int32Array]':
        case '[object Float32Array]':
        case '[object Float64Array]':
        case '[object Uint8Array]':
        case '[object Uint8ClampedArray]':
        case '[object Uint16Array]':
        case '[object Uint32Array]':
          return new source.constructor(copyElement(source.buffer), source.byteOffset, source.length);

        case '[object ArrayBuffer]':
          // Support: IE10
          if (!source.slice) {
            // If we're in this case we know the environment supports ArrayBuffer
            /* eslint-disable no-undef */
            var copied = new ArrayBuffer(source.byteLength);
            new Uint8Array(copied).set(new Uint8Array(source));
            /* eslint-enable */
            return copied;
          }
          return source.slice(0);

        case '[object Boolean]':
        case '[object Number]':
        case '[object String]':
        case '[object Date]':
          return new source.constructor(source.valueOf());

        case '[object RegExp]':
          var re = new RegExp(source.source, source.toString().match(/[^/]*$/)[0]);
          re.lastIndex = source.lastIndex;
          return re;

        case '[object Blob]':
          return new source.constructor([source], {type: source.type});
      }

      if (utils.isFunction(source.cloneNode)) {
        return source.cloneNode(true);
      }
    }
  }


  public static baseExtend = function (dst, objs, deep) {
    for (var i = 0, ii = objs.length; i < ii; ++i) {
      var obj = objs[i];
      if (!utils.isObject(obj) && !utils.isFunction(obj)) continue;
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        var src = obj[key];

        if (deep && utils.isObject(src)) {
          if (utils.isDate(src)) {
            dst[key] = new Date(src.valueOf());
          } else if (utils.isRegExp(src)) {
            dst[key] = new RegExp(src);
          } else if (src.nodeName) {
            dst[key] = src.cloneNode(true);
          } else if (utils.isElement(src)) {
            dst[key] = src.clone();
          } else {
            if (!utils.isObject(dst[key])) dst[key] = utils.isArray(src) ? [] : {};
            utils.baseExtend(dst[key], [src], true);
          }
        } else {
          dst[key] = src;
        }
      }
    }
    return dst;
  }

  public static extend = function (dst,...source) {
    return utils.baseExtend(dst, slice.call(arguments, 1), false);
  }


  /**
   * 遍历一棵树的所有子节点.callback返回true就会中断
   * @param treeNode
   * @param callback
   */
  public static forEachTree(treeNode,callback){
    if(callback(treeNode)){
      return true;
    }
    //遍历子节点
    if(treeNode && treeNode.children){
      for(let child of treeNode.children){
        //只要返回true，就中断
        if(this.forEachTree(child,callback)){
          return true;
        }
      }
    }
  }

  /**
   * 转换树
   * @param tree
   * @param callback
   * @returns {any}
   */
  public static mapTree(treeNode,callback):any{
    let transform = callback(treeNode);
    let children = transform.children = [];
    //遍历子节点
    if(treeNode && treeNode.children){
      treeNode.children.forEach((child)=>{
        let transformChild = utils.mapTree(child,callback);
        transformChild && children.push(transformChild);
      });
    }
    return transform;
  }

  //a-b这种类型的字符串转换成驼峰
  public static toCamelCase(src:string,upperCaseFirstWord:boolean = true):string{
    if(!src){
      return "";
    }
    //首字母大写
    upperCaseFirstWord ? (src = src[0].toUpperCase() + src.slice(1)) : (src = src[0].toLowerCase() + src.slice(1));
    //后面驼峰
    return src.replace(/[-_]([a-z])/g,function (match,$1) {
      return $1.toUpperCase();
    })
  }

  public static equals(o1, o2) {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    // eslint-disable-next-line no-self-compare
    if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 === t2 && t1 === 'object') {
      if (utils.isArray(o1)) {
        if (!utils.isArray(o2)){
          return false;
        }
        if ((length = o1.length) === o2.length) {
          for (key = 0; key < length; key++) {
            if (!utils.equals(o1[key], o2[key])){
              return false;
            }
          }
          return true;
        }
      } else if (utils.isDate(o1)) {
        if (!utils.isDate(o2)){
          return false;
        }
        return utils.equals(o1.getTime(), o2.getTime());
      } else if (utils.isRegExp(o1)) {
        if (!utils.isRegExp(o2)){
          return false;
        }
        return o1.toString() === o2.toString();
      } else {
        if (utils.isWindow(o1) || utils.isWindow(o2) ||
          utils.isArray(o2) || utils.isDate(o2) || utils.isRegExp(o2)) return false;
        keySet = {};
        for (key in o1) {
          if (utils.isFunction(o1[key])) continue;
          if (!utils.equals(o1[key], o2[key])){
            return false;
          }
          keySet[key] = true;
        }
        for (key in o2) {
          if (!(key in keySet) &&
            utils.isDefined(o2[key]) &&
            !utils.isFunction(o2[key])){
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }

  /**
   * 判断是不是空对象,例如:{}
   * @param target
   * @returns {boolean}
   */
  public static isEmptyObject(target):boolean{
    if(!target){
      return false;
    }
    let isEmpty = true;
    for(let key in target){
      isEmpty = false;
    }
    return isEmpty;
  }

  /**
   * 判断对象是不是有效，且不是空白对象
   * @param target
   * @returns {any|boolean}
   */
  public static isNotEmptyObject(target):boolean{
    return target && !utils.isEmptyObject(target);
  }

  //获取枚举的属性
  public static getEnumKeys(target):Array<string>{
    let result = [];
    for(let key of Object.keys(target)){
      /\d+/.test(key) && result.push(key);
    }

    result.sort(function (left,right) {
      return left - right;
    });
    return result;
  }

  public static getImageSize(src:string){
    let image = new Image();
    let promise = new Promise(function (resolve,reject) {
      image.onload = function () {
        resolve(image);
      }
      image.onerror = function () {
        reject(image);
      }
    });
    image.src = src;
    return promise;
  }

  /**
   * 根据请求的地址和参数获取完整的请求地址
   */
  public static getRequestPath(url:string,params:any = {}){
    let paramArray:Array<string>;
    paramArray = Object.keys(params).map(function (key) {
      return `${key}=${params[key]}`
    })
    return paramArray.length == 0 ? url : `${url}?${paramArray.join("&")}`
  }
}
