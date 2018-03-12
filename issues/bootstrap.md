# [返回目录](../content.md)

## Bootstrap 3

官网：[http://getbootstrap.com/](http://getbootstrap.com/)

Bootstrap 3除了常用的网格布局和一些基本的CSS样式制定后，其特有的内容又大致分为了两类：Components和Javascript。

Components就是纯用css定义出来的一些组件，而JavaScript是还包含了一些需要js结合来实现的组件。

在我们看来dropdowns感觉是js来触发的一些效果。但是之所以没有列入JavaScript，我想它在基本的效果实现上，是一定可以用一些选择器来实现的，诸如`:hover`， `:visited`，`:active`等之类的办法来达到这种动态显示内容的。

### **1. 纯css实现鼠标移入显示删除，移出时图标隐藏效果**
比如你想实现鼠标移入某一块文字区域，在右上角显示一个删除的图标就可以用css这么做：
```css
.sd-comments-container .comment-line .comment-area .comment-destroy {
  display: none;
}
.sd-comments-container .comment-line:hover .comment-destroy:after {
  display: block;
  content: 'x';
  position: absolute;
  right: -10px;
  top: -10px;
  height: 12px;
  width: 12px;
  cursor: pointer;
}
```
第一组css定义了删除图标是不可见的，当我鼠标移动到comment-line时，这个图标就被渲染出来，制定他的样式等信息就可以了。

### **2. 右侧菜单固定，且折叠项使内容超出后，自动显示滚动条(垂直)**
Tips: 让某一个div显示滚动条的办法是，首先高度必须固定，然后设定overflow的是否为scroll。这样有一个明显的缺点：无论是否超出你设定的高度，滚动条的位置已经被预留出来了，有点影响整体的美观。

所以，我想寻找一种自动显示和隐藏滚动条的方案。实现起来也是非常简单：
```html
<div class="col-lg-3 hidden-print" role="complementary" id="navbar">
  <nav id="sidebar" class="bs-docs-sidebar affix">
    ...
  </nav>
</div>
```
css的实现也是让你不敢相信自己的眼睛
```css
#navbar {
    overflow: hidden;
}
#sidebar {
    overflow: auto;
}
```
不过你只这么写，是不能打到我们的预期效果的，看看我们前面Tips，我们还需要一个高度。如果在你的场景中，高度完全已经，那么只需要在上面的css中设定两个高度就好了。然而，在我的项目中，为了更好的用户体验，如果浏览器高度发生变化`(window.on('resize'), function() {})`，则需要通过js去设定高度:
```js
var contentHeight = window.innerHeight - 129;
$('#sidebar').height(contentHeight);
$('#navbar').height(window.innerHeight);
```

### **3. 表格宽度有最大值限制，且表格列动态增加，超出最大值后自动显示滚动条(水平)**
这个其实是以前项目中一直遗留的一个问题。正好做上面第2个的内容时候，发现了这个多么美好的解决方案，所以赶紧用上。
```html
<div class="outer">
  <div class="inner">...</div>
</div>
```
其实跟上面没啥两样
```css
.outer {
    position: relative;
    overflow: hidden;
}
.inner {
    margin-left: 230px;
    overflow: auto;
}
```
因为outer是在一个col-lg-12修饰的div内部的div，所以其实宽度相当于固定了，就无需再对outer和inner设定固定的宽度。这样就更加简单的实现了我们预期的效果，而且摒弃了之前用js去计算表格的宽度，性能消耗也较大。这种堪称完美的解决方案为什么不用呢？哈哈...

[超出效果](../images/overflow.png) [未超出效果](../images/notoverflow.png)

### **4. 表格左侧第一列位置固定的实现**


### **5. 分页实现**

### **6. 背景图片铺满，且自适应各浏览器**
```css
body.ms-backgroundImage {
    background: url('img/bg_sd.jpg') no-repeat center center;
    min-height: 768px;
    background-size: cover;
}
```

