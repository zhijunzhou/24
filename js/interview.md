# [返回目录](../content.md)

## JS基础问题

* 类型判断
	1. 原生的typeof起的作用并不是很大，通常都需要用Object.prototype.toString.call(变量)得到真实的数据类型，然后通过字符串的sclie取指定字符串
	2. [javascript判断数据类型](http://www.jianshu.com/p/a62d48152fb8)
* 作用域
	1. 需要了解变量提升、全局作用域、名字空间、局部作用域、常量. [[+more]](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014344993159773a464f34e1724700a6d5dd9e235ceb7c000)
* 引用传递
	1. [Is JavaScript a pass-by-reference or pass-by-value language?](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)
* 内存释放
	1. [如何定位 Node.js 的内存泄漏](http://taobaofed.org/blog/2016/04/15/how-to-find-memory-leak/)
	2. [JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
* [ES6新特性]

## 模块

* 模块机制
	1. [module.exports 与 exports 的区别解释](https://cnodejs.org/topic/5734017ac3e4ef7657ab1215)
	2. [深入理解node中require的原理及执行过程](http://www.jianshu.com/p/609489e8c929)
	3. [exports, require, module, __filename, __dirname几个参数的具体含义](https://nodejs.org/api/modules.html#modules_the_module_wrapper)
* 热更新
	1. [热更新js和json](http://blog.leanote.com/post/onweer/%E7%83%AD%E6%9B%B4%E6%96%B0js%E5%92%8Cjson)
	2. [Node.js Web应用代码热更新的另类思路](http://fex.baidu.com/blog/2015/05/nodejs-hot-swapping/)
		a. 如何更新模块代码
		```js
		// main.js
		function cleanCache (module) {
			var path = require.resolve(module);
			require.cache[path] = null;
		}

		setInterval(function () {
			cleanCache('./code.js');
			var code = require('./code.js');
			console.log(code);
		}, 5000);
		```
		b. 如何使用新模块处理请求

## 事件/异步

* Promise
	```js
		auto.getData().then(function (results) {
			res.send(results);
		}, next);
		// 这种写法，next函数只会处理getData中的reject时的异常情况。

		auto.getData().then(function (results) {
			res.send(results);
		}).catch(next);
		// 这种写法，catch会捕捉到在它之前的promise链上的代码抛出的异常,不仅getData，还包括then()里面。
	```

	[面试题](https://zhuanlan.zhihu.com/p/25407758)
	```js
		setTimeout(function() {
			console.log(1)
		}, 0);
		new Promise(function executor(resolve) {
			console.log(2);
			for( var i=0 ; i<10000 ; i++ ) {
				i == 9999 && resolve();
			}
			console.log(3);
		}).then(function() {
			console.log(4);
		});
		console.log(5);
	```
* Events
* 阻塞/异步
* Timers
* 并行/并发

## 进程



参考：

[饿了么前端面试如何通过饿了么 Node.js 面试](https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn)