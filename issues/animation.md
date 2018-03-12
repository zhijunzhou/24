# [返回目录](../content.md)

## CSS动画

从一个初浅的知识面可知，视频都是由一帧一帧的图片构造而成，在加上与之匹配的语音就形成了一套完整的视频媒体。

CSS动画从这种角度出发，可以理解成从某一种样式配置转换成另一个样式配置的过度，也就是相当于说同样一张图片，在这个动画过程中，我可以大概指定这个动画从开始到结尾，如何来转换？速率如何？

这样就很好理解动画的两个组成部分： **描述动画的样式规则**和用于指定动画开始、结束以及中间点样式的**关键帧**。

相比于使用脚本创建动画，使用CSS动画三个主要优点：
* 使得创建动画更加容易，几乎不需要了解js的动画知识
* 动画的运行效果好，低性能的操作系统。渲染引擎会使用跳帧或者其他技术保证动画表现尽可能流畅。JS设计的动画表现欠佳，JS相当于还要操作DOM，中间可能导致一些性能损耗。CSS动画在渲染树加载前就已经加载好CSS DOM。看看Webkit浏览器的渲染引擎工作机制：
<img src="../images/webkit-dom.png" />
* 让浏览器控制动画序列，允许浏览器优化性能和效果。（降低隐藏选项卡中的动画更新频率）

参考：https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/

## 配置动画

创建动画序列，使用**animation**属性或者其子属性，来配置动画时间，市场已经其他动画细节。动画的实际表现有**@keyframes**规则实现。

### animation-delay

设置延时，从元素加载完成之后到动画序列开始执行的这段时间

### animation-direction

设置动画在每次运行完后是反向运行还是重新回到开始位置重复执行

### animation-duration

设置动画一个周期的时长

### animation-iteration-count

设置动画重复次数，可以指定infinite无限次重复动画

### animation-name

指定@keyframes描述的关键帧名称

### animation-play-state

允许暂停和恢复动画

### animation-timing-function

设置动画速度，通过建立加速度曲线，设置动画在关键帧之间是如何变化的。

### animation-fill-mode

指定动画执行前后如何为目标元素应用样式


## 使用keyframes定义动画序列

使用@keyframs，需要建立两个或两个以上的关键帧来实现。每一个关键帧都描述了动画元素在给定时间点上应该如何渲染。

from 等效于 0%
to 等效于 100%


## 实例

### 文本滑过浏览器窗口

```css
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%; 
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```