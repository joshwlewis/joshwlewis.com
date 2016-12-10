# = require app/integrations/google
# = require app/models/shapes
# = require app/models/quadromper

$ ->
  container = $('#background')
  colors = ["#29B6F6", "#039BE5", "#0277BD", "#F4511E", "#D84315"]
  window.quadromper = new Quadromper(container, colors)
  romp = () =>
    window.quadromper.render()
    window.requestAnimationFrame(romp)
  romp()
