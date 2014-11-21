function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ];
  }
}
Quad = function(color) {
  this.points = function() {
    var points = [[0,0],[1,0],[1, 1],[0, 1]];
    var point1 = Math.floor(Math.random() * 4);
    var point2;
    if (Math.random() > 0.5) {
      point2 = point1 === 3 ? 0 : point1 + 1;
    } else {
      point2 = point1 === 0 ? 3 : point1 - 1;
    }
    var xory = Math.max(point1, point2) % 2 === 0 ? 0 : 1;

    points[point1][xory] = Math.random();
    points[point2][xory] = Math.random();
    return points;
  }();
  this.color  = color;
  this.fill = function () {
    return 'rgba(' + color.join(',') + ',' + this.opacity + ')';
  };
  this.opacity = 0.0;
  this.growth  = 0.0025;
  this.increment = function() {
    this.opacity = this.opacity + this.growth;
    if (this.opacity >= 1) {
      this.growth = -this.growth;
    }
  };
};

Quadromper = function(canvas, colors) {
  this.canvas = canvas;
  this.colors = function(hexes) {
    return hexes.map(function(hex) {
      return hexToRgb(hex);
    });
  }(colors);
  this.quads  = [];
  this.step   = 0;
  this.setDims = function() {
    pixelRatio = window.devicePixelRatio || 1;
    this.canvas.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * pixelRatio;
    this.canvas.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * pixelRatio;
  };
  this.getHeight = function() {
    return this.canvas.height;
  };
  this.getWidth = function () {
    return this.canvas.width;
  };
  this.randomColor = function() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  };
  this.getContext = function() {
    return this.canvas.getContext('2d');
  };
  this.buildQuad = function() {
    var quad = new Quad(this.randomColor());
    this.quads.push(quad);
    return quad;
  };
  this.animate = function() {
    this.step % 120 === 0 ? this.setDims(): null;
    this.step % 25 === 0 ? this.buildQuad() : null;

    this.quads.forEach(function(quad) {
      quad.increment();
    });
    if (this.quads[0].opacity <= 0) {
      this.quads.shift();
    }
    this.clear();
    this.draw();
    window.requestAnimationFrame(this.animate.bind(this));
    this.step = this.step + 1;
  };
  this.getX = function(point) {
    return Math.round(point[0] * this.getWidth());
  };
  this.getY = function(point) {
    return Math.round(point[1] * this.getHeight());
  };
  this.clear = function() {
    var ctx = this.getContext();
    ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
  };
  this.draw = function() {
    this.quads.forEach(function(quad) {
      ctx = this.getContext();
      ctx.fillStyle = quad.fill();
      ctx.beginPath();
      ctx.moveTo(this.getX(quad.points[0]), this.getY(quad.points[0]));
      for (i=1; i <= 3; i++) {
        ctx.lineTo(this.getX(quad.points[i]), this.getY(quad.points[i]));
      }
      ctx.lineTo(this.getX(quad.points[0]), this.getY(quad.points[1]));
      ctx.closePath();
      ctx.fill();
    }, this);
  };
};
