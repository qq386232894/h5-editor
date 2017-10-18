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
  private _handler:Function;
  constructor(time:number = 4,force?:boolean){
    this._last = + new Date();
    this._time = time;
    this._force = force;
  }

  handle(handler:Function){
    let current;
    this._handler = handler;
    //强制执行
    if(this._force && (current = +new Date()) - this._last > this._time){
      this._last = current;
      handler();
      this._last = current;
    }
    //不管怎么样都会延迟的
    this._delayHandle();
  }
  //延迟执行
  private _delayHandle(){
    clearTimeout(this._timeoutIndex);
    this._timeoutIndex = setTimeout( ()=>{
      this._handler();
      this.clearTimeout();
    },this._time);
  }

  clearTimeout(){
    clearTimeout(this._timeoutIndex);
    this._timeoutIndex = -1;
  }

  //直接执行，不要延迟了
  doHandle(){
    if(this._timeoutIndex != -1){//有延迟执行的情况下，才执行
      this._handler && this._handler();
      this.clearTimeout();
    }
  }

  destroy(){
    this.clearTimeout();
  }
}
