window.addEventListener('load', function() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(e) {   
      var water = document.getElementById('water');
      var x = parseInt(e.beta, 10);
      var y = parseInt(e.gamma, 10);
      var z = parseInt(e.alpha, 10);
      
      if(x || y || z) {
        $('#angle_area').html("(x, y, z): (" + x + ", " + y + ", " + z +")");
      }
      
      if(water) {
        var prev = 0;
        var gap = x - prev;
        var transform = "";
        var transformOrigin = "top center"
        
        if (y > 0) {
          if (gap > 0) {
            transform = "rotate(-" + gap + "deg) scale(1, 1)";
          } else {
            transform = "rotate(" + gap + "deg) scale(1, 1)";
          }
        } else {
          if (gap > 0) {
            transform = "rotate(" + gap + "deg) scale(1, 1)";
          } else {
            transform = "rotate(-" + gap + "deg) scale(1, 1)";
          }
        }
        water.style.transform = transform;
        water.style.transformOrigin = transformOrigin;
      }
    }, false);
  } else if (window.OrientationEvent) {
    // todo
  } else {
    // todo
  }
})
