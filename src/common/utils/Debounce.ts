/**
 * Created by 给力叔 on 2017/10/14
 * 函数节流。
 * 例子2，时间一到会强制执行：
 * let debounce = new Debounce(100);
 * debounce.handle(function(){
 *    console.log("给力叔");
 * })
 * 例子1，不会强制执行：
 * let debounce = new Debounce(100);
 * debounce.handle(function(){
 *    console.log("给力叔");
 * })
 */
export class Debounce{
  private _timeoutIndex:number; //setTimeout的序号
  private _last:number;
  private _time:number;                    //多久执行一次,单位是毫秒
  private _force:boolean = false;          //是否强制执行
  constructor(time:number = 4,force?:boolean){
    this._last = + new Date();
    this._time = time;
    this._force = force;
  }

  handle(handler:Function){
    let current;
    //强制执行
    if(this._force && (current = +new Date()) - this._last > this._time){
      this._last = current;
      handler();
      this._last = current;
    }
    //不管怎么样都会延迟的
    this._doHandle(handler);
  }
  private _doHandle(handler){
    clearTimeout(this._timeoutIndex);
    this._timeoutIndex = setTimeout(handler,this._time);
  }

  destroy(){
    clearTimeout(this._timeoutIndex);
  }
}
