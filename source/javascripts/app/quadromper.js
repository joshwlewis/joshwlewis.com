var svgNs = 'http://www.w3.org/2000/svg';

var Quad = function(svg, color, points) {
  this.svg = svg;
  this.color = color;
  this.points = points;

  this.render = function() {
    this.polygon = document.createElementNS(svgNs, 'polygon');
    this.polygon.setAttributeNS(null, 'points', points);
    this.polygon.setAttributeNS(null, 'fill', color);
    this.polygon.classList.add('quad');
    this.svg.insertBefore(this.polygon, this.svg.firstChild);
  };

  this.destroy = function() {
    this.polygon.remove();
  };
};

var Quadromper = function(container, colors, skip, limit) {
  this.container = container;
  this.colors = colors;
  this.quads  = [];
  this.skip   = skip;
  this.limit  = limit;
  this.step   = 0;

  this.randomColor = function() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  };

  this.randomPoints = function() {
    var points = [[0,0],[1000,0],[1000, 1000],[0, 1000]];
    var point1 = Math.floor(Math.random() * 4);
    var point2 = point1 + 1;
    if (point2 === 4) { point2 = 0; }
    var xory = point2 % 2 === 0 ? 0 : 1;
    points[point1][xory] = Math.round(Math.random() * 1000);
    points[point2][xory] = Math.round(Math.random() * 1000);
    return points.map(function(set) {
      return set.join(',');
    }).join(' ');
  };

  this.createQuad = function() {
    var quad = new Quad(this.svg, this.randomColor(), this.randomPoints());
    quad.render();
    this.quads.push(quad);
    return quad;
  };

  this.render = function() {
    this.svg = document.createElementNS(svgNs, 'svg');
    this.svg.setAttributeNS(null, 'viewBox', '0 0 1000 1000');
    this.svg.setAttributeNS(null, 'preserveAspectRatio', 'none');
    this.svg.setAttributeNS(null, 'height', '100%');
    this.svg.setAttributeNS(null, 'width', '100%');
    this.svg.classList.add('quadromper');
    this.container.appendChild(this.svg);
  };

  this.animate = function() {
    if (this.step % skip === 0) {
      this.createQuad();
      if (this.step >= (this.limit * this.skip)) {
        this.quads[0].destroy();
        this.quads.shift();
      }
    }
    this.step = this.step + 1;
  };
};
