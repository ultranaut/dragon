/* global Pair, Cell */
/* jshint esnext: true */

function display(a) {
  'use strict';
  for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
  }
}


function Dragon() {
  'use strict';
  return this;
}

Dragon.prototype.base = [
    [ new Cell(null), new Cell(  2  ) ],
    [ new Cell( 1  ),    new Cell([3,0]) ] ];


Dragon.prototype.rotate = function () {
  'use strict';

  var res = [];
  var m = this.base.length;
  var n = this.base[0].length;

  // initialize target array (there's probably a better way to do it)
  for (let i = 0; i < n; i++) {
    res.push([]);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let cell = this.base[i][j];
      if (cell instanceof Cell) {
        cell.rotate();
      }
      res[n - j - 1][i] = cell;
    }
  }
  this.base = res;
};

Dragon.prototype.rotateData = function rotateData(d) {
  'use strict';

  if (d instanceof Pair) {
    d.rotate();
    return;
  }
  else if (typeof(d) === 'number') {
    d %= d + 3;
  }
  else if (Array.isArray(d)) {
    d = d;
  }

  return d;
};

Dragon.prototype.show = function () {
  'use strict';
  var m = this.base.length;
  var n = this.base[0].length;

  for (let i = 0; i < m; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let cell = this.base[i][j];
      if (cell instanceof Cell) {
        let data = cell.data;
        if (Array.isArray(data)) {
          data = '('+data[0]+', '+data[1]+')';
        }
        row.push(data);
      }
      else {
        row.push(cell);
      }
    }
    console.log(row);
  }
};

