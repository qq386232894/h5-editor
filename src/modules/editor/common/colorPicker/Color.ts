/**
 * create by 给力叔 2017/9/29
 * 颜色的元数据,这个数据很臃肿
 */
export class Color {
  hsl: {
    h: number,
    s: number,
    l: number,
    a: number
  } = {
    "h": 255.00000000000006,
    "s": 0,
    "l": 1,
    "a": 1
  };

  hex: string = "#FFFFFF";

  rgba: {
    r: number,
    g: number,
    b: number,
    a: number
  } = {
    "r": 255,
    "g": 255,
    "b": 255,
    "a": 1
  }

  hsv: {
    h: number,
    s: number,
    v: number,
    a: number
  } = {
    "h": 255.00000000000006,
    "s": 0,
    "v": 1,
    "a": 1
  }

  a: number = 1;

  /**
   * 转换成CSS支持的rgba颜色样式
   * @param {Color} color
   * @returns {string}
   */
  public static toRGBA(color:Color){
    let rgba = color.rgba;
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
  }
}
