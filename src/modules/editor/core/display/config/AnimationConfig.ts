/**
 * Created by 给力叔 on 2017/9/8.
 * 动画的配置
 */
export class AnimationConfig {
  animationType: string;    //播放哪个动画啊
  duration: number = 1;      //播放的时间长度,单位是秒
  delay: number = 0;          //延迟多久播放啊,单位是秒
  time: number = 1;           //播放次数
  loop: boolean = false;     //循环播放吗
}
