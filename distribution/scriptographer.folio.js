/**!
 *
 * folio.js
 * 0.7.0
 * https://github.com/frederickk/folio.js
 *
 * 04. January 2014
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA	02110-1301	USA
 *
 */

// ------------------------------------------------------------------------
// Global Properties
// ------------------------------------------------------------------------
/**
 * the Path.Rectangle of the artboard
 * mimic Paper.js
 */
var view = artboard = activeDocument.activeArtboard;

/**
 * holder for Raster
 */
var raster;

/**
 * shim for using same code base for
 * both versions of folio.js
 */
var paper = PaperScope = global;



/**
 * Note from the Scriptographer.org Team
 *
 * In Scriptographer 2.9, we switched to a top-down coordinate system and
 * degrees for angle units as an easier alternative to radians.
 *
 * For backward compatibility we offer the possibility to still use the old
 * bottom-up coordinate system and radians for angle units, by setting the two
 * values bellow. Read more about this transition on our website:
 * http://scriptographer.org/news/version-2.9.064-arrived/
 */

script.coordinateSystem = 'top-down';
script.angleUnits = 'degrees';



/**
 *
 * Scriptographer Global Scope
 *
 */
// Script.inject({
global.inject({
	enumerable: true,


	/**
	 *
	 * These are specific methods for the
	 * Scriptographer version of folio.js
	 *
	 */

	// -----------------------------------------------------------------------------
	// Properties
	// -----------------------------------------------------------------------------
	// constants
	EPSILON: 1.0e-6,

	// have to keep frameRate low... because well...
	// it's illustrator, don't be greedy
	// formula:
	// 1/12 = 0.08333 (fps -> seconds)
	// 0.08333 * 1000 = 83.33 (seconds -> ms)
	FRAMERATE: 12, // 500 == 2 ms

	// event holder for animations events
	// mimics Paper.js
	_event: {
		count: 0, // number of frames
		time: 0.0,  // seconds elapsed
		delta: 0.0  // difference since last frame
	},



	// -----------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------
	/**
	 * @param {Object} obj
	 *			any Javascript Object
	 */
	println: function(obj) {
		console.log( obj );
		console.log( '\n' );
	},


	// -----------------------------------------------------------------------------
	/**
	 * animation function that mimics Paper.js
	 */
	/**
	 * @param {Boolean} isOn
	 *			true if we want to use animations
	 * @param {Number} frameRate
	 *			the frame rate for the animatons default is 12
	 */
	Animate: function(isOn, frameRate) {
		frameRate = (frameRate === undefined) ? FRAMERATE : frameRate;
		var interval = parseInt((1/frameRate)*1000);

		if( isOn ) {
			var updater = setInterval( function() {
				onFrame(interval, Update);
			}, interval
			);
		}
	},

	/**
	 * @param {Number} interval
	 *			how often in MS to fire event - defaul: 83
	 */
	onFrame: function(interval, func) {
		interval = (interval === undefined) ? 2 : interval;

		_event.count++;
		_event.time += (interval * 0.001);
		_event.delta -= _event.time;

		if (func != undefined) func(_event);

		_event.delta = _event.time;
	}

});


// ------------------------------------------------------------------------
var folio = folio || {};


/*
 *
 * Core.js
 *
 * Core Methods and a collection of extensions for paper globally
 *
 */


folio = {
	// ------------------------------------------------------------------------
	// Setup Core Namespaces
	// ------------------------------------------------------------------------
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
	enumerable: true,


	// -----------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------
	/**
	 * Java style println output
	 *
	 * @param {Object} obj
	 * 		  any Javascript Object
	 */
	println: function(obj) {
		console.log(obj);
		console.log('\n');
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 * @param {Boolean} val
	 * 	  input boolean value
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
	 * 	  input number value
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
	 * 	  object whose type to determine
	 *
	 * @return {String} Paper.js object type
	 *
	 */
	getType: function(obj) {
		if (obj instanceof Point) return 'Point';
		else if (obj instanceof Size) return 'Size';
		else if (obj instanceof Rectangle) return 'Rectangle';
		else if (obj instanceof Group) return 'Group';
		else if (obj instanceof Raster) return 'Raster';
		else if (obj instanceof PlacedSymbol) return 'PlacedSymbol';
		else if (obj instanceof Path) return 'Path';
		else if (obj instanceof CompoundPath) return 'CompoundPath';
		else if (obj instanceof Symbol) return 'Symbol';
		else if (obj instanceof TextItem) return 'TextItem';
		else return Object.prototype.toString.call(obj).split(/\W/)[2];
	},

	/**
	 *
	 * @param {Array} items
	 * 	  Array of items to go through
	 * @param {String} name
	 * 	  name of Item to find
	 *
	 * @return {Path} path with the name that matches
	 *
	 */
	findByName: function(items, name) {
		var path;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.name === name) path = item;
			// break;
		}
		return path;
	},

	/**
	 *
	 * @param {Array} items
	 * 	  Array of items to go through
	 * @param {Number} name
	 * 	  name of Item to find
	 *
	 * @return {Path} path with the id that matches
	 *
	 */
	findById: function(items, id) {
		var path;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.id === id) path = item;
			// break;
		}
		return path;
	}

});



/*
 *
 * FArray.js
 *
 * Extensions to JavaScript Array may be bad form... but whatever
 *
 */


//
// Array
//

/**
 *
 * @return {Number} median value
 *
 */
Array.prototype.median = function() {
	var type = Object.prototype.toString.call(this).split(/\W/)[2];
	if( type === 'Array') {
		var median = 0;
		this.sort();
		if(this.length % 2 === 0) {
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
	if( type === 'Array') {
		var sum = 0;
		for(var i=0; i<this.length, isFinite(this[i]); i++) {
			sum += parseFloat(this[i]);
		}
		return sum/this.length-1;
	}
};


/**
 * combines two Arrays
 *
 * @param {Array} arr
 *			Array object
 *
 * @return {Array} new merged Array object
 *
 */
Array.prototype.merge = function(arr, bShuffle) {
	var type = Object.prototype.toString.call(this).split(/\W/)[2];
	if( type === 'Array') {
		var output = this.concat(arr);
		return output;
	}
};

/**
 *
 * @param {Number} start
 *			start position in array
 * @param {Number} stop
 *			stop position in array
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

	for(var i=(start+1); i<stop; i++) if(this[i] > this[max]) max = i;
	return max;
};

/**
 *
 * @param {Number} start
 *			start position in array
 * @param {Number} stop
 *			stop position in array
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

	for(var i=(start+1); i<stop; i++) if(this[i] < this[min]) min = i;
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
	for(var j, x, i=this.length; i; j=parseInt(Math.random() * i), x=this[--i], this[i]=this[j], this[j]=x);
};

/**
 * Eliminate all non-unique elements from an Array
 *
 * @return {Object} unique element
 *
 */
Array.prototype.unique = function() {
	var u = [];
	o:for(var i=0, n=this.length; i<n; i++) {
		for(var x=0, y=u.length; x<y; x++) {
			if(u[x] == this[i]) {
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
	if( type === 'Array') {
		return this.reduce(function(accum, cur) {
			if(accum.indexOf(cur) === -1) accum.push(cur);
			return accum;
		}, [] );
	}
};

/**
 *
 * @param {Number} decimalPlaces
 * 		number of decimal places
 *
 * @return {Array} original array with rounded values
 *
 */
Array.prototype.round = function(decimalPlaces) {
	var multi = Math.pow(10,decimalPlaces);
	for(var i=0; i<this.length; i++) this[i] = Math.round(this[i] * multi)/multi;
	return this;
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
		/*
		var A = a.toLowerCase();
		var B = b.toLowerCase();

		if(A < B) return -1;
		else if(A > B) return  1;
		else return 0;
		*/

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

		return(a == b) ? 0 : (a>b) ? 1 : -1;
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

		if(valueA > valueB) comparisonValue = -1;
		else if(valueA < valueB) comparisonValue = 1;

		return comparisonValue;
	}

};

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
	 *			minmum range
	 * @param {Number} max
	 *			maximum range
	 *
	 * @return {Number} random number as float
	 *
	 * @example
	 * var rand = random(30, 90);
	 *
	 */
	random: function(min, max) {
		if(max == undefined) {
			max = min;
			min = 0;
		}
		// else if(min == undefined) {
		//	max = 1;
		//	min = 0;
		// )
		return (min + Math.random() * (max - min));
	},

	/**
	 * @param {Number} min
	 *			minmum range
	 * @param {Number} max
	 *			maximum range
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
	 *			minmum range
	 * @param {Number} maxr
	 *			maximum range
	 * @param {Number} bias
	 *			bias represents the preference towards lower or higher numbers,
	 *			as a number between 0.0 and 1.0. For example:
	 *			random(0, 10, bias=0.9) will return 9 much more often than 1.
	 *
	 * @return {Number} a random, albeit biased, number
	 *
	 */
	randomBias: function(minr, maxr, bias) {
		var _map = [90.0, 9.00, 4.00, 2.33, 1.50, 1.00, 0.66, 0.43, 0.25, 0.11, 0.01];
		bias = Math.max(0, Math.min(bias, 1)) * 10;

		var i = parseInt(Math.floor(bias));
		var n = _map[i];
		if(bias < 10) n += (_map[i+1]-n) * (bias-i);

		return Math.pow( Math.random(),n ) * (maxr-minr) + minr;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 * @param {Number} val
	 *			the value to constrain
	 * @param {Number} min
	 *			minimum limit
	 * @param {Number} max
	 *			maximum limit
	 *
	 * @return {Number} original value that is not less than the
	 *				 minimum and no greater than the maximum
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
	 *			the incoming value to be converted
	 * @param {Number} start
	 *			lower bound of the value's current range
	 * @param {Number} stop
	 *			upper bound of the value's current range
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
	 *			the incoming value to be converted
	 * @param {Number} istart
	 *			lower bound of the value's current range
	 * @param {Number} istop
	 *			upper bound of the value's current range
	 * @param {Number} ostart
	 *			lower bound of the value's target range
	 * @param {Number} ostop
	 *			upper bound of the value's target range
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
	 * 		number
	 * @param {Number} decimalPlaces
	 * 		number of decimal places
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
	 * 	 	number
	 * @param  {Number} base
	 * 	 	base value for finding multiple
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
	 * 		value to snap
	 * @param {Number} snapInc
	 * 		increment to snap value to
	 * @param {Function} roundFunction
	 * 		(optiona) rounding function
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
	 * 		first value
	 * @param {Number} stop
	 * 		second value
	 * @param {Number} val
	 * 		float: between 0.0 and 1.0
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
	 * 		number
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
	 * 		input value
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
	 * 		input value
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
	 * 		input value
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
	 * 		input value
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
	 * 		angle of slope (rise)
	 * @param {Number} val
	 * 		length of slope (run)
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
	 * 		input value
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
	 *			the first Circle
	 * @param {Path.Circle} arg1
	 *			the second Circle
	 *
	 * @return {Array} of points
	 *
	 */
	/**
	 * TODO: get common outer tangents of two curves
	 *
	 * @param {Curve} arg0
	 *			the first Curve
	 * @param {Curve} arg1
	 *			the second Curve
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
		function c2h(e) { var t=e.toString(16); return t.length===1?'0'+t:t }
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
	 * 		(0.0 - 1.0) factor to desaturate color
	 *
	 * @return {Color} desaturated Color by input amount
	 *
	 * @example
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var desaturated = color.desaturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	desaturate: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		color.setType( this.type );
		return color;
	},

	/**
	 * saturate a color (based on hsb model) by percentage
	 * NOTE: Color operators aren't working when not using paperScript
	 *
	 * @param {Number} amt
	 * 		(0.0 - 1.0) factor to saturate color
	 *
	 * @return {Color} saturated Color by input amount
	 *
	 * @example
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var saturated = color.saturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	saturate: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation + (this.saturation * amt), 0,1 );
		color.setType( this.type );
		return color;
	},

	/**
	 * darken a color (based on hsl model) by percentage
	 * NOTE: Color operators aren't working when not using paperScript
	 *
	 * @param {Number} amt
	 * 		(0.0 - 1.0) factor to darken color
	 *
	 * @return {Color} darkened Color by input amount
	 *
	 * @example
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var darkened = color.darken(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	darken: function(amt) {
		var color = new Color( this );
		color.lightness = paper.clamp( this.lightness - (this.lightness * amt), 0,1 );
		color.setType( this.type );
		return color;
	},

	/**
	 * dim a color (based on hsl model) by percentage
	 * NOTE: Color operators aren't working when not using paperScript
	 *
	 * @param {Number} amt
	 * 		(0.0 - 1.0) factor to dim color
	 *
	 * @return {Color} dimmed Color by input amount
	 *
	 * @example
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var dimmed = color.dim(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	dim: function(amt) {
		var color = new Color( this );
		color.brightness = paper.clamp( this.brightness - (this.brightness * amt), 0,1 );
		color.setType( this.type );
		return color;
	},

	/**
	 * lighten a color (based on hsl model) by percentage
	 * NOTE: Color operators aren't working when not using paperScript
	 *
	 * @param {Number} amt
	 * 		(0.0 - 1.0) factor to lighten color
	 *
	 * @return {Color} lightened Color by input amount
	 *
	 * @example
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var lightened = color.lighten(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	lighten: function(amt) {
		var color = new Color( this );
		// color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		color.lightness = paper.clamp( this.lightness + (this.lightness * amt), 0,1 );
		color.setType( this.type );
		return color;
	},

	/**
	 * brighten a color (based on hsb model) by percentage
	 * NOTE: Color operators aren't working when not using paperScript
	 *
	 * @param {Number} amt
	 * 		(0.0 - 1.0) factor to brighten color
	 *
	 * @return {Color} brightened Color by input amount
	 *
	 * @example
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var brightened = color.brighten(0.2);
	 *
	 */
	brighten: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		color.brightness = paper.clamp( this.brightness + (this.brightness * amt), 0,1 );
		color.setType( this.type );
		return color;
	},

	/**
	 * increase color contrast (based on hsb model) by percentage
	 * NOTE: Color operators aren't working when not using paperScript
	 *
	 * @param {Number} amt
	 * 		(0.0 - 1.0) factor to increase contrast
	 *
	 * @return {Color} Color by input amount
	 *
	 * @example
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var contrasted = color.contrast(0.2);
	 *
	 */
	contrast: function(amt) {
		var color = new Color( this );
		color.setType( this.type );
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
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var inverted = color.invert();
	 *
	 */
	invert: function() {
		var color = new Color( this );
		color.hue += 180;
		color.setType( this.type );
		return color;
	},

	/**
	 * rotate color around hsb/l color wheel other components remain the same
	 * NOTE: Color operators aren't working when not using paperScript
	 *
	 * @param {Number} degree
	 * 		(0.0 - 360.0) rotation degree
	 *
	 * @return {Color} rotated Color
	 *
	 * @example
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var compliment = color.rotate(180);
	 *
	 * var color = new Color( 0.0, 1.0, 0.7 );
	 * var triad = [
	 * 	color,
	 * 	color.rotate(120),
	 * 	color.rotate(240)
	 * ];
	 *
	 */
	rotate: function(degree) {
		var color = new Color( this );
		color.hue += degree;
		color.setType( this.type );
		return color;
	},

	/**
	 * interpolate color
	 *
	 * @param {Color} from
	 * 		start color
	 * @param {Color} to
	 * 		end color
	 * @param {Number} amt
	 * 		float: between 0.0 and 1.0
	 *
	 * @return {Color} interpolated color
	 *
	 * @example
	 * var color1 = new Color( 0.0, 1.0, 0.7 );
	 * var color2 = new Color( 0.0, 0.7, 1.0 );
	 * var interpolateColor = new Color().interpolate( color1, color2, 0.5 );
	 *
	 */
	/**
	 *
	 * @param {Color} to
	 * 		end color
	 * @param {Number} amt
	 * 		float: between 0.0 and 1.0
	 *
	 * @return {Color} interpolated color
	 *
	 * @example
	 * var color1 = new Color( 0.0, 1.0, 0.7 );
	 * var color2 = new Color( 0.0, 0.7, 1.0 );
	 * var interpolateColor = color1.interpolate( color2, 0.5 );
	 *
	 */
	//
	//	TODO: would interpolateTo make more sense?
	//
	// interpolateTo: function(toColor, amt) {
	//	var color = new Color( this );
	//	for( var i=0; i<color._components.length; i++ ) {
	//		color._components[i] += ((toColor._components[i] - color._components[i]) * amt);
	//	}
	//	return color;
	// },
	interpolate: function( arg0, arg1, arg2 ) {
		var color = new Color( this );

		if(typeof arg1 === 'number') {
			var to = arg0.getComponents();
			for( var i=0; i<color._components.length; i++ ) {
				// color._components[i] += ((to[i] - color._components[i]) * arg1);
				color._components[i] = paper.interpolate( color._components[i], to[i], arg1 );
			}
		}
		else {
			var from = arg0.getComponents();
			var to = arg1.getComponents();
			for( var i=0; i<color._components.length; i++ ) {
				// color._components[i] += ((to[i] - from[i]) * arg2);
				color._components[i] = paper.interpolate( from[i], to[i], arg2 );
			}
		}

		color.setType( this.type );
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

			if( paper.getType(arg0) === 'String' ) {
				var hex = arg0.substring(1);
				return new Color.random(
					parseInt(hex.slice(0,2), 16)/255,
					parseInt(hex.slice(2,4), 16)/255,
					parseInt(hex.slice(4,6), 16)/255
				);
			}
			else if( paper.getType(arg0) === 'Object' ) {
				components = {};
				for( var key in arg0 ) {
					if( paper.getType(arg0[key]) === 'Array' ) {
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

				for( var i=0; i<len; i++ ) {
					if( paper.getType(arguments[i]) === 'Array' ) {
						components.push(paper.random(arguments[i][0], arguments[i][1] ));
					}
					else if( paper.getType(arguments[i]) === 'Number' ) {
						components.push(paper.random( 0.0, arguments[i] ));
					}
					else {
						components.push(paper.random(1.0));
					}
				}
			}

			var c = new Color(components);
			c.data = (arg0 === 'hex') ? components : null;
			c.alpha = 1.0;
			c.setType( (components[0] > 1.0) ? 'hsb' : 'rgb' );
			return c;
		},

		// ------------------------------------------------------------------------
		/**
		 *
		 * @param {Number} RgbInt
		 * 		value as integer
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
		 * 		red as byte value (0-255)
		 * @param {Number} arg1
		 * 		green as byte value (0-255)
		 * @param {Number} arg2
		 * 		blue as byte value (0-255)
		 * @param {Number} arg3
		 * 		alpha as byte value (0-255)
		 *
		 * @return {Color}
		 *
		 */
		bytes: function(arg0, arg1, arg2, arg3) {
			if(arguments.length === 4) {
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
 * FDrop
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
	// Properties
	// -----------------------------------------------------------------------------
	enumerable: true,
	_prevAngle: 0,



	// -----------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------
	/**
	 * @param {Size} spacing
	 *			spacing.width  = the horizontal snapping value, width of the grid.
	 *			spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid: function(spacing) {
		// this.position = pt;
		this.position.snapGrid(spacing);
	},

	/**
	 * snaps point to an isometric grid
	 *
	 * @param {Number} scale
	 *			scale of the grid (1.0 = 32x16)
	 *
	 */
	snapIso: function(scale) {
		// this.position = pt;
		this.position.snapIso(scale);
	},


	// -----------------------------------------------------------------------------
	/**
	 *
	 * @return {Number} the distance between the item and the center of the canvas/artboard
	 *
	 */
	getDistanceToCenter: function() {
		if( this._position != undefined ) {
			var dx = this._position.x - view.bounds.center.x;
			var dy = this._position.y - view.bounds.center.y;
			return (dx * dx + dy * dy) + 1;
			// return this._position.getDistance( view.bounds.center );
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
	 * 	children: [
	 * 		new Path.Circle({
	 * 			center: new Point(50, 50),
	 * 			radius: 30
	 * 		}),
	 * 		new Path.Circle({
	 * 			center: new Point(50, 50),
	 * 			radius: 10
	 * 		})
	 * 	]
	 * });
	 * var group = path.toGroup();
	 *
	 */
	toGroup: function() {
		if (paper.getType(this) === 'CompoundPath') {
			return new Group( this.children );
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
	rotation: function(angle) {
		this.rotate( -(angle - this._prevAngle) );
		this._prevAngle = angle;
		return this;
	}

});



paper.Path.inject({
	// -----------------------------------------------------------------------------
	// Methods
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
	 * 	new Point(0, 0),
	 * 	new Point(180, 180),
	 * 	new Point(0, 360)
	 * );
	 * var centroid = triangle.getCentroid(); // { x:60, y:180 }
	 *
	 */
	getCentroid: function() {
		var centroid = new Point(0,0);

		var signedArea = 0.0;
		var a = 0.0;

		var points = [];
		for ( var i=0; i<this._segments.length-1; ++i ) {
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
	 * 	new Point(0, 0),
	 * 	new Point(180, 180),
	 * 	new Point(0, 360)
	 * );
	 * var circumcenter = triangle.getCircumcenter(); // { x:0, y:180 }
	 *
	 */
	// getCircumcenter: function() {
	// 	var len = this._segments.length;

	// 	var points = [];
	// 	for( var i=0; i<len; i++ ) {
	// 		var point = this._segments[i].point
	// 		points.push(point);
	// 	}
	// 	points.sort( FSort.distanceToCenter );

	// 	for( var i=0; i<points.length; i++ ) {
	// 		var point = points[i];
	// 		console.log( point.getDistanceToCenter() );
	// 	}
	// 	console.log( points );
	// 	console.log(' --------- ');

	// 	var l = new Path.Line(
	// 		points[0],
	// 		points[points.length-1]
	// 	);
	// 	l.strokeColor = new Color('00ffc7');


	// 	return point;
	// 	// console.log( this._segments );
	// 	// var points = [];
	// 	// points = points.sort(FSort.distanceToCenter());
	// 	// console.log( points );
	// 	// console.log( '---------' );

	// 	// var arr1 = this._segments[0].point.getPerpendicularBisector(this._segments[2].point);
	// 	// var arr2;
	// 	// if(len === 3) {
	// 	// 	// triangle
	// 	// 	arr2 = this._segments[1].point.getPerpendicularBisector(this._segments[2].point);
	// 	// }
	// 	// else {
	// 	// 	// polygon...
	// 	// 	// TODO: get points that are furthest from each other
	// 	// 	arr2 = this._segments[1].point.getPerpendicularBisector(this._segments[3].point);
	// 	// }

	// 	// var o = intersection(arr1, arr2);
	// 	// // if(o.length < 1) {
	// 	// // 	err_fail_to_find_center = 1;
	// 	// // 	// continue;
	// 	// // }

	// 	// var r  = this._segments[0].point.getDistance(o);
	// 	// var r1 = this._segments[1].point.getDistance(o);
	// 	// if(r >= r1){
	// 	// 	rIdx = 0;
	// 	// }
	// 	// else {
	// 	// 	rIdx = 1;
	// 	// 	r = r1;
	// 	// }

	// 	// function intersection(p, q) {
	// 	// 	var d = p[0] * q[1] - p[1] * q[0];
	// 	// 	if(d == 0) return [];
	// 	// 	return new Point(
	// 	// 		(q[2] * p[1] - p[2] * q[1])/d,
	// 	// 		(p[2] * q[0] - q[2] * p[0])/d
	// 	// 	);
	// 	// };


	// 	// // var pi = activeDocument.activeLayer.pathItems.ellipse(o[1] + r, o[0] - r, r * 2, r * 2);
	// 	// var pi = new Path.Circle(new Point(
	// 	// 	o.x - r/2,
	// 	// 	o.y + r/2
	// 	// ), r);
	// 	// // console.log( pi.position );
	// 	// return pi.position;
	// },

	getCircumcenter: function() {
		var len = this._segments.length;
		var pointsX = [],
			pointsY = [];

		for( var i=0; i<len; i++ ) {
			var j = (i+1 >= len) ? 0 : i+1;
			var k = (i+2 >= len) ? 1 : i+2;

			var point = calculate(
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

			if( Math.abs(G) < Numerical.EPSILON ) {
				var arrx = [p1.x, p2.x, p3.x];
				var arry = [p1.y, p2.y, p3.y];

				var minx = arrx.min();
				var miny = arry.min();
				var maxx = arrx.max();
				var maxy = arry.max();

				return new Point( (arrx[minx] + arrx[maxx])/2, (arry[miny] + arry[maxy])/2 );
			}
			else {
				var cx = (D*E - B*F) / G;
				var cy = (A*F - C*E) / G;
				return new Point( cx, cy );
			}
		};

		return new Point( pointsX.median(), pointsY.median() );
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
		arr.sort( function(a, b) {
			return getDistanceToCentroid(a) - getDistanceToCentroid(b);
		});

		circumradius = getDistanceToCentroid( arr[arr.length-1] ) + getDistanceToCentroid( arr[arr.length-2] );
		circumradius /= 2;

		// // for( var i=0; i<arr.length; i++ ) {
		// //	var seg = arr[i].point;
		// //	if( seg.getDistance( this.getCentroid()) > circumradius ) {
		// //		circumradius = seg.getDistance( this.getCentroid());
		// //	}
		// // }

		return Path.Circle(
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
	 * 	new Point(0, 0),
	 * 	new Point(180, 180),
	 * 	new Point(0, 360)
	 * );
	 * var incircle = triangle.getIncircle(); // new Path.Circle(new Point(60, 180), 120));
	 *
	 */
	getIncircle: function() {
		var incircleradius = Number.MAX_VALUE;

		for( var i=0; i<this._segments.length; i++ ) {
			var seg = this._segments[i].point;
			if( seg.getDistance( this.getCentroid() ) < incircleradius ) {
				incircleradius = seg.getDistance( this.getCentroid() );
			}
		}

		return Path.Circle(
			this.getCentroid(),
			incircleradius
		);
	},

	// TODO: currently implementation returns false point
	// getIncenter : function() {
	//	// vertices
	//	if( this.segments.length == 3 ) {
	//		var p1 = this.segments[0].point;
	//		var p2 = this.segments[1].point;
	//		var p3 = this.segments[2].point;

	//		// side lengths
	//		var a = p1.getDistance(p2);
	//		var b = p2.getDistance(p3);
	//		var c = p3.getDistance(p1);

	//		var circum = a + b + c;

	//		return new Point(
	//			(a* p1.x + b * p2.x + c * p3.x) / circum,
	//			(a * p1.y + b * p2.y + c * p3.y) / circum
	//		);
	//	}
	//	else {
	//		console.error( 'Not Path.FTriangle' );
	//		return null;
	//	}
	// },

	/**
	 * @param {} xb
	 * 		array of barycentric coordinates
	 */
	// TODO: currently implementation returns false point
	// toCartesian : function(bary) {
	//	if( this.segments.length == 3 ) {
	//		var p1 = this.segments[0].point;
	//		var p2 = this.segments[1].point;
	//		var p3 = this.segments[2].point;

	//		// side lengths
	//		var a = p1.getDistance(p2);
	//		var b = p2.getDistance(p3);
	//		var c = p3.getDistance(p1);

	//		// var area = 0.5 * (p1.x * (p2.y - p3.y) +
	//		//				  p2.x * (p3.y - p1.y) +
	//		//				  p3.x * (p1.y - p2.y));

	//		// var r = 2 * area / (a + b + c);
	//		// var k = 2 * area / (a*bary[0] + b*bary[1] + c*bary[2]);

	//		// var angleC = Math.acos((a*a + b*b - c*c) / (2*a*b));

	//		// var cosC = Math.cos( angleC );
	//		// var sinC = Math.sin( angleC );

	//		// var x =	(k*bary[1] - r + (k*bary[0] - r)*cosC) / sinC;
	//		// var y =	k*bary[0] - r;

	//		// return new Point(
	//		//	x + this.getIncenter().x,
	//		//	y + this.getIncenter().y
	//		// );

	//		return new Point(
	//			bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x,
	//			bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x
	//		);
	//	}
	//	else {
	//		console.error( 'Not Path.FTriangle' );
	//		return null;
	//	}
	// },


	// TODO: currently implementation returns false point
	// getOrthocenter : function() {
	//	// vertices
	//	if( this.segments.length == 3 ) {
	//		var p1 = this.segments[0].point;
	//		var p2 = this.segments[1].point;
	//		var p3 = this.segments[2].point;

	//		// side lengths
	//		var a = p1.getDistance(p2);
	//		var b = p2.getDistance(p3);
	//		var c = p3.getDistance(p1);

	//		var bary = [
	//			this.sec(a),
	//			this.sec(b),
	//			this.sec(c)
	//		];
	//		return this.toCartesian(bary);
	//	}
	//	else {
	//		console.error( 'Not Path.FTriangle' );
	//		return null;
	//	}
	// },


	// TODO: currently implementation returns false point
	// getSchifflerPoint : function() {
	//	// vertices
	//	if( this.segments.length == 3 ) {
	//		var p1 = this.segments[0].point;
	//		var p2 = this.segments[1].point;
	//		var p3 = this.segments[2].point;

	//		// side lengths
	//		var a = p1.getDistance(p2);
	//		var b = p2.getDistance(p3);
	//		var c = p3.getDistance(p1);

	//		var bary = [
	//			1/(Math.cos(b) + Math.cos(c)),
	//			1/(Math.cos(c) + Math.cos(a)),
	//			1/(Math.cos(a) + Math.cos(b))
	//		];
	//		return this.toCartesian(bary, p1,p2,p3);
	//	}
	//	else {
	//		console.error( 'Not Path.FTriangle' );
	//		return null;
	//	}
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
			 *			the head of the arrow
			 * @param {Point} tailPoint
			 *			the tail of the arrow
			 * @param {Size} arrowHeadSize
			 *			(optional) length of the arrow head
			 *
			 * @example
			 * var headPoint = new paper.Point( 9,9 );
			 * var tailPoint = new paper.Point( 90,90 );
			 * var arrowHeadSize = new paper.Size( 18,18 );
			 * var farrow = new paper.Path.FArrow( headPoint, tailPoint, arrowHeadSize );
			 *
			 */
			FArrow: function(headPoint, tailPoint, arrowHeadSize) {
				// the line part
				var path = new Path.Line( headPoint, tailPoint );

				// the arrow head
				var arrowHeadSize = arrowHeadSize || new Size(headPoint.getDistance(tailPoint)*0.381924,headPoint.getDistance(tailPoint)*0.381924);

				// rotate arrow head around to correct position
				var a = Math.atan2( headPoint.x-tailPoint.x, tailPoint.y-headPoint.y );

				// slight "hack" to get strokCap correct
				var arrowHead = [];
				arrowHead[0] = new Path.Line( new Point(0,0), new Point(-arrowHeadSize.width,-arrowHeadSize.height) );
				arrowHead[1] = new Path.Line( new Point(0,0), new Point( arrowHeadSize.width,-arrowHeadSize.height) );
				for( var i=0; i<arrowHead.length; i++ ) {
					arrowHead[i].rotate( 180+paper.degrees(a), new Point(0,0) );
					arrowHead[i].translate( headPoint );
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
			 *			the position of the bubble
			 * @param {Size} bubbleSize
			 *			the size of the bubble
			 * @param {Size} bubbleTagSize
			 *			the size of the tag
			 * @param {String} bubbleTagCenter
			 *			(optional)
			 *			'RANDOM'	randomly x-position the point (default)
			 *			'LEFT'		left align the x-position of the point
			 *			'CENTER'	center align the x-position of the point
			 *			'RIGHT'		right align the x-position of the point
			 *
			 * @example
			 * var bubblePoint = new paper.Point( 45,45 );
			 * var bubbleSize = new paper.Size( 90,60 );
			 * var bubbleTagSize = new paper.Size( 9,9 );
			 * var bubbleTagCenter = 'CENTER';
			 * var bubble = new paper.Path.FBubble( bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter );
			 *
			 */
			FBubble: function(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter) {
				var path = new Path();
				path.name = 'bubble';

				var bubbleTagSize = bubbleTagSize || defaultFBubbleTagSize;
				if(bubbleSize.width < 10) {
					bubbleSize.width = 10;
					bubbleTagSize = new Size(10,10);
				}
				var bubbleTagCenter = bubbleTagCenter || 'RANDOM';

				// left side of bubble
				path.add( new Point(0,0) );
				var angle = 180;
				var through = new Point(
					bubbleSize.height/2 + Math.cos( paper.radians(angle) ) * (bubbleSize.height),
					bubbleSize.height/2 + Math.sin( paper.radians(angle) ) * (bubbleSize.height)
				);
				path.arcTo(through, new Point(0,bubbleSize.height));

				// middle bottom
				// create tag space somewhere along the bottom of the bubble
				var tagStart = paper.randomInt(0,bubbleSize.width-bubbleTagSize.width);

				// create tag
				path.add( new Point(tagStart,bubbleSize.height) );

				var tx, ty;
				if(bubbleTagCenter == 'LEFT') {
					tx = tagStart;
				}
				else if(bubbleTagCenter == 'CENTER') {
					tx = tagStart + (bubbleTagSize.width/2);
				}
				else if(bubbleTagCenter == 'RIGHT') {
					tx = tagStart+bubbleTagSize.width;
				}
				else { // if(bubbleTagCenter == 'RANDOM') {
					tx = paper.randomInt(tagStart,tagStart+bubbleTagSize.width);
				}

				// the length of the tag
				ty = bubbleSize.height + bubbleTagSize.height;
				path.add( new Point(tx,ty) );

				// continue bottom
				path.add( new Point(tagStart+bubbleTagSize.width,bubbleSize.height) );
				path.add( new Point(bubbleSize.width,bubbleSize.height) );


				// right side of bubble
				angle = 0;
				through = new Point(
					bubbleSize.height/2 + Math.cos( paper.radians(angle) ) * (bubbleSize.height/2),
					bubbleSize.height/2 + Math.sin( paper.radians(angle) ) * (bubbleSize.height/2)
				);
				path.arcTo( new Point(bubbleSize.width,0), false );

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
			 *			point1 The first point (endpoint1)
			 * @param {Number} arg1
			 *			radius of endpoint1
			 * @param {Point} arg2
			 *			point2 The second point (endpoint2)
			 * @param {Number} arg3
			 *			radius of endpoint2
			 *
			 * @example
			 * var point1 = new paper.Point( 9,9 );
			 * var radius1 = 9;
			 * var point2 = new paper.Point( 90,90 );
			 * var radius2 = 90;
			 * var fchain = new paper.Path.FChain( point1, radius1, point2, radius2 );
			 *
			 */
			/**
			 *
			 * @param {Path} arg0
			 *			PathItem (endpoint1)
			 * @param {Path} arg1
			 *			PathItem (endpoint2)
			 *
			 * @example
			 * var path1 = new paper.Path.Circle( new Point(9,9), 9 );
			 * var path2 = new paper.Path.Circle( new Point(90,90), 90 );
			 * var fchain = new paper.Path.FChain( path1, path2 );
			 *
			 */
			FChain: function(arg0, arg1, arg2, arg3) {
				var obj1, obj2;

				// check for the type of arguments being passed
				if( paper.getType(arg0) === 'Point' ) {
					obj1 = new Path.Circle( arg0, arg1 );
					obj2 = new Path.Circle( arg2, arg3 );
				}
				else {
					obj1 = arg0;
					obj2 = arg1;
				}

				var tangents = paper.getCommonTangents(obj1, obj2);
				var path = new Path();
				if( tangents != null ) {
					path.name = 'chain';
					path.add( tangents[0] );
					path.add( tangents[1] );

					// determine position of chain around endpoint2
					if( obj2.position.x > obj1.position.x ) angle = 0;
					else if( obj2.position.y < obj1.position.y ) angle = -90;
					else if( obj2.position.y > obj1.position.y ) angle = 90;
					else angle = 180;
					var tp2 = new Point(
						obj2.position.x + Math.cos( paper.radians(angle) ) * (obj2.bounds.width/2),
						obj2.position.y + Math.sin( paper.radians(angle) ) * (obj2.bounds.height/2)
					);
					path.arcTo(tp2, tangents[2]);

					path.add(tangents[2]);
					path.add(tangents[3]);

					// determine position of chain around endpoint1
					if( obj1.position.x > obj2.position.x ) angle = 0;
					else if( obj1.position.y < obj2.position.y ) angle = -90;
					else if( obj1.position.y > obj2.position.y ) angle = 90;
					else angle = 180;
					var tp1 = new Point(
						obj1.position.x + Math.cos( paper.radians(angle) ) * (obj1.bounds.width/2),
						obj1.position.y + Math.sin( paper.radians(angle) ) * (obj1.bounds.height/2)
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
			 *			position of cross
			 * @param {Size} size
			 *			size [width,height] of cross
			 * @param {Number} strokeWidth
			 *			thickness of the cross
			 * @param {String} crossType (optional)
			 *			'SHARP'		sharp edged cross (fill)
			 *			'LINE'		simple built of lines (stroke)
			 *
			 * @example
			 * var centerPoint = new paper.Point( 45,45 );
			 * var size = new paper.Size( 45,45 );
			 * var strokeWidth = 18;
			 * var crossType = 'LINE';
			 * var fcross = new paper.Path.FCross( centerPoint, size, strokeWidth, crossType );
			 *
			 */
			FCross: function( centerPoint, size, strokeWidth, crossType ) {
				var strokeWidth = strokeWidth || 1.0;
				var crossType = crossType || 'LINE';

				// var centerPoint = new Point(_x,_y);
				// var size = new Size(_width,_height);
				var line1, line2;

				if( crossType == 'LINE' ) {
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
				else if( crossType == 'SHARP' ) {
					line1 = new Path();
					line1.add( new Point( centerPoint.x + size.width, centerPoint.y - size.height ) );
					line1.add( new Point( centerPoint.x + size.width, (centerPoint.y - size.height) + (strokeWidth/2) ) );
					line1.add( new Point( (centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y + size.height ) );
					line1.add( new Point( centerPoint.x - size.width, centerPoint.y + size.height ) );
					line1.add( new Point( centerPoint.x - size.width, (centerPoint.y + size.height) - (strokeWidth/2) ) );
					line1.add( new Point( (centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y - size.height ) );
					line1.closed = true;

					line2 = new Path();
					line2.add( new Point( centerPoint.x - size.width, centerPoint.y - size.height ) );
					line2.add( new Point( (centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y - size.height ) );
					line2.add( new Point( centerPoint.x + size.width, (centerPoint.y + size.height) - (strokeWidth/2) ) );
					line2.add( new Point( centerPoint.x + size.width, centerPoint.y + size.height ) );
					line2.add( new Point( (centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y + size.height ) );
					line2.add( new Point( centerPoint.x - size.width, (centerPoint.y - size.height) + (strokeWidth/2) ) );
					line2.closed = true;
				}

				var group = new Group([ line1, line2 ]);
				group.name = 'cross';
				return group;
			},


			/**
			 * FDrop
			 * Create a (tear)drop
			 *
			 * @param {Point} centerPoint
			 *			position of cross
			 * @param {Number} arg1
			 *			scale drop, maintains intended proportion
			 *
			 * @example
			 * var centerPoint = new paper.Point( 45,45 );
			 * var scale = 45;
			 * var fdrop = new paper.Path.FDrop( centerPoint, scale );
			 *
			 */
			/**
			 *
			 * @param {Point} centerPoint
			 *			position of cross
			 * @param {Size} arg1
			 *			scale drop, custom proportion
			 *
			 * @example
			 * var centerPoint = new paper.Point( 45,45 );
			 * var scale = new paper.Size( 30,61.8 );
			 * var fdrop = new paper.Path.FDrop( centerPoint, scale );
			 *
			 */
			FDrop: function( centerPoint, arg1 ) {
				var path = new Path();
				path.name = 'drop';

				// segments added from top counter-clockwise
				path.add( new Segment(
					new Point( -0.01, 0.01 ),
					new Point( 0, -0.0055078 ),
					new Point( 0, 0.643042 )
				) );
				path.add( new Segment(
					new Point( -0.65, 1.6381104 ),
					new Point( 0, -0.6109619 ),
					new Point( 0, 0.3694434 )
				) );
				path.add( new Segment(
					new Point( 0, 2.31 ),
					new Point( -0.3578369, 0 ),
					new Point( 0.3578369, 0 )
				) );
				path.add( new Segment(
					new Point( 0.65, 1.6381104 ),
					new Point( 0, 0.3694434 ),
					new Point( 0, -0.6109619 )
				) );
				path.add( new Segment(
					new Point( 0.01, 0.01 ),
					new Point( 0, 0.643042 ),
					new Point( 0, -0.0055078 )
				) );
				path.add( new Segment(
					new Point( 0, -0 ),
					new Point( 0.0055078, 0 ),
					new Point( -0.0055078, 0 )
				) );
				path.closed = true;
				path.position = centerPoint;

				// check for the type of arguments being passed
				// default scale is from center (position)
				if( typeof arg1 == 'Size' ) {
					path.scale( arg1.width, arg1.height );
				}
				else {
					path.scale( arg1 );
				}

				return path;
			},


			/**
			 * FTriangle
			 * Create a triangle
			 *
			 * @param {Point} p1
			 *			first point of triangle
			 * @param {Point} p2
			 *			second point of triangle
			 * @param {Point} p3
			 *			third point of triangle
			 *
			 * @example
			 * var p1 = new paper.Point( 9,9 );
			 * var p2 = new paper.Point( 90,45 );
			 * var p3 = new paper.Point( 45,90 );
			 * var ftriangle = new paper.Path.FTriangle( p1, p2, p3 );
			 *
			 */
			FTriangle: function( p1, p2, p3 ) {
				var path = new Path();
				path.add(p1);
				path.add(p2);
				path.add(p3);
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
	// Properties
	// ------------------------------------------------------------------------
	name: null,
	data: {},
	_prevAngle: 0,



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 * http://gmc.yoyogames.com/index.php?showtopic=290349
	 *
	 * @param {Size} spacing
	 *			scale.width  = x scale of the grid.
	 *			scale.height = y scale of the grid.
	 * @param {Object} options
	 *			{ grid: true }
	 *			{ isometric: true }
	 *
	 * @return {Point} snapped Point
	 *
	 */
	/**
	 * snaps point to an isometric grid
	 *
	 * @param {Number} scale
	 *			scale of the grid
	 * @param {Object} options
	 *			{ grid: true }
	 *			{ isometric: true }
	 *
	 * @return {Point} snapped Point
	 *
	 */
	snap: function(scale, options) {
		options = (options != undefined)
			? options
			: { grid: true, isometric: false };
		scale = (scale.type == 'Size')
			? scale
			: new Size(scale,scale);

		var ix, iy;
		if (optons.isometric === true) {
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
	 * 		interpolates the point towards a given target point
	 * @param {Number} arg1
	 * 		(0.0 - 1.0) interpolation factor
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
		return new Point( (this.x + point.x)/2, (this.y + point.y)/2 );
	},

	/**
	 * Returns the perpendicular bisector of two points
	 *
	 * @return {Point}
	 *
	 * @example
	 * var point1 = new Point(0, 90);
	 * var point2 = new Point(90, 180);
	 * var result = point1.getPerpendicularBisector(point2); // { x: 45, y: 135 }
	 *
	 */
	getPerpendicularBisector: function(point) {
		var mid = this.getMid(point);
		var arr = defline(
			new Point( mid.x - (this.y - mid.y), mid.y + (this.x - mid.x) ),
			new Point( mid.x - (point.y - mid.y), mid.y + (point.x - mid.x) )
		);

		function defline(p1, p2) {
			var a = p1.y - p2.y;
			var b = p1.x - p2.x;
			return [a, -b, b * p1.y - a * p1.x];
		};
		return arr;
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
	 * 		first point
	 * @param {Point} point2
	 * 		second point
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
	 *			start Point
	 * @param {Point} stop
	 *			stop Point
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
	//	if (this.magSq() > lim * lim) {
	//		this.normalize();
	//		this.mult * lim;
	//		return this;
	//	}
	//	return this;
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
		 * 		starting Point
		 * @param {Point} arg1
		 * 		ending Point
		 * @param {Number} arg2
		 * 		(0.0 - 1.0) interpolate factor
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
		 *			range for x values
		 * @param {Array} arg1
		 *			range for y values
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
		 *			max x value
		 * @param {Number} arg1
		 *			max y value
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
 * FString.js
 *
 * Extensions to JavaScript Array may be bad form... but whatever
 *
 */


/** ------------------------------------------------------------------------
 *
 * Strings
 *
 * ------------------------------------------------------------------------/

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
	// Namespaces
	// ------------------------------------------------------------------------
	// Time/Timing Support
	FDate: {},
	FStopwatch: {},

	// Animation Support
	FStepper: {},
	Ease: {}


	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------


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
		ease:		[ 0.25, 0.1, 0.25, 1.0 ],
		linear:		[ 0.00, 0.0, 1.00, 1.0 ],
		// in:			[ 0.42, 0.0, 1.00, 1.0 ],
		out:		[ 0.00, 0.0, 0.58, 1.0 ],
		inOut:		[ 0.42, 0.0, 0.58, 1.0 ]
	};


	/**
	 *
	 * use bezier curve for transition easing function
	 *
	 * @param {Array} arg0
	 *				an array (4) of normalized X,Y values [ x1, y1, x2, y2 ]
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
	 *				Point 1
	 * @param {Point} arg1
	 *				Point 2
	 *
	 * @example
	 * var spline = new KeySpline(
	 * 	new Point( 80, 80 ),
	 * 	new Point( 10, 45 )
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
		 *				a float from 0.0 - 1.0
		 * @param {Number} arg0
		 *				x1 or y1
		 * @param {Number} arg1
		 *				x2 or y2
		 *
		 * @return {Number} x(t)
		 *
		 */
		function CalcBezier(t, arg0, arg1) {
			return ((A(arg0, arg1)*t + B(arg0, arg1))*t + C(arg0))*t;
		};

		/**
		 * @param {Number} t
		 *				a float from 0.0 - 1.0
		 * @param {Number} arg0
		 *				x1 or y1
		 * @param {Number} arg1
		 *				x2 or y2
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
		linear: function(t) { return t },

		inQuad: function(t) { return t*t },
		outQuad: function(t) { return t*(2-t) },
		inOutQuad: function(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

		inCubic: function(t) { return t*t*t },
		outCubic: function(t) { return (--t)*t*t+1 },
		inOutCubic: function(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

		inQuart: function(t) { return t*t*t*t },
		outQuart: function(t) { return 1-(--t)*t*t*t },
		inOutQuart: function(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

		inQuint: function(t) { return t*t*t*t*t },
		outQuint: function(t) { return 1+(--t)*t*t*t*t },
		inOutQuint: function(t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

		inSine: function(t) { return -1*Math.cos(t*(Math.PI/2))+1 },
		outSine: function(t) { return 1*Math.sin(t*(Math.PI/2)) },
		inOutSine: function(t) { return -0.5*(Math.cos(Math.PI*t)-1) },

		inExpo: function(t) { return 1*Math.pow(2, 10*(t-1)) },
		outExpo: function(t) { return 1*(-Math.pow(2, -10*t)+1 ) },
		inOutExpo: function(t) { t /= 0.5; if (t < 1) return 0.5 * Math.pow(2, 10*(t-1)); t--; return 0.5 * (-Math.pow(2, -10*t)+2); },

		inCirc: function(t) { return -1*(Math.sqrt(1-t*t)-1) },
		outCirc: function(t) { t--; return 1*Math.sqrt(1-t*t); },
		inOutCirc: function(t) { t /= 0.5; if(t<1) { return -0.5*(Math.sqrt(1-t*t)-1); }else{ t-=2; return 0.5*(Math.sqrt(1-t*t)+1); } },


		spline: KeySpline
		// values: splineValues
	};

};

/*
 *
 * FDate.js
 *
 */


folio.FTime.FDate = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	var dateObj = new Date();
	var monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var shortMonthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	var addZero = function(val) {
		if (val.length == 1) val = '0' + val;
		return val;
	};

	/**
	 * @return {String} return the current year as 'YYYY'
	 */
	var year = function() {
		if(dateObj === undefined) dateObj = new Date();
		var year = String( dateObj.getFullYear() );
		return year;
	};

	/**
	 * @return {String} return the current month as 'MM'
	 */
	var month = function() {
		if(dateObj === undefined) dateObj = new Date();
		return String( dateObj.getMonth() );
	};

	/**
	 * @return {String} return the current day as 'DD'
	 */
	var day = function() {
		if(dateObj === undefined) dateObj = new Date();
		return String( dateObj.getDate() );
	};

	/**
	 * @return {String} return the current hour as 'HH'
	 */
	var hour = function() {
		if(dateObj === undefined) dateObj = new Date();
		var hour = String( dateObj.getHours() );
		return addZero(hour);
	};

	/**
	 * @return {String} return the current minute as 'mm'
	 */
	var minute = function() {
		if(dateObj === undefined) dateObj = new Date();
		var minute = String( dateObj.getMinutes() );
		return addZero(minute);
	};

	/**
	 * @return {String} return the current second as 'ss'
	 */
	var second = function() {
		if(dateObj === undefined) dateObj = new Date();
		var second = String( dateObj.getSeconds() );
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
	 * 		boolean array = [hours, minutes, seconds]
	 *
	 * @return {String} the current time
	 */
	var now = function(format) {
		var disp = format || [true, true, true];
		var str = '';
		if(disp[0]) str += hour();
		if(disp[0] && disp[1]) str += ':';
		if(disp[1]) str += minute();
		if(disp[1] && disp[2]) str += ':';
		if(disp[2]) str += second();
		return str;
	};

	/**
	 * @return {Number} the current time in milliseconds
	 */
	var nowMilliseconds = function() {
		return toMillsecond( hour(), minute(), second() );
	};

	/**
	 * add to time
	 *
	 * @param {Number} d
	 * 		days
	 * @param {Number} h
	 * 		hours
	 * @param {Number} m
	 * 		minutes
	 * @param {Number} s
	 * 		seconds
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
	 * 		days
	 * @param {Number} h
	 * 		hours
	 * @param {Number} m
	 * 		minutes
	 * @param {Number} s
	 * 		seconds
	 *
	 * @return {Object} new time
	 */
	var sub = function(d, h, m, s) {
		return dateObj - (24 * d + 60 * h + 60 * m + 1000 * s);
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 * set to a specific time
	 *
	 * @param {Number} d
	 * 		days
	 * @param {Number} h
	 * 		hours
	 * @param {Number} m
	 * 		minutes
	 * @param {Number} s
	 * 		seconds
	 *
	 * @return {Object} time
	 */
	var set = function(d, h, m, s) {
		time = new Date();
		time.setTime( (24 * d + 60 * h + 60 * m + 1000 * s) );
		return time;
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 * @param {Number} ms
	 * 		as milliseconds
	 * @param {Array} format
	 * 		boolean array = [hours, minutes, seconds]
	 *
	 * @return {String} human readable default is hh:mm:ss
	 */
	var get = function(ms, format) {
		var disp = format || [true, true, true];
		var seconds = parseInt( (ms / 1000) % 60 );
		var minutes = parseInt( ((ms / 1000) / 60) % 60 );
		var hours   = parseInt( (((ms / 1000) / 60) / 60) % 24 );

		var hh, mm, ss;
		if(hours < 10) hh = '0' + hours;
		else hh =  '' + hours;
		if(minutes < 10) mm = '0' + minutes;
		else mm =  '' + minutes;
		if(seconds < 10) ss = '0' + seconds;
		else ss =  '' + seconds;

		var str = '';
		if(disp[0]) str += hh;
		if(disp[0] && disp[1]) str += ':';
		if(disp[1]) str += mm;
		if(disp[1] && disp[2]) str += ':';
		if(disp[2]) str += ss;
		return str;
	};

	/**
	 * @param {String} h
	 * 		as hh:mm:ss OR mm:ss
	 *
	 * @return {Number} time in milliseconds
	 */
	/**
	 * @param {Number} h
	 * 		hours
	 * @param {Number} m
	 * 		minutes
	 * @param {Number} s
	 * 		seconds
	 *
	 * @return {Number} time in milliseconds
	 */
	var toMillsecond = function(h, m, s) {
		if( m === undefined &&  s === undefined ) {
			h = toArray(h)[0];
			m = toArray(h)[1];
			s = toArray(h)[2];
		}
		return parseInt(3600000 * h + 60000 * m + 1000 * s);
	};

	/**
	 * @param {String} str
	 * 		string as hh:mm:ss
	 *
	 * @return {Array} array of time [0] hours [1] minutes [2] seconds
	 */
	var toArray = function(str) {
		var hms = str.split(':');
		return [ hms[0], hms[1], hms[2] ];
	};


	// -----------------------------------------------------------------------------
	return {
		year: year,
		month: month,
		day: day,
		hour: hour,
		minute: minute,
		second: second,
		date: date,
		now: now,
		nowMilliseconds: nowMilliseconds,

		add: add,
		sub: sub,

		set: set,
		get: get,

		toMillsecond: toMillsecond,
		toArray: toArray
	};

};



/*
 *
 * FStepper.js
 *
 */


folio.FTime.FStepper = function() {
	// ------------------------------------------------------------------------
	// Properties
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
	// Methods
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
	 * 		the elapsed time of the application in seconds
	 */
	var update = function(currentSeconds) {
		if(bBeginStepper) {
			bBeginStepper = false;
			timeStart = currentSeconds;
			if(bIn) {
				timeEnd = paper.round( (currentSeconds + ((1.0 - delta) * stepMillis)), 3 );
			}
			else {
				timeEnd = paper.round( (currentSeconds + (delta*stepMillis)), 3 );
			}
			if(timeEnd <= currentSeconds) {
				if(bIn) {
					bIn = false;
					delta = 1.0;
				}
				else {
					bOut = false;
					delta = 0.0;
				}
			}
		}
		if(bIn) {
			delta = paper.round( (1.0 - ((timeEnd - currentSeconds) / stepMillis)), 3 );
			if(currentSeconds == timeEnd) {
				bIn = false;
				delta = 1.0;
				counter++;
				return;
			}
		}
		else if(bOut) {
			delta = paper.round( ((timeEnd - currentSeconds) / stepMillis), 3 );
			if(currentSeconds == timeEnd) {
				bIn = false;
				delta = 0.0;
				counter++;
				return;
			}
		}
	};

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
		if(bIn) return;
		if(delta === 1.0) return;
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
		if(bOut) return;
		if(delta === 0.0) return;
	};

	// ------------------------------------------------------------------------
	/**
	 * @return {Boolean} if the object is stepping in
	 */
	var isIn = function() {
		return bIn;
	};
	/**
	 * @return {Boolean} if the object is stepping out
	 */
	var isOut = function() {
		return bOut;
	};

	/**
	 * @return {Boolean} if the object has finished it's stepping
	 */
	var isDone = function() {
		if(delta < 1.0 && delta > 0.0) return false;
		else if(delta > 1.0) {
			delta = 1.0;
			return true;
		}
		else if(delta < 0.0) {
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
	var stop = function() {
		bBeginStepper = bIn = bOut = false;
	};

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
	// Sets
	// ------------------------------------------------------------------------
	/**
	 * @param {Number} seconds
	 * 		length of fade in seconds
	 */
	var setSeconds = function(seconds) {
		setMillis( parseInt(seconds * 1000.0) );
	};
	/**
	 * @param {Number} millis
	 * 		length of fade in milliseconds
	 */
	var setMillis = function(millis) {
		stepMillis = millis;
		stepMillis /= 1000;
	};

	/**
	 * @param {Number} val
	 * 		set a value for the delta 0.0 - 1.0
	 */
	var setDelta = function(val) {
		delta = val;
	};


	// ------------------------------------------------------------------------
	return {
		delta: getDelta,
		counter: getCounter,

		toggle: toggle,
		update: update,
		stepIn: stepIn,
		stepOut: stepOut,

		isIn: isIn,
		isOut: isOut,
		isDone: isDone,

		stop: stop,

		setSeconds: setSeconds,
		setMillis: setMillis,
		setDelta: setDelta
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
	// Properties
	// ------------------------------------------------------------------------
	var now;
	var then;
	var timeInMs = 0;
	var bStart = 0;



	// ------------------------------------------------------------------------
	// Methods
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
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *
	 * set the stopwatch
	 *
	 * @param {Number} ms
	 * 		milliseconds to start the stopwatch with
	 * @param {Boolean} run
	 * 		whether the stopwatch should start or not
	 *
	 */
	var set = function(ms, run) {
		timeInMs = ms;
		(run == true) ? bStart = 0 : bStart = 1;

		then = new Date();
		then.setTime(then.getTime() - timeInMs);
		toggle();
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
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
		return (bStart) ? true : false;
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
	 *			the name (key) of what we want to save
	 * @param {Object} value
	 *			what we want to save
	 */
	saveLocal: function(name, value) {
		if(window.localStorage) {
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
	 *			the name (key) of what we want to retrieve
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
	 *			the name (key) of what we want to retrieve
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
	 *			the name (key) of what we want to retrieve
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
	 *			the name (key) of what we want to delete
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
	 *			the name (key) of what we want to save
	 * @param {Object} value
	 *			what we want to save
	 */
	saveSession: function(name, value) {
		if(window.sessionStorage) {
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
	 *			the name (key) of what we want to retrieve
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
	 *			the name (key) of what we want to retrieve
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
	 *			the name (key) of what we want to retrieve
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
	 *			the name (key) of what we want to delete
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
	 *			the name (key) of what we want to save
	 * @param {Object} value
	 *			what we want to save
	 * @param {Number} days
	 *			how many days do we want to save it for
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
	 *			the name (key) of what we want to retrieve
	 */
	openCookie: function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
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
	 *			the name (key) of what we want to delete
	 */
	deleteCookie: function(name) {
		saveCookie(name, '', -1);
	},



	// ------------------------------------------------------------------------
	/*
	 * Scriptographer specific
	 *
	 * modified from Jürg Lehni
	 * http://scriptographer.org/forum/help/save-array-data-to-external-file/
	 *
	 */

	/**
	 * @param {String} str
	 *			the String of information to save (JSON encoded)
	 * @param {String} fname
	 *			the name of the file to save to
	 */
	saveFile: function(str, fname) {
		var file = new File(script.file.parent, fname);
		if (file.exists()) file.remove();
		file.open();
		file.write( Json.encode(str) );
		file.close();
	},

	/**
	 * @param {String} fname
	 *			the name of the file to open
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
	 *			the name of the file to delete
	 */
	deleteFile: function(fname) {
		var file = new File(script.file.parent, fname);
		// If file exists, we need to remove it first in order to overwrite its content.
		if (file.exists()) file.remove();
	},

	/**
	 * @param {String} fname
	 *			the name of the file to verify exists
	 *
	 * @return {Boolean} true if exists, false otherwise
	 */
	checkFile: function(fname) {
		var file = new File(script.file.parent, fname);
		if (file.exists()) return true;
		else return false;
	}


};



/*
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
 *				Group of Items
 * @param {Number} iterations
 *				(optional) number of iterations per cycle (default: 11)
 *				higher iterations == slower movement
 *
 * @return {Array}
 */
/**
 * @param {Array} circleItems
 *				Array of Items
 * @param {Number} iterations
 *				(optional) number of iterations per cycle (default: 11)
 *				higher iterations == slower movement
 *
 * @return {Array}
 *
 */
folio.FCirclePack = function(circleItems, iterations) {
	//
	// Properties
	//
	var circleItems = (circleItems instanceof Group)
		? circleItems.children
		: (circleItems == null)
			? []
			: circleItems;
	iterations = (iterations != undefined)
		? iterations
		: 11;

	var dampingAmt = 0.1; // the lower the slower
	var padding = 0;
	var target = view.center;

	//
	// Methods
	//
	var update = function() {
		circleItems = circleItems.sort( FSort.distanceToCenter );
		var pp = new Point();

		// Push items away from each other
		for (var i=circleItems.length-1; i>=0; --i) {
			var ci = circleItems[i];

			for (var j=i+1; j<circleItems.length; j++) {
				var cj = circleItems[j];

				if (i == j) continue;

				var dx = cj.position.x - ci.position.x;
				var dy = cj.position.y - ci.position.y;

				// this alogroithm is designed for circles, so we assume
				// every object is either a circle or a square.
				//
				// polygon packing is a much larger challenge
				// http://en.wikipedia.org/wiki/Packing_problem
				// hence why we just halve the "width" in
				// order to get the object's radius
				var r = (ci.bounds.size.width / 2) + (cj.bounds.size.width / 2) + padding;
				var d = (dx * dx) + (dy * dy);

				if (d < (r * r) - 0.01) {
					pp.x = dx;
					pp.y = dy;
					pp = pp.normalize(1.0);
					pp = pp.multiply( (r - Math.sqrt(d)) * 0.5 );

					try {
						// if(cj != this.dragCircle) {
						cj.position.x += pp.x;
						cj.position.y += pp.y;
						// }
						// if(ci != this.dragCircle) {
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

		// push items toward center
		var damping = dampingAmt / parseInt(iterations);

		for (var i = 0; i < circleItems.length; i++) {
			var c = circleItems[i];
			// if(c == this.dragCircle) continue;
			pp.x = c.position.x - target.x;
			pp.y = c.position.y - target.y;
			pp = pp.multiply(damping);
			// }
			c.position.x -= pp.x;
			c.position.y -= pp.y;
		}

		// if(this.dragCircle && this._mouseEvent) {
		//	this.dragCircle.x = this._mouseEvent.offsetX;//stage.mouseX;
		//	this.dragCircle.y = this._mouseEvent.offsetY;//stage.mouseY;
		// }
	};


	//
	// sets
	//
	/**
	 * @param {Array} item
	 * 		Array of Path.Items to add to circle packer
	 */
	/**
	 * @param {Item} item
	 * 		Path.Item to add to circle packer
	 */
	var add = function(item) {
		if( typeof item === 'array' ) {
			circleItems = circleItems.concat( item );
		}
		else {
			circleItems.push( item );
		}
	};

	/**
	 * @param {Number} val
	 * 		damping value
	 */
	var setDamping = function(val) {
		dampingAmt = val;
	};

	/**
	 * @param {Number} val
	 * 		padding around elements
	 */
	var setPadding = function(val) {
		padding = val;
	};


	/**
	 * @param {Point} point
	 * 		the target location for the elements to pack around (default: view.center)
	 */
	var setTarget = function(point) {
		target = point;
	};

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
	 * 		index number of Item being packed
	 *
	 * @return {Item} Item from items being packed
	 */
	var getItem = function(index) {
		return circleItems[index];
	};



	//
	// gets
	//
	return {
		update:		update,

		add:		add,
		setDamping:	setDamping,
		setPadding:	setPadding,
		setTarget:  setTarget,

		getItems:	getItems,
		getItem:	getItem
	};

};


/*
 * FFlock
 *
 */



/*
 * Travelling Salesman Problem Algorithm
 *
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
 * 	   	an array of PathItems
 * @param  {Number} iterations (optional)
 * 	   	tests per frame (higher = better) default: 1000
 *
 * @return {Array}
 *
 */
folio.FRoute = function(items, iterations) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	var items = items;
	var iterations = (iterations != undefined)
		? iterations
		: 1000;

	var RouteStep = 0;
	var RouteNodes = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	function calculate() {
		var temp;
		var p1;

		if(RouteStep == 0) {
			//	Begin process of optimizing plotting route,
			//	by flagging nodes that will be shown.
			//	console.log("Optimizing plotting path");
			var RouteNodesLength = 0;
			var RouteNodesTemp = [items.length];

			for(var i=0; i<items.length; ++i) {

				RouteNodesTemp[i] = false;
				var px = items[i].position.x;
				var py = items[i].position.y;

				if( (px >= view.bounds.width) || (py >= view.bounds.height) ||
					(px < 0) || (py < 0)) {
					continue;
				}
				else {
					RouteNodesTemp[i] = true;
					RouteNodesLength++;
				}
			}

			// These are the ONLY points to be drawn in the tour.
			RouteNodes = [RouteNodesLength];
			var tempCounter = 0;
			for(var i=0; i<items.length; ++i) {
				if(RouteNodesTemp[i]) {
					RouteNodes[tempCounter] = i;
					tempCounter++;
				}
			}
		}

		var nodesNum = RouteNodes.length - 1;
		if(RouteStep < (RouteNodes.length - 2))  {
			//	console.log('Nearest neighbor ("Simple, Greedy") algorithm path optimization:');
			//	1000 steps per frame displayed; you can edit this number!
			var StopPoint = RouteStep + 1000;

			if(StopPoint > nodesNum)
				StopPoint = nodesNum;

			for(var i=RouteStep; i<StopPoint; ++i) {
				p1 = items[RouteNodes[RouteStep]].position;
				var ClosestNode = 0;
				var distMin = Number.MAX_VALUE;

				for(var j=RouteStep+1; j<nodesNum; ++j) {
					var p2 = items[ RouteNodes[j] ].position;

					var dx = p1.x - p2.x;
					var dy = p1.y - p2.y;
					var distance = (dx*dx+dy*dy);	// Only looking for closest; do not need sqrt factor!

					if(distance < distMin) {
						ClosestNode = j;
						distMin = distance;
					}
				}

				temp = RouteNodes[RouteStep + 1];
				//p1 = items[RouteNodes[RouteStep + 1]];
				RouteNodes[RouteStep + 1] = RouteNodes[ClosestNode];
				RouteNodes[ClosestNode] = temp;

				if(RouteStep < (nodesNum)) {
					RouteStep++;
				}
				else {
					console.log('Now optimizing plot path');
				}
			}

		}
		//else {
			// Initial routing is complete
			// console.log('2-opt heuristic optimization');
			// Identify a pair of edges that would become shorter by reversing part of the tour.

			// var groupPath = new Group();
			for(var i=0; i<iterations; ++i) {

				var indexA = Math.floor( Math.random()*nodesNum );
				var indexB = Math.floor( Math.random()*nodesNum );

				// console.log('indexA', indexA);
				// console.log('indexB', indexB);

				if(Math.abs(indexA - indexB) < 2)
					continue;

				if(indexB < indexA) {
					// swap A, B.
					temp = indexB;
					indexB = indexA;
					indexA = temp;
				}

				var a0 = items[ RouteNodes[indexA] ].position;
				var a1 = items[ RouteNodes[indexA + 1] ].position;
				var b0 = items[ RouteNodes[indexB] ].position;
				var b1 = items[ RouteNodes[indexB + 1] ].position;

				// Original distance:
				var dx = a0.x - a1.x;
				var dy = a0.y - a1.y;
				var distance = (dx*dx+dy*dy);	// Only a comparison; do not need sqrt factor!
				dx = b0.x - b1.x;
				dy = b0.y - b1.y;
				distance += (dx*dx+dy*dy);	//	Only a comparison; do not need sqrt factor!

				// Possible shorter distance?
				dx = a0.x - b0.x;
				dy = a0.y - b0.y;
				var distance2 = (dx*dx+dy*dy);	//	Only a comparison; do not need sqrt factor!
				dx = a1.x - b1.x;
				dy = a1.y - b1.y;
				distance2 += (dx*dx+dy*dy);	// Only a comparison; do not need sqrt factor!

				if(distance2 < distance) {
					// Reverse tour between a1 and b0.

					var indexhigh = indexB;
					var indexlow = indexA + 1;

					while (indexhigh > indexlow) {
						temp = RouteNodes[indexlow];
						RouteNodes[indexlow] = RouteNodes[indexhigh];
						RouteNodes[indexhigh] = temp;

						indexhigh--;
						indexlow++;
					}
				}

			}
		// }
		//
	};



	// ------------------------------------------------------------------------
	// Instantiate
	// ------------------------------------------------------------------------
	calculate();



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	return {
		route: RouteNodes
	};


};



/*
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
// constants
// ------------------------------------------------------------------------
var EPSILON = 1.0e-6;



/**
 * FTriangulate
 *
 * @param {Array} points
 * 		input vertices (Points)
 *
 * @return {Array}
 *
 * @example
 * var triangulate = new FTriangulate( points );
 *
 * // draw faces
 * for( var i=0; i<triangulate.length; i++ ) {
 * 	var triangle = triangulate[i];
 *
 * 	// draw triangle
 * 	face = new Path();
 * 	face.add( triangle.p1 );
 * 	face.add( triangle.p2 );
 * 	face.add( triangle.p3 );
 * 	face.closed = true;
 * 	face.strokeColor = 'white';
 *
 * }
 */
folio.FTriangulate = function( points ) {
	// -----------------------------------------------------------------------------
	// Properties
	// -----------------------------------------------------------------------------
	var _triangles;
	var _points = points;
	var _pointsNew = [];



	// -----------------------------------------------------------------------------
	// Classes
	// -----------------------------------------------------------------------------
	/**
	 * Triangle
	 *
	 * @param {Point} p1
	 *			first Point of Triangle
	 * @param {Point} p2
	 *			second Point of Triangle
	 * @param {Point} p3
	 *			third Point of Triangle
	 */
	// TODO: remove this and rely on Path.Triangle
	var Triangle = function( p1, p2, p3 ) {
		// -----------------------------------------------------------------------------
		// Properties
		// -----------------------------------------------------------------------------
		var _p1 = p1;
		var _p2 = p2;
		var _p3 = p3;



		// -----------------------------------------------------------------------------
		// Methods
		// -----------------------------------------------------------------------------
		/**
		 * vertex (Edge) sharing
		 *
		 * @param {Triangle} other
		 *			the triangle to check for vertex (Edge) sharing
		 *
		 * @return {Triangle} the triangle that shares the given vertex (Edge)
		 */
		function sharesVertex(other) {
			return p1 == other.p1 || p1 == other.p2 || p1 == other.p3 ||
			p2 == other.p1 || p2 == other.p2 || p2 == other.p3 ||
			p3 == other.p1 || p3 == other.p2 || p3 == other.p3;
		};

		/**
		 * @return {Point} circle
		 * 		Point of the circle center
		 */
		function circumcenter() {
			var circle = new Point();
			var m1, m2;
			var mx1, mx2;
			var my1, my2;

			if ( Math.abs(_p2.y-_p1.y) < EPSILON ) {
				m2 = - (_p3.x-_p2.x) / (_p3.y-_p2.y);
				mx2 = (_p2.x + _p3.x) / 2.0;
				my2 = (_p2.y + _p3.y) / 2.0;
				circle.x = (_p2.x + _p1.x) / 2.0;
				circle.y = m2 * (circle.x - mx2) + my2;

			}
			else if ( Math.abs(_p3.y-_p2.y) < EPSILON ) {
				m1 = - (_p2.x-_p1.x) / (_p2.y-_p1.y);
				mx1 = (_p1.x + _p2.x) / 2.0;
				my1 = (_p1.y + _p2.y) / 2.0;
				circle.x = (_p3.x + _p2.x) / 2.0;
				circle.y = m1 * (circle.x - mx1) + my1;

			}
			else {
				m1 = - (_p2.x-_p1.x) / (_p2.y-_p1.y);
				m2 = - (_p3.x-_p2.x) / (_p3.y-_p2.y);
				mx1 = (_p1.x + _p2.x) / 2.0;
				mx2 = (_p2.x + _p3.x) / 2.0;
				my1 = (_p1.y + _p2.y) / 2.0;
				my2 = (_p2.y + _p3.y) / 2.0;
				circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
				circle.y = m1 * (circle.x - mx1) + my1;
			}

			return circle;
		};

		// -----------------------------------------------------------------------------
		/**
		 * @return {Point} the centroid center
		 *
		 * http://www.mathwords.com/c/centroid_formula.htm
		 */
		function centroid() {
			return new Point(
				(_p1.x + _p2.x + _p3.x)/3,
				(_p1.y + _p2.y + _p3.y)/3
			);
		};

		// -----------------------------------------------------------------------------
		/**
		 * @return {Array} a sorted array (Edge) of the Triangle's Edges (shortest to longest)
		 */
		function distances() {
			var distances = [];
			distances[0] = new Edge(_p1, _p2);
			distances[1] = new Edge(_p1, _p3);
			distances[2] = new Edge(_p3, _p2);

			distances.sort();
			return distances;
		};

		// -----------------------------------------------------------------------------
		/**
		 * http://www.btinternet.com/~se16/hgb/triangle.htm
		 *
		 * @return {Number} triangle width
		 */
		function width() {
			var x1 = 0;
			if(_p1.x < _p2.x && _p1.x < _p3.x) x1 = _p1.x;
			else if( _p2.x < _p1.x && _p2.x < _p3.x ) x1 = _p2.x;
			else if( _p3.x < _p1.x && _p3.x < _p2.x) x1 = _p3.x;

			var x2 = 0;
			if(_p1.x > _p2.x && _p1.x > _p3.x) x2 = _p1.x;
			else if( _p2.x > _p1.x && _p2.x > _p3.x ) x2 = _p2.x;
			else if( _p3.x > _p1.x && _p3.x > _p2.x) x2 = _p3.x;

			var f = Math.abs(x2 - x1);
			return f;
		};

		/**
		 * http://www.btinternet.com/~se16/hgb/triangle.htm
		 *
		 * @return {Number} triangle height
		 */
		function height() {
			var y1 = 0;
			if(_p1.y < _p2.y && _p1.y < _p3.y) y1 = _p1.y;
			else if( _p2.y < _p1.y && _p2.y < _p3.y ) y1 = _p2.y;
			else if( _p3.y < _p1.y && _p3.y < _p2.y) y1 = _p3.y;

			var y2 = 0;
			if(_p1.y > _p2.y && _p1.y > _p3.y) y2 = _p1.y;
			else if( _p2.y > _p1.y && _p2.y > _p3.y ) y2 = _p2.y;
			else if( _p3.y > _p1.y && _p3.y > _p2.y) y2 = _p3.y;

			var g = Math.abs(y2 - y1);
			return g;
		};

		// -----------------------------------------------------------------------------
		function area() {
			var area = 0;
			area += (_p1.x + _p3.x) * (_p3.y - _p1.y);
			area += (_p2.x + _p1.x) * (_p1.y - _p2.y);
			area += (_p3.x + _p2.x) * (_p2.y - _p3.y);
			return area/2;
		};



		// -----------------------------------------------------------------------------
		// Gets
		// -----------------------------------------------------------------------------
		/**
		 * @return {Array} the points of the triangle as a Point array
		 */
		function get() {
			var points = [_p1, _p2, _p3];
			return points;
		};

		// -----------------------------------------------------------------------------
		return {
			p1: _p1,
			p2: _p2,
			p3: _p3,

			sharesVertex: sharesVertex,
			getCentroid: centroid,

			getArea: area,
			getWidth: width,
			getHeight: height,

			getPoints: get
		};

	};

	/**
	 * Edge
	 * TODO: replace with paper.Segment
	 *
	 * @param {Point} p1
	 *			first Point of Edge
	 * @param {Point} p2
	 *			second Point of Edge
	 */
	var Edge = function( p1, p2 ) {
		// -----------------------------------------------------------------------------
		// Properties
		// -----------------------------------------------------------------------------
		var _p1 = p1;
		var _p2 = p2;
		var _dist = _p1.getDistance(_p2);



		// -----------------------------------------------------------------------------
		// Methods
		// -----------------------------------------------------------------------------
		/**
		 * sorts edge by shortest to longest
		 *
		 * @param {Edge} other
		 *			Edge to compare against
		 *
		 * @return {Number}
		 */
		function compareTo(other) {
			return _dist < other.dist ? -1 : _dist > other.dist ? 1 : 0;
		};



		// -----------------------------------------------------------------------------
		// Gets
		// -----------------------------------------------------------------------------
		/**
		 *
		 * @return {Array} the points of the edge as a Point array
		 *
		 */
		function get() {
			var points = [_p1, _p2];
			return points;
		};


		// -----------------------------------------------------------------------------
		return {
			p1: _p1,
			p2: _p2,
			dist: _dist,

			getPoints: get
		};

	};



	// -----------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------
	/**
	 * Triangulation subroutine
	 *
	 * Returned is a list of triangular faces in the Array triangles
	 * These triangles are arranged in a consistent clockwise order.
	 *
	 * @return {Array} triangles
	 * 		return Array of Triangles in clockwise order
	 *
	 */
	function init() {
		_triangles = [];

		if( _points.length != null ) {
			// remove duplicate points
			_points = uniquePoints( _points );

			// sort vertex array in increasing x values
			_points.sort( sortLeftToRight );
			// _points.sort( sortTopToBottom );


			// Find the maximum and minimum vertex bounds.
			// This is to allow calculation of the bounding triangle
			var xmin = (_points[0]).x;
			var ymin = (_points[0]).y;
			var xmax = xmin;
			var ymax = ymin;

			// z is used for storing misc. info i.e. normalized brightness data
			var z = (_points[0]).z;

			for( var i=0; i<_points.length; i++ ) {
				var p = _points[i];
				if(p.x < xmin) xmin = p.x;
				if(p.x > xmax) xmax = p.x;
				if(p.y < ymin) ymin = p.y;
				if(p.y > ymax) ymax = p.y;
			}

			var dx = xmax - xmin;
			var dy = ymax - ymin;
			var dmax = (dx > dy) ? dx : dy;
			var xmid = (xmax + xmin) / 2.0;
			var ymid = (ymax + ymin) / 2.0;

			_triangles = [];
			var complete = new HashSet(); // for complete Triangles


			// Set up the super triangle
			// This is a triangle which encompasses all the sample points.
			// The super triangle coordinates are added to the end of the
			// vertex list. The super triangle is the first triangle in
			// the triangle list.
			var superTriangle = new Triangle(
				new Point( xmid - 2.0 * dmax, ymid - dmax ),
				new Point( xmid, ymid + 2.0 * dmax ),
				new Point( xmid + 2.0 * dmax, ymid - dmax )
			);
			_triangles.push( superTriangle );


			// Include each point one at a time into the existing mesh
			var edges = [];
			for ( var i=0; i<_points.length; i++ ) {
				var p = _points[i];
				edges = [];


				// Set up the edge buffer.
				// If the point (xp,yp) lies inside the circumcircle then the
				// three edges of that triangle are added to the edge buffer
				// and that triangle is removed.
				var circle = new Point();

				for (var j=_triangles.length-1; j>=0; j--) {
					var t = _triangles[j];
					if(complete.contains(t)) {
						continue;
					}

					var inside = circumCircle( p, t, circle );

					if(circle.x + circle.z < p.x) {
						complete.add(t);
					}
					if(inside) {
						edges.push( new Edge(t.p1, t.p2) );
						edges.push( new Edge(t.p2, t.p3) );
						edges.push( new Edge(t.p3, t.p1) );
						_triangles.splice(j, 1);
					}
				}

				// remove duplicate edges
				edges = uniqueEdges( edges );

				// Tag multiple edges
				// Note: if all triangles are specified anticlockwise then all
				// interior edges are opposite pointing in direction.
				for (var j=0; j<edges.length-1; j++) {
					var e1 = edges[j];
					for (var k=j+1; k<edges.length; k++) {
						var e2 = edges[k];
						if(e1.p1 == e2.p2 && e1.p2 == e2.p1) {
							e1.p1 = null;
							e1.p2 = null;
							e2.p1 = null;
							e2.p2 = null;
						}
						// Shouldn't need the following, see note above
						if(e1.p1 == e2.p1 && e1.p2 == e2.p2) {
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
				for (var j=0; j<edges.length; j++) {
					var e = edges[j];
					if(e.p1 == null || e.p2 == null) {
						continue;
					}
					// determine if point in triangle is new
					// if it is mark it as so
					for( var k=0; k<_pointsNew.length; k++ ) {
						if( e.p1 == _pointsNew[k] ) e.p1.name = '__new';
						else e.p1.name = null;

						if( e.p2 == _pointsNew[k] ) e.p2.name = '__new';
						else e.p2.name = null;

						if( p == _pointsNew[k] ) p.name = '__new';
						else p.name = null;
					}
					_triangles.push( new Triangle(e.p1, e.p2, p) );
				}

			}

			// Remove triangles with super triangle vertices
			for (var i=_triangles.length-1; i>=0; i--) {
				var t = _triangles[i];
				if(t.sharesVertex(superTriangle)) {
					_triangles.splice(i, 1);
				}
			}

		}

		// return _triangles;
	};

	// -----------------------------------------------------------------------------
	/**
	 * Return TRUE if a point (xp,yp) is inside the circumcircle made up
	 * of the points (x1,y1), (x2,y2), (x3,y3)
	 * The circumcircle center is returned in (xc,yc) and the radius r
	 * NOTE: A point on the edge is inside the circumcircle
	 *
	 * @param {Point} p
	 *			Point to check
	 * @param {Triangle} t
	 *			Triangle to check
	 * @param {Item} circle
	 *			circle to check
	 *
	 */
	function circumCircle( p, t, circle ) {
		var m1, m2;
		var mx1, mx2;
		var my1, my2;
		var dx, dy;

		var rsqr;
		var drsqr;

		// Check for coincident points
		if( Math.abs(t.p1.y-t.p2.y) < EPSILON && Math.abs(t.p2.y-t.p3.y) < EPSILON ) {
			//System.err.println("CircumCircle: Points are coincident.");
			return false;
		}

		if( Math.abs(t.p2.y-t.p1.y) < EPSILON ) {
			m2 = - (t.p3.x-t.p2.x) / (t.p3.y-t.p2.y);
			mx2 = (t.p2.x + t.p3.x) / 2.0;
			my2 = (t.p2.y + t.p3.y) / 2.0;
			circle.x = (t.p2.x + t.p1.x) / 2.0;
			circle.y = m2 * (circle.x - mx2) + my2;
		}
		else if( Math.abs(t.p3.y-t.p2.y) < EPSILON ) {
			m1 = - (t.p2.x-t.p1.x) / (t.p2.y-t.p1.y);
			mx1 = (t.p1.x + t.p2.x) / 2.0;
			my1 = (t.p1.y + t.p2.y) / 2.0;
			circle.x = (t.p3.x + t.p2.x) / 2.0;
			circle.y = m1 * (circle.x - mx1) + my1;
		}
		else {
			m1 = - (t.p2.x-t.p1.x) / (t.p2.y-t.p1.y);
			m2 = - (t.p3.x-t.p2.x) / (t.p3.y-t.p2.y);
			mx1 = (t.p1.x + t.p2.x) / 2.0;
			mx2 = (t.p2.x + t.p3.x) / 2.0;
			my1 = (t.p1.y + t.p2.y) / 2.0;
			my2 = (t.p2.y + t.p3.y) / 2.0;
			circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
			circle.y = m1 * (circle.x - mx1) + my1;
		}

		dx = t.p2.x - circle.x;
		dy = t.p2.y - circle.y;
		rsqr = dx*dx + dy*dy;
		circle.z = Math.sqrt(rsqr);

		dx = p.x - circle.x;
		dy = p.y - circle.y;
		drsqr = dx*dx + dy*dy;

		return drsqr <= rsqr;
	};

	// -----------------------------------------------------------------------------
	/**
	 * findClosest Triangle
	 *
	 * Returns the closest Triangle based on the input Triangle
	 *
	 * @param {Triangle} other
	 * 		the input Triangle to find it's closest neighbor
	 *
	 * @return {Triangle} closest Triangle
	 */
	function findClosest(other) {
		var result;

		for(var i=0; i<_triangles.length; i++) {
			var iFind = _triangles[i];
			var d1 = other.getCentroid.getDistance( iFind.getCentroid );

			for(var j=0; j<_triangles.length; j++) {
				// var jFind = _triangles[i];
				var jFind = _triangles[j];
				var d2 = other.getCentroid.getDistance( jFind.getCentroid );

				if( d2 < d1 ) {
					result = jFind;
					break;
				}

			}
		}

		return result;
	};

	// -----------------------------------------------------------------------------
	/**
	 *
	 * sort Point rray from left to right
	 *
	 * @param {Point} a
	 * @param {Point} b
	 *
	 */
	function sortLeftToRight(a,b) {
		if (a.x < b.x) return 1;
		else if (a.x > b.x) return -1;
		else return 0;
	};

	/**
	 *
	 * sort Point array from top to bottom
	 *
	 * @param {Point} a
	 * @param {Point} b
	 *
	 */
	function sortTopToBottom(a,b) {
		if (a.y < b.y) return 1;
		else if (a.y > b.y) return -1;
		else return 0;
	};

	/**
	 *
	 * remove Point duplicates
	 *
	 * @param {Array} arr
	 * 		array to remove duplicate points from
	 *
	 * @return {Array} the cleaned up array
	 *
	 */
	function uniquePoints(arr){
		arr.sort();
		for( var i=1; i<arr.length; ){
			if( arr[i-1].x == arr[i].x && arr[i-1].y == arr[i].y ) arr.splice(i, 1);
			else i++;
		}
		return arr;
	};

	/**
	 *
	 * remove Edge duplicates
	 *
	 * @param {Array} arr
	 * 		array to remove duplicate edges from
	 *
	 * @return {Array} the cleaned up array
	 *
	 */
	function uniqueEdges(arr) {
		arr.sort();
		for( var i=1; i<arr.length; ){
			if( arr[i-1].p1 == arr[i].p1 && arr[i-1].p2 == arr[i].p2 ||
				arr[i-1].p1 == arr[i].p2 && arr[i-1].p2 == arr[i].p2 ) arr.splice(i, 1);
			else i++;
		}
		return arr;

		// TODO: This is O(n^2), make it O(n) with a hash or some such
		// var uniqueEdges = [];
		// for( var i=0; i<edges.length; i++ ) {
		//	var edge1 = edges[i];
		//	var unique = true;

		//	for( var j=0; j<edges.length; j++ ) {
		//		if( i != j ) {
		//			var edge2 = edges[j];
		//			if( ( edge1.p1 == edge2.p1 && edge1.p2 == edge2.p2 ) ||
		//				( edge1.p1 == edge2.p2 && edge1.p2 == edge2.p1 ) ) {
		//				unique = false;
		//				break;
		//			}
		//		}
		//	}

		//	if( unique ) {
		//		uniqueEdges.push( edge1 );
		//	}
		// }

		// return uniqueEdges;
	};



	// -----------------------------------------------------------------------------
	// sets
	// -----------------------------------------------------------------------------
	/**
	 * add point(s) to Triangulation
	 *
	 * @param {Point} point
	 * 		a single Point or array of Points
	 *
	 */
	function addPoint(point) {
		_pointsNew = [];

		if( point instanceof Array ) {
			_pointsNew = point;
			// add points to points array
			_points = _points.concat( point );
		}
		else {
			_pointsNew[0] = point;
			// add point to points array
			_points.push( point );
		}

		// check for duplicate points
		_points = uniquePoints( _points );

		// console.log( _pointsNew );
		// create (new) triangulation
		init();
	};



	// -----------------------------------------------------------------------------
	// Gets
	// -----------------------------------------------------------------------------
	/**
	 * @param {Number} index
	 * 		index of Triangle to return (optional)
	 *
	 * @return {Array} the Triangles as array
	 */
	function getTriangles(index) {
		if( index != null ) {
			return _triangles[index];
		}
		else {
			return _triangles;
		}
	};

	/**
	 * @param {Number} index
	 * 		index of Point to return (optional)
	 *
	 * @return {Array} the points as a Point array
	 */
	function getPoints(index) {
		if( index != null ) {
			return _points[index];
		}
		else {
			return _points;
		}
	};



	// -----------------------------------------------------------------------------
	// Invocation
	// -----------------------------------------------------------------------------
	init();




	// -----------------------------------------------------------------------------
	return {
		// sets
		add: addPoint,

		// gets
		getTriangles: getTriangles,
		getPoints: getPoints,
		getClosest: findClosest
	};


};



/*Ô
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
	// Properties
	// -----------------------------------------------------------------------------
	var _arr = [];



	// -----------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------
	function _add(e) {
		var arr = _arr;
		var i = arr.indexOf(e);
		if (i == -1) arr.push(e);
	};

	function _get(i) {
		return _arr[i];
	};

	function _size(i) {
		return _arr.length;
	};

	function _remove(e) {
		var arr =_arr;
		var i = arr.indexOf(e);
		if (i != -1) arr.splice(i, 1);
	};

	function _contains(o) {
		var b = false;
		for(var i=0; i<_arr.length; i++) {
			if(_arr[i] === o) b = true; // break;
		}
		return b;
	};



	// -----------------------------------------------------------------------------
	// Gets
	// -----------------------------------------------------------------------------
	function _toString() {
		return _arr.join(',');
	};



	// -----------------------------------------------------------------------------
	return {
		add: _add,
		get: _get,
		size: _size,
		remove: _remove,
		contains: _contains,
		toString: _toString
	};

};


