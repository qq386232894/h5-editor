import Vue from 'vue'

Vue.config.productionTip = false
Error.stackTraceLimit = Infinity;
//修正使用es6,es7语法报错的问题
require('core-js/es6');
require('core-js/es7');
// // require all test files (files that ends with .spec.js)
// const testsContext = require.context('./specs', true, /\.spec$/)
// testsContext.keys().forEach(testsContext)

var srcSpecContext = require.context('../../src', true, /\.spec\.ts/)
srcSpecContext.keys().forEach(srcSpecContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
// const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
// srcContext.keys().forEach(srcContext)
