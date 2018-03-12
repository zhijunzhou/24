# [返回目录](../content.md)

## 三、windows API实战

### 1. window.onpopstate = self.navChanged;
```js
window.onpopstate = self.navChanged;
self.navChanged = function (event) {
	if ((self.sid() !== appUtility.getUrlParameter('sid'))) {
		self.jump(appUtility.getUrlParameter('sid'), true);
	}
}
```
参考: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate

>window.onpopstate是popstate事件在window对象上的事件处理程序。
因为正好在我们项目中用到了history.replaceState(也可以用history.pushState)来修改地址栏的url值，同时不会让页面刷新。

>onpopstate顾名思义，监听popstate的变化的，也就是history在执行上面的每一个操作将会被记录在对象state中。但是他们做的操作不会被onpopstate监听到。它只监听浏览器的某些行为。

>比如在我们的项目场景下，因为之前使用的pushState来修改url，所以浏览器的前进，后退按钮点击时，URL上的变化就是按照pushState的顺序来变化。重写window.onpopstate在逻辑上可以让浏览器的前进和后退按钮页也可以工作在单页面中，但是实际情况并不乐观。

>而后面之所以选用replaceState是因为不想用户在点击浏览器的前进或者后退按钮感到困扰。（我们已经在页面内部实现了一套前进和后退的功能）。replaceState不会记录state变化，除非在当前页是打开一个新的链接。这时，在我们的页面中做了一些保存前进和后退的操作后，再去点击浏览器后退按钮，将会回到之前的母页面。那我们对window.onpopstate的重写就完全失效。

### 2. localStorage和sessionStorage
	特性  | localStorage | SessionStorage
	---   | 	---		    |	--- 
 生命周期  | 不会主动失效，除非被手动clear | 浏览器或者tab关闭后，session失效。Chrome中,不同标签页不会共享；IE中，如果是前一个tab上右键打开新的tab，则sesssion共享。手动清理。

两者都只能存储字符串，如果将一个js对象存储前，注意用JSON.stringify(jsObj)序列化。如果要取出，且要解析成js对象，则用JSON.parse(str)反序列化。

应用场景：
> 1. 缓存用户数据(localStorage和sessionStorage均可，看项目需要)（如邮箱，用户名等常用信息）
> 2. 存储用户的一些临时验证数据，同时又不会与系统的其他用户之间产生交互(根据两者的生命周期不同，组合使用，将会提高用户体验)
> 3. 存储用户的查询视图，而且视图无需共享，每次容量很小，就可以选择用localStorage存储。下次用户打开页面将会按照保存的查询视图去后端直接取数据，再次提高用户体验。

参考资料
>1. [各浏览器容量上限](http://dev-test.nemikor.com/web-storage/support-test/)
>2. [兼容性参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

案例分享：[localStorage和sessionStorage结合使用的案例](./attention.md)