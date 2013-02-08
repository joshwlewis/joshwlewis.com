var animations = [];

Array.prototype.sample = function() {
  return this[Math.floor(Math.random()*this.length)];
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function shapes_grid(context, max_diameter, columns, rows) {
  this.max_diameter = max_diameter;
  this.rows = rows;
  this.columns = columns;
  this.shape_colors = ['#C00', '#0C0', '#00C'];
  this.shadow_color = '#999';
  this.letter_color = '#FFF'
  this.letters = [];
  this.spacing = max_diameter * 1.2;
  this.side_counts = [1, 3, 4, 5, 6]
  this.shapes = [];
  this.shrinking_shapes = [];
  this.growing_shapes = [];
  this.step = 0;
  this.speed = 1;
  this.font = "Courier"

  /* This calculates the number of changing shapes vs total shapes which
     is used later to slow the rate of adding shrinkers */
  this.change_ratio = function() {
    return (2 * this.max_diameter) / ((this.columns - 1) * (this.rows - 1) * this.speed)
  }


  this.interval = function() {
    if (this.change_ratio() >= 1) {
      return 2 * Math.ceil(this.change_ratio());
    } else {
      return 2;
    }
  }

  this.letter_for = function(c,r) {
    letter_obj = this.letters.filter( function(l) { return l.c == c && l.r == r; })[0];
    if (letter_obj != undefined) {
      return letter_obj.letter;
    }
  }

  this.init = function() {
    for (var c = 1; c <= this.columns; c++) {
      for (var r = 1; r <= this.rows; r++) {
        this.shapes.push( new grid_shape(this, c, r, 0, this.side_counts.sample(), this.shape_colors.sample(), this.letter_for(c,r)));
      }
    }
  }

  this.full_shapes = function() {
    return this.shapes.filter(function(s) { return s.diameter == max_diameter;});
  }

  this.zero_shapes = function() {
    return this.shapes.filter(function(s) { return s.diameter == 0; })
  }

  this.zero_shrinking_shapes = function() {
    return this.shrinking_shapes.filter(function(s) { return s.diameter == 0;})
  }

  this.full_growing_shapes = function() {
    return this.growing_shapes.filter(function(s) { return s.diameter >= max_diameter});
  }

  this.add_shrinking_shape = function() {
    new_shrinker = this.full_shapes().sample();
    if (new_shrinker != undefined) {
      this.shrinking_shapes.push(new_shrinker);
    }
  }

  this.remove_zero_shrinking_shapes = function() {
    for (i = 0; i < this.zero_shrinking_shapes().length; i++) {
      this.shrinking_shapes.remove(this.zero_shrinking_shapes()[i]);
    }
  }

  this.add_growing_shape = function() {
    new_grower = this.zero_shapes().sample();
    if (new_grower != undefined) {
      this.growing_shapes.push(new_grower);
    }
  }

  this.grow_shapes = function() {
    for (i = 0; i < this.growing_shapes.length; i++) {
      this.growing_shapes[i].diameter += this.speed;
    }
  }

  this.shrink_shapes = function() {
    for (i = 0; i < this.shrinking_shapes.length; i++) {
      this.shrinking_shapes[i].diameter -= this.speed;
    }
  }

  this.remove_full_growing_shapes = function() {
    for (i = 0; i < this.full_growing_shapes().length; i++) {
      this.growing_shapes.remove(this.full_growing_shapes()[i]);
    }
  }
  this.reset_zero_shapes = function() {
    for (i = 0; i < this.zero_shapes().length; i++) {
      this.zero_shapes()[i].sides = this.side_counts.sample();
      this.zero_shapes()[i].color = this.shape_colors.sample();
    }
  }

  this.increment = function() {
    ++this.step
    this.remove_zero_shrinking_shapes();
    this.remove_full_growing_shapes();
    if (this.step % this.interval() == 0) {
      this.add_shrinking_shape();
    }
    this.reset_zero_shapes();
    this.add_growing_shape();
    this.shrink_shapes();
    this.grow_shapes();
  }

  this.clear = function() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }
  this.draw = function() {
    for (var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].draw();
    }
  }
  return this;
}


function animate() {
  reqAnimFrame = window.mozRequestAnimationFrame    ||
                 window.webkitRequestAnimationFrame ||
                 window.msRequestAnimationFrame     ||
                 window.oRequestAnimationFrame
                 ;

  reqAnimFrame(animate);

  for (i=0; i < animations.length; i++){
    animation = animations[i];
    animation.increment()
    animation.clear();
    animation.draw();
  }
}


function grid_shape(grid, column, row, diameter, sides, color, letter){
  this.grid = grid;
  this.column = column;
  this.row = row;
  this.diameter = diameter;
  this.sides = sides;
  this.color = color;
  this.letter = letter;
  this.radius = function() {
    return (this.diameter / 2);
  }
  this.x = function() {
    return (this.column - 0.5) * this.grid.spacing;
  }
  this.y = function() {
    return (this.row - 0.5) * this.grid.spacing;
  }

  this.angle = function() {
    switch(this.sides) {
      case 3:
        return 1.5 * Math.PI;
      case 4:
        return 0.25 * Math.PI;
      case 5:
        return 0.5 * Math.PI;
      case 8:
        return 0.125 * Math.PI;
      default:
        return 0;
    }
  }
  this.draw = function(){
    context.save()
    context.beginPath();
    if (this.sides == 1) {
      context.arc(this.x(), this.y(), this.radius(), 0, 2 * Math.PI, false);
    } else {
      context.moveTo(this.x() + this.radius() * Math.cos(this.angle()), this.y() + this.radius() * Math.sin(this.angle()));
      for (var i = 1; i <= this.sides; i++){
        context.lineTo (this.x() + this.radius() * Math.cos(this.angle() +( i * 2 * Math.PI / this.sides)), this.y() + this.radius() * Math.sin( this.angle() + (i * 2 * Math.PI / this.sides)));
      }
    }
    context.closePath();
    context.shadowBlur = this.diameter / 4;
    context.shadowOffsetX = this.diameter / 8;
    context.shadowOffsetY = this.diameter / 8;
    context.shadowColor = this.grid.shadow_color;
    context.fillStyle = this.color;
    context.fill();
    context.restore();
    if (this.letter != undefined) {
      context.font = "".concat(this.diameter * 0.5625).concat("px ").concat(this.grid.font);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = this.grid.letter_color;
      context.fillText(this.letter, this.x(), this.y());
    }
  }
}