$(function() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(e) {   
      var water = document.getElementById('animation');
      var xAngle = parseInt(e.beta, 10);
      var yAngle = parseInt(e.gamma, 10);
      var zAngle = parseInt(e.alpha, 10);
      
      if(xAngle || yAngle || zAngle) {
        $('#angle_area').html("(x, y, z): (" + xAngle + ", " + yAngle + ", " + zAngle +")");
      }
      
      if(water) {
        water.style.transform = "rotate(-" + xAngle + "deg) scale(2, 1)";
        water.style.transformOrigin = "top center";
      }
    }, false);
  } else if (window.OrientationEvent) {
    // todo
  } else {
    // todo
  }
})
