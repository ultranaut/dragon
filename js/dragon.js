function display(t){"use strict";for(var e=0;e<t.length;e++)console.log(t[e])}function Dragon(){"use strict";return this}Dragon.prototype.base=[[new Cell(null),new Cell(2)],[new Cell(1),new Cell([3,0])]],Dragon.prototype.rotate=function(){"use strict";var t,e,r,o=[],s=this.base.length,a=this.base[0].length;for(t=0;a>t;t++)o.push([]);for(t=0;s>t;t++)for(e=0;a>e;e++)r=this.base[t][e],r instanceof Cell&&r.rotate(),o[a-e-1][t]=r;this.base=o},Dragon.prototype.rotateData=function(t){"use strict";return t instanceof Pair?void t.rotate():("number"==typeof t?t%=t+3:Array.isArray(t)&&(t=t),t)},Dragon.prototype.show=function(){"use strict";for(var t=this.base.length,e=this.base[0].length,r=0;t>r;r++){for(var o=[],s=0;e>s;s++){var a=this.base[r][s];if(a instanceof Cell){var n=a.data;Array.isArray(n)&&(n="("+n[0]+", "+n[1]+")"),o.push(n)}else o.push(a)}console.log(o)}};