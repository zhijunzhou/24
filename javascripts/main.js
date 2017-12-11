console.log('This would be the main JS file.');
$(function() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(e) {
      // 我们从事件“e”中获取角度值并转化成弧度值。
      leftRightAngle = e.gamma;
      frontBackAngle = e.beta;
      zAngle = e.alpha
      if(leftRightAngle || frontBackAngle) {
        $('#angle_area').html("(x, y, z): (" + frontBackAngle + ", " + leftRightAngle + ", " + zAngle +")");
      } 
        if(leftRightAngle>45||leftRightAngle<-45){
                
        }
    }, false);
  } else if (window.OrientationEvent) { //另一个选项是Mozilla版本同样的东西
      window.addEventListener('MozOrientation', function(e) {
        //在这里将长度值当做一个单位，并转换成角度值，看起来运行的不错。
        leftRightAngle = e.x * Math.PI/2;
        frontBackAngle = e.y * Math.PI/2;
      }, false);
  } else {
      // 自然地，没有浏览器支持的大多数人会获取这个。
  alert(2222)
  }
})
