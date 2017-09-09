/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponent} from "./DisplayComponent";
import {DisplayComponentContainer} from "./DisplayComponentContainer";
describe('DisplayComponentContainer', () => {
  let child = new DisplayComponent();
  let parent = new DisplayComponentContainer();
  it('DisplayComponentContainer.addChild', () => {
    expect(parent.addChild(child)).equals(true);

    //不能自己添加自己
    expect(function () {
      parent.addChild(parent)
    }).throw();

    //不能重复添加
    expect(function () {
      parent.addChild(child)
    }).throw();
  })

  it("DisplayComponentContainer.getChildAt",()=>{
    expect(parent.getChildAt(0)).equals(child);

    //不能超出范围
    expect( function(){ parent.getChildAt(10); } ).throw("获取的位置超出范围");

    expect( function(){ parent.getChildAt(-1); } ).throw("获取的位置超出范围");
  });

  it('DisplayComponentContainer.hasChild', () => {
    expect(parent.hasChild(child)).equals(true);
  })

  it("DisplayComponentContainer.numChildrens",()=>{
    expect(parent.numChildrens).equals(1);
  });

  it("DisplayComponentContainer.removeChild",()=>{
    expect(parent.removeChild(child)).equals(true);

    expect(parent.numChildrens).equals(0);

    expect(parent.removeChild(child)).equals(false);

    expect(function () {
      parent.removeChild(null)
    }).throw();
  });

  it('DisplayComponentContainer.addChildAt', () => {
    expect(function () {
      parent.addChildAt(child,-1)
    }).throw();

    expect(function () {
      parent.addChildAt(child,this.numChildrens + 1)
    }).throw();

    expect(parent.addChildAt(child,0)).equals(true);

    expect(parent.hasChild(child)).equals(true);
  })
})
