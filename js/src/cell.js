/* global Pair */
/* jshint esnext: true */

function Cell(data) {
  this.data = data;
}

Cell.prototype.rotate = function() {
  if (typeof(this.data) === 'number') {
    this.data = (this.data + 3) % 4;
  }
  else if (Array.isArray(this.data)) {
    // reverse the order and rotate ccw
    [this.data[0], this.data[1]] =
       [(this.data[1] + 3) % 4, (this.data[0] + 3) % 4];
  }

  // return this.data;
  return true;
};
