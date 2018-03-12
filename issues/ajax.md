# [返回目录](../content.md)

## ajax系列

AJAX = Asynchronous Javascript And XML

ajax带来的好处
1. Update a web page without reloading the page
2. Request data from a server - after the page has loaded
3. Receive data from a server - after the page has loaded
4. Send data to a server - in the background

原生实现方式

```js
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
	if(this.readyState === 4 && this.status === 200) {
		document.getElementById('demo').innerHTML = this.responseText;
	}

	xhttp.open('GET', 'ajax_info.txt', true);
	xhttp.send();
}
```

[jquery ajax api](http://api.jquery.com/jquery.ajax/)： 一般项目用的比较多，使用简单，丰富的参数支持，不过使用不同的版本需要注意查看文档后再使用。

[Fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)：比较新的ES6 API，IE浏览器不支持

[request-promise](https://github.com/request/request-promise)：比较好用的前后端通用的ajax promise

[axios](https://github.com/mzabriskie/axios)：除了有promise规范的支持，还可以在请求发送前，发送时，接收到数据前，接收到数据后做各种拦截器，应用场景比较多：可以做一些通用的权限管理，错误处理等。

[bluebird](https://github.com/petkaantonov/bluebird)：用的少，但是性能比较高，仅次于回调的方式，很多开源库依赖于它。

实现ajax方式的库非常多，自己可以量体裁衣，找到适合自己项目的。通常这些库的使用方式都非常简单，除此之外，我们需要了解一下http的状态码，虽然属于http的支持范畴。

w3的针对状态码的[规范说明](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

通常前端需要处理的一些状态码
2xx Success
 200 OK
 204 No Content
3xx Redirection
 304 Not Modified
4xx Client Error
 400 Bad Request：一般是前端的请求参数有误，后端在处理时不能接受这种错误，从而抛出400

 401 Unauthorized: 后端的请求是带有授权处理的，前端没有传递正确的凭据从而导致未授权错误(错误的用户名或密码)

 403 Forbidden：与401不同的是，你是通过了授权，但是你请求的资源服务器不让你访问，就是访问受限(服务端的文件，数据等资源)

 404 Not Found：要访问的资源不存在，可能是请求的method不对，或者服务端不存在该资源等都有可能出现404

 408 Request Timeout：请求超时，一般可以设定一个请求的超时时间，一些库也有自己默认的超时时间，如果超出这个阈值，就是出现408。

 409 Conflict：一般是用于数据的写保护处理启用的错误处理。可以巧妙的使用http headers中的eTag来作为冲突处理的凭据。

5xx Server Error
 500 Internal Server Error：服务器端的错误。可能性比较多，但是一般导致的原因是，服务器端没有处理到某种边界值。或者这种错误没有被错误处理函数正确的捕获到。

 >除了上面的200-500的状态码，其实还有一种状态码0，但是并未加入的w3规范中，而出现0的情况，一般是请求还未到达服务器端，或者在浏览器端请求已经被某种错误所终止。下面列出一些可能遇到的情况：
 1. xhr.status === 0 && xhr.statusText === "abort"（请求是可能被浏览器端识别为重复的请求而被中断的）
 2. xhr.status === 0 && textStatus === 'error' （曾经chrome57升级到58后，遇到自签名的证书错误）