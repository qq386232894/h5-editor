/**
 * Created by 给力叔 on 2017/9/18
 * 装饰者模式,给ClientRect拓展出centerX,centerY.让top,left,width,height变成可写的.
 */
export class Rect {
  _rect: { top: number, left: number, width: number, height: number };

  constructor(top: number | ClientRect, left?: number, width?: number, height?: number) {
    if (top instanceof ClientRect) {
      let rect = top;
      this._rect = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      } as any;
    } else {
      this._rect = {
        top: top,
        left: left,
        width: width,
        height: height
      } as any;
    }
  }

  get top() {
    return this._rect.top;
  }

  set top(value) {
    this._rect.top = value;
  }

  get left() {
    return this._rect.left;
  }

  set left(value) {
    this._rect.left = value;
  }

  get width() {
    return this._rect.width;
  }

  set width(value) {
    this._rect.width = value;
  }

  get height() {
    return this._rect.height;
  }

  set height(value) {
    this._rect.height = value;
  }

  get right() {
    return this._rect.left + this._rect.width;
  }

  get bottom() {
    return this._rect.top + this._rect.height;
  }

  get centerX() {
    return (this.left + this.right) / 2;
  }

  get centerY() {
    return (this.top + this.bottom) / 2;
  }
}
