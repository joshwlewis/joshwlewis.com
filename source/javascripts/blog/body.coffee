# = require app/integrations/google
# = require app/models/shapes
# = require app/models/quadromper

$ ->
  canvas = $('#background')[0]
  colors = ["#29B6F6", "#039BE5", "#0277BD", "#FF5722", "#E64A19"]
  quadromper = new Quadromper(canvas, colors)
  quadromper.animate()