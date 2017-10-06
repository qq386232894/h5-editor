/**
 * create by 给力叔 2017/9/27
 * 封装拖拽的业务方法
 */
import {IDragableOptions} from "./IDragableOptions";
import {utils} from "../../../../common/utils";
import interact from 'interactjs'
import {IDraggableResult} from "../dragable/IDraggableResult";

export class Draggable {
  _options: IDragableOptions;
  _interact: any;
  _currentX = 0;
  _currentY = 0;
  _isDragging: boolean = false;

  constructor(options: IDragableOptions) {
    options = options || {} as any;
    this._options = options;

    let allowForm = options.allowForm ? utils.isString(options.allowForm) ? "#" + options.allowForm : options.allowForm : undefined,
      el = options.target,
      autoScroll = options.autoScroll;
    this._interact = interact(el, {
      allowForm: allowForm,
      autoScroll: autoScroll
    })
      .draggable({
        // 保持组件在父节点里面
        restrict: {
          restriction: "parent",
          elementRect: options.elementRect
        },
        onmove: (event) => {
          if (options.customMove) {
            options.customMove(event, this);
          } else {
            // 算出拖拽位置
            var
              x = this._currentX + event.dx,
              y = this._currentY + event.dy;

            this.setPosition(x, y);
          }
          options.onMove && options.onMove(this.getDragResult(event));
        },
        onend: (event) => {
          this._isDragging = false;
          options.onEnd && options.onEnd(this.getDragResult(event));
        },
        onstart: (event) => {
          this._isDragging = true;
          options.onStart && options.onStart(this.getDragResult(event));
        }
      });
  }

  get target() {
    return this._options.target;
  }

  get currentX() {
    return this._currentX;
  }

  get currentY() {
    return this._currentY;
  }

  /**
   * 是不是正在拖拽中啊
   * @returns {boolean}
   */
  get isDragging(): boolean {
    return this._isDragging;
  }

  getDragResult(event): IDraggableResult {
    return {event: event, position: {x: this._currentX, y: this._currentY}, draggable: this}
  }

  setPosition(x: number, y: number, offsetX: number = 0, offsetY: number = 0) {
    let target = this._options.target;
    // 更新元素的位置
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + (x + offsetX) + 'px, ' + (y + offsetY) + 'px)';

    // 记录位置,不记录就拖拽不了
    this._currentX = x;
    this._currentY = y;
  }

  getPosition() {
    return {x: this._currentX, y: this._currentY};
  }


  destroy() {
    this._interact.unset();
  }
}
