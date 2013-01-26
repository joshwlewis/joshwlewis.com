function shapes_grid(context, max_diameter, rows, columns, colors) {
  this.context = context;
  this.max_diameter = max_diameter;
  this.rows = rows;
  this.columns = columns;
  this.colors = colors;
  this.grid_spacing = max_diameter;
  this.shapes = [];

  this.xs = function (){
    var list = [];
    for (var x = 0; x < this.columns; x++) {
      list[x] = (x + 1) * this.grid_spacing;
    }
    return list;
  }

  this.ys = function () {
    var list = [];
    for (var y=0; y < this.rows; y++) {
      list[y] = (y + 1) * this.grid_spacing;
    }
    return list;
  }

    /* Initialize shapes */
  for (var xi = 0; xi < this.xs().length; xi++) {
    for (var yi = 0; yi < this.ys().length; yi++) {
      this.shapes.push( new shape(context, this.xs()[xi], this.ys()[yi], 10, 3, '#663366'));
    }
  }

  this.full_size_shapes = function() {
    self.shapes.filter(function(s) { return s.diameter == max_diameter; })
  }

  this.zero_size_shapes = function() {
    return self.shapes.filter(function(s) { return s.diameter == 0; });
  }

  this.draw = function() {
    for (var i = 0; i <= this.shapes.length; i++) {
      this.shapes[i].draw();
    }
  }
}

function shape(context, x, y, diameter, sides, color){
  this.context = context;
  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.radius = diameter / 2.0;
  this.sides = sides;
  this.color = color;

  this.draw = function(){
    context.beginPath();
    context.fillStyle = this.color;
    context.moveTo(x + this.radius * Math.cos(0), y + this.radius * Math.sin(0));
    for (var i = 1; i <= this.sides; i++){
      context.lineTo (this.x + this.radius * Math.cos(i * 2 * Math.PI / this.sides), y + this.radius * Math.sin(i * 2 * Math.PI / this.sides));
    }
    context.fill();
  }
}