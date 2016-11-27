/**!
 *
 * folio.js
 * 0.8.15
 * https://github.com/frederickk/folio.js
 *
 * 27. November 2016
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 *
 * Folio.js is a library for Paper.js/Scriptographer
 * Folio.js serves as a collection of functions for supporting animations,
 * rudimentary 3D, additional Path items and lastly a structured
 * framework/chain of operations similar to that of Processing,
 * OpenFrameworks, Cinder, et. al.
 *
 * Not all of the code in here was created by me
 * but credit and links are given where credit is due
 *
 * Additional information and demos can be found here
 * http://kennethfrederick.de/folio.js/
 * http://kenfrederick.blogspot.de/2012/12/frederickkpaper.html
 *
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * http://creativecommons.org/licenses/LGPL/2.1/
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA    02110-1301  USA
 *
 */

// ------------------------------------------------------------------------
/**!
 *
 * REQUIRED LIBRARIES!
 *
 * Paper.js @ http://paperjs.org/
 *
 */



// ------------------------------------------------------------------------
// TODO: add ability to pass global parameters
// var folio = folio(parameters) || {};
// TODO: fix overall library implementation
var folio = folio || {};

var body = document.body;
var html = document.documentElement;

/**
 *
 * Initialize Structure
 *
 */
// create methods
// drawing
var Setup = function() {};
var Draw = function() {};
var Update = function(event) {};

var Animate = function(event, callback) {};
var AnimateAdd = function(object, order) {};
var AnimateClear = function() {};

// events
// mouse
var onMouseUp = function(event) {};
var onMouseDown = function(event) {};
var onMouseMove = function(event) {};
var onMouseDrag = function(event) {};

// keyboard
var onKeyDown = function(event) {};
var onKeyUp = function(event) {};


// paper.js
paper.install(window);


// once the DOM is ready, setup Paper.js
// window.onload = function() {
window.addEventListener('DOMContentLoaded', function() {
    //
    // Initialize Canvas
    //
    var canvases = document.getElementsByTagName('canvas');
    var canvas;
    if (canvases.length === 0) {
        // create container for canvas
        var container = document.createElement('div');
        container.id = 'container';
        container.style.position = 'absolute';
        container.style.top = 0;
        container.style.left = 0;
        container.style.width  = '100%';
        container.style.height = '100%';
        document.body.appendChild(container);

        // create canvas element
        canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.resize = true;
        canvas.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        canvas.style.webkitUserDrag = 'none';
        canvas.style.webkitUserSelect = 'none';
        canvas.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
        container.appendChild(canvas);
    }
    else {
        // use first canvas found
        canvas = canvases[0];
    }
    if (canvas.style.width === '') {
        canvas.style.width  = '100%';
    }
    if (canvas.style.height === '') {
        canvas.style.height = '100%';
    }

    paper.setup(canvas);



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    if (typeof Setup === 'function') {
        Setup();
    }
    if (typeof Draw === 'function') {
        Draw();
    }


    // ------------------------------------------------------------------------
    var AnimationGroup = new Group();
    AnimationGroup.name = '__AnimationGroup';

    function Animate(callback) {
        for (var i = 0; i < AnimationGroup.children.length; i++) {
            if (callback) {
                callback(AnimationGroup.children[i]);
            }
        }
    }
    function AnimateAdd(object, order) {
        // object must be a valid paper.js item
        // default is to add object to top
        if (order === 'bottom') {
            AnimationGroup.appendBottom(object);
        }
        else {
            AnimationGroup.appendTop(object);
        }
    }
    function AnimateClear() {
        if (project.activeLayer.children['__AnimationGroup']) {
            project.activeLayer.children['__AnimationGroup'].remove();
        }
    }



    // ------------------------------------------------------------------------
    //
    // Events
    //
    // ------------------------------------------------------------------------
    view.onFrame = function(event) {
        if (typeof Update === 'function') {
            Update(event);
        }
        AnimateClear();
        view.update();
    };

    // TODO: make this functionality toggleable
    view.onResize = function(event) {
        if (typeof onResize === 'function') {
            onResize(event);
        }
    };

    // ------------------------------------------------------------------------
    var tool = new Tool();
    tool.onMouseUp = function(event) {
        if (typeof onMouseUp === 'function') {
            onMouseUp(event);
        }
    };

    tool.onMouseDown = function(event) {
        if (typeof onMouseDown === 'function') {
            onMouseDown(event);
        }
    };

    tool.onMouseMove = function(event) {
        if (typeof onMouseMove === 'function') {
            onMouseMove(event);
        }
    };

    tool.onMouseDrag = function(event) {
        if (typeof onMouseDrag === 'function') {
            onMouseDrag(event);
        }
    };


    // ------------------------------------------------------------------------
    tool.onKeyDown = function(event) {
        if (typeof onKeyDown === 'function') {
            onKeyDown(event);
        }
    };

    tool.onKeyUp = function(event) {
        if (typeof onKeyUp === 'function') {
            onKeyUp(event);
        }
    };



    // ------------------------------------------------------------------------
    view.draw(); // draw the screen
    view.update();



    // ------------------------------------------------------------------------
    function resizeCanvas(event) {
        // set canvas width and height
        if (canvas.getContext) {
            view.viewSize.width = window.innerWidth
                ? window.innerWidth
                : document.documentElement.clientWidth;
            view.viewSize.height = window.innerHeight
                ? window.innerHeight
                : document.documentElement.clientHeight;

            // resetup canvas
            // paper.setup(canvas);
        }

        // clear out view
        paper.clear();

        // re-initiate setup
        if (typeof Setup === 'function') {
            Setup();
        }
        // re-initiate draw
        if (typeof Draw === 'function') {
            Draw();
        }

        // make sure view does its draw
        view.draw();
        // view.update();
    }
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);



    // ------------------------------------------------------------------------
    console.log('Folio.js is go!');
});

/*
 *
 * Core.js
 *
 * Core Methods and a collection of extensions for paper globally
 *
 */


folio = {
    //
    // Setup Core Namespaces
    //
    FTime: {},
    FIO: {},
    F3D: {}
};



/**
 *
 * Global Scope (Paper.js core)
 *
 */
PaperScope.inject({
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    enumerable: true,



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    /**
     * Java style println output
     *
     * @param {Object} obj
     *        any Javascript Object
     */
    println: function(obj) {
        console.log(obj);
        console.log('\n');
    },

    // ------------------------------------------------------------------------
    /**
     *
     * @param {Boolean} val
     *    input boolean value
     *
     * @return {Number} val as integer
     *
     */
    boolToInt: function(val) {
        return (val) ? 1 : 0;
    },

    // ------------------------------------------------------------------------
    /**
     *
     * @param {Number} val
     *    input number value
     *
     * @return {Number} val as boolean
     *
     */
    numToBool: function(val) {
        return (val != 0) ? true : false;
    },

    // ------------------------------------------------------------------------
    /**
     * http://stackoverflow.com/questions/4775722/check-if-object-is-array
     *
     * @param {Object} obj
     *    object whose type to determine
     *
     * @return {String} Paper.js object type
     *
     */
    getType: function(obj) {
        if (obj instanceof Point) {
            return 'Point';
        }
        else if (obj instanceof Size) {
            return 'Size';
        }
        else if (obj instanceof Rectangle) {
            return 'Rectangle';
        }
        else if (obj instanceof Group) {
            return 'Group';
        }
        else if (obj instanceof Raster) {
            return 'Raster';
        }
        else if (obj instanceof PlacedSymbol) {
            return 'PlacedSymbol';
        }
        else if (obj instanceof Path) {
            return 'Path';
        }
        else if (obj instanceof CompoundPath) {
            return 'CompoundPath';
        }
        else if (obj instanceof Symbol) {
            return 'Symbol';
        }
        else if (obj instanceof TextItem) {
            return 'TextItem';
        }
        else {
            return Object.prototype.toString.call(obj).split(/\W/)[2];
        }
    },

    /**
     *
     * @param {Array} items
     *    Array of items to go through
     * @param {String} name
     *    name of Item to find
     *
     * @return {Path} path with the name that matches
     *
     */
    findByName: function(items, name) {
        var path;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.name === name) {
                path = item;
            }
            // break;
        }
        return path;
    },

    /**
     *
     * @param {Array} items
     *    Array of items to go through
     * @param {Number} name
     *    name of Item to find
     *
     * @return {Path} path with the id that matches
     *
     */
    findById: function(items, id) {
        var path;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.id === id) {
                path = item;
            }
            // break;
        }
        return path;
    },


    /**
     * Iterate through and array
     *
     * @param  {Array}    arr
     * @param  {Function} callback
     *
     * @return {boolean}
     *
     */
    forEach: function(arr, callback) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (callback(arr[i],i) === false) {
                return false;
            }
        }
        return true;
    },


    /**
     * Clear the paper view (canvas)
     *
     * @param  {String} arg0 layerName name
     * @param  {Function} arg1 callback
     *
     */
    /**
     * Clear the paper view (canvas)
     *
     * @param  {String} arg0 callback
     *
     */
    clear: function(arg0, arg1) {
        var layerName, callback;
        var layer;

        if (arguments.length === 2) {
            layerName = arg0;
            callback = arg1;
        }
        else if (arguments.length === 1) {
            layerName = undefined;
            callback = arg0;
        }

        for (var i = 0; i < projects.length; i++) {
            if (layerName !== undefined) {
                try {
                    layer = projects[i].layers[layerName];
                    layer.removeChildren();
                }
                catch(err) {}
            }
            else {
                projects[i].clear();
                layer = new Layer();
                // for (var j = 0; j < projects[i].layers.length; j++) {
                //     layer = projects[i].layers[j];
                //     if (callback) {
                //         callback(layer);
                //     }
                //     layer.removeChildren();
                // }
            }

            if (callback) {
                callback(layer);
            }
        }
    }

});



/*
 *
 * FCalculate.js
 *
 * A collection of global mathematical operations, similar
 * to those found in Processing/OpenFrameworks/etc.
 *
 */


/**
 *
 * paper.Global
 *
 */
PaperScope.inject({
    // paper. prefix needed for these functions
    // TODO: enumerable doesn't seem to matter
    // TODO: inject into "statics" ...? seems not...
    enumerable: true,

    // -----------------------------------------------------------------------------
    /**
     * @param {Number} min
     *          minmum range
     * @param {Number} max
     *          maximum range
     *
     * @return {Number} random number as float
     *
     * @example
     * var rand = random(30, 90);
     *
     */
    random: function(min, max) {
        if (max == undefined) {
            max = min;
            min = 0;
        }
        // else if (min == undefined) {
        //  max = 1;
        //  min = 0;
        // )
        return (min + Math.random() * (max - min));
    },

    /**
     * @param {Number} min
     *          minmum range
     * @param {Number} max
     *          maximum range
     *
     * @return {Number} random number as integer
     *
     * @example
     * var randInt = randomInt(30, 90);
     *
     */
    randomInt: function(min, max) {
        return parseInt( paper.random(min,max) );
    },

    /**
     *
     * http://www.siafoo.net/snippet/191
     *
     * @param {Number} minr
     *          minmum range
     * @param {Number} maxr
     *          maximum range
     * @param {Number} bias
     *          bias represents the preference towards lower or higher numbers,
     *          as a number between 0.0 and 1.0. For example:
     *          random(0, 10, bias=0.9) will return 9 much more often than 1.
     *
     * @return {Number} a random, albeit biased, number
     *
     */
    randomBias: function(minr, maxr, bias) {
        var _map = [90.0, 9.00, 4.00, 2.33, 1.50, 1.00, 0.66, 0.43, 0.25, 0.11, 0.01];
        bias = Math.max(0, Math.min(bias, 1)) * 10;

        var i = parseInt(Math.floor(bias));
        var n = _map[i];
        if (bias < 10) {
            n += (_map[i+1]-n) * (bias-i);
        }

        return Math.pow( Math.random(),n ) * (maxr-minr) + minr;
    },


    // ------------------------------------------------------------------------
    /**
     *
     * @param {Number} val
     *          the value to constrain
     * @param {Number} min
     *          minimum limit
     * @param {Number} max
     *          maximum limit
     *
     * @return {Number} original value that is not less than the
     *               minimum and no greater than the maximum
     *
     * @example
     * var clamped = clamp(120, 0, 90); // 90
     *
     */
    clamp: function(val, min, max) {
        return (val < min) ? min : ((val > max) ? max : val);
    },

    /**
     *
     * @param {Number} val
     *          the incoming value to be converted
     * @param {Number} start
     *          lower bound of the value's current range
     * @param {Number} stop
     *          upper bound of the value's current range
     *
     * @return {Number} float value between 0.0 and 1.0
     *
     * @example
     * var normed = norm(45, 0, 90); // 0.5
     *
     */
    normalize: function(val, start, stop) {
        return (val - start) / (stop - start);
    },

    /**
     *
     * @param {Number} val
     *          the incoming value to be converted
     * @param {Number} istart
     *          lower bound of the value's current range
     * @param {Number} istop
     *          upper bound of the value's current range
     * @param {Number} ostart
     *          lower bound of the value's target range
     * @param {Number} ostop
     *          upper bound of the value's target range
     *
     * @return {Number} re-mapped value
     *
     * @example
     * var mapped = map(180, 0, 360, 0.0, 2.0); // 1
     *
     */
    map: function(val, istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((val - istart) / (istop - istart));
    },


    // ------------------------------------------------------------------------
    /**
     *
     * @param {Number} val
     *      number
     * @param {Number} decimalPlaces
     *      number of decimal places
     *
     * @return {Number} float value with desired decimal places
     *
     * @example
     * var rounded = round(0.586, 2); // 0.59
     *
     */
    round: function(val, decimalPlaces) {
        var multi = Math.pow(10,decimalPlaces);
        return Math.round(val * multi)/multi;
    },

    /**
     *
     * @param  {Number} val
     *      number
     * @param  {Number} base
     *      base value for finding multiple
     *
     * @return {Number} closest multiple relative to base and val
     */
    roundMultiple: function(val, base) {
        return Math.floor(val/base)*base+base;
    },

    /**
     *
     * http://stackoverflow.com/questions/4507784/snap-to-grid-functionality-using-javascript
     *
     * @param {Number} val
     *      value to snap
     * @param {Number} snapInc
     *      increment to snap value to
     * @param {Function} roundFunction
     *      (optiona) rounding function
     *
     * @return {Number} snapped value
     *
     * @example
     * var snapped = snap(0.66, 0.2); // 0.6
     *
     */
    snap: function(val, snapInc, roundFunction) {
        var roundFunction = roundFunction || Math.round;
        return paper.round( snapInc * roundFunction(val / snapInc), 2 );
    },

    /**
     *
     * @param {Number} start
     *      first value
     * @param {Number} stop
     *      second value
     * @param {Number} val
     *      float: between 0.0 and 1.0
     *
     * @return {Number} value between start and stop
     *
     * @example
     * var interpolated = interpolate(0, 100, 0.5); // 50
     *
     */
    interpolate: function(start, stop, val) {
        return start + (stop-start) * val;
    },

    // ------------------------------------------------------------------------
    /**
     * http://nayuki.eigenstate.org/res/calculate-divisors-javascript.js
     *
     * @param {Number} val
     *      number
     *
     * @return {Array} divisors (in ascending order) of the given integer
     *
     * @example
     * divisor(1) = [1]
     * divisor(5) = [1, 5]
     * divisor(12) = [1, 2, 3, 4, 6, 12]
     */
    divisor: function(val) {
        var small = [];
        var large = [];
        var end = Math.floor(Math.sqrt(val));
        for (var i=1; i<=end; i++) {
            if (val % i == 0) {
                small.push(i);
                if (i * i != val) {
                    large.push(val / i);
                }
            }
        }
        large.reverse();
        return small.concat(large);
    },

    // ------------------------------------------------------------------------
    /**
     *
     * @param {Number} val
     *      input value
     *
     * @return {Number} val as degree
     *
     * @example
     * var deg = degrees(Math.PI); // 180
     *
     */
    degrees: function(val) {
        return val * (180/Math.PI);
    },

    /**
     *
     * @param {Number} val
     *      input value
     *
     * @return {Number} val as radians
     *
     * @example
     * var rad = radians(180); // Math.PI
     *
     */
    radians: function(val) {
        return val * (Math.PI/180);
    },

    // ------------------------------------------------------------------------
    /**
     *
     * Calculate secants
     *
     * http://www.ssicom.org/js/x974780.htm
     *
     * @param {Number} val
     *      input value
     *
     * @example
     * var s = sec(180);
     *
     */
    sec: function(val) {
        return 1/Math.cos(val);
    },

    /**
     * Calculate cosecants
     *
     * http://www.ssicom.org/js/x974284.htm
     *
     * @param {Number} val
     *      input value
     *
     * @example
     * var cs = cosec(180);
     *
     */
    cosec: function(val) {
        return 1/Math.sin(val);
    },

    // ------------------------------------------------------------------------
    /**
     * Slope
     *
     * @param {Number} angle
     *      angle of slope (rise)
     * @param {Number} val
     *      length of slope (run)
     *
     * @return {Point} slope (rise/run)
     *
     */
    slope: function(angle, distance) {
        var x = distance*Math.cos( paper.radians(angle) );
        var y = distance*Math.sin( paper.radians(angle) );
        return new Point(x,y);
    },

    /**
     * Slope ratio
     *
     * @param {Point} point1
     * @param {Point} point2
     *
     * @return {Number} slope ratio
     *
     */
    slopeRatio: function(point1, point2) {
        return (point2.y - point1.y) / (point2.x - point1.x);
    },

    /**
     * Slope to angle
     *
     * @param {Point} slope
     *
     * @return {Number} angle in radians
     *
     */
    slopeAngle: function(slope) {
        return paper.degrees(Math.atan( slope.x/slope.y ));
    },

    // ------------------------------------------------------------------------
    /**
     *
     * @param {Number} val
     *      input value
     *
     * @return {Number} squared value of val
     *
     * @example
     * var squared = sq(30); // 900
     *
     */
    sq: function(val) {
        return val*val;
    },

    // ------------------------------------------------------------------------
    /**
     * get common outer tangents of two circles (only works with circles!)
     *
     * @param {Path.Circle} arg0
     *          the first Circle
     * @param {Path.Circle} arg1
     *          the second Circle
     *
     * @return {Array} of points
     *
     */
    /**
     * TODO: get common outer tangents of two curves
     *
     * @param {Curve} arg0
     *          the first Curve
     * @param {Curve} arg1
     *          the second Curve
     *
     * @return {Array} of points
     *
     */
    getCommonTangents: function(arg0, arg1) {
        var dx = arg1.position.x - arg0.position.x;
        var dy = arg1.position.y - arg0.position.y;

        var r1 = Math.sqrt( arg0.bounds.size.getArea() );
        var r2 = Math.sqrt( arg1.bounds.size.getArea() );

        r1 /= 2;
        r2 /= 2;

        var dist = arg0.position.getDistance( arg1.position );

        if (dist <= Math.abs(r2 - r1)) {
            // The circles are coinciding
            // There are no valid tangents.
            return;
        }

        var angle1 = Math.atan2(dy, dx);
        var angle2 = Math.acos((r1 - r2)/dist);

        var pt1 = new Point(
            arg0.position.x + r1 * Math.cos(angle1 + angle2),
            arg0.position.y + r1 * Math.sin(angle1 + angle2)
        );
        var pt2 = new Point(
            arg1.position.x + r2 * Math.cos(angle1 + angle2),
            arg1.position.y + r2 * Math.sin(angle1 + angle2)
        );
        var pt4 = new Point(
            arg0.position.x + r1 * Math.cos(angle1 - angle2),
            arg0.position.y + r1 * Math.sin(angle1 - angle2)
        );
        var pt3 = new Point(
            arg1.position.x + r2 * Math.cos(angle1 - angle2),
            arg1.position.y + r2 * Math.sin(angle1 - angle2)
        );

        return [pt1, pt2, pt3, pt4];
    },


    /**
     * [function description]
     *
     * @param  {Number} min  lowest range of value to return
     * @param  {Number} max  highest range of value to return
     * @param  {Number} inc  increment value
     *
     * @return {Function}
     */
    reverser: function(min, max, inc) {
        min = min || 0;
        max = max || 100;
        inc = inc || 1;
        var divisor = (min === 0 && max === 100)
            ? 100
            : 1;
        var flip = false;
        var val = 0;

        return function() {
            if (flip) {
                val += inc;
            }
            else {
                val -= inc;
            }

            if (val < min && !flip) {
                flip = true;
            }
            else if (val > max && flip) {
                flip = false;
            }

            return val / divisor;
        };
    }

});

/*
 *
 * FColor.js
 *
 * A collection of extensions for paper.Color
 *
 */


/**
 *
 * paper.Color
 *
 */
paper.Color.inject({
    data: null,

    // ------------------------------------------------------------------------
    /**
     *
     * @return {Number} value of input color as integer
     *
     */
    toInt: function() {
        var RgbInt = this.red;
        RgbInt = RgbInt << 8;
        RgbInt |= this.green;
        RgbInt = RgbInt << 8;
        RgbInt |= this.blue;
        return RgbInt;
    },

    /**
     *
     * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     *
     * @return {String} hex value of input color as string
     *
     */
    toHex: function() {
        function c2h(e) {
            var t = e.toString(16);
            return t.length === 1
                ? '0' + t
                : t;
        }

        return '#' +
            c2h(this.red*255) +
            c2h(this.green*255) +
            c2h(this.blue*255);
    },

    // ------------------------------------------------------------------------
    /**
     * desaturate a color (based on hsb model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to desaturate color
     *
     * @return {Color} desaturated Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var desaturated = color.desaturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    desaturate: function(amt) {
        var color = new Color(this);
        color.saturation = paper.clamp(this.saturation - (this.saturation * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * saturate a color (based on hsb model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to saturate color
     *
     * @return {Color} saturated Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var saturated = color.saturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    saturate: function(amt) {
        var color = new Color(this);
        color.saturation = paper.clamp(this.saturation + (this.saturation * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * darken a color (based on hsl model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to darken color
     *
     * @return {Color} darkened Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var darkened = color.darken(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    darken: function(amt) {
        var color = new Color(this);
        color.lightness = paper.clamp(this.lightness - (this.lightness * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * dim a color (based on hsl model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to dim color
     *
     * @return {Color} dimmed Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var dimmed = color.dim(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    dim: function(amt) {
        var color = new Color(this);
        color.brightness = paper.clamp(this.brightness - (this.brightness * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * lighten a color (based on hsl model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to lighten color
     *
     * @return {Color} lightened Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var lightened = color.lighten(0.2); // { red: 0, green: 0.76, blue: 0.532 }
     *
     */
    lighten: function(amt) {
        var color = new Color(this);
        // color.saturation = paper.clamp(this.saturation - (this.saturation * amt), 0,1);
        color.lightness = paper.clamp(this.lightness + (this.lightness * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * brighten a color (based on hsb model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to brighten color
     *
     * @return {Color} brightened Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var brightened = color.brighten(0.2);
     *
     */
    brighten: function(amt) {
        var color = new Color(this);
        color.saturation = paper.clamp(this.saturation - (this.saturation * amt), 0,1);
        color.brightness = paper.clamp(this.brightness + (this.brightness * amt), 0,1);
        color.setType(this.type);
        return color;
    },

    /**
     * increase color contrast (based on hsb model) by percentage
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} amt
     *      (0.0 - 1.0) factor to increase contrast
     *
     * @return {Color} Color by input amount
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var contrasted = color.contrast(0.2);
     *
     */
    contrast: function(amt) {
        var color = new Color(this);
        color.setType(this.type);
        return color.lightness < 0.5
            ? color.darken(amt)
            : color.lighten(amt);
    },

    /**
     * invert color
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @return {Color} inverted Color
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var inverted = color.invert();
     *
     */
    invert: function() {
        var color = new Color(this);
        color.hue += 180;
        color.setType(this.type);
        return color;
    },

    /**
     * rotate color around hsb/l color wheel other components remain the same
     * NOTE: Color operators aren't working when not using paperScript
     *
     * @param {Number} degree
     *      (0.0 - 360.0) rotation degree
     *
     * @return {Color} rotated Color
     *
     * @example
     * var color = new Color(0.0, 1.0, 0.7);
     * var compliment = color.rotate(180);
     *
     * var color = new Color(0.0, 1.0, 0.7);
     * var triad = [
     *  color,
     *  color.rotate(120),
     *  color.rotate(240)
     * ];
     *
     */
    rotate: function(degree) {
        var color = new Color(this);
        color.hue += degree;
        color.setType(this.type);
        return color;
    },

    /**
     * interpolate color
     *
     * @param {Color} from
     *      start color
     * @param {Color} to
     *      end color
     * @param {Number} amt
     *      float: between 0.0 and 1.0
     *
     * @return {Color} interpolated color
     *
     * @example
     * var color1 = new Color(0.0, 1.0, 0.7);
     * var color2 = new Color(0.0, 0.7, 1.0);
     * var interpolateColor = new Color().interpolate(color1, color2, 0.5);
     *
     */
    /**
     *
     * @param {Color} to
     *      end color
     * @param {Number} amt
     *      float: between 0.0 and 1.0
     *
     * @return {Color} interpolated color
     *
     * @example
     * var color1 = new Color(0.0, 1.0, 0.7);
     * var color2 = new Color(0.0, 0.7, 1.0);
     * var interpolateColor = color1.interpolate(color2, 0.5);
     *
     */
    //
    //  TODO: would interpolateTo make more sense?
    //
    // interpolateTo: function(toColor, amt) {
    //  var color = new Color(this);
    //  for (var i = 0; i < color._components.length; i++) {
    //      color._components[i] += ((toColor._components[i] - color._components[i]) * amt);
    //  }
    //  return color;
    // },
    interpolate: function(arg0, arg1, arg2) {
        var color = new Color(this);

        if (typeof arg1 === 'number') {
            var to = arg0.getComponents();
            for (var i = 0; i < color._components.length; i++) {
                // color._components[i] += ((to[i] - color._components[i]) * arg1);
                color._components[i] = paper.interpolate(color._components[i], to[i], arg1);
            }
        }
        else {
            var from = arg0.getComponents();
            var to = arg1.getComponents();
            for (var i = 0; i < color._components.length; i++) {
                // color._components[i] += ((to[i] - from[i]) * arg2);
                color._components[i] = paper.interpolate(from[i], to[i], arg2);
            }
        }

        color.setType(this.type);
        return color;
    },


    statics: {
        /**
         *
         * @return {Color} random Color based on initialization arguments
         *
         * @example
         * var color = new Color.random();
         * // all values between 0.0 and 1.0
         * // [ red: 0.1, green: 0.5, blue: 1.0 ]
         *
         * var color = new Color.random(0.5);
         * // value between 0.5 and 1.0
         * // [ gray: 0.7 ]
         *
         * var color = new Color.random(0.3, 0.6, 0.9);
         * // red value between 0.4 and 1.0, etc.
         * // [ red: 0.4, green: 0.7, blue: 1.0 ]
         *
         * var color = new Color.random(90, 1, 0.8);
         * // hue value between 90 and 360, etc.
         * // [ hue: 154, saturation: 1, brightness: 0.9 ]
         *
         * var color = new Color.random([45, 90], [0.7, 1.0], [0.5, 0.8]);
         * // hue value between 90 and 360, etc.
         * // [ hue: 274, saturation: 1, lightness: 0.9 ]
         *
         */
        random: function(arg0, arg1, arg2, arg3) {
            var components;

            if (paper.getType(arg0) === 'String') {
                var hex = arg0.substring(1);
                return new Color.random(
                    parseInt(hex.slice(0,2), 16)/255,
                    parseInt(hex.slice(2,4), 16)/255,
                    parseInt(hex.slice(4,6), 16)/255
                );
            }
            else if (paper.getType(arg0) === 'Object') {
                components = {};
                for (var key in arg0) {
                    if (paper.getType(arg0[key]) === 'Array') {
                        components[key] = paper.random(arg0[key][0], arg0[key][1]);
                    }
                    else {
                        components[key] = paper.random(0.0, arg0[key]);
                    }
                }
            }
            else {
                components = [];
                var len = (arguments.length > 0)
                    ? arguments.length
                    : 4;

                for (var i = 0; i < len; i++) {
                    if (paper.getType(arguments[i]) === 'Array') {
                        components.push(paper.random(arguments[i][0], arguments[i][1] ));
                    }
                    else if (paper.getType(arguments[i]) === 'Number') {
                        components.push(paper.random(0.0, arguments[i] ));
                    }
                    else {
                        components.push(paper.random(1.0));
                    }
                }
            }

            var c = new Color(components);
            c.data = (arg0 === 'hex')
                ? components
                : null;
            c.alpha = 1.0;
            c.setType((components[0] > 1.0)
                ? 'hsb'
                : 'rgb'
            );
            return c;
        },

        // ------------------------------------------------------------------------
        /**
         *
         * @param {Number} RgbInt
         *      value as integer
         *
         * @return {Color} value of integer as Color
         *
         */
        integer: function(RgbInt) {
            return new Color(
                (RgbInt >> 16) & 255,
                (RgbInt >> 8) & 255,
                RgbInt & 255
            );
        },

        /**
         *
         * @param {Number} arg0
         *      red as byte value (0-255)
         * @param {Number} arg1
         *      green as byte value (0-255)
         * @param {Number} arg2
         *      blue as byte value (0-255)
         * @param {Number} arg3
         *      alpha as byte value (0-255)
         *
         * @return {Color}
         *
         */
        bytes: function(arg0, arg1, arg2, arg3) {
            if (arguments.length === 4) {
                return new Color(
                    arg0/255,
                    (arg1 != undefined) ? arg1/255 : arg0/255,
                    (arg2 != undefined) ? arg2/255 : arg0/255,
                    (arg3 != undefined) ? arg3/255 : 1.0
                );
            }
            else {
                return new Color(
                    arg0/255,
                    (arg1 != undefined) ? arg1/255 : arg0/255,
                    (arg2 != undefined) ? arg2/255 : arg0/255
                );
            }
        },
    }


});



/*
 *
 * FConversions.js
 *
 * A collection of helpful conversion ratios from and to pixels (or points)
 *
 */


var FConversions = {

    // millimeters
    PIXEL_TO_MM: 0.352777778,
    MM_TO_PIXEL: 2.83464567,

    POINT_TO_MM: 0.352777778,
    MM_TO_POINT: 2.83464567,

    // centimeters
    PIXEL_TO_CM: 0.0352777778,
    CM_TO_PIXEL: 28.3464567,

    POINT_TO_CM: 0.0352777778,
    CM_TO_POINT: 28.3464567,

    // inches
    PIXEL_TO_INCH: 0.0138888889,
    INCH_TO_PIXEL: 72,

    POINT_TO_INCH: 0.0138888889,
    INCH_TO_POINT: 72,

    // picas
    PIXEL_TO_PICA: 0.0833333333,
    PICA_TO_PIXEL: 12,

    POINT_TO_PICA: 0.0833333333,
    PICA_TO_POINT: 12

};


/*
 *
 * FPath.js
 *
 * A collection of shapes for paper.Path and methods for paper.Item
 *
 * FArrow
 * FBubble
 * FChain
 * FCross
 * FDrip
 * FTriangle
 *
 */


/*
 *
 * paper.Item
 *
 */
paper.Item.inject({
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    enumerable: true,
    _prevAngle: 0,
    _prevPosition: {x: 0, y: 0},
    _prevHor: 1.0,
    _prevVer: 1.0,



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    /**
     *
     * http://gmc.yoyogames.com/index.php?showtopic=290349
     *
     * @param {Size} spacing
     *          scale.width  = x scale of the grid.
     *          scale.height = y scale of the grid.
     * @param {Object} options
     *          { grid: true }
     *          { isometric: true }
     *
     * @return {Point} snapped Point
     *
     */
    /**
     *
     * @param {Number} scale
     *          scale of the grid
     * @param {Object} options
     *          { grid: true }
     *          { isometric: true }
     *
     * @return {Point} snapped Point
     *
     */
    snap: function(scale, options) {
        // this.position = pt;
        this.position.snap(scale, options);
    },


    // -----------------------------------------------------------------------------
    /**
     *
     * @return {Number} the distance between the item and the center of the canvas/artboard
     *
     */
    getDistanceToCenter: function() {
        if (this._position != undefined) {
            var dx = this._position.x - view.bounds.center.x;
            var dy = this._position.y - view.bounds.center.y;
            return (dx * dx + dy * dy) + 1;
            // return this._position.getDistance(view.bounds.center);
        }
    },


    // -----------------------------------------------------------------------------
    /**
     * converts a CompoundPath into a Group otherwise returns original Item
     *
     * @return {Group}
     *
     * @example
     * var path = new CompoundPath({
     *  children: [
     *      new Path.Circle({
     *          center: new Point(50, 50),
     *          radius: 30
     *      }),
     *      new Path.Circle({
     *          center: new Point(50, 50),
     *          radius: 10
     *      })
     *  ]
     * });
     * var group = path.toGroup();
     *
     */
    toGroup: function() {
        if (paper.getType(this) === 'CompoundPath') {
            return new Group(this.children);
        }
        else {
            return this;
        }
    },

    /**
     * Rotation that doesn't accumulate
     *
     * @param  {Number} angle
     *
     * @return {Item}
     */
    setRotation: function(angle, center) {
        center = center || this.point;
        this.rotate(
            -(angle - this._prevAngle),
            center
        );
        this._prevAngle = angle;
        return this;
    },

    /**
     * Translation that doesn't accumulate
     *
     * @param  {Point} delta
     *
     * @return {Item}
     */
    setTranslation: function(delta) {
        delta = new Point(delta);
        this.translate(new Point(
            (delta.x - this._prevPosition.x),
            (delta.y - this._prevPosition.y)
        ));
        this._prevPosition = delta;
        return this;
    },

    /**
     * Scaling that doesn't accumulate
     *
     * @param  {Number} arg0  horizontal and vertical scale factor
     *
     * @return {Item}
     */
    /**
     * @param  {Number} arg0  horizontal scale factor
     * @param  {Number} arg1  vertical scale factor
     *
     * @return {Item}
     */
     /**
      * @param  {Number} arg0  horizontal and vertical scale factor
      * @param  {Point}  arg1  scale from
      *
      * @return {Item}
      */
     /**
      * @param  {Number} arg0  horizontal scale factor
      * @param  {Number} arg1  vertical scale factor
      * @param  {Point}  arg2  scale from
      *
      * @return {Item}
      */
     setScaling: function(arg0, arg1, arg2) {
         var hor;
         var ver;
         var pos;
         if (arguments.length === 0) {
             return;
         }
         if (arguments.length === 2) {
             hor = arg0;
             if (arg1 instanceof Point) {
                ver = hor;
                pos = arg1;
             }
             else {
                 ver = arg1;
                 pos = this.position;
             }
         }
         if (arguments.length === 3) {
             hor = arg0;
             ver = arg1;
             pos = arg2;
         }

         this.scale(
             1.0 + (hor - this._prevHor),
             1.0 + (ver - this._prevVer),
             pos
         );
         this._prevHor = hor;
         this._prevVer = ver;
         return this;
     }
});



paper.Path.inject({
    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------

    /*
     *
     * Center Methods
     * TODO: finish adding center methods
     *
     */

    /**
     * Returns the Centroid of Path
     * http://stackoverflow.com/questions/2792443/finding-the-centroid-of-a-polygon
     *
     * @return {Point}
     *
     * @example
     * var triangle = new Path(
     *  new Point(0, 0),
     *  new Point(180, 180),
     *  new Point(0, 360)
     * );
     * var centroid = triangle.getCentroid(); // { x:60, y:180 }
     *
     */
    getCentroid: function() {
        var centroid = new Point(0,0);

        var signedArea = 0.0;
        var a = 0.0;

        var points = [];
        for (var i = 0; i < this._segments.length-1; ++i) {
            points[0] = this._segments[i].point;
            points[1] = this._segments[i+1].point;

            a = points[0].x*points[1].y - points[1].x*points[0].y;
            signedArea += a;

            centroid.x += (points[0].x + points[1].x)*a;
            centroid.y += (points[0].y + points[1].y)*a;
        }

        // Do last vertex
        points[0] = this._segments[i].point;
        points[1] = this._segments[0].point;

        a = points[0].x*points[1].y - points[1].x*points[0].y;
        signedArea += a;

        centroid.x += (points[0].x + points[1].x)*a;
        centroid.y += (points[0].y + points[1].y)*a;

        signedArea *= 0.5;

        centroid.x /= (6.0*signedArea);
        centroid.y /= (6.0*signedArea);

        return centroid;
    },

    /**
     * Returns the Circumcenter of a triangle
     *
     * TODO: adjust formula to return Circumcenter of any polygon
     *
     * @return {Point}
     *
     * @example
     * var triangle = new Path(
     *  new Point(0, 0),
     *  new Point(180, 180),
     *  new Point(0, 360)
     * );
     * var circumcenter = triangle.getCircumcenter(); // { x:0, y:180 }
     *
     */
    // getCircumcenter: function() {
    //  var len = this._segments.length;

    //  var points = [];
    //  for (var i = 0; i < len; i++) {
    //      var point = this._segments[i].point
    //      points.push(point);
    //  }
    //  points.sort(FSort.distanceToCenter);

    //  for (var i = 0; i < points.length; i++) {
    //      var point = points[i];
    //      console.log(point.getDistanceToCenter());
    //  }
    //  console.log(points);
    //  console.log(' --------- ');

    //  var l = new Path.Line(
    //      points[0],
    //      points[points.length-1]
    //  );
    //  l.strokeColor = new Color('00ffc7');


    //  return point;
    //  // console.log(this._segments);
    //  // var points = [];
    //  // points = points.sort(FSort.distanceToCenter());
    //  // console.log(points);
    //  // console.log('---------');

    //  // var arr1 = this._segments[0].point.getPerpendicularBisector(this._segments[2].point);
    //  // var arr2;
    //  // if (len === 3) {
    //  //  // triangle
    //  //  arr2 = this._segments[1].point.getPerpendicularBisector(this._segments[2].point);
    //  // }
    //  // else {
    //  //  // polygon...
    //  //  // TODO: get points that are furthest from each other
    //  //  arr2 = this._segments[1].point.getPerpendicularBisector(this._segments[3].point);
    //  // }

    //  // var o = intersection(arr1, arr2);
    //  // // if (o.length < 1) {
    //  // //   err_fail_to_find_center = 1;
    //  // //   // continue;
    //  // // }

    //  // var r  = this._segments[0].point.getDistance(o);
    //  // var r1 = this._segments[1].point.getDistance(o);
    //  // if (r >= r1){
    //  //  rIdx = 0;
    //  // }
    //  // else {
    //  //  rIdx = 1;
    //  //  r = r1;
    //  // }

    //  // function intersection(p, q) {
    //  //  var d = p[0] * q[1] - p[1] * q[0];
    //  //  if (d == 0) return [];
    //  //  return new Point(
    //  //      (q[2] * p[1] - p[2] * q[1])/d,
    //  //      (p[2] * q[0] - q[2] * p[0])/d
    //  //  );
    //  // };


    //  // // var pi = activeDocument.activeLayer.pathItems.ellipse(o[1] + r, o[0] - r, r * 2, r * 2);
    //  // var pi = new Path.Circle(new Point(
    //  //  o.x - r/2,
    //  //  o.y + r/2
    //  // ), r);
    //  // // console.log(pi.position);
    //  // return pi.position;
    // },

    getCircumcenter: function() {
        var len = this._segments.length;
        var pointsX = [],
            pointsY = [];

        var j;
        var k;
        var point;
        for (var i = 0; i < len; i++) {
            j = (i + 1 >= len)
                ? 0
                : i + 1;
            k = (i + 2 >= len)
                ? 1
                : i + 2;

            point = calculate(
                this._segments[i].point,
                this._segments[j].point,
                this._segments[k].point
            );
            pointsX.push(point.x);
            pointsY.push(point.y);
        }

        function calculate(p1, p2, p3) {
            var A = p2.x - p1.x;
            var B = p2.y - p1.y;
            var C = p3.x - p1.x;
            var D = p3.y - p1.y;

            var E = A*(p1.x + p2.x) + B*(p1.y + p2.y);
            var F = C*(p1.x + p3.x) + D*(p1.y + p3.y);

            var G = 2.0*(A*(p3.y - p2.y)-B*(p3.x - p2.x));

            if (Math.abs(G) < Numerical.EPSILON) {
                var arrx = [p1.x, p2.x, p3.x];
                var arry = [p1.y, p2.y, p3.y];

                var minx = arrx.min();
                var miny = arry.min();
                var maxx = arrx.max();
                var maxy = arry.max();

                return new Point((arrx[minx] + arrx[maxx])/2, (arry[miny] + arry[maxy])/2);
            }
            else {
                var cx = (D * E - B * F) / G;
                var cy = (A * F - C * E) / G;
                return new Point(cx, cy);
            }
        };

        return new Point(pointsX.median(), pointsY.median());
    },

    /*
     *
     * TODO: add additional "center" formulas (for polygons)
     * http://mathforum.org/library/drmath/view/57665.html
     *
     */

    /**
     * Returns the Circumcircle of a polygon
     *
     * TODO: fix for triangles...
     *
     * @return {Path.Circle}
     */
    getCircumcircle: function() {
        var that = this;
        var circumradius = 0;
        var arr = this._segments.slice();

        function getDistanceToCentroid(segment) {
            var point = segment.point;
            var x = point.x - that.getCircumcenter().x,
                y = point.y - that.getCircumcenter().y,
                d = x * x + y * y;
            return Math.sqrt(d);
        };
        arr.sort(function(a, b) {
            return getDistanceToCentroid(a) - getDistanceToCentroid(b);
        });

        circumradius = getDistanceToCentroid(arr[arr.length - 1]) + getDistanceToCentroid(arr[arr.length - 2]);
        circumradius /= 2;

        // // for (var i = 0; i < arr.length; i++) {
        // //   var seg = arr[i].point;
        // //   if (seg.getDistance(this.getCentroid()) > circumradius) {
        // //       circumradius = seg.getDistance(this.getCentroid());
        // //   }
        // // }

        return Shape.Circle(
            // that.getCentroid(),
            that.getCircumcenter(),
            // that.getCenterOfPolygon(),
            circumradius
        );
    },

    /**
     * Returns the Incircle of a polygon
     *
     * @return {Path.Circle}
     *
     * @example
     * var triangle = new Path(
     *  new Point(0, 0),
     *  new Point(180, 180),
     *  new Point(0, 360)
     * );
     * var incircle = triangle.getIncircle(); // new Path.Circle(new Point(60, 180), 120));
     *
     */
    getIncircle: function() {
        var incircleradius = Number.MAX_VALUE;

        for (var i = 0; i < this._segments.length; i++) {
            var seg = this._segments[i].point;
            if (seg.getDistance(this.getCentroid() ) < incircleradius) {
                incircleradius = seg.getDistance(this.getCentroid());
            }
        }

        return Shape.Circle(
            this.getCentroid(),
            incircleradius
        );
    },

    // TODO: currently implementation returns false point
    // getIncenter : function() {
    //  // vertices
    //  if (this.segments.length == 3) {
    //      var p1 = this.segments[0].point;
    //      var p2 = this.segments[1].point;
    //      var p3 = this.segments[2].point;

    //      // side lengths
    //      var a = p1.getDistance(p2);
    //      var b = p2.getDistance(p3);
    //      var c = p3.getDistance(p1);

    //      var circum = a + b + c;

    //      return new Point(
    //          (a* p1.x + b * p2.x + c * p3.x) / circum,
    //          (a * p1.y + b * p2.y + c * p3.y) / circum
    //      );
    //  }
    //  else {
    //      console.error('Not Path.FTriangle');
    //      return null;
    //  }
    // },

    /**
     * @param {} xb
     *      array of barycentric coordinates
     */
    // TODO: currently implementation returns false point
    // toCartesian : function(bary) {
    //  if (this.segments.length == 3) {
    //      var p1 = this.segments[0].point;
    //      var p2 = this.segments[1].point;
    //      var p3 = this.segments[2].point;

    //      // side lengths
    //      var a = p1.getDistance(p2);
    //      var b = p2.getDistance(p3);
    //      var c = p3.getDistance(p1);

    //      // var area = 0.5 * (p1.x * (p2.y - p3.y) +
    //      //                p2.x * (p3.y - p1.y) +
    //      //                p3.x * (p1.y - p2.y));

    //      // var r = 2 * area / (a + b + c);
    //      // var k = 2 * area / (a*bary[0] + b*bary[1] + c*bary[2]);

    //      // var angleC = Math.acos((a*a + b*b - c*c) / (2*a*b));

    //      // var cosC = Math.cos(angleC);
    //      // var sinC = Math.sin(angleC);

    //      // var x =  (k*bary[1] - r + (k*bary[0] - r)*cosC) / sinC;
    //      // var y =  k*bary[0] - r;

    //      // return new Point(
    //      //  x + this.getIncenter().x,
    //      //  y + this.getIncenter().y
    //      // );

    //      return new Point(
    //          bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x,
    //          bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x
    //      );
    //  }
    //  else {
    //      console.error('Not Path.FTriangle');
    //      return null;
    //  }
    // },


    // TODO: currently implementation returns false point
    // getOrthocenter : function() {
    //  // vertices
    //  if (this.segments.length == 3) {
    //      var p1 = this.segments[0].point;
    //      var p2 = this.segments[1].point;
    //      var p3 = this.segments[2].point;

    //      // side lengths
    //      var a = p1.getDistance(p2);
    //      var b = p2.getDistance(p3);
    //      var c = p3.getDistance(p1);

    //      var bary = [
    //          this.sec(a),
    //          this.sec(b),
    //          this.sec(c)
    //      ];
    //      return this.toCartesian(bary);
    //  }
    //  else {
    //      console.error('Not Path.FTriangle');
    //      return null;
    //  }
    // },


    // TODO: currently implementation returns false point
    // getSchifflerPoint : function() {
    //  // vertices
    //  if (this.segments.length == 3) {
    //      var p1 = this.segments[0].point;
    //      var p2 = this.segments[1].point;
    //      var p3 = this.segments[2].point;

    //      // side lengths
    //      var a = p1.getDistance(p2);
    //      var b = p2.getDistance(p3);
    //      var c = p3.getDistance(p1);

    //      var bary = [
    //          1/(Math.cos(b) + Math.cos(c)),
    //          1/(Math.cos(c) + Math.cos(a)),
    //          1/(Math.cos(a) + Math.cos(b))
    //      ];
    //      return this.toCartesian(bary, p1,p2,p3);
    //  }
    //  else {
    //      console.error('Not Path.FTriangle');
    //      return null;
    //  }
    // },



    // -----------------------------------------------------------------------------
    statics: new function() {
        return {
            /**
             *
             * FArrow
             * Create simple arrow
             *
             * @param {Point} headPoint
             *          the head of the arrow
             * @param {Point} tailPoint
             *          the tail of the arrow
             * @param {Size} arrowHeadSize
             *          (optional) length of the arrow head
             *
             * @example
             * var headPoint = new Point(9,9);
             * var tailPoint = new Point(90,90);
             * var arrowHeadSize = new paper.Size(18,18);
             * var farrow = new paper.Path.FArrow(headPoint, tailPoint, arrowHeadSize);
             *
             */
            FArrow: function(headPoint, tailPoint, arrowHeadSize) {
                // the line part
                var path = new Path.Line(headPoint, tailPoint);

                // the arrow head
                var arrowHeadSize = arrowHeadSize || new Size(headPoint.getDistance(tailPoint)*0.381924,headPoint.getDistance(tailPoint)*0.381924);

                // rotate arrow head around to correct position
                var a = Math.atan2(headPoint.x-tailPoint.x, tailPoint.y-headPoint.y);

                // slight "hack" to get strokCap correct
                var arrowHead = [];
                arrowHead[0] = new Path.Line(new Point(0,0), new Point(-arrowHeadSize.width,-arrowHeadSize.height));
                arrowHead[1] = new Path.Line(new Point(0,0), new Point(arrowHeadSize.width,-arrowHeadSize.height));
                for (var i = 0; i < arrowHead.length; i++) {
                    arrowHead[i].rotate(180+paper.degrees(a), new Point(0,0));
                    arrowHead[i].translate(headPoint);
                }

                var group = new Group([ path, arrowHead[0], arrowHead[1] ]);
                group.name = 'arrow';
                return group;
            },


            /**
             *
             * FBubble
             * Create a simple speech bubble
             *
             * @param {Point} bubblePoint
             *          the position of the bubble
             * @param {Size} bubbleSize
             *          the size of the bubble
             * @param {Size} bubbleTagSize
             *          the size of the tag
             * @param {String} bubbleTagCenter
             *          (optional)
             *          'RANDOM'    randomly x-position the point (default)
             *          'LEFT'      left align the x-position of the point
             *          'CENTER'    center align the x-position of the point
             *          'RIGHT'     right align the x-position of the point
             *
             * @example
             * var bubblePoint = new Point(45,45);
             * var bubbleSize = new paper.Size(90,60);
             * var bubbleTagSize = new paper.Size(9,9);
             * var bubbleTagCenter = 'CENTER';
             * var bubble = new paper.Path.FBubble(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter);
             *
             */
            FBubble: function(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter) {
                var path = new Path();
                path.name = 'bubble';

                var bubbleTagSize = bubbleTagSize || defaultFBubbleTagSize;
                if (bubbleSize.width < 10) {
                    bubbleSize.width = 10;
                    bubbleTagSize = new Size(10,10);
                }
                var bubbleTagCenter = bubbleTagCenter || 'RANDOM';

                // left side of bubble
                path.add(new Point(0,0));
                var angle = 180;
                var through = new Point(
                    bubbleSize.height/2 + Math.cos(paper.radians(angle) ) * (bubbleSize.height),
                    bubbleSize.height/2 + Math.sin(paper.radians(angle) ) * (bubbleSize.height)
                );
                path.arcTo(through, new Point(0,bubbleSize.height));

                // middle bottom
                // create tag space somewhere along the bottom of the bubble
                var tagStart = paper.randomInt(0,bubbleSize.width-bubbleTagSize.width);

                // create tag
                path.add(new Point(tagStart,bubbleSize.height));

                var tx, ty;
                if (bubbleTagCenter == 'LEFT') {
                    tx = tagStart;
                }
                else if (bubbleTagCenter == 'CENTER') {
                    tx = tagStart + (bubbleTagSize.width/2);
                }
                else if (bubbleTagCenter == 'RIGHT') {
                    tx = tagStart+bubbleTagSize.width;
                }
                else { // if (bubbleTagCenter == 'RANDOM') {
                    tx = paper.randomInt(tagStart,tagStart+bubbleTagSize.width);
                }

                // the length of the tag
                ty = bubbleSize.height + bubbleTagSize.height;
                path.add(new Point(tx,ty));

                // continue bottom
                path.add(new Point(tagStart+bubbleTagSize.width,bubbleSize.height));
                path.add(new Point(bubbleSize.width,bubbleSize.height));


                // right side of bubble
                angle = 0;
                through = new Point(
                    bubbleSize.height/2 + Math.cos(paper.radians(angle) ) * (bubbleSize.height/2),
                    bubbleSize.height/2 + Math.sin(paper.radians(angle) ) * (bubbleSize.height/2)
                );
                path.arcTo(new Point(bubbleSize.width,0), false);

                // middle top
                path.closed = true;

                // center the bubble
                // compensated for the tag's length
                path.position = new Point(bubblePoint.x,bubblePoint.y+(bubbleTagSize.height/2));

                return path;
            },


            /**
             * FChain
             * Create simple chain (a line with different endpoint sizes)
             *
             * @param {Point} arg0
             *          point1 The first point (endpoint1)
             * @param {Number} arg1
             *          radius of endpoint1
             * @param {Point} arg2
             *          point2 The second point (endpoint2)
             * @param {Number} arg3
             *          radius of endpoint2
             *
             * @example
             * var point1 = new Point(9,9);
             * var radius1 = 9;
             * var point2 = new Point(90,90);
             * var radius2 = 90;
             * var fchain = new paper.Path.FChain(point1, radius1, point2, radius2);
             *
             */
            /**
             *
             * @param {Path} arg0
             *          PathItem (endpoint1)
             * @param {Path} arg1
             *          PathItem (endpoint2)
             *
             * @example
             * var path1 = new paper.Path.Circle(new Point(9,9), 9);
             * var path2 = new paper.Path.Circle(new Point(90,90), 90);
             * var fchain = new paper.Path.FChain(path1, path2);
             *
             */
            FChain: function(arg0, arg1, arg2, arg3) {
                var obj1, obj2;

                // check for the type of arguments being passed
                if (paper.getType(arg0) === 'Point') {
                    obj1 = new Path.Circle(arg0, arg1);
                    obj2 = new Path.Circle(arg2, arg3);
                }
                else {
                    obj1 = arg0;
                    obj2 = arg1;
                }

                var tangents = paper.getCommonTangents(obj1, obj2);
                var path = new Path();
                if (tangents != null) {
                    path.name = 'chain';
                    path.add(tangents[0]);
                    path.add(tangents[1]);

                    // determine position of chain around endpoint2
                    if (obj2.position.x > obj1.position.x) {
                        angle = 0;
                    }
                    else if (obj2.position.y < obj1.position.y) {
                        angle = -90;
                    }
                    else if (obj2.position.y > obj1.position.y) {
                        angle = 90;
                    }
                    else {
                        angle = 180;
                    }
                    var tp2 = new Point(
                        obj2.position.x + Math.cos(paper.radians(angle) ) * (obj2.bounds.width/2),
                        obj2.position.y + Math.sin(paper.radians(angle) ) * (obj2.bounds.height/2)
                    );
                    path.arcTo(tp2, tangents[2]);

                    path.add(tangents[2]);
                    path.add(tangents[3]);

                    // determine position of chain around endpoint1
                    if (obj1.position.x > obj2.position.x) {
                        angle = 0;
                    }
                    else if (obj1.position.y < obj2.position.y) {
                        angle = -90;
                    }
                    else if (obj1.position.y > obj2.position.y) {
                        angle = 90;
                    }
                    else {
                        angle = 180;
                    }
                    var tp1 = new Point(
                        obj1.position.x + Math.cos(paper.radians(angle) ) * (obj1.bounds.width/2),
                        obj1.position.y + Math.sin(paper.radians(angle) ) * (obj1.bounds.height/2)
                    );
                    path.arcTo(tp1, tangents[0]);
                    path.closed = true;
                }
                return path;

            },


            /**
             *
             * FCross
             * Create a cross
             *
             * @param {Point} centerPoint
             *          position of cross
             * @param {Size} size
             *          size [width,height] of cross
             * @param {Number} strokeWidth
             *          thickness of the cross
             * @param {String} crossType (optional)
             *          'SHARP'     sharp edged cross (fill)
             *          'LINE'      simple built of lines (stroke)
             *
             * @example
             * var centerPoint = new Point(45,45);
             * var size = new paper.Size(45,45);
             * var strokeWidth = 18;
             * var crossType = 'LINE';
             * var fcross = new paper.Path.FCross(centerPoint, size, strokeWidth, crossType);
             *
             */
            FCross: function(centerPoint, size, strokeWidth, crossType) {
                var strokeWidth = strokeWidth || 1.0;
                var crossType = crossType || 'LINE';

                // var centerPoint = new Point(_x,_y);
                // var size = new Size(_width,_height);
                var line1, line2;

                if (crossType == 'LINE') {
                    line1 = new Path.Line(
                        centerPoint.x + size.width, centerPoint.y - size.height,
                        centerPoint.x - size.width, centerPoint.y + size.height
                    );
                    line1.strokeWidth = strokeWidth;
                    line2 = new Path.Line(
                        centerPoint.x + size.width, centerPoint.y + size.height,
                        centerPoint.x - size.width, centerPoint.y - size.height
                    );
                    line2.strokeWidth = strokeWidth;
                }
                else if (crossType == 'SHARP') {
                    line1 = new Path();
                    line1.add(new Point(centerPoint.x + size.width, centerPoint.y - size.height ));
                    line1.add(new Point(centerPoint.x + size.width, (centerPoint.y - size.height) + (strokeWidth/2) ));
                    line1.add(new Point((centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y + size.height ));
                    line1.add(new Point(centerPoint.x - size.width, centerPoint.y + size.height ));
                    line1.add(new Point(centerPoint.x - size.width, (centerPoint.y + size.height) - (strokeWidth/2) ));
                    line1.add(new Point((centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y - size.height ));
                    line1.closed = true;

                    line2 = new Path();
                    line2.add(new Point(centerPoint.x - size.width, centerPoint.y - size.height ));
                    line2.add(new Point((centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y - size.height ));
                    line2.add(new Point(centerPoint.x + size.width, (centerPoint.y + size.height) - (strokeWidth/2) ));
                    line2.add(new Point(centerPoint.x + size.width, centerPoint.y + size.height ));
                    line2.add(new Point((centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y + size.height ));
                    line2.add(new Point(centerPoint.x - size.width, (centerPoint.y - size.height) + (strokeWidth/2) ));
                    line2.closed = true;
                }

                var group = new Group([ line1, line2 ]);
                group.name = 'cross';
                return group;
            },


            /**
             * FDrip
             * Create a (tear)drop
             *
             * @param {Point} centerPoint
             *          position of cross
             * @param {Number} arg1
             *          scale drop, maintains intended proportion
             *
             * @example
             * var centerPoint = new Point(45,45);
             * var scale = 45;
             * var fdrop = new paper.Path.FDrip(centerPoint, scale);
             *
             */
            /**
             *
             * @param {Point} centerPoint
             *          position of cross
             * @param {Size} arg1
             *          scale drop, custom proportion
             *
             * @example
             * var centerPoint = new Point(45,45);
             * var scale = new paper.Size(30,61.8);
             * var fdrop = new paper.Path.FDrip(centerPoint, scale);
             *
             */
            FDrip: function(centerPoint, arg1) {
                var path = new Path();
                path.name = 'drop';

                // segments added from top counter-clockwise
                path.add(new Segment(
                    new Point(-0.01, 0.01),
                    new Point(0, -0.0055078),
                    new Point(0, 0.643042)
                ));
                path.add(new Segment(
                    new Point(-0.65, 1.6381104),
                    new Point(0, -0.6109619),
                    new Point(0, 0.3694434)
                ));
                path.add(new Segment(
                    new Point(0, 2.31),
                    new Point(-0.3578369, 0),
                    new Point(0.3578369, 0)
                ));
                path.add(new Segment(
                    new Point(0.65, 1.6381104),
                    new Point(0, 0.3694434),
                    new Point(0, -0.6109619)
                ));
                path.add(new Segment(
                    new Point(0.01, 0.01),
                    new Point(0, 0.643042),
                    new Point(0, -0.0055078)
                ));
                path.add(new Segment(
                    new Point(0, -0),
                    new Point(0.0055078, 0),
                    new Point(-0.0055078, 0)
                ));
                path.closed = true;
                path.position = centerPoint;

                // check for the type of arguments being passed
                // default scale is from center (position)
                if (typeof arg1 == 'Size') {
                    path.scale(arg1.width, arg1.height);
                }
                else {
                    path.scale(arg1);
                }

                return path;
            },


            /**
             * FTriangle
             * Create a triangle
             *
             * @param {Point} arg0
             *          first point of triangle
             * @param {Point} arg1
             *          second point of triangle
             * @param {Point} arg2
             *          third point of triangle
             *
             * @example
             * var p1 = new Point(9, 9);
             * var p2 = new Point(90, 45);
             * var p3 = new Point(45, 90);
             * var ftriangle = new paper.Path.FTriangle(p1, p2, p3);
             *
             */
             /**
              *
              * @param {Point} arg0
              *          center point of triangle
              * @param {Number} arg1
              *          radius of triangle
              *
              * @example
              * var p1 = new Point(45, 45);
              * var radius = 90;
              * var ftriangle = new paper.Path.FTriangle(p1, radius);
              *
              */
            FTriangle: function(arg0, arg1, arg2) {
                var path;
                if (arguments.length === 3) {
                    path = new Path();
                    path.add(arg0);
                    path.add(arg1);
                    path.add(arg2);
                }
                else if (arguments.length === 2) {
                    path = new Path.RegularPolygon(arg0, 3, arg1);
                }
                else {
                    return;
                }
                path.closed = true;
                path.name = 'triangle';

                return path;
            }
        }; // end return


    } // end statics:
});

/*
 *
 * FPoint.js
 *
 * A collection of extensions for paper.Point
 *
 */


/**
 *
 * paper.Point
 *
 */
paper.Point.inject({
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    name: null,
    data: {},



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     *
     * http://gmc.yoyogames.com/index.php?showtopic=290349
     *
     * @param {Size} spacing
     *          scale.width  = x scale of the grid.
     *          scale.height = y scale of the grid.
     * @param {Object} options
     *          { grid: true }
     *          { isometric: true }
     *
     * @return {Point} snapped Point
     *
     */
    /**
     *
     * @param {Number} scale
     *          scale of the grid
     * @param {Object} options
     *          { grid: true }
     *          { isometric: true }
     *
     * @return {Point} snapped Point
     *
     */
    snap: function(scale, options) {
        var options = (options != undefined)
            ? options
            : { grid: true, isometric: false };
        var scale = (scale.type === 'Size')
            ? scale
            : new Size(scale,scale);

        var ix, iy;
        if (options.isometric === true) {
            ix = Math.round(this.y/(16*scale.height) - this.x/(32*scale.width));
            iy = Math.round(this.y/(16*scale.height) + this.x/(16*scale.width));
            this.x = (iy - ix)/2*(32*scale.width);
            this.y = (iy + ix)/2*(16*scale.height);
        }
        else {
            ix = Math.round(this.y/scale.height - this.x/scale.width);
            iy = Math.round(this.y/scale.height + this.x/scale.width);
            this.x = (iy - ix)/2*scale.width;
            this.y = (iy + ix)/2*scale.height;
        }

        return this;
    },

    /**
     *
     * https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
     *
     * @param {Point} arg0
     *      interpolates the point towards a given target point
     * @param {Number} arg1
     *      (0.0 - 1.0) interpolation factor
     * @return {Point} interpolated Point
     *
     * @example
     * var point = new Point(0, 0);
     * var arg0 = new Point(100, 100);
     * point.interpolateTo(arg0, 0.5); // {x: 50, y: 50}
     *
     */
    interpolateTo: function(arg0, arg1) {
        // this.x += ((arg0.x - this.x) * arg1);
        // this.y += ((arg0.y - this.y) * arg1);
        // return this;
        return new Point(
            this.x + ((arg0.x - this.x) * arg1),
            this.y + ((arg0.y - this.y) * arg1)
        );
    },

    /**
     * Flip the X axis
     *
     * @return {Point}
     *
     */
    invertX: function() {
        this.x = view.bounds.width - this.x;
        return this;
    },

    /**
     * Flip the Y axis
     *
     * @return {Point}
     *
     */
    invertY: function() {
        this.y = view.bounds.height - this.y;
        return this;
    },

    /**
     * Returns the distance between the point and the center of the canvas
     *
     * @return {Number}
     *
     */
    getDistanceToCenter: function() {
        // var dx = this.x - view.bounds.center.x;
        // var dy = this.y - view.bounds.center.y;
        // return (dx * dx + dy * dy) + 1;
        return this.getDistance( view.bounds.center );
    },

    /**
     * Returns the mid between two points
     *
     * @return {Point}
     *
     * @example
     * var point1 = new Point(0, 90);
     * var point2 = new Point(90, 180);
     * var result = point1.getMid(point2); // { x: 45, y: 135 }
     *
     */
    getMid: function(point) {
        return new Point((this.x + point.x) / 2, (this.y + point.y) / 2);
    },

    /**
     * Returns the perpendicular bisector of two points
     * TODO: test! test! test!
     *
     * @param  {Point} point
     * @param  {Number} scale (default: 1.0)
     *
     * @return {Object}
     * {
     *  start : {Point}, // starting point of bisector
     *  mid   : {Point}, // mid point of bisector
     *  end   : {Point}  // end point of bisector
     * }
     *
     * @example
     * var point1 = new Point(0, 90);
     * var point2 = new Point(90, 180);
     * var result = point1.getPerpendicularBisector(point2);
     *
     */
    /**
     * @param  {Point} point
     * @param  {String} scale 'fit' will scale the bisector to fit view
     *
     * @return {Object}
     * {
     *  start : {Point}, // starting point of bisector
     *  mid   : {Point}, // mid point of bisector
     *  end   : {Point}  // end point of bisector
     * }
     *
     * @example
     * var point1 = new Point(0, 90);
     * var point2 = new Point(90, 180);
     * var result = point1.getPerpendicularBisector(point2, 'fit');
     *
     */
    getPerpendicularBisector: function(point, scale) {
       var line = new Path.Line(this, point);
       line.setRotation(90);

       scale = scale || 1.0;
       if (scale === 'fit') {
           scale = view.size.getArea() / line.bounds.size.getArea();
       }
       line.setScaling(scale, scale);

       var result = {
           start : line.segments[0].point,
           mid   : line.position,
           end   : line.segments[1].point
       }
       line.remove();

       return result;
    },

    /**
     * Returns slope of two points
     * TODO: slope ratio?
     *
     * @param  {Point} point
     *
     * @return {Number} slope ratio
     *
     */
    getSlope: function(point) {
        return paper.slopeRatio(this, point);
    },

    /**
     *
     * Returns the heading angle (radians) of a point
     *
     * @return {Number} vector heading of Point
     *
     * @example
     * var point = new Point(0, 90);
     * var result = point.getHeading();
     * console.log( paper.degrees(result) ); // 90
     *
     */
    getHeading: function() {
        return -1 * (Math.atan2(-this.y, this.x));
    },

    /**
     * Get the vector angle (radians) of two points
     *
     * @param {Point} point1
     *      first point
     * @param {Point} point2
     *      second point
     *
     * @return {Number} vector angle (radians)
     *
     * @example
     * var point1 = new Point(0, 90);
     * var point2 = new Point(90, 180);
     * var result = point1.getAngle(point2);
     * console.log( paper.degrees(result) ); // 45
     *
     */
    getAngle: function(point2) {
        var point2 = point2 || new Point(0, 0);
        return Math.atan2(point2.y - this.y, point2.x - this.x);
    },

    /**
     * Normalize a point between two other points (start and end).
     *
     * @param {Point} start
     *          start Point
     * @param {Point} stop
     *          stop Point
     *
     * @return {Point} normalized Point
     *
     * @example
     * var point = new Point(30, 270);
     * var start = new Point(90, 180);
     * var stop = new Point(180, 360);
     * point.norm(start, stop); // { x: -0.66667, y: 0.5 }')
     *
     */
    norm: function(start, stop) {
        this.x = paper.normalize(this.x, start.x, stop.x);
        this.y = paper.normalize(this.y, start.y, stop.y);
        return this;
    },

        // /**
    //  *
    //  * @return {Point} limit Point
    //  *
    //  */
    // limit: function(lim) {
    //  if (this.magSq() > lim * lim) {
    //      this.normalize();
    //      this.mult * lim;
    //      return this;
    //  }
    //  return this;
    // },

    /**
     * @return {Number} vector mag squared
     *
     * @example
     * var point = new Point(0, 90);
     * var result = point.magSq();
     * console.log(result); // 8100
     *
     */
    magSq: function() {
        return this.x * this.x + this.y * this.y;
    },

    statics: {
        /**
         * @param {Point} arg0
         *      starting Point
         * @param {Point} arg1
         *      ending Point
         * @param {Number} arg2
         *      (0.0 - 1.0) interpolate factor
         *
         * @return {Point} new interpolated Point
         *
         * @example
         * var start = new Point(0, 30);
         * var end = new Point(360, 90);
         * var interpolate = new Point.interpolateTo( start, end, 0.5 );
         * console.log( interpolate ); // { x: 180, y: 60 }
         *
         */
        interpolateTo: function(arg0, arg1, arg2) {
            return arg0.interpolateTo(arg1, arg2);
        },

        /**
         * Flip the X axis
         *
         * @param {Point} point
         *
         * @return {Point}
         *
         */
        invertX: function(point) {
            var point = new Point(point);
            return point.invertX();
        },

        /**
         * Flip the Y axis
         *
         * @param {Point} point
         *
         * @return {Point}
         *
         */
        invertY: function(point) {
            var point = new Point(point);
            return point.invertY();
        },

        /**
         * @param {Array} arg0
         *          range for x values
         * @param {Array} arg1
         *          range for y values
         *
         * @return {Point} random point
         *
         * @example
         * var point = new Point.random([0, 90],[0, 90]);
         * console.log(point); // {x: 34, y: 56}
         *
         */
        /**
         * @param {Number} arg0
         *          max x value
         * @param {Number} arg1
         *          max y value
         *
         * @return {Point} random Point
         *
         * @example
         * var point = new Point.random(90, 90);
         * console.log(point); // {x: 34, y: 56}
         *
         */
        random: function(arg0, arg1) {
            var x = ( typeof arg0 === 'array' )
                ? paper.random(arg0[0], arg0[1])
                : paper.random(arg0);
            var y = ( typeof arg0 === 'array' )
                ? paper.random(arg1[0], arg1[1])
                : paper.random(arg1);

            return new Point(x,y);
        }
    }

});

/*
 *
 * FSize.js
 *
 * A collection of extensions for paper.Size
 *
 */


/**
 *
 * paper.Size
 *
 */
paper.Size.inject({
    /**
     *
     * @return {Number} area
     *
     * @example
     * var size = new Size(10, 20);
     * var a = size.getArea(); // 200
     *
     */
    getArea: function() {
        return (this.width * this.height);
    },

    /**
     *
     * @return {Number} area of Item circumcircle
     *
     * @example
     * var size = new Size(10, 20);
     * var a = size.getCircumarea(); // 200
     *
     */
     getCircumarea: function() {
        var r = this.getCircumradius();
        return Math.PI * (r*r);
    },

    /**
     *
     * @return {Number} area of Item incircle
     *
     * @example
     * var size = new Size(10, 20);
     * var a = size.getIncirclearea(); // 200
     *
     */
     getIncirclearea: function() {
        var r = this.getIncircleradius();
        return Math.PI * (r*r);
    },

    /**
     *
     * @return {Number} the circumcircle radius of the Size bounding box
     *
     * @example
     * var size = new Size(10, 20);
     * var r = size.getCircumradius(); // 11.180339887498949
     *
     */
    getCircumradius: function() {
        var a = this.width;
        var b = this.height;
        return (Math.sqrt(a * a + b * b) / 2);
    },

    /**
     *
     * @return {Number} the incircle radius of the Size bounding box
     *
     * @example
     * var size = new Size(10, 20);
     * var r = size.getIncircleradius();
     * console.log( r ); // XX
     *
     */
    getIncircleradius: function() {
        return ( this.width < this.height )
            ? this.width/2
            : this.height/2;
    },

    /**
     *
     * Slope is expressed as rise (x) over run (y)
     *
     * @return {Number} angle in radians
     *
     * @example
     * var slope = new Size(10, 20);
     * var result = size.getSlopeAngle();
     * console.log( paper.degrees(result) ); // 26.56
     *
     */
    getSlopeAngle: function() {
        return Math.atan( this.width/this.height );
    }

});

/*
 *
 * FTextItem.js
 *
 * A collection of extensions for paper.TextItem
 *
 */


/**
 *
 * paper.TextItem
 *
 */
paper.TextItem.inject({
    // ------------------------------------------------------------------------
    /**
     *
     * @return {String} content which will will fit within the bounds of the TextItem
     *
     */
    trimToFit: function() {
        var visibleContent = this.visibleRange.content.trim();
        this.content = visibleContent;
        return this;
    }

});



/*
 *
 * FTime.js
 *
 * Core FTime Methods
 *
 */


folio.FTime = {
    // ------------------------------------------------------------------------
    //
    // Namespaces
    //
    // ------------------------------------------------------------------------
    // Time/Timing Support
    FDate: {},
    FStopwatch: {},

    // Animation Support
    FStepper: {},
    Ease: {}

};

/*
 *
 * Easing.js
 *
 * Easing Functions
 * originally inspired from http://gizma.com/easing/
 * https://gist.github.com/gre/1650294
 *
 * KeySpline Function
 * use bezier curve for transition easing function
 * as inspired from Firefox's nsSMILKeySpline.cpp
 * https://gist.github.com/gre/1926947#file-keyspline-js
 * http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
 *
 * Copyright (c) 2012
 *
 * Gaetan Renaudeau
 * renaudeau.gaetan@gmail.com
 *
 *
 * modified and augemented for usage with Paper.js
 *
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */


folio.FTime.Ease = function() {
    /*
     *
     * values of classic easing functions, similar to CSS
     *
     */
    var splineValues = {
        ease:       [ 0.25, 0.1, 0.25, 1.0 ],
        linear:     [ 0.00, 0.0, 1.00, 1.0 ],
        // in:          [ 0.42, 0.0, 1.00, 1.0 ],
        out:        [ 0.00, 0.0, 0.58, 1.0 ],
        inOut:      [ 0.42, 0.0, 0.58, 1.0 ]
    };


    /**
     *
     * use bezier curve for transition easing function
     *
     * @param {Array} arg0
     *              an array (4) of normalized X,Y values [ x1, y1, x2, y2 ]
     *
     * @example
     * var spline = new KeySpline(0.25, 0.1, 0.25, 1.0)
     * spline.get(t) // returns the normalized easing value | t must be in [0, 1] range
     *
     */
    /**
     *
     * use bezier curve for transition easing function
     *
     * @param {Point} arg0
     *              Point 1
     * @param {Point} arg1
     *              Point 2
     *
     * @example
     * var spline = new KeySpline(
     *  new Point( 80, 80 ),
     *  new Point( 10, 45 )
     * );
     * spline.get(t) // returns the normalized easing value | t must be in [0, 1] range
     *
     * @return {Array}
     *
     */
    function KeySpline(arg0, arg1) {
        var values;
        if (arg0 instanceof Array) {
            values = arg0;
        }
        else {
            arg0 = arg0.normalize();
            arg1 = arg1.normalize();
            values = [arg0.x, arg0.y, arg1.x, arg1.y];
        }

        function A(arg0, arg1) { return 1.0 - 3.0 * arg1 + 3.0 * arg0; };
        function B(arg0, arg1) { return 3.0 * arg1 - 6.0 * arg0; };
        function C(arg0) { return 3.0 * arg0; };


        //
        // TODO: push these to be global?
        //
        /**
         * @param {Number} t
         *              a float from 0.0 - 1.0
         * @param {Number} arg0
         *              x1 or y1
         * @param {Number} arg1
         *              x2 or y2
         *
         * @return {Number} x(t)
         *
         */
        function CalcBezier(t, arg0, arg1) {
            return ((A(arg0, arg1)*t + B(arg0, arg1))*t + C(arg0))*t;
        };

        /**
         * @param {Number} t
         *              a float from 0.0 - 1.0
         * @param {Number} arg0
         *              x1 or y1
         * @param {Number} arg1
         *              x2 or y2
         *
         * @return {Number} dx/dt
         *
         */
        function GetSlope(t, arg0, arg1) {
            return 3.0 * A(arg0, arg1)*t*t + 2.0 * B(arg0, arg1) * t + C(arg0);
        };

        function GetTForX(t) {
            // Newton raphson iteration
            var aGuessT = t;
            for (var i = 0; i < 4; ++i) {
                var currentSlope = GetSlope(aGuessT, values[0], values[2]);
                if (currentSlope == 0.0) return aGuessT;
                var currentX = CalcBezier(aGuessT, values[0], values[2]) - t;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        };


        function get(t) {
            // normalize();
            if (values[0] == values[1] && values[2] == values[3]) return t; // linear
            return CalcBezier(GetTForX(t), values[1], values[3]);
        };


        return {
            get: get
        };

    };


    return {
        /*
         * see http://easings.net/de for visual examples
         * of each spline method
         */
        linear     : function(t) { return t },

        inQuad     : function(t) { return t*t },
        outQuad    : function(t) { return t*(2-t) },
        inOutQuad  : function(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

        inCubic    : function(t) { return t*t*t },
        outCubic   : function(t) { return (--t)*t*t+1 },
        inOutCubic : function(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

        inQuart    : function(t) { return t*t*t*t },
        outQuart   : function(t) { return 1-(--t)*t*t*t },
        inOutQuart : function(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

        inQuint    : function(t) { return t*t*t*t*t },
        outQuint   : function(t) { return 1+(--t)*t*t*t*t },
        inOutQuint : function(t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

        inSine     : function(t) { return -1*Math.cos(t*(Math.PI/2))+1 },
        outSine    : function(t) { return 1*Math.sin(t*(Math.PI/2)) },
        inOutSine  : function(t) { return -0.5*(Math.cos(Math.PI*t)-1) },

        inExpo     : function(t) { return 1*Math.pow(2, 10*(t-1)) },
        outExpo    : function(t) { return 1*(-Math.pow(2, -10*t)+1 ) },
        inOutExpo  : function(t) { t /= 0.5; if (t < 1) return 0.5 * Math.pow(2, 10*(t-1)); t--; return 0.5 * (-Math.pow(2, -10*t)+2); },

        inCirc     : function(t) { return -1*(Math.sqrt(1-t*t)-1) },
        outCirc    : function(t) { t--; return 1*Math.sqrt(1-t*t); },
        inOutCirc  : function(t) { t /= 0.5; if (t<1) { return -0.5*(Math.sqrt(1-t*t)-1); }else{ t-=2; return 0.5*(Math.sqrt(1-t*t)+1); } },


        spline     : KeySpline
        // values     : splineValues
    };

};

/*
 *
 * FDate.js
 *
 */


folio.FTime.FDate = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var dateObj = new Date();
    var monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var shortMonthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    var addZero = function(val) {
        if (val.length === 1) {
            val = '0' + val;
        }
        return val;
    };

    /**
     * @return {String} return the current year as 'YYYY'
     */
    var year = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        var year = String(dateObj.getFullYear());
        return year;
    };

    /**
     * @return {String} return the current month as 'MM'
     */
    var month = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        return String(dateObj.getMonth());
    };

    /**
     * @return {String} return the current day as 'DD'
     */
    var day = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        return String(dateObj.getDate());
    };

    /**
     * @return {String} return the current week day
     */
    var weekday = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        return String(daysArr[dateObj.getDay()]);
    };
    /**
     * @return {String} return the current hour as 'HH'
     */
    var hour = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        var hour = String(dateObj.getHours());
        return addZero(hour);
    };

    /**
     * @return {String} return the current minute as 'mm'
     */
    var minute = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        var minute = String(dateObj.getMinutes());
        return addZero(minute);
    };

    /**
     * @return {String} return the current second as 'ss'
     */
    var second = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        var second = String(dateObj.getSeconds());
        return addZero(second);
    };

    /**
     * @return {String} return the current date as "yyyyMMdd"
     */
    var date = function() {
        return year() + month() + day();
    };

    /**
     * @param {Array} format
     *      boolean array = [hours, minutes, seconds]
     *
     * @return {String} the current time
     */
    var now = function(format) {
        var disp = format || [true, true, true];
        var str = '';
        if (disp[0]) {
            str += hour();
        }
        if (disp[0] && disp[1]) {
            str += ':';
        }
        if (disp[1]) {
            str += minute();
        }
        if (disp[1] && disp[2]) {
            str += ':';
        }
        if (disp[2]) {
            str += second();
        }
        return str;
    };

    /**
     * @return {Number} the current time in milliseconds
     */
    var nowMilliseconds = function() {
        return toMillsecond(hour(), minute(), second());
    };

    /**
     * add to time
     *
     * @param {Number} d
     *      days
     * @param {Number} h
     *      hours
     * @param {Number} m
     *      minutes
     * @param {Number} s
     *      seconds
     *
     * @return {Object} new time
     */
    var add = function(d, h, m, s) {
        return dateObj + (24 * d + 60 * h + 60 * m + 1000 * s);
    };

    /**
     * subtract from time
     *
     * @param {Number} d
     *      days
     * @param {Number} h
     *      hours
     * @param {Number} m
     *      minutes
     * @param {Number} s
     *      seconds
     *
     * @return {Object} new time
     */
    var sub = function(d, h, m, s) {
        return dateObj - (24 * d + 60 * h + 60 * m + 1000 * s);
    };


    // ------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     * set to a specific time
     *
     * @param {Number} d
     *      days
     * @param {Number} h
     *      hours
     * @param {Number} m
     *      minutes
     * @param {Number} s
     *      seconds
     *
     * @return {Object} time
     */
    var set = function(d, h, m, s) {
        time = new Date();
        time.setTime((24 * d + 60 * h + 60 * m + 1000 * s));
        return time;
    };


    //
    // Gets
    //
    /**
     * @param {Number} ms
     *      as milliseconds
     * @param {Array} format
     *      boolean array = [hours, minutes, seconds]
     *
     * @return {String} human readable default is hh:mm:ss
     */
    var get = function(ms, format) {
        var disp = format || [true, true, true];
        var seconds = parseInt((ms / 1000) % 60);
        var minutes = parseInt(((ms / 1000) / 60) % 60);
        var hours   = parseInt((((ms / 1000) / 60) / 60) % 24);

        var hh, mm, ss;
        if (hours < 10) hh = '0' + hours;
        else hh =  '' + hours;
        if (minutes < 10) mm = '0' + minutes;
        else mm =  '' + minutes;
        if (seconds < 10) ss = '0' + seconds;
        else ss =  '' + seconds;

        var str = '';
        if (disp[0]) {
            str += hh;
        }
        if (disp[0] && disp[1]) {
            str += ':';
        }
        if (disp[1]) {
            str += mm;
        }
        if (disp[1] && disp[2]) {
            str += ':';
        }
        if (disp[2]) {
            str += ss;
        }
        return str;
    };

    /**
     * @param {String} h
     *      as hh:mm:ss OR mm:ss
     *
     * @return {Number} time in milliseconds
     */
    /**
     * @param {Number} h
     *      hours
     * @param {Number} m
     *      minutes
     * @param {Number} s
     *      seconds
     *
     * @return {Number} time in milliseconds
     */
    var toMillsecond = function(h, m, s) {
        if (m === undefined && s === undefined) {
            h = toArray(h)[0];
            m = toArray(h)[1];
            s = toArray(h)[2];
        }
        return parseInt(3600000 * h + 60000 * m + 1000 * s);
    };

    /**
     * @param {String} str
     *      string as hh:mm:ss
     *
     * @return {Array} array of time [0] hours [1] minutes [2] seconds
     */
    var toArray = function(str) {
        var hms = str.split(':');
        return [hms[0], hms[1], hms[2]];
    };



    // -----------------------------------------------------------------------------
    return {
        year            : year,
        month           : month,
        day             : day,
        hour            : hour,
        minute          : minute,
        second          : second,
        date            : date,
        now             : now,
        nowMilliseconds : nowMilliseconds,

        add             : add,
        sub             : sub,

        set             : set,
        get             : get,

        toMillsecond    : toMillsecond,
        toArray         : toArray
    };

};



/*
 *
 * FStepper.js
 *
 */


folio.FTime.FStepper = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var stepMillis = 1000; // Set to default of 1s OR 1000ms

    var timeStart = 0.0;
    var timeEnd = 0.0;

    var bToggleStart = 0;
    var bBeginStepper = false;
    var bIn = false;
    var bOut = false;
    var bDone = true;

    var easing = 0.05;
    var bEase = true;

    var delta = 1.0;
    var counter = 0;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     *
     * toggle (start/stop) the stepper
     *
     * @return {Number} start status
     *
     */
    var toggle = function() {
        if (bToggleStart === 0) {
            bToggleStart = 1;
            stepOut();
        }
        else {
            bToggleStart = 0;
            stepIn();
        }
        return bToggleStart;
    };

    // ------------------------------------------------------------------------
    /**
     * required function to keep the timing in sync
     * with the application
     *
     * @param {Number} currentSeconds
     *      the elapsed time of the application in seconds
     */
    function update(currentSeconds) {
        if (bBeginStepper) {
            bBeginStepper = false;
            timeStart = currentSeconds;
            if (bIn) {
                timeEnd = paper.round((currentSeconds + ((1.0 - delta) * stepMillis)), 3);
            }
            else {
                timeEnd = paper.round((currentSeconds + (delta*stepMillis)), 3);
            }
            if (timeEnd <= currentSeconds) {
                if (bIn) {
                    bIn = false;
                    delta = 1.0;
                }
                else {
                    bOut = false;
                    delta = 0.0;
                }
            }
        }
        if (bIn) {
            delta = paper.round((1.0 - ((timeEnd - currentSeconds) / stepMillis)), 3);
            if (currentSeconds == timeEnd) {
                bIn = false;
                delta = 1.0;
                counter++;
                return;
            }
        }
        else if (bOut) {
            delta = paper.round(((timeEnd - currentSeconds) / stepMillis), 3);
            if (currentSeconds == timeEnd) {
                bIn = false;
                delta = 0.0;
                counter++;
                return;
            }
        }
    }

    // ------------------------------------------------------------------------
    /**
     *
     * toggle stepping in (++)
     *
     */
    var stepIn = function() {
        bBeginStepper = true;
        bIn = true;
        bOut = false;
        if (bIn) {
            return;
        }
        if (delta === 1.0) {
            return;
        }
    };

    /**
     *
     * toggle stepping out (--)
     *
     */
    var stepOut = function() {
        bBeginStepper = true;
        bOut = true;
        bIn = false;
        if (bOut) {
            return;
        }
        if (delta === 0.0) {
            return;
        }
    };

    // ------------------------------------------------------------------------
    /**
     * @return {Boolean} if the object is stepping in (going down)
     */
    var isIn = function() {
        return bIn;
    };
    /**
     * @return {Boolean} if the object is stepping out (going up)
     */
    var isOut = function() {
        return bOut;
    };

    /**
     * @return {Boolean} if the object has finished it's stepping
     */
    var isDone = function() {
        if (delta < 1.0 && delta > 0.0) {
            return false;
        }
        else if (delta > 1.0) {
            delta = 1.0;
            return true;
        }
        else if (delta < 0.0) {
            delta = 0.0;
            return true;
        }
    };

    // ------------------------------------------------------------------------
    /**
     *
     * stop stepping
     *
     */
    function stop() {
        bBeginStepper = bIn = bOut = false;
    }

    /**
     * @return {Number}
     */
    var getDelta = function() {
        return delta;
    };

    /**
     * @return {Number}
     */
    var getCounter = function() {
        return counter;
    };


    // ------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     * @param {Number} seconds
     *      length of fade in seconds
     */
    function setSeconds(seconds) {
        setMillis(parseInt(seconds * 1000.0));
    }

    /**
     * @param {Number} millis
     *      length of fade in milliseconds
     */
    function setMillis(millis) {
        stepMillis = millis;
        stepMillis /= 1000;
    }

    /**
     * @param {Number} val
     *      set a value for the delta 0.0 - 1.0
     */
    function setDelta(val) {
        delta = val;
    }


    // ------------------------------------------------------------------------
    return {
        delta      : getDelta,
        counter    : getCounter,

        toggle     : toggle,
        update     : update,
        stepIn     : stepIn,
        stepOut    : stepOut,

        isIn       : isIn,
        isOut      : isOut,
        isDone     : isDone,

        stop       : stop,

        setSeconds : setSeconds,
        setMillis  : setMillis,
        setDelta   : setDelta
    };


};

/*
 *
 * FStopwatch.js
 *
 * A simple stopwatch
 *
 */


folio.FTime.FStopwatch = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var now;
    var then;
    var timeInMs = 0;
    var bStart = 0;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     *
     * toggle (start/stop) the stopwatch
     *
     */
    var toggle = function() {
        if (bStart == 0) {
            start();
        }
        else {
            pause();
        }
    };

    /**
     *
     * start the stopwatch
     *
     */
    var start = function() {
        // start
        bStart = 1;
        then = new Date();
        then.setTime(then.getTime() - timeInMs);
    };

    /**
     *
     * pause the stopwatch
     *
     */
    var pause = function() {
        // pause
        bStart = 0;
        now = new Date();
        timeInMs = now.getTime() - then.getTime();
    };

    /**
     *
     * reset the stopwatch
     *
     */
    var reset = function() {
        bStart = 0;
        timeInMs = 0;
    };



    // ------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     *
     * set the stopwatch
     *
     * @param {Number} ms
     *      milliseconds to start the stopwatch with
     * @param {Boolean} run
     *      whether the stopwatch should start or not
     *
     */
    var set = function(ms, run) {
        timeInMs = ms;
        bStart = (run) ? 0 : 1;
        // (run == true) ? bStart = 0 : bStart = 1;

        then = new Date();
        then.setTime(then.getTime() - timeInMs);
        toggle();
    };


    //
    // Gets
    //
    /**
     *
     * @return {Number} the time elapsed in milliseconds
     *
     */
    var get = function() {
        if (bStart == 1)  {
            now = new Date();
            timeInMs = now.getTime() - then.getTime();
        }
        return timeInMs;
    };

    /**
     *
     * @return {Boolean} whether the stopwatch is running
     *
     */
    var isRunning = function() {
        return (bStart === 0) ? true : false;
    };


    // ------------------------------------------------------------------------
    return {
        toggle: toggle,
        start: start,
        pause: pause,
        reset: reset,

        set: set,

        get: get,
        isRunning: isRunning
    };

};

/*
*
* FIO.js
*
* A collection of I/O methods
*
*/


folio.FIO = {
    // ------------------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------------------
    /*
     * Local Storage
     */

    /**
     * save a value using HTML5 Local Storage
     * http://www.w3schools.com/html/html5_webstorage.asp
     *
     * @param {String} name
     *          the name (key) of what we want to save
     * @param {Object} value
     *          what we want to save
     */
    saveLocal: function(name, value) {
        if (window.localStorage) {
            localStorage.setItem(name, String(value));
        }
        else {
            console.error('localStorage not supported');
        }
    },

    /**
     * retrieve saved value (default: as string)
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {String} float value
     */
    getLocal: function(name) {
        return localStorage.getItem(name);
    },

    /**
     * retrieve saved value as an int
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {Number} int value
     */
    getLocalInt: function(name) {
        return parseInt( getLocal(name) );
    },

    /**
     * retrieve saved value as a float
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {Number} float value
     */
    getLocalFloat: function(name) {
        return parseFloat( getLocal(name) );
    },

    /**
     * @return {Array} a list of all items saved in local storage
     *
     */
    getAllLocal: function() {
        return sessionStorage;

    },

    /**
     * delete a saved value from local storage
     *
     * @param {String} name
     *          the name (key) of what we want to delete
     */
    deleteLocal: function(name) {
        localStorage.removeItem(name);
    },



    // ------------------------------------------------------------------------
    /*
     * Session Storage
     */

    /**
     * save a value using HTML5 Session Storage
     * http://www.w3schools.com/html/html5_webstorage.asp
     *
     * @param {String} name
     *          the name (key) of what we want to save
     * @param {Object} value
     *          what we want to save
     */
    saveSession: function(name, value) {
        if (window.sessionStorage) {
            sessionStorage.setItem(name, String(value));
        }
        else {
            console.error('sessionStorage not supported');
        }
    },

    /**
     * retrieve saved value (default: as string)
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {String} string value
     */
    getSession: function(name) {
        return sessionStorage.getItem(name);
    },

    /**
     * retrieve saved value as an int
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {Number} int value
     */
    getSessionInt: function(name) {
        return parseInt( getSession(name) );
    },

    /**
     * retrieve saved value as a float
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {Number} float value
     */
    getSessionFloat: function(name) {
        return parseFloat( getSession(name) );
    },

    /**
     * @return {Arrat} a list of all items saved in session storage
     *
     */
    getAllSession: function() {
        return sessionStorage;

    },

    /**
     * delete a saved value from session storage
     *
     * @param {String} name
     *          the name (key) of what we want to delete
     *
     */
    deleteSession: function(name) {
        sessionStorage.removeItem(name);
    },


    // ------------------------------------------------------------------------
    /*
     * Cookies
     * http://www.quirksmode.org/js/cookies.html
     */

    /**
     * save a value as a cookie
     *
     * @param {String} name
     *          the name (key) of what we want to save
     * @param {Object} value
     *          what we want to save
     * @param {Number} days
     *          how many days do we want to save it for
     */
    saveCookie: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            var expires = '; expires=' + date.toGMTString();
        }
        else var expires = '';
        document.cookie = name + '=' + value + expires + '; path=/';
    },

    /**
     * retrieve a value from a cookie
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     */
    openCookie: function(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        // return null;
    },

    /**
     * delete a cookie
     *
     * @param {String} name
     *          the name (key) of what we want to delete
     */
    deleteCookie: function(name) {
        saveCookie(name, '', -1);
    },



    // ------------------------------------------------------------------------
    /*
     * paper.js specific
     */

    /**
     * download current view as
     *
     * @param  {String} filename [description]
     * @param  {Number} width    [description]
     * @param  {Number} height   [description]
     *
     * @return {Boolean} true if successful, false otherwise
     */
    downloadSVG: function(filename, width, height) {
        var w = width || view.bounds.width;
        var h = height || view.bounds.height;

        var svg = '<svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' + w + ' ' + h + '" enable-background="new 0 0 ' + w + ' ' + h + '" xml:space="preserve">';
        svg += pathGroup.exportSVG({asString: true});
        svg += '</svg>';
        var b64 = btoa(svg);

        var img = document.createElement('svg');
        img.src = 'data:image/svg+xml;base64,\n' + b64;
        img.alt = filename;

        try {
            // FIX: don't judge... it works :)
            var link = document.createElement('a');
            link.download = filename;
            link.href = img.src;
            link.click();

            return true;
        }
        catch(err) {
            return false;
        }
    },

    // ------------------------------------------------------------------------
    /*
    * TODO: deprecate... :(
    * Scriptographer specific
    *
    * modified from Jürg Lehni
    * http://scriptographer.org/forum/help/save-array-data-to-external-file/
    *
    */

    /**
    * @param {String} str
    *          the String of information to save (JSON encoded)
    * @param {String} fname
    *          the name of the file to save to
    */
    saveFile: function(str, filename) {
        filename = filename || 'foliojs_fio_file.file';

        try {
            // scriptographer
            var file = new File(script.file.parent, fname);
            if (file.exists()) file.remove();
            file.open();
            file.write( Json.encode(str) );
            file.close();

            return true;
        }
        catch(err) {
        }

        try {
            // paper.js

            // a bit shaky...
            var link = document.createElement('a');
            link.download = filename;
            link.href = str;
            link.click();

            return true;
        }
        catch(err) {
        }

        return false;
    },

    // TODO:
    // ------------------------------------------------------------------------
    // window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
    //  fs.root.getFile(
    //      'SnowFlake.svg',
    //      {
    //          create: true
    //      },
    //      function(fileEntry) {
    //          fileEntry.createWriter(function(fileWriter) {
    //              var blob = new Blob(flake.exportSVG());

    //              fileWriter.addEventListener('writeend', function() {
    //                  location.href = fileEntry.toURL();
    //              },
    //              false);
    //              fileWriter.write(blob);
    //          });
    //      }
    //  );

    // });

    // window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
    //     fs.root.getFile('test.bin', {create: true}, function(fileEntry) {
    //         fileEntry.createWriter(function(fileWriter) {
    //             var blob = new Blob(flake.exportSVG());

    //             fileWriter.addEventListener("writeend", function() {
    //                 // navigate to file, will download
    //                 location.href = fileEntry.toURL();
    //             }, false);

    //             fileWriter.write(blob);
    //         },
    //         function() {});
    //     },
    //     function() {});
    // },
    // function() {});


    /**
    * @param {String} fname
    *          the name of the file to open
    *
    * @return {Object} JSon output
    */
    openFile: function(fname) {
        var file = new File(script.file.parent, fname);
        file.open();
        var data = Json.decode( file.readAll() );
        file.close();

        return data;
    },

    /**
    * @param {String} fname
    *          the name of the file to delete
    */
    deleteFile: function(fname) {
        var file = new File(script.file.parent, fname);
        // If file exists, we need to remove it first in order to overwrite its content.
        if (file.exists()) file.remove();
    },

    /**
    * @param {String} fname
    *          the name of the file to verify exists
    *
    * @return {Boolean} true if exists, false otherwise
    */
    checkFile: function(fname) {
        var file = new File(script.file.parent, fname);
        if (file.exists()) return true;
        else return false;
    }


};

/**!
 * FASE
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 *
 * javascript class to load ASE files
 * requires jDataView - https://github.com/vjeux/jDataView
 *
 *
 * code inspired and modified from the following:
 *
 * Copyright (c) 2012, Ger Hobbelt (ger@hobbelt.com)
 * All rights reserved.
 *
 * https://gist.github.com/GerHobbelt/3173233
 *
 * LICENSE
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * The name Ger Hobbelt may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Load Adobe Swatch Exchange (ASE) files
 *
 * @param  {String} input URL or file
 *
 * @return {Object}
 *
 * @example
 * var ase = new folio.FASE(url);
 *
 */
folio.FASE = function(input) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var colors = {};



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    (function init() {
        if (input) {
            return (typeof input === 'string')
                ? load(input)
                : (typeof input === 'object')
                    ? loadData(input)
                    : null;
        }
    })();



    // -----------------------------------------------------------------------------
    /**
     * load ASE file from a data buffer object
     *
     * @param  {Object} buffer data buffer object
     *
     * @return {Object}
     */
    function loadData(buffer) {
        var versionMajor;
        var versionMinor;
        var count;
        var view;

        var palette = {};
        var flattened = [];

        try {
            // big-endian format
            view = new jDataView(buffer, 0, undefined, false);
        }
        catch (e) {
            view = null;
        }

        if (!view ||
            'ASEF' !== view.getString(4) ||
            (versionMajor = view.getInt16()) < 1 ||
            (versionMinor = view.getInt16()) < 0 ||
            (count = view.getInt32()) < 1) {
                console.error('illegal file format, not a ASE color palette file');
        }

        if (!parse_block(view, palette)) {
            setColors({
                palette : palette,
                values  : flattened
            });
            return colors;
        }
    }


    /**
     * load ASE file from URL/file location
     *
     * @param  {String} url data as URL/file location
     *
     * @return {Object}
     */
    function load(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(event) {
            if (xhr.response) {
                return loadData(xhr.response);
            }
            else {
                console.error('could not load ASE file');
                return colors;
            }
        }
        xhr.send(null);
    }


    // -----------------------------------------------------------------------------
    //
    // Gets
    //
    function rgb2str(rgb) {
        var r, g, b;

        r = rgb[0].toString(16);
        if (r.length < 2) {
            r = '0' + r;
        }
        g = rgb[1].toString(16);
        if (g.length < 2) {
            g = '0' + g;
        }
        b = rgb[2].toString(16);
        if (b.length < 2) {
            b = '0' + b;
        }
        return '#' + r + g + b;
    }

    function parse_utf16_Cstring(view) {
        var slen = view.getUint16();
        var c, name = '',
            i = slen;
        // ignore NUL sentinel at the end of the string
        while (--i > 0) {
            c = view.getUint16();
            name += String.fromCharCode(c);
        }
        view.getUint16();
        return name;
    }

    function parse_block(view, palette) {
        // parse block:
        var count, i, id, len, slen, model, type, c, m, k, l, a, r, g, b, x, y, z, name, p;

        while (--count >= 0) {
            id = view.getUint16();

            switch (id) {
                default:
                    // illegal block; damaged ASE file?
                    console.error('unknown block type ' + id.toString(16) + ': corrupt ASE file');
                    return;
                return -1;

                // group start
                case 0xc001:
                    len = view.getUint32();
                    name = parse_utf16_Cstring(view);

                    if (!palette.groups) {
                        palette.groups = [];
                    }

                    palette.groups.push(p = {
                        name : name
                    });

                    if (parse_block(view, p)) {
                        return -1;
                    }
                    continue;

                // group end
                case 0xc002:
                    view.getUint32(); // skip 0 length
                    return 0;

                // color
                case 0x0001:
                    len = view.getUint32();
                    name = parse_utf16_Cstring(view);
                    model = view.getString(4);

                    if (!palette.colors) {
                        palette.colors = [];
                    }

                    palette.colors.push(p = {
                        name  : name,
                        model : model
                    });

                    switch (model) {
                        case 'CMYK':
                            c = view.getFloat32();
                            m = view.getFloat32();
                            y = view.getFloat32();
                            k = view.getFloat32();
                            p.cmyk = [c, m, y, k];

                            if (k >= 1) {
                                // Black
                                r = g = b = 0;
                            }
                            else {
                                // CMYK and CMY values from 0 to 1
                                c = c * (1 - k) + k;
                                m = m * (1 - k) + k;
                                y = y * (1 - k) + k;

                                // CMY values from 0 to 1
                                // RGB results from 0 to 255
                                r = (1 - c);
                                g = (1 - m);
                                b = (1 - y);

                                r = Math.min(255, Math.max(0, Math.round(r * 255)));
                                g = Math.min(255, Math.max(0, Math.round(g * 255)));
                                b = Math.min(255, Math.max(0, Math.round(b * 255)));
                            }
                            flattened.push(rgb2str(p.html_rgb = [r, g, b]));
                            break;

                        case 'RGB ':
                            r = view.getFloat32();
                            g = view.getFloat32();
                            b = view.getFloat32();
                            p.rgb = [r, g, b]; // also keep the raw RGB

                            r = Math.min(255, Math.max(0, Math.round(r * 255)));
                            g = Math.min(255, Math.max(0, Math.round(g * 255)));
                            b = Math.min(255, Math.max(0, Math.round(b * 255)));
                            flattened.push(rgb2str(p.html_rgb = [r, g, b]));
                            break;

                        case 'LAB ':
                            l = view.getFloat32();
                            a = view.getFloat32();
                            b = view.getFloat32();
                            p.lab = [l, a, b];

                            // Photoshop CS5.5 saves these as perunage (0..1), value, value. So we need to adjust L before commencing:
                            l *= 100;

                            // CIE-L*ab -> XYZ
                            y = (l + 16) / 116;
                            x = a / 500 + y;
                            z = y - b / 200;

                            if (Math.pow(y, 3) > 0.008856) {
                                y = Math.pow(y, 3);
                            }
                            else {
                                y = (y - 16 / 116) / 7.787;
                            }
                            if (Math.pow(x, 3) > 0.008856) {
                                x = Math.pow(x, 3);
                            }
                            else {
                                x = (x - 16 / 116) / 7.787;
                            }
                            if (Math.pow(z, 3) > 0.008856) {
                                z = Math.pow(z, 3);
                            }
                            else {
                                z = (z - 16 / 116) / 7.787;
                            }

                            x = 95.047 * x; // ref_X =  95.047     Observer= 2°, Illuminant= D65
                            y = 100.000 * y; // ref_Y = 100.000
                            z = 108.883 * z; // ref_Z = 108.883

                            // XYZ -> RGB
                            x = x / 100; // X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
                            y = y / 100; // Y from 0 to 100.000
                            z = z / 100; // Z from 0 to 108.883

                            r = x * 3.2406 + y * -1.5372 + z * -0.4986;
                            g = x * -0.9689 + y * 1.8758 + z * 0.0415;
                            b = x * 0.0557 + y * -0.2040 + z * 1.0570;

                            if (r > 0.0031308) {
                                r = 1.055 * Math.pow(r, 1 / 2.4) - 0.055;
                            }
                            else {
                                r = 12.92 * r;
                            }
                            if (g > 0.0031308) {
                                g = 1.055 * Math.pow(g, 1 / 2.4) - 0.055;
                            }
                            else {
                                g = 12.92 * g;
                            }
                            if (b > 0.0031308) {
                                b = 1.055 * Math.pow(b, 1 / 2.4) - 0.055;
                            }
                            else {
                                b = 12.92 * b;
                            }

                            r = Math.min(255, Math.max(0, Math.round(r * 255)));
                            g = Math.min(255, Math.max(0, Math.round(g * 255)));
                            b = Math.min(255, Math.max(0, Math.round(b * 255)));
                            flattened.push(rgb2str(p.html_rgb = [r, g, b]));
                            break;

                        case 'GRAY':
                            g = view.getFloat32();
                            p.gray = g;

                            g = Math.min(255, Math.max(0, Math.round(g * 255)));
                            flattened.push(rgb2str(p.html_rgb = [g, g, g]));
                            break;

                        default:
                            console.error('unknown color model ' + model + ': corrupt ASE file');
                            return -1;
                    }

                    type = view.getUint16();
                    // (0 => Global, 1 => Spot, 2 => Normal)
                    p.color_type = type;
                    continue;
            }
        }
        return 0;
    }

    // -----------------------------------------------------------------------------
    /**
     * return colors object
     *
     * @return {Object}
     */
    function getColors() {
        return colors;
    }



    // -----------------------------------------------------------------------------
    //
    // Sets
    //
    function setColors(obj) {
        colors = obj;
    }



    return {
        colors   : getColors,

        load     : load,
        loadData : loadData
    };
};

/**!
 *
 * FArray.js
 *
 * Extensions to JavaScript Array may be bad form... but whatever
 *
 */


// ------------------------------------------------------------------------
//
// Array
//
// ------------------------------------------------------------------------

/**
 *
 * @return {Number} median value
 *
 */
Array.prototype.median = function() {
    var type = Object.prototype.toString.call(this).split(/\W/)[2];
    if (type === 'Array') {
        var median = 0;
        this.sort();
        if (this.length % 2 === 0) {
            median = (this[this.length / 2 - 1] + this[this.length / 2]) / 2;
        }
        else {
            median = this[(this.length - 1) / 2];
        }
        return median;
    }
};

/**
 * http://stackoverflow.com/questions/10359907/array-sum-and-average
 *
 * @return {Number} average  value
 *
 */
Array.prototype.average = function(){
    var type = Object.prototype.toString.call(this).split(/\W/)[2];
    if (type === 'Array') {
        var sum = 0;
        for (var i = 0; i < this.length, isFinite(this[i]); i++) {
            sum += parseFloat(this[i]);
        }
        return sum/this.length-1;
    }
};


/**
 * combines two Arrays
 *
 * @param {Array} arr
 *          Array object
 *
 * @return {Array} new merged Array object
 *
 */
Array.prototype.merge = function(arr, bShuffle) {
    var type = Object.prototype.toString.call(this).split(/\W/)[2];
    if (type === 'Array') {
        var output = this.concat(arr);
        return output;
    }
};


/*
 * combine two associative arrays together
 * http://stackoverflow.com/questions/929776/merging-associative-arrays-javascript (modified)
 *
 * @param {Array} arr
 *          Array object
 *
 * @return {Array} new combined associatibe Array
 *
 */
Array.prototype.combine = function(arr) {
    for (item in this) {
        arr[item] = (arr[item] != undefined)
            ? arr[item]
            : this[item];
    }
    return arr;
};


/**
 * find index of particular value within an array
 *
 * @param {String} query
 *          the value to search for within array
 *
 * @return {Number} index of object within array
 *
 */
Array.prototype.findIndex = function(query) {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i].toLowerCase() === query.toLowerCase()) {
            break;
        }
    }
    return i;
};


/**
 *
 * @param {Number} start
 *          start position in array
 * @param {Number} stop
 *          stop position in array
 *
 * @return {Number} index of maximum value within array
 *
 */
Array.prototype.max = function(start, stop) {
    start = (start != undefined)
        ? start
        : 0;
    stop = (stop != undefined)
        ? stop
        : this.length;
    var max = start;

    for (var i = (start+1); i < stop; i++) {
        if (this[i] > this[max]) {
            max = i;
        }
    }
    return max;
};

/**
 *
 * @param {Number} start
 *          start position in array
 * @param {Number} stop
 *          stop position in array
 *
 * @return {Number} index of minimum value within array
 *
 */
Array.prototype.min = function(start, stop) {
    start = (start != undefined)
        ? start
        : 0;
    stop = (stop != undefined)
        ? stop
        : this.length;
    var min = start;

    for (var i = (start+1); i < stop; i++) {
        if (this[i] < this[min]) {
            min = i;
        }
    }
    return min;
};

/**
 *
 * http://jsfromhell.com/array/shuffle
 * http://www.brain4.de/programmierecke/js/arrayShuffle.php
 *
 * @return {Array} original array but with the order "shuffled"
 *
 */
Array.prototype.shuffle = function() {
    for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
};

/**
 * Eliminate all non-unique elements from an Array
 *
 * @return {Object} unique element
 *
 */
Array.prototype.unique = function() {
    var u = [];
    o:for (var i = 0, n = this.length; i < n; i++) {
        for (var x = 0, y = u.length; x < y; x++) {
            if (u[x] == this[i]) {
                continue o;
            }
        }
        u[u.length] = this[i];
    }
    return u;
};

/**
 * Eliminate all duplicates from an Array
 * http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
 *
 * @return {Array} original array without duplicates
 *
 */
Array.prototype.removeDuplicates = function() {
    var type = Object.prototype.toString.call(this).split(/\W/)[2];
    if (type === 'Array') {
        return this.reduce(function(accum, cur) {
            if (accum.indexOf(cur) === -1) {
                accum.push(cur);
            }
            return accum;
        }, []);
    }
};

/**
 *
 * @param {Number} decimalPlaces
 *      number of decimal places
 *
 * @return {Array} original array with rounded values
 *
 */
Array.prototype.round = function(decimalPlaces) {
    var multi = Math.pow(10,decimalPlaces);
    for (var i = 0; i < this.length; i++) {
        this[i] = Math.round(this[i] * multi)/multi;
    }
    return this;
};

/**
 * Compare two arrays and create a new array
 * with only the objects that are the same
 *
 * @param {Array} arr
 *          Array object
 *
 * @return {Array} new Array object
 *
 */
Array.prototype.same = function(arr) {
    var a = this.concat();
    var c = [];
    for (var i = 0; i < a.length; ++i) {
        for (var j = 0; j < arr.length; ++j) {
            if (a[i] === arr[j]) {
                c.push(a[i]);
            }
        }
    }
    return c;
};

// ------------------------------------------------------------------------
// TODO: integrate sorting methods in a much cleaner way
var FSort = {

    /**
     *
     * sort Array in alphabetical order
     *
     * http://www.brain4.de/programmierecke/js/arraySort.php
     *
     */
    alphabetical: function(a, b) {
        // var A = a.toLowerCase();
        // var B = b.toLowerCase();

        // if (A < B) {
        //     return -1;
        // }
        // else if (A > B) {
        //     return  1;
        // }
        // else {
        //     return 0;
        // }

        a = a.toLowerCase();
        a = a.replace(/ä/g,'a');
        a = a.replace(/ö/g,'o');
        a = a.replace(/ü/g,'u');
        a = a.replace(/ß/g,'s');

        b = b.toLowerCase();
        b = b.replace(/ä/g,'a');
        b = b.replace(/ö/g,'o');
        b = b.replace(/ü/g,'u');
        b = b.replace(/ß/g,'s');

        return (a == b)
            ? 0
            : (a>b)
                ? 1
                : -1;
    },

    /**
     *
     * sort array by distance of object from center of canvas
     *
     */
    distanceToCenter: function(a, b) {
        var valueA = a.getDistanceToCenter();
        // console.log( valueA );
        var valueB = b.getDistanceToCenter();
        // console.log( valueB );
        var comparisonValue = 0;

        if (valueA > valueB) {
            comparisonValue = -1;
        }
        else if (valueA < valueB) {
            comparisonValue = 1;
        }

        return comparisonValue;
    }

};

/**!
 * FCirclePack
 *
 * Original from onedayitwillmake
 * http://onedayitwillmake.com/CirclePackJS/
 *
 * MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * Rewritten from AS3 to Javascript
 * Jackson Rollins
 * http://jacksonkr.com/
 *
 *
 * Rewritten for Scriptographer/PaperJS
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */


/**
 * @param {Group} circleItems
 *              Group of Items
 * @param {Object} properties (optional)
 * {
 *     iterations : 11,         // {Number} iterations per cycle, higher = slower
 *     damping    : 0.1,        // {Number} movement damping, the lower the slower
 *     padding    : 0,          // {Number} spacing between packed elements
 *     target     : view.center // {Point}  the packing center target
 * }
 *
 * @return {Object}
 */
/**
 * @param {Array} circleItems
 *              Array of Items
 * @param {Object} properties (optional)
 * {
 *     iterations : 11,         // {Number} iterations per cycle, higher = slower
 *     damping    : 0.1,        // {Number} movement damping, the lower the slower
 *     padding    : 0,          // {Number} spacing between packed elements
 *     target     : view.center // {Point}  the packing center target
 * }
 *
 *
 * @return {Object}
 *
 */
folio.FCirclePack = function(circleItems, properties) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var circleItems = (circleItems instanceof Group)
        ? circleItems.children
        : (circleItems == null)
            ? []
            : circleItems;

    properties = properties || {};
    var iterations = properties.iterations || 11;
    var dampingAmt = properties.damping || 0.1; //
    var padding = properties.padding || 0;
    var target = properties.target || view.center;

    var hitOptions = {
        stroke    : true,
        fill      : true,
        tolerance : 5
    };
    var isMousedown = false;
    var dragCircle;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    function update() {
        circleItems = circleItems.sort(FSort.distanceToCenter);

        var pp = new Point();
        var ci, cj;
        var dx, dy;
        var radius, dist;
        for (var i = circleItems.length - 1; i >= 0; --i) {
            ci = circleItems[i];

            for (var j = i + 1; j < circleItems.length; j++) {
                cj = circleItems[j];

                if (i == j) {
                    continue;
                }

                dx = cj.position.x - ci.position.x;
                dy = cj.position.y - ci.position.y;

                // this alogroithm is designed for circles, so we assume
                // every object is either a circle or a square.
                //
                // polygon packing is a much larger challenge
                // http://en.wikipedia.org/wiki/Packing_problem
                // hence why we just halve the "width" in
                // order to get the object's radius
                radius = (ci.bounds.size.width / 2) + (cj.bounds.size.width / 2) + padding;
                dist = (dx * dx) + (dy * dy);

                if (dist < (radius * radius) - 0.01) {
                    pp.x = dx;
                    pp.y = dy;
                    pp = pp.normalize(1.0);
                    pp = pp.multiply((radius - Math.sqrt(dist)) * 0.5);

                    try {
                        // if (cj != dragCircle) {
                            cj.position.x += pp.x;
                            cj.position.y += pp.y;
                        // }
                        // if (ci != dragCircle) {
                            ci.position.x -= pp.x;
                            ci.position.y -= pp.y;
                        // }
                    }
                    catch(err) {
                        // not a valid item, get rid of it
                        circleItems.slice(j, 1);
                        break;
                    }

                }
            }
        }

        var damping = dampingAmt / parseInt(iterations);
        var c;
        for (var i = 0; i < circleItems.length; i++) {
            c = circleItems[i];
            if (c == dragCircle) {
                continue;
            }
            else {
                pp.x = c.position.x - target.x;
                pp.y = c.position.y - target.y;
                pp = pp.multiply(damping);
            }
            c.position.x -= pp.x;
            c.position.y -= pp.y;
        }
    }


    // ------------------------------------------------------------------------
    //
    // sets
    //
    /**
     * @param {Array} item
     *      Array of Path.Items to add to circle packer
     */
    /**
     * @param {Item} item
     *      Path.Item to add to circle packer
     */
    function add(item) {
        if (typeof item === 'array') {
            circleItems = circleItems.concat(item);
        }
        else {
            circleItems.push(item);
        }
    }

    /**
     * @param {Number} val
     *      damping value
     */
    function setDamping(val) {
        dampingAmt = val;
    }

    /**
     * @param {Number} val
     *      padding around elements
     */
    function setPadding(val) {
        padding = val;
    }


    /**
     * @param {Point} point
     *      the target location for the elements to pack around (default: view.center)
     */
    function setTarget(point) {
        target = point;
    }

    // ------------------------------------------------------------------------
    //
    // gets
    //
    /**
     *
     * @return {Array} the items being packed
     *
     */
    var getItems = function() {
        return circleItems;
    };

    /**
     * @param {Number} index
     *      index number of Item being packed
     *
     * @return {Item} Item from items being packed
     */
    var getItem = function(index) {
        return circleItems[index];
    };


    // ------------------------------------------------------------------------
    //
    // Events
    //
    // ------------------------------------------------------------------------
    function resetEvents() {
        isMousedown = false;
        dragCircle = null;
    }
    window.addEventListener('onblur', resetEvents);
    window.addEventListener('mouseup', resetEvents);
    window.addEventListener('mouseout', resetEvents);

    window.addEventListener('mousedown', function(event) {
        isMousedown = true;
        var hitResult = project.hitTest([event.clientX, event.clientY], hitOptions);
        if (hitResult && hitResult.item) {
            dragCircle = hitResult.item;
        }
    });

    window.addEventListener('mousemove', function(event) {
        if (isMousedown && dragCircle) {
            dragCircle.position = [event.clientX, event.clientY];
        }
    });



    // ------------------------------------------------------------------------
    return {
        update     : update,

        add        : add,
        setDamping : setDamping,
        setPadding : setPadding,
        setTarget  : setTarget,

        getItems   : getItems,
        getItem    : getItem
    };

};

/**!
 * FDrop
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */


/**
 * @param {Sring} element
 *              (optional) HTML elemment for drop-target
 *              by default the entire window is droppable
 * @param {Array} properties
 * {
 * }
 *
 */
folio.FDrop = function(element, properties) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var fileTypes = {
        text        : /text.*/,
        image       : /image.*/,
        video       : /video.*/,
        application : /application.*/
    };
    var FDropEvent = {
        id          : '',

        isImage     : false,
        isVideo     : false,
        isFile      : false,
        isFileList  : false,
        isDirectory : false,

        filename    : '',
        type        : '',
        data        : '',
        size        : 0,
        text        : '',
        file        : '',
        files       : []
    };
    var files, output;

    // progress bar
    var totalSize = totalLoad = 0;
    var progressBar;

    var bError = false;



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    (function() {
    // function init(element) {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            function onDragEnterEvent(event) {
                event.stopPropagation();
                event.preventDefault();
            }

            function onDragOverEvent(event) {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';
            }

            function onDropEvent(event) {
                event.stopPropagation();
                event.preventDefault();
                setFiles(event.dataTransfer.files);
            }

            function onDrop(event) {
            }

            // by default the entire window is droppable
            element = element || document.body;
            element.addEventListener('dragenter', onDragEnterEvent, false);
            element.addEventListener('dragover',  onDragOverEvent, false);
            element.addEventListener('drop',      onDropEvent, false);
            element.addEventListener('ondrop',    onDrop, false);
        }
        else {
            alert('Drag and drop is not fully supported in this browser.');
        }
    // };
    }());

    // -----------------------------------------------------------------------------
    function handleFile(file, obj) {
        handleImage(file, obj);
        // handleVideo(file, obj);
        handleText(file, obj);
        handleGeneric(file, obj);

        if (bError) {
            // an error means most likely a directory
            obj.isDirectory = true;
        }
    }

    function handleFiles(files) {
        if (files.length > 1) {
            output = [];
            for (var i = 0; i < files.length; i++) {
                var f = files[i];
                output.push( Object.create(FDropEvent) );
                output[i].id = element.id;
                output[i].isFileList = true;
                output[i].filename = f.name;
                output[i].size = f.size;
                output[i].files.push( f.name );
                handleFile(f, output[i]);
            }
        }
        else {
            output = Object.create(FDropEvent);
            output.id = element.id;
            output.filename = files.name;
            output.size = files.size;
            handleFile(files, output);
        }

        return output;
    }

    function createProgressBar() {
        progressBar = document.createElement('div');
        progressBar.id = 'progressBar';
        progressBar.style.position = 'absolute';
        progressBar.style.top = '0px';
        progressBar.style.left = '0px';
        progressBar.style.width = '0px';
        progressBar.style.height = '18px';
        progressBar.style.background = 'rgba(0, 255, 170, 0.3)';
        progressBar.style.color = 'rgba(255, 255, 255, 0.9)';
        progressBar.style.paddingLeft = '6px';
        progressBar.style.paddingTop = '3px';
        progressBar.style.zIndex = '2000';

        document.body.appendChild(progressBar);
    }

    // -----------------------------------------------------------------------------
    function handleText(file, obj) {
        // if (file.type.match(fileTypes.text)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                obj.text = fileReader.result;
                obj.type = file.type;

                obj.isFile = true;
            };
            // fileReader.onloadend = complete;
            fileReader.onprogress = progress;
            fileReader.onerror = error;
            fileReader.readAsText(file);
        // }
    }

    function handleImage(file, obj) {
        if (file.type.match(fileTypes.image)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                var img = new Image();
                img.src = fileReader.result;

                obj.file = img;
                obj.type = file.type;

                obj.isImage = true;
            };
            // fileReader.onloadend = complete;
            fileReader.onprogress = progress;
            fileReader.onerror = error;
            fileReader.readAsDataURL(file);
        }
    }

    // function handleVideo(file, obj) {
    //     if (file.type.match(fileTypes.video)) {
    //         var fileReader = new FileReader();
    //         fileReader.onload = function(e) {
    //             obj.data = fileReader.result;
    //             obj.type = file.type;

    //             obj.isVideo = true;
    //         };
    //         // fileReader.onloadend = complete;
    //         fileReader.onprogress = progress;
    //         fileReader.onerror = error;
    //         fileReader.readAsDataURL(file);
    //     }
    // }

    function handleGeneric(file, obj) {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            obj.data = fileReader.result;
            obj.type = file.type;
        };
        fileReader.onprogress = progress;
        fileReader.onloadend = complete;
        // fileReader.readAsDataURL(file);
        fileReader.readAsBinaryString(file);
    }

    // -----------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     *
     * @param {window.File} files
     *              the dropped file/files to process
     *
     */
    function setFiles(files) {
        if (files != null) {
            createProgressBar();

            if (files.length === 1) {
                files = files[0];
                totalSize = files.size;
            }
            else {
                for (var i = 0; i < files.length; i++) {
                    totalSize += files[i].size;
                }
            }
            return handleFiles(files);
        }
    }



    // -----------------------------------------------------------------------------
    //
    // Events
    //
    // -----------------------------------------------------------------------------
    function progress(event) {
        totalLoad = Math.ceil((event.loaded / totalSize) * 100);

        progressBar.style.width = (totalLoad + '%').toString();
        progressBar.innerHTML = (totalLoad + '%').toString();
    }

    function complete(event) {
        if (totalLoad >= 98) {
            onDrop(output);
            document.body.removeChild(progressBar);
        }
    }

    function error(event) {
        bError = true;
    }



    // -----------------------------------------------------------------------------
    return {
        target : element,
        event  : output,

        read   : setFiles
    };

};

/**!
 * FFlock
 *
 * Adapted from Flocking Processing example by Daniel Schiffman:
 * http://processing.org/learning/topics/flocking.html
 *
 * Copyright (c) 2011 - 2013, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 *
 * Modified/Simplified for generic use
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 *
 * TODO: fix repelling for predators & obstacles, fixed? NOPE
 * TODO: performance is shit!
 *
 */


folio.FFlock = {
    /**
     * @param  {Point} position
     *          intial position of Boid
     * @param  {Object} properties (optional)
     *          radius   : 30    // distance from other Boids
     *          maxSpeed : 10    // the maximum speed of the Boid
     *          maxForce : 0.05  // the maximum force of the Boid
     *          strength : Math.random() * 0.5  // strength of the Boid's force
     *          path     : new Path() // Item to apply behavior to
     *
     * @example
     * var flock = [];
     * for (var i = 0; i < 30; i++) {
     *  var boid = new folio.FFlock.boid(view.center, {
     *      radius   : 30,
     *      maxSpeed : 10,
     *      maxForce : 0.05,
     *      path     : new Path.Rectangle({
     *                     position  : [0, 0],
     *                     size      : [10, 10],
     *                     fillColor : new Color.random()
     *                 })
     *  });
     *  flock.push(boid);
     * }
     *
     */
    boid: function(position, properties) {
        // ------------------------------------------------------------------------
        //
        // Properties
        //
        // ------------------------------------------------------------------------
        var radius = properties.radius || 30;
        var strength = properties.strength || Math.random() * 0.5;
        var maxSpeed = properties.maxSpeed + strength || 10 + strength;
        var maxForce = properties.maxForce + strength || 0.05 + strength;
        var path = properties.path || null;
        var data = properties.data || null;
        var groupTogether = properties.groupTogether || true;
        var bounce = properties.bounce || false;
        var container = properties.container || view;
        var contained = false;

        var mass = 1.0;
        var acceleration = new Point();
        var vector = new Point.random(-maxSpeed * maxForce, maxSpeed * maxForce);
        var position = new Point(position); //.clone();

        var count = 0;
        var lastAngle = 0;
        var distances = [];

        // this is my bootleg way to fix a stuck boid
        var stuckCounter = 0;
        // if a boid increments the stuckCounter beyond
        // stuckMax it's movement is more drastic
        var stuckMax = 100;



        // ------------------------------------------------------------------------
        //
        // Methods
        //
        // ------------------------------------------------------------------------
        function run(boids) {
            if (groupTogether) {
                flock(boids);
            }
            else {
                align(boids);
            }
            borders(bounce);
            update();
            updateItems();
        }

        // We accumulate a new acceleration each time based on three rules
        function flock(boids) {
            calculateDistances(boids);
            var separation = separate(boids);
            separation.x *= 3;
            separation.y *= 3;

            var alignment = align(boids);
            var coherence = cohesion(boids);
            acceleration.x += separation.x + alignment.x + coherence.x;
            acceleration.y += separation.y + alignment.y + coherence.y;
        }

        // ------------------------------------------------------------------------
        function calculateDistances(boids) {
            for (var i = 0, l = boids.length; i < l; i++) {
                var other = boids[i];
                distances[i] = other.position().getDistance(position, true);
            }
        }

        // ------------------------------------------------------------------------
        function update() {
            // Update velocity
            vector.x += acceleration.x;
            vector.y += acceleration.y;

            // Limit speed (vector#limit?)
            vector.length = Math.min(maxSpeed, vector.length);
            position.x += vector.x;
            position.y += vector.y;

            // Reset acceleration to 0 each cycle
            acceleration = new Point();
        }

        function updateItems() {
            if (path) {
                path.position = position;
                var angle = vector.angle;
                path.rotate(angle - lastAngle);
                lastAngle = angle;
            }
        }

        // ------------------------------------------------------------------------
        function seek(target) {
            var s = steer(target, false);
            acceleration.x += s.x;
            acceleration.y += s.y;
        }

        function arrive(target) {
            var s = steer(target, true);
            acceleration.x += s.x;
            acceleration.y += s.y;
        }

        // ------------------------------------------------------------------------
        function borders(isBounce) {
            isBounce = isBounce || false;
            var size = container.bounds.size;

            if (isBounce) {
                if (stuckCounter > stuckMax) {
                    stuckCounter = 0;
                    position = new Point.random(size.width, size.height);
                }

                if (position.x < radius || position.x > size.width - radius) {
                    vector.x *= -1;
                    stuckCounter++;
                }
                if (position.y < radius || position.y > size.height - radius) {
                    vector.y *= -1;
                    stuckCounter++;
                }
            }
            else {
                // the -2 is intended to keep items from getting stuck
                if (position.x < -radius) {
                    position.x = size.width + (radius - 2);
                }
                if (position.y < -radius) {
                    position.y = size.height + (radius - 2);
                }
                if (position.x > size.width + radius) {
                    position.x = -(radius + 2);
                }
                if (position.y >= size.height + radius) {
                    position.y = -(radius + 2);
                }
            }

            if (!vector.isZero()) {
                position.x += vector.x;
                position.y += vector.y;
            }
        }

        // ------------------------------------------------------------------------
        // A method that causes the boid to be contained within an item
        function contain(item, properties) {
            properties = properties || {};
            properties.hitOptions = properties.hitOptions || {
                fill:      true,
                stroke:    true,
                segment:   true,
                tolerance: radius// / 2
            };

            var target = new Point(
                position.x + vector.x + radius,
                position.y + vector.y + radius
            );

            var distance = item.position.getDistance(target);
            if (distance <= radius * 10) {
                contained = true;
            }

            // attract boid to the center of object
            if (contained) {
                // path.fillColor = path.strokeColor = new Color(1.0, 0.0, 0.0);
                var hitResult = item.hitTest(target, properties.hitOptions);
                if (!hitResult) {
                    // vector = new Point();
                    vector = new Point(
                        -vector.x,
                        -vector.y
                    );
                }
            }
            else if (!contained) {
                // path.fillColor = 'white';
                arrive(item.position);
            }
        }

        // A method that causes the boid to be repelled/avoid an item
        function repel(obstacleItem, properties) {
            properties.hitOptions = properties.hitOptions || {
                fill      : true,
                stroke    : true,
                segment   : true,
                tolerance : radius// / 2
            };

            var target = new Point(
                position.x + vector.x,
                position.y + vector.y
            );

            if (obstacleItem.path()) {
                var hitResult = obstacleItem.path().hitTest(target, properties.hitOptions);
                var repel = new Point();
                if (hitResult) {
                    if (hitResult.type == 'segment' ||
                        hitResult.type == 'handle-in' ||
                        hitResult.type == 'handle-out') {
                        repel = new Point(
                            position.x - hitResult.location.point.x,
                            position.y - hitResult.location.point.y
                        );
                        repel = repel.normalize();
                    }
                    else if (hitResult.type == 'stroke' ||
                             hitResult.type == 'fill') {
                        // repel = new Point(
                        //     position.x * -vector.x,
                        //     position.y * -vector.y
                        // );
                        repel = repel.normalize();
                        repel = new Point(
                            target.x - vector.x,
                            target.y - vector.y
                        );
                    }

                    repel.x *= maxForce * 7; // 7 is a magic number
                    repel.y *= maxForce * 7;

                    if (Math.sqrt(repel.x * repel.x + repel.y * repel.y) < 0) {
                        repel.y = 0;
                    }

                    // apply
                    // repel.x /= mass;
                    // repel.y /= mass;
                    acceleration.x += repel.x;
                    acceleration.y += repel.y;

                }
            }
        }

        // ------------------------------------------------------------------------
        // A method that calculates a steering vector towards a target
        // Takes a second argument, if true, it slows down as it approaches
        // the target
        function steer(target, slowdown) {
            var steer = new Point();
            var desired = new Point(
                    target.x - position.x,
                    target.y - position.y
                );
            var distance = desired.length;

            // Two options for desired vector magnitude
            // (1 -- based on distance, 2 -- maxSpeed)
            if (slowdown && distance < 100) {
                // This damping is somewhat arbitrary:
                desired.length = maxSpeed * (distance * 0.001);
            }
            else {
                desired.length = maxSpeed;
            }
            steer.x = desired.x - vector.x;
            steer.y = desired.y - vector.y;
            steer.length = Math.min(maxForce, steer.length);
            return steer;
        }

        function separate(boids) {
            var desiredSeperation = radius * 100; //3600;
            var steer = new Point();
            var count = 0;
            // For every boid in the system, check if it's too close
            for (var i = 0, l = boids.length; i < l; i++) {
                var distance = distances[i];
                if (distance > 0 && distance < desiredSeperation) {
                    // Calculate vector pointing away from neighbor
                    var delta = new Point(
                        position.x - boids[i].position().x,
                        position.y - boids[i].position().y
                    );
                    delta.length = 1 / distance;
                    steer.x += delta.x;
                    steer.y += delta.y;
                    count++;
                }
            }
            // Average -- divide by how many
            if (count > 0) {
                steer.x /= count;
                steer.y /= count;
            }
            if (!steer.isZero()) {
                // Implement Reynolds: Steering = Desired - Velocity
                steer.length = maxSpeed;
                steer.x -= vector.x;
                steer.y -= vector.y;
                steer.length = Math.min(steer.length, maxForce);
            }
            return steer;
        }

        // Alignment
        // For every nearby boid in the system, calculate the average velocity
        function align(boids) {
            var neighborDist = 25;
            var steer = new Point();
            var count = 0;
            for (var i = 0, l = boids.length; i < l; i++) {
                var distance = distances[i];
                if (distance > 0 && distance < neighborDist) {
                    steer.x += boids[i].vector().x;
                    steer.y += boids[i].vector().y;
                    count++;
                }
            }

            if (count > 0) {
                steer.x /= count;
                steer.y /= count;
            }
            if (!steer.isZero()) {
                // Implement Reynolds: Steering = Desired - Velocity
                steer.length = maxSpeed;
                steer.x -= vector.x;
                steer.y -= vector.y;
                steer.length = Math.min(steer.length, maxForce);
            }
            return steer;
        }

        // Cohesion
        // For the average location (i.e. center) of all nearby boids,
        // calculate steering vector towards that location
        function cohesion(boids) {
            var neighborDist = 10000;
            var sum = new Point();
            var count = 0;
            for (var i = 0, l = boids.length; i < l; i++) {
                var distance = distances[i];
                if (distance > 0 && distance < neighborDist) {
                    sum.x += boids[i].position().x;
                    sum.y += boids[i].position().y;
                    count++;
                }
            }
            if (count > 0) {
                sum.x /= count;
                sum.y /= count;
                // Steer towards the location
                return steer(sum, false);
            }

            return sum;
        }



        // ------------------------------------------------------------------------
        //
        // Sets
        //
        function setGroupTogether(val) {
            groupTogether = val || groupTogether;
            return groupTogether;
        }

        function setBounce(val) {
            bounce = val;
        }



        // ------------------------------------------------------------------------
        //
        // Gets
        //
        function getAcceleration() {
            return acceleration;
        }

        function getVector() {
            return vector;
        }

        function getPosition(val) {
            if (val != undefined) {
                position = new Point(val);
            }
            return position;
        }

        function getRadius() {
            return radius;
        }

        function getPath() {
            return path;
        }

        function getData() {
            return data;
        }

        function getMaxSpeed() {
            return maxSpeed;
        }

        function getMaxForce() {
            return maxForce;
        }

        function getBounce() {
            return bounce;
        }



        // ------------------------------------------------------------------------
        return {
            run           : run,
            flock         : flock,

            update        : update,
            updateItems   : updateItems,

            seek          : seek,
            arrive        : arrive,

            borders       : borders,

            contain       : contain,
            repel         : repel,
            steer         : steer,
            separate      : separate,
            align         : align,
            cohesion      : cohesion,

            groupTogether : setGroupTogether,

            acceleration  : getAcceleration,
            vector        : getVector,
            position      : getPosition,
            radius        : getRadius,
            path          : getPath,
            data          : getData,
            maxSpeed      : getMaxSpeed,
            maxForce      : getMaxForce,
            bounce        : getBounce
        };

    },



    /**
     * @param  {Point} position
     *          intial position of Predator
     * @param  {Object} properties (optional)
     *          radius   : 30    // distance from other Boids
     *          maxSpeed : 10    // the maximum speed of the Predator
     *          maxForce : 0.05  // the maximum force of the Predator
     *          strength : Math.random() * 0.5  // strength of the Predator's force
     *          path     : new Path() // Item to apply behavior to
     *
     * @example
     * var predators = [];
     * for (var i = 0; i < 30; i++) {
     *  var predator = new folio.FFlock.predator(view.center, {
     *      radius   : 40,
     *      maxSpeed : 20,
     *      maxForce : 0.01,
     *      path     : new Path.Rectangle({
     *                     position  : [0, 0],
     *                     size      : [10, 10],
     *                     fillColor : new Color.random()
     *                 })
     *  });
     *  predators.push(predator);
     * }
     *
     */
    predator: function(position, properties) {
        // ------------------------------------------------------------------------
        //
        // Properties
        //
        // ------------------------------------------------------------------------
        var boidPredator = new folio.FFlock.boid(position, properties);



        // ------------------------------------------------------------------------
        //
        // Methods
        //
        // ------------------------------------------------------------------------
        boidPredator.run = function(predators, boids) {
            if (boidPredator.groupTogether()) {
                boidPredator.flock(predators);
            }
            else {
                boidPredator.align(predators);
            }
            boidPredator.borders(boidPredator.bounce());
            boidPredator.update();
            boidPredator.updateItems();
            boidPredator.repel(boids);
        };

        boidPredator.repel = function(boids) {
            var boid;
            for (var i = 0, l = boids.length; i < l; i++) {
                boid = boids[i];

                boidPredator.seek(boid.position());
                boid.repel(boidPredator, properties);
            }
        };


        // ------------------------------------------------------------------------
        return boidPredator;
    },



    /**
     * @param  {Point} position
     *          intial position of Obstacle
     * @param  {Object} properties (optional)
     *          radius : 30    // repel distance from Boids
     *          path   : new Path() // Item to apply behavior to
     *
     * @example
     * var obstacles = [];
     * var obstacle = new folio.FFlock.obstacle(new Point(100, 100), {
     *  radius : 35,
     *  path   : new Path.Circle({
     *               position  : [0, 0],
     *               radius    : 30,
     *               fillColor : 'black'
     *           })
     * });
     * obstacles.push(obstacle);
     *
     */
    obstacle: function(position, properties) {
        // ------------------------------------------------------------------------
        //
        // Properties
        //
        // ------------------------------------------------------------------------
        var boidObstacle = new folio.FFlock.boid(position, properties);



        // ------------------------------------------------------------------------
        //
        // Methods
        //
        // ------------------------------------------------------------------------
        boidObstacle.run = function(boids) {
            boidObstacle.repel(boids);
        };

        boidObstacle.repel = function(boids) {
            for (var i = 0, l = boids.length; i < l; i++) {
                boids[i].repel(boidObstacle, properties);
            }
        };


        // ------------------------------------------------------------------------
        return boidObstacle;
    }

};

/**!
 * FNoise
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */


folio.FNoise = {
    /**
     * This is a port of Ken Perlin's Java code.
     * The original Java code is at http://cs.nyu.edu/%7Eperlin/noise/
     * http://asserttrue.blogspot.de/2011/12/perlin-noise-in-javascript_31.html
     *
     * @param  {Number} x  x-coordinate in noise space
     * @param  {Number} y  y-coordinate in noise space (optional)
     * @param  {Number} z  z-coordinate in noise space (optional)
     *
     * @return {Number}    a float between 0.0 and 1.0
     *
     */
    perlin: function(x, y, z) {
        //-----------------------------------------------------------------------------
        //
        // Properties
        //
        //-----------------------------------------------------------------------------
        var x = x || 0;
        var y = y || 0;
        var z = z || 0;

        var result;


        //-----------------------------------------------------------------------------
        //
        // Methods
        //
        //-----------------------------------------------------------------------------
        var fade = function(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        };

        var lerp = function(t, a, b) {
            return a + t * (b - a);
        };

        var grad = function(hash, x, y, z) {
            var h = hash & 15;
            var u = h < 8 ? x : y,
                v = h < 4 ? y : h == 12 || h == 14 ? x : z;
            return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
        };

        var scale = function(n) {
            return (1 + n) / 2;
        };


        //-----------------------------------------------------------------------------
        (function() {
            var p = new Array(512)
            var permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

            for (var i = 0; i < 256; i++) {
                p[256 + i] = p[i] = permutation[i];
            }

            var _x = Math.floor(x) & 255;
            // find unit cube that...
            var _Y = Math.floor(y) & 255;
            // contains point
            var _z = Math.floor(z) & 255;
            x -= Math.floor(x); // find relative x, y, z...
            y -= Math.floor(y); // of point in cube
            z -= Math.floor(z);

            var u = fade(x);
            // compute fade curves...
            var v = fade(y);
            // for each x, y, z
            var w = fade(z);

            var A = p[_x] + _Y;
            var AA = p[A] + _z;
            var AB = p[A + 1] + _z;
            // hash coordinates of...
            var B = p[_x + 1] + _Y;
            var BA = p[B] + _z;
            var BB = p[B + 1] + _z; // the 8 cube corners

            result = scale(
                lerp(
                    w,
                    lerp(v, lerp(u, grad(p[AA], x, y, z), // and add..
                    grad(p[BA], x - 1, y, z)), // blended...
                    lerp(u, grad(p[AB], x, y - 1, z), // results...
                    grad(p[BB], x - 1, y - 1, z))), // from 8...
                    lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), // corners...
                        grad(p[BA + 1], x - 1, y, z - 1)), // of cube
                        lerp(u, grad(p[AB + 1], x, y - 1, z - 1),
                            grad(p[BB + 1], x - 1, y - 1, z - 1)
                        )
                    )
                )
            );
        })();

        return result;
    }

};

/**!
 * FRoute
 *
 * Travelling Salesman Problem Algorithm
 * Taken from "SVG Stipple Generator, v 1.0"
 * Copyright (C) 2012 by Windell H. Oskay
 *
 * http://www.evilmadscientist.com
 * http://www.evilmadscientist.com/go/stipple
 *
 *
 * Modified/Simplified for Paper.js
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

/**
 * @param  {PathItem} items
 *      an array of PathItems
 * @param  {Object} properties (optional)
 * {
 *     iterations : 1000 // {Number} tests per frame (higher = better)
 * }
 *
 * @return {Array}
 *
 */
folio.FRoute = function(items, properties) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var items = items;

    properties = properties || {};
    var iterations = properties.iterations || 1000;

    var routeStep = 0;
    var routeNodes = [];



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    (function calculate() {
        var temp;
        var p1;

        if (routeStep === 0) {
            var routeNodesLength = 0;
            var routeNodesTemp = [items.length];

            var px, py;
            for (var i = 0; i < items.length; ++i) {
                routeNodesTemp[i] = false;
                px = items[i].position.x;
                py = items[i].position.y;

                if ((px >= view.bounds.width) || (py >= view.bounds.height) ||
                    (px < 0) || (py < 0)) {
                    continue;
                }
                else {
                    routeNodesTemp[i] = true;
                    routeNodesLength++;
                }
            }

            routeNodes = [routeNodesLength];
            var tempCounter = 0;
            for (var i = 0; i < items.length; ++i) {
                if (routeNodesTemp[i]) {
                    routeNodes[tempCounter] = i;
                    tempCounter++;
                }
            }
        }

        var nodesNum = routeNodes.length - 1;
        if (routeStep < (routeNodes.length - 2))  {
            // console.log('Nearest neighbor ("Simple, Greedy") algorithm path optimization:');
            // 1000 steps per frame displayed; you can edit this number!
            var StopPoint = routeStep + 1000;

            if (StopPoint > nodesNum) {
                StopPoint = nodesNum;
            }

            var ClosestNode;
            var distMin;
            var p2, dx, dy;
            for (var i = routeStep; i < StopPoint; ++i) {
                p1 = items[routeNodes[routeStep]].position;
                ClosestNode = 0;
                distMin = Number.MAX_VALUE;

                for (var j = routeStep + 1; j<nodesNum; ++j) {
                    p2 = items[routeNodes[j]].position;

                    dx = p1.x - p2.x;
                    dy = p1.y - p2.y;
                    distance = (dx * dx + dy * dy);   // Only looking for closest; do not need sqrt factor!

                    if (distance < distMin) {
                        ClosestNode = j;
                        distMin = distance;
                    }
                }

                temp = routeNodes[routeStep + 1];
                //p1 = items[routeNodes[routeStep + 1]];
                routeNodes[routeStep + 1] = routeNodes[ClosestNode];
                routeNodes[ClosestNode] = temp;

                if (routeStep < (nodesNum)) {
                    routeStep++;
                }
                else {
                    console.log('Optimizing path');
                }
            }

        }
        //else {
            // Initial routing is complete
            // console.log('2-opt heuristic optimization');
            // Identify a pair of edges that would become shorter by reversing part of the tour.

            // var groupPath = new Group();
            var indexA, indexB;
            var a0, a1;
            var b0, b1;
            var dx, dy;
            var distance, distance2;
            var indexhigh, indexLow;
            for (var i = 0; i < iterations; ++i) {
                indexA = Math.floor(Math.random() * nodesNum);
                indexB = Math.floor(Math.random() * nodesNum);

                if (Math.abs(indexA - indexB) < 2) {
                    continue;
                }

                if (indexB < indexA) {
                    temp = indexB;
                    indexB = indexA;
                    indexA = temp;
                }

                a0 = items[routeNodes[indexA]].position;
                a1 = items[routeNodes[indexA + 1]].position;
                b0 = items[routeNodes[indexB]].position;
                b1 = items[routeNodes[indexB + 1]].position;

                // Original distance:
                dx = a0.x - a1.x;
                dy = a0.y - a1.y;
                distance = (dx * dx + dy * dy);   // Only a comparison; do not need sqrt factor!

                dx = b0.x - b1.x;
                dy = b0.y - b1.y;
                distance += (dx * dx + dy * dy);  // Only a comparison; do not need sqrt factor!

                // Possible shorter distance?
                dx = a0.x - b0.x;
                dy = a0.y - b0.y;

                distance2 = (dx * dx + dy * dy);  // Only a comparison; do not need sqrt factor!
                dx = a1.x - b1.x;
                dy = a1.y - b1.y;
                distance2 += (dx * dx + dy * dy); // Only a comparison; do not need sqrt factor!

                if (distance2 < distance) {
                    indexhigh = indexB;
                    indexlow = indexA + 1;

                    while (indexhigh > indexlow) {
                        temp = routeNodes[indexlow];
                        routeNodes[indexlow] = routeNodes[indexhigh];
                        routeNodes[indexhigh] = temp;

                        indexhigh--;
                        indexlow++;
                    }
                }

            }
        // }
        //
    })();


    return routeNodes;
};

/**!
 * FSkeleton
 *
 * Calculate center points
 * https://lh3.googleusercontent.com/-PJzKtYeme3Q/UvjvCrxVXvI/AAAAAAAACf8/tg5UiY5US7g/w1624-h1666-no/pen_control.png
 *
 * http://metapolator.com/about
 * https://github.com/metapolator/metapolator/blob/17190aa0705912b8244961bca755a12ee042d0a3/static/demo/centerline.html
 *
 *
 * Modified/Expanded
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

/**
 * @param  {PathItem} item
 *      a PathItem
 *
 * @return {Array}
 *
 */
folio.FSkeleton = function(item) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var item = item;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     * extract lines from PathItem into lines Array
     *
     * @param  {Point} point     [description]
     * @param  {Point} coords    [description]
     * @param  {Point} handleIn  [description]
     * @param  {Point} handleOut [description]
     *
     * @return {Object}           [description]
     */
    function getLines(point, coords, handleIn, handleOut) {
        var regex = /(z\d+)([lr])/;
        var match = point.match(regex);
        if (match) {
            var pointname = match[1];

            if (!lines[pointname]) {
                lines[pointname] = [undefined, undefined, undefined, undefined];
            }

            if (match[2] == 'r') {
                lines[pointname][1] = coords;
            }
            else if (match[2] == 'l') {
                lines[pointname][0] = coords;
                lines[pointname][2] = handleIn;
                lines[pointname][3] = handleOut;
            }
        }
    }

    /**
     * @param  {PathItem} item
     *      a PathItem
     *
     * @return {PathItem}
     *
     */
    function getCenterLines() {
        centerlinepath = new Path();
        centerlinepath.closed = false;

        for (var i=0, j=item.segments.length; i!=j; i++) {
            // step j down
            --j;

            // point 1
            var x1 = item.segments[i].point.x;
            var y1 = item.segments[i].point.y;
            // point 2
            var x2 = item.segments[j].point.x;
            var y2 = item.segments[j].point.y;

            var k, b, Xc, Yc;

            if (x2 == x1) {
                Xc = x1;
                Yc = y2 - (y2 - y1) / 2;
            }
            else if (y1 == y2) {
                Xc = x2 - (x2 - x1) / 2;
                Yc = y1;
            }
            else {
                Xc = x2 - (x2 - x1) / 2;
                Yc = y2 - (y2 - y1) / 2;
            }

            var centerpoint = new Point(Xc, Yc);
            new Path.Circle({
                center: centerpoint,
                radius: 6,
                strokeColor: new Color({
                    hue: (360/item.segments.length)*i,
                    saturation: 0.9,
                    brightness: 0.9
                }),
                strokeWidth: 3
            });
            var segment = new Segment(
                centerpoint,
                item.curves[i].segment2.handleIn,
                item.curves[i].segment1.handleOut
            );
            centerlinepath.add(segment);
        }

        return centerlinepath;
    }


    // ------------------------------------------------------------------------
    return {
        get : getCenterLines
    };

};

/**!
 *
 * FString.js
 *
 * Extensions to JavaScript Array may be bad form... but whatever
 *
 */


//------------------------------------------------------------------------
//
// Strings
//
//------------------------------------------------------------------------

/**
 * converts given string to Title Case
 * http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
 *
 * @return {String} input String in Title Case
 *
 */
String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

/**
 * trims white space from left (start) of String
 * http://stackoverflow.com/questions/3000649/trim-spaces-from-start-and-end-of-string
 *
 * @return {String} trimmed input String
 *
 */
String.prototype.trimStart = function() {
    return this.replace(/^\s\s*/, '');
};
if (!String.prototype.trimLeft) {
    String.prototype.trimLeft = String.prototype.trimStart;
}

/**
 * trims white space from right (end) of String
 * http://stackoverflow.com/questions/3000649/trim-spaces-from-start-and-end-of-string
 *
 * @return {String} trimmed input String
 *
 */
String.prototype.trimEnd = function() {
    return this.replace(/\s\s*$/, '');
};
if (!String.prototype.trimRight) {
    String.prototype.trimRight = String.prototype.trimEnd;
}

/**
 * trims all white space from String
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
 *
 * @return {String} trimmed input string
 *
 */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/gm, '');
    };
}

/**
 * converts String to Boolean value
 *
 * @return {Boolean}
 *
 */
String.prototype.toBool = function() {
    switch(this.toLowerCase()) {
            case 'true': case 'yes': case '1': return true;
            case 'false': case 'no': case '0': case null: return false;
            default: return Boolean(this);
    }
};

/**
 * reverse the order of a String
 *
 * @return {String}
 */
String.prototype.reverse = function() {
    var lines = this.split('\n'),
        temp = '';
    for (var i = 0; i < lines.length; i++) {
        lines[i].trim();
        temp = lines[i] + '\n' + temp;
    }

    return temp;
};

/**
 * split String to contain specific amount of content per line, as defined by the delimitter
 *
 * @param  {Number} amt        amount of content
 * @param  {String} delimitter (option) what to break the original String on
 *
 * @return {String}
 */
String.prototype.perLine = function(amt, delimitter) {
    delimitter = delimitter || ' ';
    var words = this.split(delimitter),
        temp = '',
        count = 1;
    for (var i = 0; i < words.length; i++) {
        words[i].trim();
        temp = (count % amt === 0 && count !== 1)
            ? temp + words[i] + '\n'
            : temp + words[i] + delimitter;
        count++;
    }

    return temp;
};

/**
 * generate a String of random characters
 *
 * @param  {Number} length number of charaters in random String (default: 36)
 *
 * @return {String}
 */
String.prototype.random = function(length) {
    length = length || 36;
    var val = '';
    for (; val.length < length; val += Math.random().toString(36).substr(2)) {}
    return val.substr(0, length);
};

/**!
 * FTileEngine
 *
 * A simple tile engine
 * (requires FArray.js)
 *
 * Reads a collection of SVG tiles (square) and generatively piece them
 * together based on where the tiles have connection points.
 * Only supports connections on the top, right, bottom, left
 *
 * Each SVG must have a 'data-sides' attribute that is expressed in 1's and 0's
 * <svg id="tile-00" data-sides="0101"...
 *
 * @example
 *
 *   ----------- ----------- -----------
 *   |    |    | |         | |         |
 *   |    +----| |---------| |----+    |
 *   |    |    | |         | |    |    |
 *   ----------- ----------- -----------
 *     trbl         trbl        trbl
 *     1110         0101        0011
 *
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

/**
 * FTileEngine
 *
 * @param {Array} ids an array of SVG id attributes
 *
 * @return {Object}
 *
 * @example
 * var tileEngine = new FTileEngine([
 *     'tile-00',
 *     'tile-01',
 *     'tile-02',
 *     'tile-03'
 * ]);
 *
 * // draw tiles on screen
 * var row, svg, path;
 * for (var i = 0; i < tileEngine.getMap().length; i++) {
 *      row = tileEngin.getMap()[i];
 *      for (var j = 0; j < row.length; j++) {
 *          svg = project.importSVG(document.getElementById(row[j].id), true);
 *          path = new Group(svg.children);
 *          path.bounds.x = j * path.bounds.width;
 *          path.bounds.y = i * path.bounds.height;
 *          svg.remove();
 *      }
 *  }
 *
 */

folio.FTileEngine = function(ids) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var tiles = {};
    var tileMap = [];



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    // /**
    //  * Compare two arrays and create a new array
    //  * with only the objects that are the same
    //  *
    //  * @param {Array} arr
    //  *          Array object
    //  *
    //  * @return {Array} new Array object
    //  *
    //  */
    // Array.prototype.same = function(arr) {
    //     var a = this.concat();
    //     var c = [];
    //     for (var i = 0; i < a.length; ++i) {
    //         for (var j = 0; j < arr.length; ++j) {
    //             if (a[i] === arr[j]) {
    //                 c.push(a[i]);
    //             }
    //         }
    //     }
    //     return c;
    // };

    // -----------------------------------------------------------------------------
    (function init() {
        if (ids !== undefined) {
            setIds(ids);
        }
    })();

    // -----------------------------------------------------------------------------
    // TODO: make this an FTile class
    function createTileObject(element) {
        var data = element.getAttribute('data-sides');
        var obj = {
            id     : element.id,

            width  : element.getBBox().width,
            height : element.getBBox().height,

            data   : data,
            top    : [],
            right  : [],
            bottom : [],
            left   : []
        };
        return obj;
    }

    function createNeighbors() {
        for (var i in tiles) {
            for (var j in tiles) {
                if (tiles[i].data[0] === '1' && tiles[j].data[2] === '1' ||
                    tiles[i].data[0] === '0' && tiles[j].data[2] === '0') {
                    tiles[i].top.push(j);
                }
                if (tiles[i].data[1] === '1' && tiles[j].data[3] === '1' ||
                    tiles[i].data[1] === '0' && tiles[j].data[3] === '0') {
                    tiles[i].right.push(j);
                }
                if (tiles[i].data[2] === '1' && tiles[j].data[0] === '1' ||
                    tiles[i].data[2] === '0' && tiles[j].data[0] === '0') {
                    tiles[i].bottom.push(j);
                }
                if (tiles[i].data[3] === '1' && tiles[j].data[1] === '1' ||
                    tiles[i].data[3] === '0' && tiles[j].data[1] === '0') {
                    tiles[i].left.push(j);
                }
            }
        }


        return tiles;
    }

    function createTileMap(cols, rows) {
        var tile = getRandom();
        cols = cols || Math.ceil(view.bounds.width / tile.width);
        rows = rows || Math.ceil(view.bounds.height / tile.height);

        tileMap = [];
        var tileRow = [];
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (i === 0) {
                    tile = getRandomNeighbor(tile, 'right');
                }
                else if (i > 0 && j > 0) {
                    tile = getRandomNeighborMultipleSides([{
                        tile : tile,
                        side : 'right'
                    }, {
                        tile : tileMap[i - 1][j],
                        side : 'bottom'
                    }]);
                }
                tileRow.push(tile);
            }
            tileMap.push(tileRow);
            tileRow = [];
            tile = getRandomNeighbor(tileMap[i][j - cols], 'bottom');
        }
        return tileMap;
    }

    // -----------------------------------------------------------------------------
    //
    // Sets
    //
    /**
     * Take an array of SVG id's and create tile objects from them
     *
     * @param {Array} arr an array of SVG tile id's
     */
    function setIds(arr) {
        var key;
        for (var i = 0; i < arr.length; i++) {
            key = arr[i];
            tiles[key] = createTileObject(document.getElementById(arr[i]));
        }

        createNeighbors();
        createTileMap();
    }


    // -----------------------------------------------------------------------------
    //
    // Gets
    //
    /**
     * Get a tile
     *
     * @param {String} id an id of a specific tile
     *
     * @return {Object} a valid tile object
     */
    function get(id) {
        if(typeof id === 'string') {
            return tiles[id];
        }
        return null;
    }

    /**
     * Get a random tile
     *
     * @return {Object} a valid tile object
     */
    function getRandom() {
        var keys = Object.keys(tiles);
        var sel = keys[Math.floor(keys.length * Math.random())];
        return tiles[sel];
    }

    /**
     * Get an array of valid neighbors, as determined from one tile
     *
     * @param  {Object} obj  a valid tile object
     * @param  {String} side which side should the neighbor match
     *                       'top', 'right', 'bottom', 'left'
     *
     * @return {Array}       an array of valid tile objects
     */
    function getNeighbor(obj, side) {
        return obj[side];
    }

    /**
     * Get a random valid neighbor, as determined from one tile
     *
     * @param  {Object} obj  a valid tile object
     * @param  {String} side which side should the neighbor match
     *                       'top', 'right', 'bottom', 'left'
     *
     * @return {Object}      a valid tile object
     */
    function getRandomNeighbor(obj, side) {
        var arr = getNeighbor(obj, side);
        // var sel = arr[paper.randomInt(arr.length)];
        var sel = arr[parseInt(Math.random() * arr.length)];
        return tiles[sel];
    }

    /**
     * Get an array of valid neighbors, as determined from two tiles
     *
     * @param  {Array} arr an array of objects
     *  [{
     *     tile : tile,
     *     side : 'right'
     *  }, {
     *     tile : tileMap[i - 1][j],
     *     side : 'bottom'
     *  }]
     *
     * @return {Array} an array of valid tile objects
     */
    function getNeighborMultipleSides(arr) {
        if (arr.length >= 2) {
            var neighbors = arr[0].tile[arr[0].side].same(arr[1].tile[arr[1].side]);
            return neighbors;
        }
        return false;
    }

    /**
     * Get a random valid neighbor, as determined from two tiles
     *
     * @param  {Array} arr an array of objects
     *  [{
     *     tile : tile,
     *     side : 'right'
     *  }, {
     *     tile : tileMap[i - 1][j],
     *     side : 'bottom'
     *  }]
     *
     * @return {Object} a tile object
     */
    function getRandomNeighborMultipleSides(arr) {
        if (arr.length >= 2) {
            var neighbors = getNeighborMultipleSides(arr);
            // var sel = paper.randomInt(neighbors.length);
            var sel = neighbors[parseInt(Math.random() * neighbors.length)];
            return get(neighbors[sel]);
        }
        return false;
    }

    /**
     * @return {Array} tile map array
     */
    function getTileMap() {
        return tileMap;
    }


    // -----------------------------------------------------------------------------
    return {
        tiles                          : tiles,

        createMap                      : createTileMap,

        set                            : setIds,

        get                            : get,
        getRandom                      : getRandom,
        getNeighbor                    : getNeighbor,
        getRandomNeighbor              : getRandomNeighbor,
        getNeighborMultipleSides       : getNeighborMultipleSides,
        getRandomNeighborMultipleSides : getRandomNeighborMultipleSides,
        getMap                         : getTileMap
    };
}

/**!
 * FTriangulate
 *
 * Delaunay Triangulation
 * Joshua Bell
 * inexorabletash@hotmail.com
 *
 * http://www.travellermap.com/
 * Inspired by: http://www.codeguru.com/cpp/data/mfc_database/misc/article.php/c8901/
 *
 *
 * Modifications for specific use with Paper.js/Scriptographer
 *
 * Ken Frederick
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 *
 * Credit given where credit is due
 *
 *
 * This work is hereby released into the Public Domain. To view a copy of the public
 * domain dedication, visit http://creativecommons.org/licenses/publicdomain/ or send
 * a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco,
 * California, 94105, USA.
 *
 */



// ------------------------------------------------------------------------
//
// Constants
//
// ------------------------------------------------------------------------
var EPSILON = 1.0e-6;



/**
 * FTriangulate
 *
 * @param {Array} points
 *      input vertices (Points)
 *
 * @return {Array}
 *
 * @example
 * var triangulate = new FTriangulate(points);
 *
 * // draw faces
 * var triangle;
 * for (var i = 0; i < triangulate.length; i++) {
 *    triangle = triangulate[i];
 *
 *    // draw triangle
 *    face = new Path();
 *    face.add(triangle.p1);
 *    face.add(triangle.p2);
 *    face.add(triangle.p3);
 *    face.closed = true;
 *    face.strokeColor = 'white';
 * }
 *
 *
 * @example
 * var triangulate = new FTriangulate(points);
 *
 * // draw faces
 * var triangle;
 * for (var i = 0; i < triangulate.length; i++) {
 *    triangle = triangulate[i];
 *
 *    // draw triangle
 *    face = new Path.FTriangle(
 *        triangle.p1,
 *        triangle.p2,
 *        triangle.p3
 *    );
 *    face.closed = true;
 *    face.strokeColor = 'white';
 * }
 *
 */
folio.FTriangulate = function(points) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    if (points === undefined) {
        return;
    }
    var triangles;
    var pointsNew = [];



    // -----------------------------------------------------------------------------
    //
    // Classes
    //
    // -----------------------------------------------------------------------------
    /**
     * Triangle
     *
     * @param {Point} arg0
     *          first Point of Triangle
     * @param {Point} arg1
     *          second Point of Triangle
     * @param {Point} arg2
     *          third Point of Triangle
     */
    /**
     *
     * @param {Path} arg0
     *          3-sided Path (or FTriangle)
     */
    var Triangle = function(arg0, arg1, arg2) {
        // -----------------------------------------------------------------------------
        //
        // Properties
        //
        // -----------------------------------------------------------------------------
        var p1, p2, p3;
        if (arguments.length === 3) {
            p1 = arg0;
            p2 = arg1;
            p3 = arg2;
        }
        else if (arguments.length === 1 && arg0.segments.length === 3) {
            p1 = arg0.segments[0].point;
            p2 = arg0.segments[1].point;
            p3 = arg0.segments[2].point;
        }
        else {
            return;
        }



        // -----------------------------------------------------------------------------
        //
        // Methods
        //
        // -----------------------------------------------------------------------------
        /**
         * vertex (Edge) sharing
         *
         * @param {Triangle} other
         *          the triangle to check for vertex (Edge) sharing
         *
         * @return {Triangle} the triangle that shares the given vertex (Edge)
         */
        function sharesVertex(other) {
            return p1 == other.p1 || p1 == other.p2 || p1 == other.p3 ||
                   p2 == other.p1 || p2 == other.p2 || p2 == other.p3 ||
                   p3 == other.p1 || p3 == other.p2 || p3 == other.p3;
        }

        /**
         * @return {Point} circle
         *      Point of the circle center
         */
        function circumcenter() {
            var circle = new Point();
            var m1, m2;
            var mx1, mx2;
            var my1, my2;

            if (Math.abs(p2.y - p1.y) < EPSILON) {
                m2 = - (p3.x - p2.x) / (p3.y - p2.y);
                mx2 = (p2.x + p3.x) / 2.0;
                my2 = (p2.y + p3.y) / 2.0;
                circle.x = (p2.x + p1.x) / 2.0;
                circle.y = m2 * (circle.x - mx2) + my2;
            }
            else if (Math.abs(p3.y - p2.y) < EPSILON) {
                m1 = - (p2.x - p1.x) / (p2.y - p1.y);
                mx1 = (p1.x + p2.x) / 2.0;
                my1 = (p1.y + p2.y) / 2.0;
                circle.x = (p3.x + p2.x) / 2.0;
                circle.y = m1 * (circle.x - mx1) + my1;
            }
            else {
                m1 = - (p2.x - p1.x) / (p2.y - p1.y);
                m2 = - (p3.x - p2.x) / (p3.y - p2.y);
                mx1 = (p1.x + p2.x) / 2.0;
                mx2 = (p2.x + p3.x) / 2.0;
                my1 = (p1.y + p2.y) / 2.0;
                my2 = (p2.y + p3.y) / 2.0;
                circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
                circle.y = m1 * (circle.x - mx1) + my1;
            }

            return circle;
        }

        // -----------------------------------------------------------------------------
        /**
         * @return {Point} the centroid center
         *
         * http://www.mathwords.com/c/centroid_formula.htm
         */
        function centroid() {
            return new Point(
                (p1.x + p2.x + p3.x) / 3,
                (p1.y + p2.y + p3.y) / 3
            );
        }

        // -----------------------------------------------------------------------------
        /**
         * @return {Array} a sorted array (Edge) of the Triangle's Edges (shortest to longest)
         */
        function distances() {
            var distances = [];
            distances[0] = new Edge(p1, p2);
            distances[1] = new Edge(p1, p3);
            distances[2] = new Edge(p3, p2);

            distances.sort();
            return distances;
        }

        // -----------------------------------------------------------------------------
        /**
         * http://www.btinternet.com/~se16/hgb/triangle.htm
         *
         * @return {Number} triangle width
         */
        function width() {
            var x1 = 0;
            if (p1.x < p2.x && p1.x < p3.x) {
                x1 = p1.x;
            }
            else if (p2.x < p1.x && p2.x < p3.x) {
                x1 = p2.x;
            }
            else if (p3.x < p1.x && p3.x < p2.x) {
                x1 = p3.x;
            }

            var x2 = 0;
            if (p1.x > p2.x && p1.x > p3.x) {
                x2 = p1.x;
            }
            else if (p2.x > p1.x && p2.x > p3.x) {
                x2 = p2.x;
            }
            else if (p3.x > p1.x && p3.x > p2.x) {
                x2 = p3.x;
            }

            var f = Math.abs(x2 - x1);

            return f;
        }

        /**
         * http://www.btinternet.com/~se16/hgb/triangle.htm
         *
         * @return {Number} triangle height
         */
        function height() {
            var y1 = 0;
            if (p1.y < p2.y && p1.y < p3.y) {
                y1 = p1.y;
            }
            else if (p2.y < p1.y && p2.y < p3.y) {
                y1 = p2.y;
            }
            else if (p3.y < p1.y && p3.y < p2.y) {
                y1 = p3.y;
            }

            var y2 = 0;
            if (p1.y > p2.y && p1.y > p3.y) {
                y2 = p1.y;
            }
            else if (p2.y > p1.y && p2.y > p3.y) {
                y2 = p2.y;
            }
            else if (p3.y > p1.y && p3.y > p2.y) {
                y2 = p3.y;
            }

            var g = Math.abs(y2 - y1);

            return g;
        }

        // -----------------------------------------------------------------------------
        // TODO: add this to FCalculate.js
        function area() {
            var area = 0;
            area += (p1.x + p3.x) * (p3.y - p1.y);
            area += (p2.x + p1.x) * (p1.y - p2.y);
            area += (p3.x + p2.x) * (p2.y - p3.y);
            return area / 2;
        }



        //
        // Gets
        //
        /**
         * @return {Array} the points of the triangle as a Point array
         */
        function get() {
            return [p1, p2, p3];
        }


        // -----------------------------------------------------------------------------
        return {
            p1           : p1,
            p2           : p2,
            p3           : p3,

            sharesVertex : sharesVertex,
            getCentroid  : centroid,

            getArea      : area,
            getWidth     : width,
            getHeight    : height,

            getPoints    : get
        };

    };

    /**
     * Edge
     *
     * @param {Point} p1
     *          first Point of Edge
     * @param {Point} p2
     *          second Point of Edge
     */
     /**
      *
      * @param {Path} p1
      *          first Point of Edge
      * @param {Point} p2
      *          second Point of Edge
      */
    var Edge = function(arg0, arg1) {
        // -----------------------------------------------------------------------------
        //
        // Properties
        //
        // -----------------------------------------------------------------------------
        var p1, p2;
        if (arguments.length === 2) {
            p1 = arg0;
            p2 = arg1;
        }
        else if (arguments.length === 1 && arg0.segments.length === 2) {
            p1 = arg0.segments[0].point;
            p2 = arg0.segments[1].point;
        }
        else {
            return;
        }
        var dist = p1.getDistance(p2);



        // -----------------------------------------------------------------------------
        //
        // Methods
        //
        // -----------------------------------------------------------------------------
        /*
         * sorts edge by shortest to longest
         */
        function compareTo(other) {
            return dist < other.dist
                ? -1
                : dist > other.dist
                    ? 1
                    : 0;
        }

        /**
         *
         * @return {Array} the points of the edge as a Point array
         *
         */
        function get() {
            return [p1, p2];
        }


        // -----------------------------------------------------------------------------
        return {
            p1        : p1,
            p2        : p2,
            dist      : dist,

            getPoints : get
        };
    };



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    /**
     * Triangulation subroutine
     *
     * Returned is a list of triangular faces in the Array triangles
     * These triangles are arranged in a consistent clockwise order.
     *
     * @return {Array} triangles
     *      return Array of Triangles in clockwise order
     *
     */
    function init() {
        triangles = [];

        if (points.length != null) {
            // remove duplicate points
            points = uniquePoints(points);

            // sort vertex array in increasing x values
            points.sort(sortLeftToRight);
            // points.sort(sortTopToBottom);


            // Find the maximum and minimum vertex bounds.
            // This is to allow calculation of the bounding triangle
            var xmin = (points[0]).x;
            var ymin = (points[0]).y;
            var xmax = xmin;
            var ymax = ymin;

            // z is used for storing misc. info i.e. normalized brightness data
            var z = (points[0]).z;

            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                if (p.x < xmin) {
                    xmin = p.x;
                }
                if (p.x > xmax) {
                    xmax = p.x;
                }
                if (p.y < ymin) {
                    ymin = p.y;
                }
                if (p.y > ymax) {
                    ymax = p.y;
                }
            }

            var dx = xmax - xmin;
            var dy = ymax - ymin;
            var dmax = (dx > dy) ? dx : dy;
            var xmid = (xmax + xmin) / 2.0;
            var ymid = (ymax + ymin) / 2.0;

            triangles = [];
            var complete = new HashSet(); // for complete Triangles


            // Set up the super triangle
            // This is a triangle which encompasses all the sample points.
            // The super triangle coordinates are added to the end of the
            // vertex list. The super triangle is the first triangle in
            // the triangle list.
            var superTriangle = new Triangle(
                new Point(xmid - 2.0 * dmax, ymid - dmax),
                new Point(xmid, ymid + 2.0 * dmax),
                new Point(xmid + 2.0 * dmax, ymid - dmax)
            );
            triangles.push(superTriangle);


            // Include each point one at a time into the existing mesh
            var edges = [];
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                edges = [];


                // Set up the edge buffer.
                // If the point (xp,yp) lies inside the circumcircle then the
                // three edges of that triangle are added to the edge buffer
                // and that triangle is removed.
                var circle = new Point();

                for (var j = triangles.length - 1; j >= 0; j--) {
                    var t = triangles[j];
                    if (complete.contains(t)) {
                        continue;
                    }

                    var inside = circumCircle(p, t, circle);

                    if (circle.x + circle.z < p.x) {
                        complete.add(t);
                    }
                    if (inside) {
                        edges.push(new Edge(t.p1, t.p2));
                        edges.push(new Edge(t.p2, t.p3));
                        edges.push(new Edge(t.p3, t.p1));
                        triangles.splice(j, 1);
                    }
                }

                // remove duplicate edges
                edges = uniqueEdges(edges);

                // Tag multiple edges
                // Note: if all triangles are specified anticlockwise then all
                // interior edges are opposite pointing in direction.
                for (var j = 0; j < edges.length - 1; j++) {
                    var e1 = edges[j];
                    for (var k = j + 1; k < edges.length; k++) {
                        var e2 = edges[k];
                        if (e1.p1 == e2.p2 && e1.p2 == e2.p1) {
                            e1.p1 = null;
                            e1.p2 = null;
                            e2.p1 = null;
                            e2.p2 = null;
                        }
                        // Shouldn't need the following, see note above
                        if (e1.p1 == e2.p1 && e1.p2 == e2.p2) {
                            e1.p1 = null;
                            e1.p2 = null;
                            e2.p1 = null;
                            e2.p2 = null;
                        }
                    }
                }

                // Form new triangles for the current point
                // Skipping over any tagged edges.
                // All edges are arranged in clockwise order.
                for (var j = 0; j < edges.length; j++) {
                    var e = edges[j];
                    if (e.p1 == null || e.p2 == null) {
                        continue;
                    }
                    // determine if point in triangle is new
                    // if it is mark it as so
                    for (var k = 0; k < pointsNew.length; k++) {
                        if (e.p1 == pointsNew[k]) {
                            e.p1.name = '__new';
                        }
                        else {
                            e.p1.name = null;
                        }

                        if (e.p2 == pointsNew[k]) {
                            e.p2.name = '__new';
                        }
                        else {
                            e.p2.name = null;
                        }

                        if (p == pointsNew[k]) {
                            p.name = '__new';
                        }
                        else {
                            p.name = null;
                        }
                    }
                    triangles.push(new Triangle(e.p1, e.p2, p));
                }

            }

            // Remove triangles with super triangle vertices
            for (var i = triangles.length - 1; i >= 0; i--) {
                var t = triangles[i];
                if (t.sharesVertex(superTriangle)) {
                    triangles.splice(i, 1);
                }
            }

        }

        // return triangles;
    }
    init();

    // -----------------------------------------------------------------------------
    /**
     * Return TRUE if a point (xp,yp) is inside the circumcircle made up
     * of the points (x1,y1), (x2,y2), (x3,y3)
     * The circumcircle center is returned in (xc,yc) and the radius r
     * NOTE: A point on the edge is inside the circumcircle
     *
     * @param {Point} p
     *          Point to check
     * @param {Triangle} t
     *          Triangle to check
     * @param {Item} circle
     *          circle to check
     *
     */
    function circumCircle(p, t, circle) {
        var m1, m2;
        var mx1, mx2;
        var my1, my2;
        var dx, dy;

        var rsqr;
        var drsqr;

        // Check for coincident points
        if (Math.abs(t.p1.y - t.p2.y) < EPSILON && Math.abs(t.p2.y - t.p3.y) < EPSILON) {
            //System.err.println("CircumCircle: Points are coincident.");
            return false;
        }

        if (Math.abs(t.p2.y - t.p1.y) < EPSILON) {
            m2 = - (t.p3.x - t.p2.x) / (t.p3.y - t.p2.y);
            mx2 = (t.p2.x + t.p3.x) / 2.0;
            my2 = (t.p2.y + t.p3.y) / 2.0;
            circle.x = (t.p2.x + t.p1.x) / 2.0;
            circle.y = m2 * (circle.x - mx2) + my2;
        }
        else if (Math.abs(t.p3.y - t.p2.y) < EPSILON) {
            m1 = - (t.p2.x - t.p1.x) / (t.p2.y - t.p1.y);
            mx1 = (t.p1.x + t.p2.x) / 2.0;
            my1 = (t.p1.y + t.p2.y) / 2.0;
            circle.x = (t.p3.x + t.p2.x) / 2.0;
            circle.y = m1 * (circle.x - mx1) + my1;
        }
        else {
            m1 = - (t.p2.x - t.p1.x) / (t.p2.y - t.p1.y);
            m2 = - (t.p3.x - t.p2.x) / (t.p3.y - t.p2.y);
            mx1 = (t.p1.x + t.p2.x) / 2.0;
            mx2 = (t.p2.x + t.p3.x) / 2.0;
            my1 = (t.p1.y + t.p2.y) / 2.0;
            my2 = (t.p2.y + t.p3.y) / 2.0;
            circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
            circle.y = m1 * (circle.x - mx1) + my1;
        }

        dx = t.p2.x - circle.x;
        dy = t.p2.y - circle.y;
        rsqr = dx * dx + dy * dy;
        circle.z = Math.sqrt(rsqr);

        dx = p.x - circle.x;
        dy = p.y - circle.y;
        drsqr = dx * dx + dy * dy;

        return drsqr <= rsqr;
    }

    // -----------------------------------------------------------------------------
    /**
     * findClosest Triangle
     *
     * Returns the closest Triangle based on the input Triangle
     *
     * @param {Triangle} other
     *      the input Triangle to find it's closest neighbor
     *
     * @return {Triangle} closest Triangle
     */
    function findClosest(other) {
        var result;

        for (var i = 0; i < triangles.length; i++) {
            var iFind = triangles[i];
            var d1 = other.getCentroid.getDistance(iFind.getCentroid);

            for (var j = 0; j < triangles.length; j++) {
                // var jFind = triangles[i];
                var jFind = triangles[j];
                var d2 = other.getCentroid.getDistance(jFind.getCentroid);

                if (d2 < d1) {
                    result = jFind;
                    break;
                }

            }
        }

        return result;
    }

    // -----------------------------------------------------------------------------
    /**
     *
     * sort Point rray from left to right
     *
     * @param {Point} a
     * @param {Point} b
     *
     */
    function sortLeftToRight(a, b) {
        if (a.x < b.x) {
            return 1;
        }
        else if (a.x > b.x) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     *
     * sort Point array from top to bottom
     *
     * @param {Point} a
     * @param {Point} b
     *
     */
    function sortTopToBottom(a, b) {
        if (a.y < b.y) {
            return 1;
        }
        else if (a.y > b.y) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     * remove Point duplicates
     * TODO: add FCalculate.js (if it doesn't exist already)
     *
     * @param {Array} arr
     *      array to remove duplicate points from
     *
     * @return {Array} the cleaned up array
     *
     */
    function uniquePoints(arr){
        arr.sort();
        for (var i = 1; i < arr.length;){
            if (arr[i - 1].x == arr[i].x && arr[i - 1].y == arr[i].y) {
                arr.splice(i, 1);
            }
            else {
                i++;
            }
        }
        return arr;
    }

    /**
     * remove Edge duplicates
     * TODO: add FCalculate.js (if it doesn't exist already)
     *
     * @param {Array} arr
     *      array to remove duplicate edges from
     *
     * @return {Array} the cleaned up array
     *
     */
    function uniqueEdges(arr) {
        arr.sort();
        for (var i = 1; i<arr.length;){
            if (arr[i - 1].p1 == arr[i].p1 && arr[i - 1].p2 == arr[i].p2 ||
                arr[i - 1].p1 == arr[i].p2 && arr[i - 1].p2 == arr[i].p2 ) {
                    arr.splice(i, 1);
            }
            else {
                i++;
            }
        }
        return arr;

        // TODO: This is O(n^2), make it O(n) with a hash or some such
        // var uniqueEdges = [];
        // for (var i = 0; i < edges.length; i++) {
        //  var edge1 = edges[i];
        //  var unique = true;

        //  for (var j = 0; j < edges.length; j++) {
        //      if (i != j) {
        //          var edge2 = edges[j];
        //          if ((edge1.p1 == edge2.p1 && edge1.p2 == edge2.p2) ||
        //              (edge1.p1 == edge2.p2 && edge1.p2 == edge2.p1)) {
        //              unique = false;
        //              break;
        //          }
        //      }
        //  }

        //  if (unique) {
        //      uniqueEdges.push(edge1);
        //  }
        // }

        // return uniqueEdges;
    }


    // -----------------------------------------------------------------------------

    //
    // Sets
    //

    /**
     * add point(s) to Triangulation
     *
     * @param {Point} point
     *      a single Point or array of Points
     *
     */
    function addPoint(point) {
        pointsNew = [];

        if (point instanceof Array) {
            pointsNew = point;
            points = points.concat(point);
        }
        else {
            pointsNew[0] = point;
            points.push(point);
        }

        points = uniquePoints(points);

        init();
    }

    //
    // Gets
    //
    /**
     * @param {Number} index
     *      index of Triangle to return (optional)
     *
     * @return {Array} the Triangles as array
     */
    function getTriangles(index) {
        if (index != null) {
            return triangles[index];
        }
        else {
            return triangles;
        }
    }

    /**
     * @param {Number} index
     *      index of Point to return (optional)
     *
     * @return {Array} the points as a Point array
     */
    function getPoints(index) {
        if (index != null) {
            return points[index];
        }
        else {
            return points;
        }
    }



    // -----------------------------------------------------------------------------
    return {
        add          : addPoint,

        getTriangles : getTriangles,
        getPoints    : getPoints,
        getClosest   : findClosest
    };


};



/**
 *
 * HashSet
 * Phùng Văn Huy
 * huyphungvan@gmail.com
 *
 * http://code.huypv.net/2010/04/hashset-implementation-in-javascript.html
 *
 *
 * Modifications
 *
 * Ken Frederick
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */
var HashSet = function() {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var arr = [];



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    function add(e) {
        var arr = arr;
        var i = arr.indexOf(e);
        if (i == -1) {
            arr.push(e);
        }
    }

    function get(i) {
        return arr[i];
    }

    function size(i) {
        return arr.length;
    }

    function remove(e) {
        var arr =arr;
        var i = arr.indexOf(e);
        if (i != -1) {
            arr.splice(i, 1);
        }
    }

    function contains(o) {
        var b = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === o) {
                b = true;
                // break;
            }
        }
        return b;
    }


    //
    // Gets
    //
    function toString() {
        return arr.join(',');
    }



    // -----------------------------------------------------------------------------
    return {
        add      : add,
        get      : get,
        size     : size,
        remove   : remove,
        contains : contains,
        toString : toString
    };

};

/**
 *
 * Matrix3D
 *
 * forked from daijimachine's "Matrix3D(lib)"
 * http://jsdo.it/daijimachine/matrix3d
 *
 * @author Masayuki Daijima (ARCHETYP Inc.)
 * http://www.daijima.jp/blog/
 * http://twitter.com/daijimachine
 *
 *
 * expanded and modified with inspiration from three.js
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * http://creativecommons.org/licenses/LGPL/2.1/
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 */



/*
 *
 * Matrix3D
 *
 */
var Matrix3D = function( n11, n12, n13, n14,
                         n21, n22, n23, n24,
                         n31, n32, n33, n34,
                         n41, n42, n43, n44) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    this.n11 = n11 || 1.0;  this.n12 = n12 || 0.0;  this.n13 = n13 || 0.0;  this.n14 = n14 || 0.0;
    this.n21 = n21 || 0.0;  this.n22 = n22 || 1.0;  this.n23 = n23 || 0.0;  this.n24 = n24 || 0.0;
    this.n31 = n31 || 0.0;  this.n32 = n32 || 0.0;  this.n33 = n33 || 1.0;  this.n34 = n34 || 0.0;
    this.n41 = n41 || 0.0;  this.n42 = n42 || 0.0;  this.n43 = n43 || 0.0;  this.n44 = n44 || 1.0;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    this.clone = function() {
        return new Matrix3D( this.n11, this.n12, this.n13, this.n14,
                             this.n21, this.n22, this.n23, this.n24,
                             this.n31, this.n32, this.n33, this.n34,
                             this.n41, this.n42, this.n43, this.n44 );
    };

    // ------------------------------------------------------------------------
    this.concat = function(m) {

        this.init({
            n11: this.n11 * m.n11 + this.n12 * m.n21 + this.n13 * m.n31 + this.n14 * m.n41,
            n12: this.n11 * m.n12 + this.n12 * m.n22 + this.n13 * m.n32 + this.n14 * m.n42,
            n13: this.n11 * m.n13 + this.n12 * m.n23 + this.n13 * m.n33 + this.n14 * m.n43,
            n14: this.n11 * m.n14 + this.n12 * m.n24 + this.n13 * m.n34 + this.n14 * m.n44,

            n21: this.n21 * m.n11 + this.n22 * m.n21 + this.n23 * m.n31 + this.n24 * m.n41,
            n22: this.n21 * m.n12 + this.n22 * m.n22 + this.n23 * m.n32 + this.n24 * m.n42,
            n23: this.n21 * m.n13 + this.n22 * m.n23 + this.n23 * m.n33 + this.n24 * m.n43,
            n24: this.n21 * m.n14 + this.n22 * m.n24 + this.n23 * m.n34 + this.n24 * m.n44,

            n31: this.n31 * m.n11 + this.n32 * m.n21 + this.n33 * m.n31 + this.n34 * m.n41,
            n32: this.n31 * m.n12 + this.n32 * m.n22 + this.n33 * m.n32 + this.n34 * m.n42,
            n33: this.n31 * m.n13 + this.n32 * m.n23 + this.n33 * m.n33 + this.n34 * m.n43,
            n34: this.n31 * m.n14 + this.n32 * m.n24 + this.n33 * m.n34 + this.n34 * m.n44,

            n41: this.n41 * m.n11 + this.n42 * m.n21 + this.n43 * m.n31 + this.n44 * m.n41,
            n42: this.n41 * m.n12 + this.n42 * m.n22 + this.n43 * m.n32 + this.n44 * m.n42,
            n43: this.n41 * m.n13 + this.n42 * m.n23 + this.n43 * m.n33 + this.n44 * m.n43,
            n44: this.n41 * m.n14 + this.n42 * m.n24 + this.n43 * m.n34 + this.n44 * m.n44
        });

        // this.init(values);
    };

    // ------------------------------------------------------------------------
    this.init = function(values) {
        for (var i in values) {
            this[i] = values[i];
        }
    };

    // ------------------------------------------------------------------------
    this.createBox = function(  scalex, scaley, scalez,
                                rotationx, rotationy, rotationz,
                                tx, ty, tz) {
        this.identity();
        if (rotationx != 0) {
            this.rotateX( rotationx );
        }
        if (rotationy != 0) {
            this.rotateY( rotationy );
        }
        if (rotationz != 0) {
            this.rotateZ( rotationz );
        }
        if (scalex != 1 || scaley != 1 || scalez != 1) {
            this.scale( scalex, scaley, scalez );
        }
        if (tx != 0 || ty != 0 || tz != 0) {
            this.translate( tx, ty, tz );
        }
    };


    // ------------------------------------------------------------------------
    this.identity = function() {
        this.init({ n11:1, n12:0, n13:0, n14:0,
                          n21:0, n22:1, n23:0, n24:0,
                          n31:0, n32:0, n33:1, n34:0,
                          n41:0, n42:0, n43:0, n44:1 });
    };


    // ------------------------------------------------------------------------
    /*
     *
     * Rotation
     *
     */
    this.rotateX = function(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        this.concat(new Matrix3D(
            1, 0, 0, 0,
            0, cos, -sin, 0,
            0, sin, cos, 0,
            0, 0, 0, 1)
        );
    };

    this.rotateY = function(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        this.concat(new Matrix3D(
            cos, 0, sin, 0,
            0, 1, 0, 0,
            -sin, 0, cos, 0,
            0, 0, 0, 1)
        );
    };

    this.rotateZ = function(angle) {
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        this.concat(new Matrix3D(
            cos,  -sin, 0, 0,
            sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1)
        );
    };

    /**
     *
     * @param {FPoint3} axis
     *          FPoint3 xyz
     * @param {Number} angle
     *          rotation angle in degrees
     *
     */
    this.setRotateAxis = function(axis, angle) {
        // Based on http://www.gamedev.net/reference/articles/article1199.asp

        var cos = Math.cos( angle );
        var sin = Math.sin( angle );

        var t = 1 - cos;

        var x = axis.x();
        var y = axis.y();
        var z = axis.z();

        var tx = t * x;
        var ty = t * y;

        this.concat(
            tx * x + cos,       tx * y - sin * z,   tx * z + sin * y,   0,
            tx * y + sin * z,   ty * y + cos,       ty * z - sin * x,   0,
            tx * z - sin * y,   ty * z + sin * x,   t * z * z + cos,    0,
            0, 0, 0, 1
        );
    };


    // ------------------------------------------------------------------------
    /*
     * Scaling
     */
    this.scale = function(sx, sy, sz) {
        this.concat(new Matrix3D(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0,  1)
        );
    };


    // ------------------------------------------------------------------------
    /*
     * Translating
     */
    this.translate = function(dx, dy, dz) {
        this.n41 += dx;
        this.n42 += dy;
        this.n43 += dz;
    };


    // ------------------------------------------------------------------------
    /*
     * Transforming
     */
    this.transformPoint = function(point) {
        return new Vertex3D(
            this.n11 * point.x + this.n21 * point.y + this.n31 * point.z + this.n41,
            this.n12 * point.x + this.n22 * point.y + this.n32 * point.z + this.n42,
            this.n13 * point.x + this.n23 * point.y + this.n33 * point.z + this.n43
        );
    };

    this.transformArray = function(arr) {
        var rVal=[];
        var numPoints=arr.length/3;

        for (var i = 0; i < numPoints; i++) {
            var i3 = i*3;
            var x = arr[i3];
            var y = arr[i3+1];
            var z = arr[i3+2];

            rVal[i3]   = this.n11 * x + this.n21 * y + this.n31 * z + this.n41;
            rVal[i3+1] = this.n12 * x + this.n22 * y + this.n32 * z + this.n42;
            rVal[i3+2] = this.n13 * x + this.n23 * y + this.n33 * z + this.n43;
        }
        return rVal;
    };


    // ------------------------------------------------------------------------
    /*
     * Position
     */
    this.getPosition = function() {
        return [ this.n12, this.n13, this.n14 ];
    };

    /**
     *
     * @param {FPoint3} fpoint3
     *          FPoint3 xyz
     *
     */
    this.setPosition = function(fpoint3) {
        this.n12 = fpoint3.x;
        this.n13 = fpoint3.y;
        this.n14 = fpoint3.z;
        return this;
    };

    /*
     *
     * Frustrum
     * https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
     *
     */
    this.makeFrustum = function(left, right, bottom, top, near, far) {
        var x = 2 * near / ( right - left );
        var y = 2 * near / ( top - bottom );

        var a = ( right + left ) / ( right - left );
        var b = ( top + bottom ) / ( top - bottom );
        var c = - ( far + near ) / ( far - near );
        var d = - 2 * far * near / ( far - near );

        this.concat({
            n11: x,   n12: 0,   n13: a,   n14: 0,
            n21: 0,   n22: y,   n23: b,   n24: 0,
            n31: 0,   n32: 0,   n33: c,   n34: d,
            n41: 0,   n42: 0,   n43: -1,  n44: 0
        });

        // this.init(values);
    };

    /*
     *
     * Presets modified from Three.js
     * https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
     *
     */
    // ------------------------------------------------------------------------
    this.makePerspective = function(fov, aspect, near, far) {
        var ymax = near * Math.tan( fov * Math.PI / 360 );
        var ymin = - ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        this.makeFrustum(xmin, xmax, ymin, ymax, near, far);
    };

    // ------------------------------------------------------------------------
    this.makeOrtho = function(left, right, top, bottom, near, far) {
        var w = right - left;
        var h = top - bottom;
        var p = far - near;

        var x = (right + left) / w;
        var y = (top + bottom) / h;
        var z = (far + near) / p;

        this.concat({
            n11: 2/w,   n12: 0,     n13: 0,     n14: -x,
            n21: 0,     n22: 2/h,   n23: 0,     n24: -y,
            n31: 0,     n32: 0,     n33: -2/p,  n34: -z,
            n41: 0,     n42: 0,     n43: 0,     n44: 1
        });

        // this.init(values);
    };


    // ------------------------------------------------------------------------
    this.toString = function() {
        return  this.n11 + ',' + this.n12 + ',' + this.n13 + ',' + this.n14 + ',' +
                this.n21 + ',' + this.n22 + ',' + this.n23 + ',' + this.n24 + ',' +
                this.n31 + ',' + this.n32 + ',' + this.n33 + ',' + this.n34 + ',' +
                this.n41 + ',' + this.n42 + ',' + this.n43 + ',' + this.n44;
    };

};









/*
 *
 * F3D.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 * code inspired by
 * http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 * https://github.com/mrdoob/three.js/
 *
 */


folio.F3D = {
    // ------------------------------------------------------------------------
    // Namespaces
    // ------------------------------------------------------------------------
    FScene3: {},

    FPoint3: {},
    FSize3: {},
    FPath3: function() {}


    // ------------------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------------------
};


/*
 *
 * FPath3.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 */



folio.F3D.FPath3 = Path.extend(/** @lends Path# */{
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    _class: 'FPath3',
    _serializeFields: {
        segments: [],
        closed: false,

        // F3D
        scene: null,
        matrix: null,
        size: null,
        position3: null,
        fpoints3: [],
        rotation: null,
        translation: null
    },



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     *
     * @param scene
     *          the scene to attach this path to
     *
     */
    initialize: function FPath3(scene) {
        this._closed = false;
        this._segments = [];

        this._scene = scene;
        this._matrix = new Matrix3D();
        this._size = new folio.F3D.FSize3();
        this._position3 = new folio.F3D.FPoint3();

        // setup 3D points array
        this._fpoints3 = [];

        // setup transformation
        this._rotation = new folio.F3D.FPoint3();
        this._translation = new folio.F3D.FPoint3();

        // set generic name
        this.name = 'FPath3';

        Path.call(this);

        this._initialize();
    },



    // ------------------------------------------------------------------------
    //
    // Sets
    //
    /**
     * @param scene
     *      scene to associate points with
     */
    setScene: function(scene) {
        // the scene
        this._scene = scene;

        for (var i = 0; i < this._fpoints3.length; i++) {
            this._fpoints3[i].setup( this._scene );
        }
    },

    /**
     * @param _fpoint3
     *      add FPoint3 to path
     */
    add3: function(fpoint3) {
        this._fpoints3[ this._fpoints3.length ] = fpoint3;
    },


    // setSegments: function(segments) {
    // }


    // ------------------------------------------------------------------------
    /**
     * @param arg0
     *      FPoint3 for transformation
     */
    /**
     * @param arg0
     *      x point
     * @param arg1
     *      y point
     * @param arg2
     *      z point
     */
    translate: function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this._translation.x = arg0;
            this._translation.y = arg1;
            this._translation.z = arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this._translation.x = arg0.x;
            this._translation.y = arg0.y;
            this._translation.z = arg0.z;
        }
        else {
            this._translation.x = (arg0 != undefined)
                ? arg0
                : 0;
            this._translation.y = (arg1 != undefined)
                ? arg1
                : 0;
            this._translation.z = (arg2 != undefined)
                ? arg2
                : 0;
        }

        for (var i = 0; i < this._fpoints3.length; i++) {
            var pt3 = this._fpoints3[i];
            pt3.setX( (pt3.x + this._translation.x) );
            pt3.setY( (pt3.y + this._translation.y) );
            pt3.setZ( (pt3.z + this._translation.z) );
        }
    },

    /**
     * @param val
     *      degree value for x axis rotation
     */
    rotateX:  function(val) {
        this._rotation.x = val;
    },

    /**
     * @param val
     *      degree value for y axis rotation
     */
    rotateY:  function(val) {
        this._rotation.y = val;
    },

    /**
     * @param val
     *      degree value for z axis rotation
     */
    rotateZ:  function(val) {
        this._rotation.z = val;
    },



    // ------------------------------------------------------------------------
    //
    // Gets
    //

    get: function() {
        // clear segments
        this._segments = [];

        // push points into 2D path
        for (var i = 0; i < this._fpoints3.length; i++) {
            var pt3 = this._fpoints3[i];
            this.add(
                new Point( pt3.x2D(), pt3.y2D() )
            );
        }
        return this;
    }


// }, new function() { // Scope for drawing

//  return {
//      _draw: function(ctx, param) {
//      },
//  };

// }, {

// statics: {

// }

});

/*
 *
 * FPath3Constuctors.js
 *
 * A collection of primitive 3D shapes for folio.F3D.FPath3
 *
 * FBox
 * FSphere
 *
 */



folio.F3D.FPath3.inject({

    // -----------------------------------------------------------------------------
    statics: new function() {
        return {

            /**
             *
             * FBox
             * Create simple box
             *
             * @param {folio.F3D.FScene3D} scene
             *          the scene to attach the Box to
             * @param {folio.F3D.FPoint3} fpoint3
             *          the position of the Box
             * @param {folio.F3D.FSize3} fsize3
             *          the size of the Box
             *
             */
            FBox: function(scene, fpoint3, fsize3) {
                this._position3 = (fpoint3 != undefined)
                    ? fpoint3
                    : new folio.F3D.FPoint3( 0,0,0 );

                this._size = (fsize3 != undefined)
                    ? fsize3
                    : new folio.F3D.FSize3( 10,10,10 );

                var sides = [6];
                var faceFRONT = [
                    new folio.F3D.FPoint3(-0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3( 0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3( 0.5, 0.5, -0.5), // corner
                    new folio.F3D.FPoint3(-0.5, 0.5, -0.5)  // corner
                ],
                    faceTOP = [
                    new folio.F3D.FPoint3(-0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3(-0.5, -0.5, -0.5) // corner
                ],
                    faceBOTTOM = [
                    new folio.F3D.FPoint3(-0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5, -0.5), // corner
                    new folio.F3D.FPoint3(-0.5, 0.5, -0.5)  // corner
                ],
                    faceLEFT = [
                    new folio.F3D.FPoint3(-0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3(-0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3(-0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3(-0.5, 0.5, -0.5)  // corner
                ],
                    faceRIGHT = [
                    new folio.F3D.FPoint3( 0.5, -0.5, -0.5),    // corner
                    new folio.F3D.FPoint3( 0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5, -0.5)  // corner
                ],
                    faceBACK = [
                    new folio.F3D.FPoint3(-0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, -0.5,   0.5),   // corner
                    new folio.F3D.FPoint3( 0.5, 0.5,    0.5),   // corner
                    new folio.F3D.FPoint3(-0.5, 0.5,    0.5)    // corner
                ];

                var faces = [
                    ['front',   faceFRONT],
                    ['top',     faceTOP],
                    ['bottom',  faceBOTTOM],
                    ['left',    faceLEFT],
                    ['right',   faceRIGHT],
                    ['back',    faceBACK]
                ];

                var vertices = [];
                for (var i = 0; i < faces.length; i++) {
                    sides[i] = new folio.F3D.FPath3();
                    // sides[i].name = faces[i][0];
                    sides[i].name = 'Z-TOP'; // hack until FScene3D is fixed

                    vertices = faces[i][1];
                    for (var j = 0; j < vertices.length; j++) {
                        sides[i].add3( new folio.F3D.FPoint3(
                            vertices[j].x * this._size.width,
                            vertices[j].y * this._size.height,
                            vertices[j].z * this._size.depth
                        ));
                    }

                    // sides[i].fillColor = new Color( 0.0, 1.0, 0.7, 0.8 );
                    sides[i].closed = true;
                    sides[i].translate( fpoint3 );

                    scene.addItem( sides[i] );
                }

                return new Group(sides);
            },

            /**
             *
             * FSphere
             * Create simple sphere
             *
             * @param {folio.F3D.FScene3D} scene
             *          the scene to attach the Sphere to
             * @param {folio.F3D.FPoint3} fpoint3
             *          the position of the Sphere
             * @param {folio.F3D.FSize3} radius
             *          the radius of the Sphere
             * @param {Array} detail (optional)
             *          the longitude and latitude detail
             *          default: [6,6]
             *          *** anything over [21,21] and you should probably be using Three.js ***
             *
             */
            FSphere: function(scene, fpoint3, radius, detail) {
                this._position3 = (fpoint3 != undefined)
                    ? fpoint3
                    : new folio.F3D.FPoint3( 0,0,0 );

                this._size = (radius != undefined)
                    ? new folio.F3D.FSize3( radius, radius, radius )
                    : new folio.F3D.FSize3( 10,10,10 );

                var _c = 0.5;

                var latlon;
                if (detail != undefined) {
                    if (detail instanceof Array) {
                        latlon = detail;
                    }
                    else {
                        latlon = [detail, detail];
                    }
                }
                else {
                    latlon = [6,6];
                }


                var vertices = [];
                for (var i = 0; i <= latlon[0]; i++) {
                    var lat0 = (Math.PI * (-_c + ( (i-1)/latlon[0]) ));
                    var z0   = Math.sin(lat0);
                    var zr0  = Math.cos(lat0);

                    var lat1 = (Math.PI * (-_c + ( i/latlon[0]) ));
                    var z1   = Math.sin(lat1);
                    var zr1  = Math.cos(lat1);

                    for (var j = 0; j <= latlon[1]; j++) {
                        var lng = ((Math.PI*2) * ( (j-1)/latlon[1] ));
                        var x = Math.cos(lng);
                        var y = Math.sin(lng);

                        vertices.push( new folio.F3D.FPoint3( x*zr0, y*zr0, z0 ) );
                        vertices.push( new folio.F3D.FPoint3( x*zr1, y*zr1, z1 ) );
                    } // _longs
                } // _lats
                var sides = [vertices.length-2];

                for (var i = 0; i < vertices.length-2; i++) {
                    sides[i] = new folio.F3D.FPath3();
                    sides[i].name = 'face'+i;

                    sides[i].add3( new folio.F3D.FPoint3(
                        vertices[i].x*(this._size.width*0.5),
                        vertices[i].y*(this._size.height*0.5),
                        vertices[i].z*(this._size.depth*0.5)
                    ));
                    sides[i].add3( new folio.F3D.FPoint3(
                        vertices[i+1].x*(this._size.width*0.5),
                        vertices[i+1].y*(this._size.height*0.5),
                        vertices[i+1].z*(this._size.depth*0.5)
                    ));
                    sides[i].add3( new folio.F3D.FPoint3(
                        vertices[i+2].x*(this._size.width*0.5),
                        vertices[i+2].y*(this._size.height*0.5),
                        vertices[i+2].z*(this._size.depth*0.5)
                    ));

                    // sides[i].fillColor = new Color( 0.0, 1.0, 0.7, 0.8 );
                    sides[i].closed = true;
                    sides[i].translate( fpoint3 );

                    scene.addItem( sides[i] );
                }

                return new Group(sides);
            }


        }; // end return

    } // end statics:
});


/*
 *
 * FPoint3.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 * @param arg0
 *      x coordinate
 * @param arg1
 *      y coordinate
 * @param arg2
 *      z coordinate
 */
folio.F3D.FPoint3 = this.FPoint3 = function(arg0, arg1, arg2) {
    // ------------------------------------------------------------------------
    // Properties
    // ------------------------------------------------------------------------
    /**
     * private
     */
    var _scene = null;

    var _xIndex = 0;
    var _yIndex = 0;
    var _zIndex = 0;

    var _xIndex2D = 0;
    var _yIndex2D = 0;


    /**
     * public
     */
    this.x = arg0 != undefined ? arg0 : 0;
    this.y = arg1 != undefined ? arg1 : 0;
    this.z = arg2 != undefined ? arg2 : 0;



    // ------------------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------------------
    /**
     * @param scene
     *      the scene with which the points are
     *      associated with
     */
    this.setup = function(scene) {
        // setup scene
        _scene = scene;

        var index = _scene.setupPoint(this.x, this.y, this.z);
        var i3 = index*3;
        var i2 = index*2;

        // 3D indicies
        _xIndex = i3;
        _yIndex = i3+1;
        _zIndex = i3+2;

        // 2D indicies
        _xIndex2D = i2;
        _yIndex2D = i2+1;
    };


    // ------------------------------------------------------------------------
    /**
     *
     * @return random point
     *
     */
    /**
     * @param minx
     *          minmum x (default: 0)
     * @param maxx
     *          maximum x (default: view.bounds.width)
     * @param miny
     *          minmum y (default: 0)
     * @param maxy
     *          maximum y (default: view.bounds.height)
     * @param minz
     *          minmum z (default: 0)
     * @param maxz
     *          maximum z (default: 1000)
     *
     * @return random point
     *
     */
    this.random = function(minx, maxx, miny, maxy, minz, maxz) {
        minx = (minx != undefined) ? minx : 0;
        maxx = (maxx != undefined) ? maxx : view.bounds.width;
        miny = (miny != undefined) ? miny : 0;
        maxy = (maxy != undefined) ? maxy : view.bounds.height;
        minz = (minz != undefined) ? miny : 0;
        maxz = (maxz != undefined) ? maxy : 1000;

        this.x = paper.random(minx, maxx);
        this.y = paper.random(miny, maxy);
        this.z = paper.random(minz, maxz);

        return new folio.F3D.FPoint3(this.x, this.y, this.z);
    };



    // ------------------------------------------------------------------------
    // Sets
    // ------------------------------------------------------------------------
    /**
     *
     * @param val
     *      set x value
     */
    this.setX = function(val) {
        if (_scene != null ) _scene.points3D[_xIndex] = val;
        this.x = val;
    };

    /**
     *
     * @param val
     *      set y value
     */
    this.setY = function(val) {
        if (_scene != null ) _scene.points3D[_yIndex] = val;
        this.y = val;
    };

    /**
     *
     * @param val
     *      set z value
     */
    this.setZ = function(val) {
        if (_scene != null ) _scene.points3D[_zIndex] = val;
        this.z = val;
    };

    // ------------------------------------------------------------------------
    this.set = function(arg0, arg1, arg2) {
        this.setX(arg0);
        this.setY(arg1);
        this.setZ(arg2);
    };



    // ------------------------------------------------------------------------
    // Gets
    // ------------------------------------------------------------------------
    /**
     * @return a copy of this point
     */
    this.get = function() {
        return new folio.F3D.FPoint3(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * @return projected 2D x
     */
    this.x2D = function() {
        return _scene.points2D[_xIndex2D];
    };

    /**
     * @return projected 2D y
     */
    this.y2D = function() {
        return _scene.points2D[_yIndex2D];
    };

    // ------------------------------------------------------------------------
    this.getSceneIndex = function() {
        return _sceneIndex;
    };


    // ------------------------------------------------------------------------
    /**
     * Calculate the magnitude (length) of the point
     *
     * @return the magnitude of the point
     */
    this.mag = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Add a point to this point
     *
     * @param arg0
     *      the FPoint3 to be added
     */
    /**
     * Add a point to this point
     *
     * @param arg0
     *      the x point to be added
     * @param arg1
     *      the y point to be added
     * @param arg2
     *      the z point to be added
     */
    this.add = function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this.x += arg0;
            this.y += arg1;
            this.z += arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this.x += arg0.x();
            this.y += arg0.y();
            this.z += arg0.z();
        }
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Subtract a point to this point
     *
     * @param arg0
     *      the FPoint3 to be subtracted
     */
    /**
     * Subtract a point to this point
     *
     * @param arg0
     *      the x point to be subtracted
     * @param arg1
     *      the y point to be subtracted
     * @param arg2
     *      the z point to be subtracted
     */
    this.sub = function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this.x -= arg0;
            this.y -= arg1;
            this.z -= arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this.x -= arg0.x();
            this.y -= arg0.y();
            this.z -= arg0.z();
        }
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Scale this point by a scalar
     *
     * @param n
     *      the value to scale by
     */
    this.scale = function(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Multiply each element of one point by the elements of another point.
     *
     * @param arg0
     *      the FPoint3 to be multiplied
     */
    /**
     * Multiply each element of one point by the elements of another point.
     *
     * @param arg0
     *      the x point to be multiplied
     * @param arg1
     *      the y point to be multiplied
     * @param arg2
     *      the z point to be multiplied
     */
    this.mult = function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this.x *= arg0;
            this.y *= arg1;
            this.z *= arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this.x *= arg0.x();
            this.y *= arg0.y();
            this.z *= arg0.z();
        }
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Divide each element of one point by the elements of another point.
     *
     * @param arg0
     *      the FPoint3 to be divided
     */
    /**
     * Divide each element of one point by the elements of another point.
     *
     * @param arg0
     *      the x point to be divided
     * @param arg1
     *      the y point to be divided
     * @param arg2
     *      the z point to be divided
     */
    this.div = function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this.x /= arg0;
            this.y /= arg1;
            this.z /= arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this.x /= arg0.x();
            this.y /= arg0.y();
            this.z /= arg0.z();
        }
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Calculate the Euclidean distance between two points (considering a point as a vector object)
     *
     * @param _fpoint3
     *      another point
     *
     * @return the Euclidean distance between
     */
    this.getDistance = function(_fpoint3) {
        var dx = this.x - _fpoint3.x();
        var dy = this.y - _fpoint3.y();
        var dz = this.z - _fpoint3.z();
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    };


    // ------------------------------------------------------------------------
    /**
     * Calculate the angle between two points, using the dot product
     *
     * @param _fpoint3a
     *          a point
     * @param _fpoint3b
     *          another point
     *
     * @return the angle between the points
     */
    this.angleBetween = function(_fpoint3a, _fpoint3b) {
        var dot = _fpoint3a.x() * _fpoint3b.x() + _fpoint3a.y() * _fpoint3b.y() + _fpoint3a.z() * _fpoint3b.z();
        var _f1mag = Math.sqrt(_fpoint3a.x() * _fpoint3a.x() + _fpoint3a.y() * _fpoint3a.y() + _fpoint3a.z() * _fpoint3a.z());
        var _f2mag = Math.sqrt(_fpoint3b.x() * _fpoint3b.x() + _fpoint3b.y() * _fpoint3b.y() + _fpoint3b.z() * _fpoint3b.z());
        return Math.acos(dot / (_f1mag * _f2mag));
    };


    // ------------------------------------------------------------------------
    /**
     * Normalize the point to length 1 (make it a unit point)
     */
    this.normalize = function() {
        var m = this.mag();
        if (m != 0 && m != 1) {
      this.div(m);
        }
    };


    // ------------------------------------------------------------------------
    this.toString = function() {
        return '[ ' + this.x + ', ' + this.y + ', ' + this.z + ' ]';
    };


    // ------------------------------------------------------------------------
    /**
     * Return a representation of this point as an array.
     */
    this.array = function() {
        return [this.x, this.y, this.z];
    };

};



/*
 *
 * FScene3.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 *
 * TODO:    leave as is and accept or redo entire engine
 *      possibly look into using three.js as the engine
 *
 */
folio.F3D.FScene3D = this.FScene3D = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    /**
     * private
     */
    var _mode = 'PERSPECTIVE'; // default
    var _matrix = null;

    var _half = new folio.F3D.FSize3(0,0,0);

    // transfomrations
    var _sceneScale = 1;
    var _rotation = new folio.F3D.FPoint3(0,0,0);

    // items
    var _numPoints = 0;
    var _fpath3Arr = null;
    var _groupBot = null;
    var _groupTop = null;

    /**
     * public
     */
    this.bounds = new folio.F3D.FSize3(0,0,0);

    this.points3D = [];
    this.points2D = [];



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     * matrix for isometric projection
     *
     * TODO: figure out why this has to be
     * configured like this?
     */
    this._ortho = function() {
        _matrix.makeOrtho(
            -_half.height,  // left
            _half.height,   // right
            _half.height,   // top
            -_half.height,  // bottom
            -_half.height,  // near
            _half.height    // far
        );
    };

    /**
     * _perspective( for perspective projection
     */
    this._perspective = function() {
        _matrix.makePerspective(
            50,     // fov
            0.5 * this.bounds.width/this.bounds.height, // aspect
            _half.depth,        // near
            this.bounds.depth*2 // far
        );
    };


    // ------------------------------------------------------------------------
    /**
     * @param width
     *          width of scene
     *          default: view.bounds.width
     * @param height
     *          height of scene
     *          default: view.bounds.height
     * @param focalLength
     *          focal length of scene
     *          default: 1000
     * @param mode
     *          'PERSPECTIVE' objects scale to perspective
     *          'ORTHO' objects do not scale (isometric)
     *
     */
    this.setup = function(width, height, focalLength, mode) {
        // setup point arrays
        this.points3D = [];
        this.points2D = [];

        // setup items array
        _fpath3Arr = [];

        // setup matrix
        _matrix = new Matrix3D();

        // setup world
        this.bounds.width  = width || paper.view.bounds.width;
        this.bounds.height = height || paper.view.bounds.height;
        this.bounds.depth = focalLength || 1000;

        _half.width = this.bounds.width*0.5;
        _half.height = this.bounds.height*0.5;
        _half.depth = this.bounds.depth*0.5;

        // set mode
        this.setMode(mode);

        // setup up group for items
        _groupBot = new Group();
        _groupTop = new Group();
    };

    // ------------------------------------------------------------------------
    /**
     * draws FPath3 objects
     *
     * @return group of FPath3 objects
     *
     */
    this.draw = function() {
        // transformation matrix
        _matrix.identity();

        // set perspective mode
        if (_mode == 'ORTHO') this._ortho();
        else this._perspective();

        // implement transformations
        _matrix.scale(_sceneScale, _sceneScale, _sceneScale);
        _matrix.rotateX( _rotation.x );
        _matrix.rotateY( _rotation.y );
        _matrix.rotateZ( _rotation.z );
        _matrix.translate(0, 0, this.bounds.depth);

        // transformed points
        var transformed = _matrix.transformArray(this.points3D);

        // cycle through transformed 3D points
        // pull out screen 2D points
        for (var i = 0; i < _numPoints; i++) {
            var i3 = i*3;
            var i2 = i*2;

            var x = transformed[ i3 ];
            var y = transformed[ i3+1 ];
            var z = transformed[ i3+2 ];

            var scale = this.bounds.depth/(z+this.bounds.depth);

            this.points2D[ i2 ]   = x*scale+_half.width;
            this.points2D[ i2+1 ] = y*scale+_half.height;
        }

        // determine depth order of items
        // very crude and rudimentary
        var tindex = 0;
        var depthArr = []; // temp array to correlate transformed points to items
        for (var i = 0; i < _fpath3Arr.length; i++) {
            var fpath3 = _fpath3Arr[i];

            var avgz = this.averageZ(
                transformed,
                tindex,
                tindex+(fpath3._fpoints3.length*3)
            );

            var temp = {
                index: i,
                z: avgz
            };
            depthArr.push(temp);

            tindex += (fpath3._fpoints3.length*3)-1;
        }
        depthArr.sort(compare);

        // put the object into the group based on their z depth
        _groupBot.removeChildren(); // clear out in between draws
        _groupTop.removeChildren(); // clear out in between draws
        for (var i = 0; i < depthArr.length; i++) {
            var path = _fpath3Arr[ depthArr[i].index ].get();

            if (path.name == 'Z-TOP') _groupTop.appendBottom( path );
            else if (path.name == 'Z-BOTTOM') _groupBot.appendBottom( path );
            else if (path != null) _groupBot.appendBottom( path );
        }

        // TODO: fix this scaling issue
        if (_mode == 'ORTHO') {
            _groupTop.scale(200, _groupBot.position);
            _groupBot.scale(200, _groupBot.position);
        }

        return new Group( _groupBot,_groupTop );
    };


    // ------------------------------------------------------------------------
    /**
     * @param arg0
     *          x coordinate
     * @param arg1
     *          y coordinate
     * @param arg2
     *          z coordinate
     *
     * @return total number of points added to scene
     *
     */
    this.setupPoint = function(arg0, arg1, arg2) {
        var returnVal = _numPoints;

        this.points2D[ this.points2D.length ] = 0;
        this.points2D[ this.points2D.length ] = 0;

        this.points3D[ this.points3D.length ] = arg0;
        this.points3D[ this.points3D.length ] = arg1;
        this.points3D[ this.points3D.length ] = arg2;

        _numPoints++;

        return returnVal;
    };

    // ------------------------------------------------------------------------
    /**
     * @param pointsArr
     *          the array of points x[0], y[1], z[2]
     * @param start
     *          start position in array
     * @param stop
     *          stop position in array
     *
     * @return average value of z
     *
     */
    this.averageZ = function(pointsArr, start, stop) {
        var avgz = 0;
        for (var i=start; i<stop; i+=2) {
        //  // console.log( 'x\t' + pointsArr[i] );
        //  // console.log( 'y\t' + pointsArr[i+1] );
        //  // console.log( 'z\t' + pointsArr[i+2] );
            avgz += parseInt( pointsArr[i+2] );
        }
        var num = (stop-start)/3;
        return avgz/num;
    };

    /**
     *
     * comparator to sort object by z value
     *
     */
    function compare(a,b) {
        if (a.z < b.z) return -1;
        if (a.z > b.z) return 1;
        return 0;
    };



    // ------------------------------------------------------------------------
    // Sets
    // ------------------------------------------------------------------------
    /**
     * @param mode
     *          'PERSPECTIVE' objects scale to perspective
     *          'ORTHO' objects do not scale (isometric)
     */
    this.setMode = function(mode) {
        _mode = mode != undefined ? mode : 'PERSPECTIVE';
    };

    /**
     * @param item
     *      an FPath3 item to add to the scene
     */
    /**
     * @param item
     *      an array of FPath3 items to add to the scene
     */
    this.addItem = function(item) {
        if (item.length > 0) {
            for (var i = 0; i < item.length; i++) {
                _fpath3Arr[ _fpath3Arr.length ] = item[i];
                item[i].setScene(this);
            }
        }
        else {
            _fpath3Arr[ _fpath3Arr.length ] = item;
            item.setScene(this);
        }
    };

    // ------------------------------------------------------------------------
    /**
     * @param val
     *      degree value for x axis rotation
     */
    this.rotateX = function(val) {
        _rotation.setX(val);
    };

    /**
     * @param val
     *      degree value for y axis rotation
     */
    this.rotateY = function(val) {
        _rotation.setY(val);
    };

    /**
     * @param val
     *      degree value for z axis rotation
     */
    this.rotateZ = function(val) {
        _rotation.setZ(val);
    };



    // ------------------------------------------------------------------------
    // Gets
    // ------------------------------------------------------------------------
    /**
     *
     * @return scene path items as _groupBot
     *
     */
    this.get = function() {
        return _groupBot;
    };

    /**
     *
     * @return scene size as array [width, height, depth]
     *
     */
    this.getBounds = function() {
        return [ this.bounds.width, this.bounds.height, this.bounds.depth ];
    };

    /**
     *
     * @return scene transformation _matrix
     *
     */
    this.getMatrix = function() {
        return _matrix;
    };

    /**
     *
     * @return scene focal length (depth)
     *
     */
    this.getFocalLength = function() {
        return this.bounds.depth;
    };

    /**
     *
     * @return scene scale
     *
     */
    this.getScale = function() {
        return _sceneScale;
    };


};



/*
 *
 * FSize3.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 * TODO: finish this
 *
 * @param arg0
 *      width
 * @param arg1
 *      height
 * @param arg2
 *      depth
 */
folio.F3D.FSize3 = this.FSize3 = function(arg0, arg1, arg2) {
    /**
     * public
     */
    this.width = arg0 != undefined ? arg0 : 0;
    this.height = arg1 != undefined ? arg1 : 0;
    this.depth = arg2 != undefined ? arg2 : 0;



    // ------------------------------------------------------------------------
    // Sets
    // ------------------------------------------------------------------------
    /**
     *
     * @param val
     *      set width value
     */
    this.setWidth = function(val) {
        this.width = val;
    };

    /**
     *
     * @param val
     *      set height value
     */
    this.setHeight = function(val) {
        this.height = val;
    };

    /**
     *
     * @param val
     *      set depth value
     */
    this.setDepth = function(val) {
        this.depth = val;
    };

    // ------------------------------------------------------------------------
    this.set = function(arg0, arg1, arg2) {
        this.setWidth(arg0);
        this.setHeight(arg1);
        this.setDepth(arg2);
    };



    // ------------------------------------------------------------------------
    // Gets
    // ------------------------------------------------------------------------
    /**
     * Get a copy of this size
     */
    this.get = function() {
        return new folio.F3D.FSize3(this.width, this.height, this.depth);
    };


    // ------------------------------------------------------------------------
    /**
     *
     * @return random size
     *
     */
    /**
     * @param minw
     *          minmum width (default: 0)
     * @param maxw
     *          maximum width (default: view.bounds.width)
     * @param minh
     *          minmum height (default: 0)
     * @param maxh
     *          maximum height (default: view.bounds.height)
     * @param mind
     *          minmum depth (default: 0)
     * @param maxd
     *          maximum depth (default: 1000)
     *
     * @return random size
     *
     */
    this.random = function(minw, maxw, minh, maxh, mind, maxd) {
        minw = (minw != undefined) ? minw : 0;
        maxw = (maxw != undefined) ? maxw : view.bounds.width;
        minh = (minh != undefined) ? minh : 0;
        maxh = (maxh != undefined) ? maxh : view.bounds.height;
        mind = (mind != undefined) ? mind : 0;
        maxd = (maxd != undefined) ? maxd : 1000;

        this.width = paper.random(minw, maxw);
        this.height = paper.random(minh, maxh);
        this.depth = paper.random(mind, maxd);
        return this;
    };

    /**
     *
     * @return volume
     *
     */
    this.volume = function() {
        return (this.width * this.height * this.depth);
    };


};


