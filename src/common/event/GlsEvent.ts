/**
 * Created by 给力叔 on 2017/10/11/011.
 * 事件的基础类
 */
export class GlsEvent {
  type: string;     //事件的类型
  target: any;      //触发事件的对象
  data: any;         //附带的数据
  private _isStopped:boolean = false;   //事件是不是被停止掉了，停止掉了就不能再被抛出了

  public static LOADED:string = "loaded";

  constructor(type: string, target: any, data?: any) {
    this.type = type;
    this.target = target;
    this.data = data;
  }

  stopPropagation(){
    this._isStopped = true;
  }

  get isStopped(){
    return this._isStopped;
  }
}
