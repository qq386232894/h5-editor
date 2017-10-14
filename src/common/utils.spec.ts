/**
 * Created by 黎祥发 on 2017/1/22.
 * utils的单元测试
 */
import {utils} from './utils';

describe('utils', () => {
  it('utils.isArray', () => {
    expect(utils.isArray([])).toBe(true);
    expect(utils.isArray({})).toBe(false);
    expect(utils.isArray(1)).toBe(false);
    expect(utils.isArray("")).toBe(false);
    expect(utils.isArray(true)).toBe(false);
    expect(utils.isArray(undefined)).toBe(false);
    expect(utils.isArray(null)).toBe(false);
  });

  it("utils.isNumber",()=>{
    expect(utils.isNumber(1)).toBe(true);
    expect(utils.isNumber("")).toBe(false);
    expect(utils.isNumber(true)).toBe(false);
    expect(utils.isNumber(null)).toBe(false);
    expect(utils.isNumber(undefined)).toBe(false);
  });


  it("utils.isDefined",()=>{
    expect(utils.isDefined(1)).toBe(true);
    expect(utils.isDefined("")).toBe(true);
    expect(utils.isDefined(true)).toBe(true);
    expect(utils.isDefined(null)).toBe(true);
    expect(utils.isDefined(undefined)).toBe(false);
  });

  it("utils.isUndefined",()=>{
    expect(utils.isUndefined(1)).toBe(false);
    expect(utils.isUndefined("")).toBe(false);
    expect(utils.isUndefined(true)).toBe(false);
    expect(utils.isUndefined(null)).toBe(false);
    expect(utils.isUndefined(undefined)).toBe(true);
  });

  it("utils.isString",()=>{
    expect(utils.isString(1)).toBe(false);
    expect(utils.isString("")).toBe(true);
    expect(utils.isString(true)).toBe(false);
    expect(utils.isString(null)).toBe(false);
    expect(utils.isString(undefined)).toBe(false);
  });

  it("utils.toInt",()=>{
    expect(utils.toInt(1)).toBe(1);
    expect(utils.toInt("10")).toBe(10);
    expect(utils.toInt("-1")).toBe(-1);
    expect(utils.toInt("10.5")).toBe(10);
  });

  it("utils.isNaN",()=>{
    expect(utils.isNaN(Number.NaN)).toBe(true);
    expect(utils.isNaN(1)).toBe(false);
  });

  it("utils.isObject",()=>{
    expect(utils.isObject({})).toBe(true);
    expect(utils.isObject(null)).toBe(false);
    expect(utils.isObject(undefined)).toBe(false);
    expect(utils.isObject(1)).toBe(false);
    expect(utils.isObject(true)).toBe(false);
    expect(utils.isObject("")).toBe(false);
  });

  it("utils.isBlankObject",()=>{
    function test(){

    }
    var t = new test();
    expect(utils.isBlankObject({})).toBe(false);
    expect(utils.isBlankObject(t)).toBe(false);
  });

  it("utils.isDate",function () {
    expect(utils.isDate(new Date())).toBe(true);
    expect(utils.isDate({})).toBe(false);
  });

  it("utils.isWindow",function () {
    expect(utils.isWindow(window)).toBe(true);
    expect(utils.isWindow({})).toBe(false);
  })


  it("utils.lowercase",function () {
    expect(utils.lowercase("Aa")).toBe("aa");
  })

  it("utils.uppercase",function () {
    expect(utils.uppercase("aa")).toBe("AA");
  });

  it("utils.copy",function () {
    var a = utils.copy({name:{a:1}},{});
    expect(a.name.a).toBe(1);
  });


  it("utils.extend",function () {
    var a = utils.extend({},{name:1},{b:{k:2}});
    expect(a.name).toBe(1);
    expect(a.b.k).toBe(2);
  });

  it("utils.isBoolean",()=>{
    expect(utils.isBoolean(true)).toBe(true);
    expect(utils.isBoolean(false)).toBe(true);
    expect(utils.isBoolean(undefined)).toBe(false);
    expect(utils.isBoolean(1)).toBe(false);
    expect(utils.isBoolean("")).toBe(false);
    expect(utils.isBoolean(null)).toBe(false);
  });

  it("utils.isRegExp",()=>{
    expect(utils.isRegExp(/a/)).toBe(true);
    expect(utils.isRegExp(false)).toBe(false);
  });

  it("utils.toCamelCase",()=>{
    expect(utils.toCamelCase("")).toBe("");
    expect(utils.toCamelCase("a-b")).toBe("AB");
    expect(utils.toCamelCase("ab")).toBe("Ab");
  });

  it("utils.equals",()=>{
    let o1 : any = {};
    let o2 : any = {};
    expect(utils.equals(o1,o2)).toBe(true);

    o1.name = 1;
    expect(utils.equals(o1,o2)).toBe(false);

    o2.name = 1;
    expect(utils.equals(o1,o2)).toBe(true);
  })

  it("utils.isEmptyObject",()=>{
    expect(utils.isEmptyObject({})).toBe(true);
    expect(utils.isEmptyObject({name:1})).toBe(false);
    expect(utils.isEmptyObject(null)).toBe(false);
  });

  it("utils.getRequestPath",()=>{
    expect(utils.getRequestPath("/getlishu")).toBe("/getlishu");
    expect(utils.getRequestPath("/getlishu",{name:1})).toBe("/getlishu?name=1");
  });
});
