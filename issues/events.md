# [返回目录](../content.md)

## 事件模型

Windows就是基于事件驱动的操作系统，通常使用一些sdk来调用操作系统函数时，其实就是利用操作系统内部提供的钩子函数，来访问操作系统内部结构的。

浏览器端的JavaScript也是基于事件驱动实现的，常见的DOM事件的通常以on-开头，我们可以在`on-`这里写事件处理函数。再后来，发现可以得到一个dom元素后，可以为这个DOM元素绑定一些事件，通过`element.addEventListener('click', func)`;

再高级一点，开始接触到Event, CustomEvent等，还可以自己模拟事件。

### EventTarget接口

DOM的事件操作（监听和触发），都是基于EventTarget接口。不只是DOM事件，还有像浏览器内置对象XMLHttpRequest，都会有这个接口的实现

该接口有三个方法：
* addEventListener
* removeEventListener
* dispatchEvent

需要注意的是addEventListener这个函数的第三个参数: `target.addEventListener(type, listener[, useCapture]);`
useCapture是个布尔值，表示监听函数是否在捕获阶段触发，默认是false（监听函数只在冒泡阶段被触发）。

```html
<div id="dc">
	<button id="ok">点我试试！</button>
</div>
```

现在我为div和button分别添加事件
```js
var ok = document.getElementById('ok');
var dc = document.getElementById('dc');

ok.addEventListener('click', function() {
	console.log('你完了');
}, true);

dc.addEventListener('click', function() {
	console.log('你才玩完了');
}, true)
```

此时第三个参数均为true，表示事件是在捕获阶段触发，div在button外部，它的click事件会被先触发，其次才会触发button。

然而我们一般都是将第三个参数置为false，那么就会先触发button的click事件。

removeEventListener是移除事件监听
和dispatchEvent是直接触发监听函数执行

### **this指向**
在addEventListener内部，监听函数func中，this指向c触发事件的那个元素。

## 监听函数

监听函数，无非两种，一种是基于DOM的on-事件，一种是为元素直接添加事件监听函数。

## 事件传播

当一个事件发生后，它会在不同的DOM节点之间传播(）propagation),分为三个阶段：

1. 从window对象到目标元素，叫做捕获阶段
2. 在目标元素上触发，称为目标阶段
3. 从目标节点再传回window对象，称为冒泡阶段

以上面的例子继续扩展，上面的addEventListener第三个参数都是true，表示捕获阶段。再添加两个事件监听，并且设置为false。

```js
var ok = document.getElementById('ok');
var dc = document.getElementById('dc');

dc.addEventListener('click', function() {
	console.log('你才玩完了true');
}, true)
ok.addEventListener('click', function() {
	console.log('你完了true');
}, true);
ok.addEventListener('click', function() {
	console.log('你完了false');
}, false);
dc.addEventListener('click', function() {
	console.log('你才玩完了false');
}, false)
```

点击按钮会发现，四个监听函数都被执行了。原因也好理解，两个元素的捕获阶段和冒泡阶段均得到了处理。

### **事件代理**

因为事件在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，然后由父节点的监听函数统一处理多个子元素的事件。这个原来就叫事件代理(delegation)

```js
var ul = document.querySelector('ul')

ul.addEventListener('click', function(event) {
	if(event.target.tagName.toLowerCase() === 'ul') {
		// todo
	}
});
```

还有一个非常常见的场景是：将一些元素的点击事件放在body或者window对象上来统一处理，比如让某些popup元素消失，这样就可以精确的释放是点击了popup元素还是popup元素之外的body，从而来隐藏内容。

如果希望事件到某个节点为止，不再传播了，可以停止事件冒泡和传播。

```js
ok.addEventListener('click', function(event) {
	event.stopPropagation()
});
```

需要注意的是，stopPropagation只会阻止当前监听函数的传播，不会阻止div事件监听函数。如果想要不再触发那些监听函数，就可以使用stopImmediataPropagation方法

```js
ok.addEventListener('click', function(event) {
	event.stopImmediatePropagation();
})

dc.addEventListener('click', function(event) {
	// will not trigger
})
```

## Event对象

事件发生以后，会生成一个事件对象，就是我们见到的在回调函数中的e或者event参数。浏览器会原生提供一个Event对象，所有的事件都是这个对象的实例（event instanceOf Event === true）

手动生成一个Event实例

```js
var event = new Event(typeArg, eventInit);
```

typeArg： 字符串类型，表示事件的名称
eventInit: 对象，该事件的配置，它也有两个重要属性

	```js
	var ev = new Event(
		'eventName',
		{
			'bubbles': true,
			'cancelable': false
		}	
		)

	document.dispatchEvent(ev);

	```

### **event实例包含的一些属性**

1. cancelable
	事件是否可以取消，默认不能取消。如果要取消某个事件，需要在这个事件上面调用preventDefault方法，这会阻止浏览器对某种事件的默认行为。

2. defaultPrevented
	表示事件是否调用过preventDefault方法

3. currentTarget
	返回该事件当前所在的节点，即正在执行监听函数绑定在那个节点上，在事件处理函数中currentTarget等同于this。

4. target
	返回触发事件的那个节点，即事件最初发生的节点。
	对于发生在捕获阶段(true): this === e.target，他们永远都会相等
	对于发生在冒泡阶段(false): this === e.target，不一定会相等

	```js
		function hide(e){
			console.log(this === e.target);  // 有可能不是true
			e.target.style.visibility = "hidden";
		}

		// HTML代码为
		// <p id="para">Hello <em>World</em></p>
		para.addEventListener('click', hide, false);
	```

5. type
	表示事件类型，(click, mouseover, mouseleave, keyup, keydown)

5. detail
	返回一个数值，表示事件的某种信息。对于鼠标事件，表示鼠标键在某个位置按下的次数，比如dbclick事件中，detail返回的值就是2.

7. timeStamp
	返回一个毫秒事件戳，表示事件发生的时间。	

8. isTrusted
	返回一个布尔值，表示该事件是否为真是用户触发。


### **event的一些函数**

1. preventDefault()

	用于取消浏览器对当前事件的默认行为（radio的的选中）。此方法生效的前提是event的cancelable属性为true，否则不会产生任何效果。
	该方法不会阻止事件的进一步传播（使用stopPropagation）。只要在事件传播过程中，使用preventDefault方法，该事件的默认方法就不会执行。
	
	可以合理的利用这个方法，为文本输入框设置校验条件，如果用户的输入不符合条件，就无法将字符输入输入框：

	```js
	function checkIpunt(e) {
		// 只能是字母
		if(e.charCode < 97 || e.charCode > 122) {
			e.preventDefault();
		}
	}

	var input = document.getElementById('id');
	input.addEventListener('keyup', checkInput);
	```

2. event.stopPropagation()

	stopPropagation方法阻止事件在DOM中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括当前节点上新定义的事件监听函数。

	```js
	function stopEvent(e) {
		e.stopPropagation()
	}
	el.addEventListener('click', stopEvent, false);
	```

3. event.stopImmediatePropagation() 上面有介绍

## 自定义事件(IE不支持)和事件模拟

自定义事件因为可能不属于浏览器的行为范畴，所以定义后只能手动触发。

```js
var event = new Event('build')

ele.addEventListener('build', function() {})

ele.dispatchEvent(event);
```

```error
Error: Object doesn't support this action
```

IE虽然不支持去new Event操作，但是IE是有Event这个构造函数的。

### CustomEvent()

CustomEvent比Event更先进的是，它支持传入数据。需要使用CustomEvent构造函数生成自定义的事件对象。

```js
var myEvent = new CustomEvent(
	'myvent',
	{
		detail: {
			foo: 'bar'
		},
		bubbles: true,
		cancelable: false
	}
)

el.addEventListener('myevent', function(event) {
	console.log('Hello ' + event.detail.foo);
})

el.dispatchEvent(myEvent);
```

### 事件模拟

模拟触发鼠标click事件
```js
function simulateClick() {
	var event = new MouseEvent(
		'click',
		{
			bubbles: true,
			cancelable: true
		}
	)

	var cb = document.getElementById('checkbox')
	cb.dispatchEvent(event);
}
```


http://javascript.ruanyifeng.com/dom/event.html#toc1
https://leohxj.gitbooks

io/front-end-database/javascript-basic/events.html