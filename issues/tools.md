# [返回目录](../content.md)

## 一、常用function汇总

### 1. 单页面中通过window.history动态修改地址栏URL
```javascript
function ensureUrl(sid, opptyId) {
  var queryString = "?sid=" + sid + "&OpptyID=" + opptyId + "#top";
  history.replaceState(location.href + queryString, "section-name", queryString);
}
```
### 2. 获取URL地址栏指定参数的值
```javascript
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
```

### 3. 产生GUID算法
```javascript
function newGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
```

###  4. 获取文件名（除去后缀）
```javascript
function extractFileName(path) {
  //http://stackoverflow.com/questions/20537696/remember-and-repopulate-file-input
  if (path.substr(0, 12) == "C:\\fakepath\\")
    return path.substr(12); // modern browser
  var x;
  x = path.lastIndexOf('/');
  if (x >= 0) // Unix-based path
    return path.substr(x + 1);
  x = path.lastIndexOf('\\');
  if (x >= 0) // Windows-based path
    return path.substr(x + 1);
  return path; // just the filename
}
```

### 5. 获取文件名后缀
```javascript
function extractFileExtenionName(path) {
  var x;
  x = path.lastIndexOf('.');
  if (x >= 0) {
    return path.substr(x + 1);
  } else {
    return '';
  }
}
```

### 6. 深度比较两个json对象的算法
```javascript
function compareJson(obj1, obj2) {
  if (obj1 === null && obj2 === null) return true;
  if (obj1 === undefined && obj2 === undefined) return true;
  if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
    return true;
  }
  return compare(obj1, obj2);
}

function compare(obj1, obj2) {
  if (typeof obj1 === "string" && typeof obj2 === "string") {
    if (obj1 === obj2) {
      return true;
    }
    return false;
  }
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    var count1 = propertyLength(obj1);
    var count2 = propertyLength(obj2);
    if (count1 == count2) {
      for (var ob in obj1) {
        if (obj1.hasOwnProperty(ob) && obj2.hasOwnProperty(ob)) {

          if (obj1[ob] == null && obj2[ob] == null) { // extra compare
            continue;
          }

          if (obj1[ob] && obj1[ob].constructor == Array && obj2[ob] && obj2[ob].constructor == Array) {// if property is an array
            if (!compareArray(obj1[ob], obj2[ob])) {
              return false;
            }
          }
          else if (typeof obj1[ob] === "string" && typeof obj2[ob] === "string") { // just property
            if (obj1[ob] !== obj2[ob]) {
              return false;
            }
          }
          else if (typeof obj1[ob] === "object" && typeof obj2[ob] === "object") { // property is an object
            if (!compareJson(obj1[ob], obj2[ob])) {
              return false;
            }
          }
          else {
            if (obj1[ob] != obj2[ob])
              return false;
          }
        }
        else {
          return false;
        }
      }
    }
    else {
      return false;
    }
  }
  return true;
}

function propertyLength(obj) {
  var count = 0;
  if (obj && typeof obj === "object") {
    for (var ooo in obj) {
      if (obj.hasOwnProperty(ooo)) {
        count++;
      }
    }
    return count;
  } else {
    return null;
  }
}

function compareArray(array1, array2) {
  if ((array1 && typeof array1 === "object" && array1.constructor === Array) && (array2 && typeof array2 === "object" && array2.constructor === Array)) {
    if (array1.length == array2.length) {
      for (var i = 0; i < array1.length; i++) {
        var ggg = compareJson(array1[i], array2[i]);

        if (!ggg) {
          return false;
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
  return true;
}
```

### 7. 通过路径获取对象
```javascript
function getObjectByPath(o, s) {
  //http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (o != null) {
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
  }
  return o;
}
```

```javascript
console.log('预留部分')
```