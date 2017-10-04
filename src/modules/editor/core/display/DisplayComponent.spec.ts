/**
 *  create by 给力叔 2017/10/3
 **/
import {DisplayComponent} from "./DisplayComponent";
import {AnimationConfig} from "./config/AnimationConfig";

describe('DisplayComponent', () => {
  let displayComponent = new DisplayComponent();
  it('#isAnimationConfigValid', () => {
    let animationConfig = new AnimationConfig();
    expect(displayComponent.isAnimationConfigValid(animationConfig)).toBeFalsy();
    animationConfig.animationType = "bounce";
    animationConfig.duration = 3;
    expect(displayComponent.isAnimationConfigValid(animationConfig)).toBeTruthy();
  });

  it("#playNext",function () {
    expect(displayComponent.playNext()).toBeTruthy();
  })
});
