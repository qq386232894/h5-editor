/**
 * create by 给力叔 2017/9/13
 */
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'core-js/es7/array';
import 'core-js/es7/promise';
import './PolyfillClassList';
import 'babel-polyfill'
if (!("classList" in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, 'classList', {
    get: function() {
      var self = this;
      function update(fn) {
        return function(value) {
          var classes = self.className.split(/\s+/g),
            index = classes.indexOf(value);

          fn(classes, index, value);
          self.className = classes.join(" ");
        }
      }

      return {
        add: update(function(classes, index, value) {
          if (!~index) classes.push(value);
        }),

        remove: update(function(classes, index) {
          if (~index) classes.splice(index, 1);
        }),

        toggle: update(function(classes, index, value) {
          if (~index)
            classes.splice(index, 1);
          else
            classes.push(value);
        }),

        contains: function(value) {
          return !!~self.className.split(/\s+/g).indexOf(value);
        },

        item: function(i) {
          return self.className.split(/\s+/g)[i] || null;
        }
      };
    }
  });
}
export const Polyfills = {

}
