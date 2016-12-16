# = require app/models/shapes
# = require app/models/quadromper

$ ->
  container = document.getElementById("background");
  colors = ["#29B6F6", "#039BE5", "#0277BD", "#F4511E", "#D84315"]
  window.quadromper = new Quadromper(container, colors, 300, 6)
  window.quadromper.render()
  iteration = 0
  romp = () =>
    iteration = iteration + 1;
    window.quadromper.animate()
    window.requestAnimationFrame(romp) if iteration < 7200
  romp()
