# [返回目录](../content.md)

## 变量声明

变量的声明，无论发生在何处，都会在代码执行前处理。使用var声明的变量的范围是当前的执行上下文（可以是一个封闭的函数，也可以是声明为任何函数外的变量）。如果重新声明一个javascript变量，它的值也不会丢失。

有时候，我们会犯这样一个错误，给一个没有任何修饰的变量赋值，然后这个变量最后会出现全局污染的现象。因为这样会隐式地创建一个全局变量（在浏览器端，就会挂载在window对象中）

声明过的变量和未声明的变量之间的差异：

1. 声明的变量只在它的上下文中有效。未声明的变量始终是全局变量。

```js
function x() {
	y = 1; // Throws a ReferenceError in strict mode
	var z = 2;
}

x();

console.log(y);
console.log(z); // z只能在function x的作用域内才有效

```

2. 声明的变量会在执行任何代码前创建。未声明的变量在执行代码赋值前不存在，也不存在变量提升。

```js
console.log(a); // Throws a RefrenceError
console.log('still going...'); // Never executes
```

```js
var a;
console.log(a); // undefined
console.log('still going...'); // logs 'still going...'
```

3. 声明的变量在其上下文(function or global)中是不可配置属性。未声明变量相反。

```js
var a = 1;
b = 2;

delete this.a;
delete this.b;

console.log(a, b);
```

未声明的变量总是会带来很多不容易发现的问题，所以官方推荐：无论变量是否为全局变量还是function内部变量，都使用声明变量的方式。

## 变量声明前置

因为变量声明始终会在代码执行前完成，声明一个变量在任何位置等价于在该作用域的头部。也就是说，可以先使用变量，之后再来声明。我们把这种行为叫做变量声明前置。这个过程是浏览器解析代码的时候帮我们做掉，也有一些类似npm plugins也可以预处理js代码，也可能帮我们提前做好。

虽然，浏览器帮你做了这一层处理，让js的变量声明更灵活，容错性更高。但是这样方式不利于代码的理解，也不太美观。

需要特别注意的是：虽然变量声明前置会影响变量声明，但是并不会影响它的初始化值。

```js
function do_something() {
	console.log(bar); // undefined
	var bar = 111;
	console.log(bar); // 111
}

function do_something() {
	var bar;
	console.log(bar); //undefined
	bar = 111;
	console.log(bar); // 111
}
```

声明和初始化两个值

```js
var a = 0, b = 0;
```

```js
var a = 'A';
var b = a;

// Equivalent to:
var a, b = a = 'A';
```

可是，跟顺序也是有关系的

```js
var x = y, y = 'A';
console.log(x + y); // undefinedA
```

再来看看一些特殊的例子：

### Example 1:

```js
var x = 0;

function f() {
	var x = y = 1;
}

f();

console.log(x, y);
```

上面这段代码在strict mode下会抛出y是未声明的异常。因为在f外，没有地方生命y，也没有地方给y赋值。而f内部的y只在f的作用域内可访问。所以就算x的值在f被改了，也是在f内有效，不会影响外部的x。

在非严格模式下，打印出来(0, 1)，这个时候的y可能被看作是全局变量了。


### Example 2:

```js
var x = 0;

console.log(typeof z);

function a() {
	var y = 2;

	console.log(x, y); //0 2

	function b() {
		x = 3;
		y = 4;
		z = 5;
	}

	b();
	console.log(x, y, z); // 3 4 5
}


a();
console.log(x, z); // 3 5
console.log(typeof y); // undefined
```

[w3schools](https://www.w3schools.com/js/js_hoisting.asp)

[var MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)

[function MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)

除了变量声明前置外，function声明也会自动前置

## function声明

```js
hoisted(); // foo

function hoisted() {
	console.log('foo');
}
```

```js
notHoisted(); // TypeError: notHoisted is not a function

// function expression
var notHoisted = function() {
	console.log('bar');
}
```