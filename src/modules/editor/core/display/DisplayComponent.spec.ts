/**
 *  create by 给力叔 2017/10/3
 **/
import {DisplayComponent} from "./DisplayComponent";
import {AnimationConfig} from "./config/AnimationConfig";

describe('DisplayComponent', () => {
  document.body.innerHTML = '<div id="test"></div>'
  let displayComponent = new DisplayComponent();
  displayComponent.element = document.getElementById("test");
  it('#isAnimationConfigValid', () => {
    let animationConfig = new AnimationConfig();
    expect(displayComponent.isAnimationConfigValid(animationConfig)).toBeFalsy();
    animationConfig.animationType = "bounce";
    animationConfig.duration = 3;
    expect(displayComponent.isAnimationConfigValid(animationConfig)).toBeTruthy();
  });

  it("#playNext",function () {
    let animationConfig = new AnimationConfig();
    animationConfig.animationType = "bounce";
    animationConfig.duration = 3;
    displayComponent.props.animationConfigs.push(animationConfig);
    expect(displayComponent.playNext()).toBeTruthy();
  })
});
