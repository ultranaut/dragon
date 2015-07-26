'use strict';

function Pair(x, y) {
  this.x = x;
  this.y = y;
}

Pair.prototype.rotate = function () {
  // temp var while swapping x and y
  var tx = this.x;
  this.x = (this.y + 3) % 4;
  this.y = (tx + 3) % 4;
};

Pair.prototype.display = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
