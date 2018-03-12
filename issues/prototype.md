# [返回目录](../content.md)

## javascript继承和原型链prototype

在ES2015中虽然可以已经出现了class关键字，并且可以被当作类的概念来使用。但是，class的实现机制只是一个语法糖，javascript仍然是基于prototype的。

当涉及到继承时，javascript只有一个结构：对象。每个对象都会有一个私有属性，即Prototype。它保存着可以访问另外一个对象的link。该原型对象又有自己的原型，直到到达一个它的原型为null为止。根据这种定义，null是没有prototype的，原型链的终结点就是null。

```js
function O(a, b) {
	this.a = 1;
	this.b = 2;
}

O.prototype.b = 3;
O.prototype.c = 4;

var o = new O();
console.log(o.a);
// a is own property, its value is 1

console.log(o.b);
// b is own property? its value is 2.
// the prototype also has a 'b', but it's not visited
// this is called 'property shadowing'(属性隐蔽)

console.log(o.c);
// c is not the own property
// c is the own property of o.[[Prototype]], its value is 4

console.log(o.d)
// d is not own property
// d is not the own property of o.[[Prototype]]
// o.[[Prototype]]。[[Prototype]] is null, stop searching
// no property found, return undefined

```

在js中，没有基于类的语言定义他们的形式的方法。可以以属性的形式将任何函数添加到对象中。所以，继承的function和其他属性一样(包含上面讲的属性隐蔽)

当继承的function调用时，this的指针就会指向继承对象，而不是继承的函数所在的原型对象

```js
var o = {
	a: 2,
	m: function() {
		return this.a + 1;
	}
}

console.log(o.m()); // 3
// this指向的是o，而不是m的函数原型

var p = Object.create(o);
// p是一个对象，p.__proto__是o的拷贝

p.a = 12;
// 赋值前，p.a = 2

console.log(p.m()); // 13
// p.m时，this指向p
// p继承o的m函数
// this.a即p.a，p就有了自身属性a

```

## 使用不同的方法来创建对象和生成原型链

1. 普通方法

```js
var o = {a: 1};
// o --> Object.prototype --> null

var a = ["yo", "whadup", "?"]
// a --> Array.prototype --> Object.prototype --> null

function f() {
	return 2;
}
// f --> Function.prototype --> Object.prototype --> null

```

2. 构造器创建对象（使用new操作）

```js
function Graph() {
	this.vertices = [];
	this.edges = [];
}

Graph.prototype = {
	addVertex: function(v) {
		this.vertices.push(v);
	}
}

var g = new Graph();
// g是生成的对象，自身属性有vertices和edges
// g被实例化时，g.__proto__指向了Graph.prototype
```

3. 使用Object.create

ES5引入的方法，Object.create()。使用这个方法可以创建一个对象，新对象的原型就是调用create方法时，传入的第一个参数。

```js
var a = {a: 1};
//a --> Object.prototype --> null

var b = Object.create(a);
// b -->a ->Object.prototype --> null

var c = Object.create(b);
// c --> b --> a -->Object.prototype --> null

var d = Object.create(null);
// d --> null

console.log(d.hasOwnProperty); // undefined， d没有继承Object.prototype

```

4. 使用class关键字

ES6 引入的新关键字，相关联的还有class, constructor, static, extends, super

```js
"use strict";

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
```

那么性能又会如何呢？
* 通过class这种方式定义类的话，在原型链上查找比较耗时。试图访问不存在的属性时，会遍历整个原型链。
* 遍历对象的属性时，原型链上的每个可枚举属性都会被枚举出来
* 检测对象的属性时定义在自身上还是在原型链上，有必要使用**hasOwnProperty**方法，所有继承自Object.prototype的对象都会包含这个方法
 
>hasOwnProperty方法是js中唯一个只涉及对象自身属性而不会遍历原型链的方法。仅仅通过判断值是否为undefined不足以检测一个属性是否存在。是因为一个属性可能存在而其值恰好为undefined。

```js
function A(a) {
	this.varA = a;
}

A.prototype = {
	varA: null,
	doSomething: function() {

	}
}

function B(a, b) {
	A.call(this, a);
	this.varB = b;
}

B.prototype = Object.create(A.prototype, {
	varB: {
		value: null,
		enumerable: true,
		configurable: true,
		writable: true
	},
	doSomething: {
		value: function() {
			A.prototype.doSomething.apply(this, arguments);
		},
		enumrable: true,
		configurable: true,
		writable: true
	}
});

B.prototype.constructor = B;

var b = new B();
// b --> B.prototype --> A.prototype --> Object.prototype --> null
b.doSomething();

```

当这样
```js
// 对原型对象的引用会复制到新实例内部的__proto__属性中。
var a1 = new A();
// 当内存中创建对象后，并在运行this绑定到函数A()之前，首先会做下面一步操作
// a1.__proto__ = A.prototype
// 当你访问一个a1.yourProp时，js会首先检查它们是否直接存在于该对象中，如果没有找到
// 就会再到a1.__proto__中继续查找。也就是说，在原型上定义的元素会被所有实例共享，所以
// 共享的东西是可以被修改的。

a1.doSomething()
// a1.doSomething会指向Object.getPropertyOf(a1).doSomething，就是在
// A.prototype中定义的doSomething的内容

// prototype是用于类型的，而Object.getPropertyOf()是用于实例的(instances)，二者
// 功能一致

// __proto__看起来就像递归引用，如a1.doSomething，Object.getPrototypeOf(a1).doSomething, 
// Object.getPrototypeOf(Object.getPrototypeOf(a1)).doSomething，知道doSomething之歌属
// 性或者Object.getPrototypeOf返回null

// 因此，当你执行
var o = new Foo();

// js实际执行的是
var o = new Object();
o.__proto__ = Foo.prototype;
Foo.call(o);

// 当你调用Foo的一个属性时。它会按照这样的逻辑来检查
// 首先，检查Foo的私有属性中是否有定义，如果没有查找Object.getPrototypeOf(o).someProp
// 如果仍然没有，他会继续查找Object.getPrototypeOf(Object.getPrototypeOf(o)).someProp
// 直到找到这个属性，或者到了原型的终结点Object.getPrototypeOf()返回null

```




**简单理解prototype的作用：所有实例对象需要共享的属性和方法都放在prototype对象中。那些不需要共享的属性和方法，就放在构造函数中。**

```js

function Retangle(h, w) {
	this.name = name;
	this.h = h;
	this.w = w;
}

A.prototype.area = function() {
	return this.h * this.w;
}
```

矩形的长和宽认为是私有属性，然后计算面积的话，所有的矩形都可以使用这个方法，因此设为共享的，就可以把他放在prototype上。