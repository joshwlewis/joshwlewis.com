Quad = function(container, color, height, width) {
  this.container = container;
  this.color = color;
  this.opacity = 0.0;
  this.growth  = 0.005;
  this.setPoints = function() {
    var points = [[0,0],[1,0],[1, 1],[0, 1]];
    var point1 = Math.floor(Math.random() * 4);
    var point2 = point1 + 1;
    if (point2 === 4) { point2 = 0; }
    var xory = point2 % 2 === 0 ? 0 : 1;
    points[point1][xory] = Math.random();
    points[point2][xory] = Math.random();
    this.points = points;
  };
  this.createCanvas = function(height, width) {
    this.canvas = $('<canvas>').prop({height: height, width: width})
                    .css({ opacity: this.opacity }).addClass('quad');
    this.container.prepend(this.canvas);
  };
  this.getX = function(n) {
    return Math.round(this.points[n][0] * this.canvas[0].width);
  };
  this.getY = function(n) {
    return Math.round(this.points[n][1] * this.canvas[0].height);
  };
  this.draw = function() {
    var ctx = this.canvas[0].getContext('2d');
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.getX(0), this.getY(0));
    for (i=3; i >= 0; i--) {
      ctx.lineTo(this.getX(i), this.getY(i));
    }
    ctx.closePath();
    ctx.fill();
  };
  this.increment = function() {
    this.opacity = this.opacity + this.growth;
    this.canvas.css({ opacity: this.opacity });
    if (this.opacity >= 1) {
      this.growth = -this.growth;
    }
  };
  this.setDims = function(height, width) {
    if (height !== this.canvas[0].height || width !== this.canvas[0].width) {
      // Changing canvas size clears it, so you have to redraw.
      this.canvas[0].width = width;
      this.canvas[0].height = height;
      this.draw();
    }
  };
  this.destroy = function() {
    this.canvas.remove();
  };
  this.setPoints();
  this.createCanvas(height, width);
  this.draw();
};

Quadromper = function(container, colors) {
  this.container = container;
  this.colors = colors;
  this.quads  = [];
  this.step   = 0;
  this.pixelRatio = window.devicePixelRatio || 1;
  this.getHeight = function() {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return  h * this.pixelRatio;
  };
  this.getWidth = function() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return w * this.pixelRatio;
  };
  this.randomColor = function() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  };
  this.buildQuad = function() {
    var quad = new Quad(this.container, this.randomColor(), this.getHeight(), this.getWidth());
    this.quads.push(quad);
    return quad;
  };
  this.render = function() {
    if (this.step % 60 === 0) { this.buildQuad(); }
    if (this.step % 120 === 0) {
      var height = this.getHeight();
      var width  = this.getWidth();
      this.quads.forEach(function(quad) {
        quad.setDims(height, width);
      });
    }
    if (this.step % 2 === 0) {
      this.quads.forEach(function(quad) {
        quad.increment();
      });
    }
    if (this.quads[0].opacity <= 0) {
      this.quads[0].destroy();
      this.quads.shift();
    }
    this.step = this.step + 1;
  };
};
