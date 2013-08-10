/**
 *	
 *	frederickkScript.js
 *	v0.1a
 *	https://github.com/frederickk/frederickkPaper
 *
 *	20. March 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *	
 *	
 *	A collection of methods/functions that i find useful
 *	specifically for application within Scriptogapher which have
 *	been lifted from my library for PaperJs (http://paperjs.org/) 
 *	most of which are based on my Frederickk library for Processing
 *	(http://github.com/frederickk/frederickk)
 *
 *	Not all of the code in here was created by me
 *	but credit and links are given where credit is due
 *
 *	Additional information and demos can be found here
 *	http://kenfrederick.blogspot.de/2012/12/frederickkpaper.html
 *
 *
 *	This library is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU Lesser General Public
 *	License as published by the Free Software Foundation; either
 *	version 2.1 of the License, or (at your option) any later version.
 *	
 *	http://creativecommons.org/licenses/LGPL/2.1/
 *	
 *	This library is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *	Lesser General Public License for more details.
 *	
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *	
 */



// ------------------------------------------------------------------------
// (function() {
// 	console.log('\nfrederickkScript.js');
// 	console.log('v.0.1a');
// 	console.log('https://github.com/frederickk/frederickkPaper');
// 	console.log('ken.frederick@gmx.de');
// 	console.log('------------------------------------');
// })();



// ------------------------------------------------------------------------
// Global Properties
// ------------------------------------------------------------------------
/*
 *	the Path.Rectangle of the artboard
 */
var artboard = activeDocument.activeArtboard;

/*
 *	mimic PaperJs	
 */
var view = artboard;

/*
 *	holder for Raster
 */
var raster;




/**
 *  
 *	Core Methods
 *	A collection mathematical operations, similar
 *	to those found in Processing
 *
 */
frederickkScript = {
	// ------------------------------------------------------------------------
 	// Namespaces
	// ------------------------------------------------------------------------
 	FTime: {},
 	FIO: {},
 	F3D: {},



	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------




	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param {Number} minr
	 *				minmum range
	 *	@param {Number} maxr
	 *				maximum range
	 *
	 *	@return random number as float
	 *
	 */
	random: function(minr, maxr) {
		if(maxr === undefined) {
			maxr = minr;
			minr = 0;
		}
		return (minr + Math.random() * (maxr - minr));
	},

	/**
	 *	@param {Number} minr
	 *				minmum range
	 *	@param {Number} maxr
	 *				maximum range
	 *
	 *	@return random number as integer
	 *
	 */
	randomInt: function(minr, maxr) {
		return parseInt( frederickkScript.random(minr,maxr) );
	},

	/**
	 *
	 *	http://www.siafoo.net/snippet/191
	 *
	 *	@param {Number} minr
	 *				minmum range
	 *	@param {Number} maxr
	 *				maximum range
	 *	@param {Number} bias
	 *				bias represents the preference towards lower or higher numbers,
	 *				as a number between 0.0 and 1.0. For example: 
	 *				frederickkScript.random(0, 10, bias=0.9) will return 9 much more often than 1.
	 *
	 *	@return a random, albeit biased, number
	 *
	 */
	randomBias: function(minr, maxr, bias) {
		var _map = new Array(90.0, 9.00, 4.00, 2.33, 1.50, 1.00, 0.66, 0.43, 0.25, 0.11, 0.01);
		bias = Math.max(0, Math.min(bias, 1)) * 10;

		var i = parseInt(Math.floor(bias))
		var n = _map[i]
		if(bias < 10) n += (_map[i+1]-n) * (bias-i);

		return Math.pow( Math.random(),n ) * (maxr-minr) + minr;
	},



	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} val
	 *				the value to constrain
	 *	@param {Number} min
	 *				minimum limit
	 *	@param {Number} max
	 *				maximum limit
	 *
	 *	@return original value that is not less than the minimum and no greater than the maximum
	 *
	 */
	clamp: function(val, min, max) {
		return val < min ? min:val > max ? min:val;
	},

	/**
	 *
	 *	@param {Number} val
	 *				the incoming value to be converted
	 *	@param {Number} start
	 *				lower bound of the value's current range
	 *	@param {Number} stop
	 *				upper bound of the value's current range
	 *
	 *	@return float value between 0.0 and 1.0
	 *
	 */
	norm: function(val, start, stop) {
		return (val - start) / (stop - start);
	},

	/**
	 *
	 *	@param {Number} val
	 *				the incoming value to be converted
	 *	@param {Number} istart
	 *				lower bound of the value's current range
	 *	@param {Number} istop
	 *				upper bound of the value's current range
	 *	@param {Number} ostart
	 *				lower bound of the value's target range
	 *	@param {Number} ostop
	 *				upper bound of the value's target range
	 *
	 *	@return re-mapped value
	 *
	 */
	map: function(val, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((val - istart) / (istop - istart));
	},



	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {Number} val
	 *			number
	 *	@param {Number} deci
	 *			number of decimal places
	 *
	 *	@return float value with desired decimal places
	 *
	 */
	roundDecimal: function(val, deci) {
		var multi = Math.pow(10,deci);
		return Math.round(val * multi)/multi;
	},

	/**
	 *
	 *	snap from:
	 *	http://stackoverflow.com/questions/4507784/snap-to-grid-functionality-using-javascript
	 *
	 *	@param {Number} val
	 *			value to snap
	 *	@param {Number} snapInc
	 *			increment to snap value to
	 *	@param {Function} roundFunction
	 *			(optiona) rounding function
	 *
	 *	@return snapped value
	 *
	 */
	snap: function(val, snapInc, roundFunction) {
		if (roundFunction === undefined) roundFunction = Math.round;
		return snapInc * roundFunction(val / snapInc);
	},

	/**
	 *
	 *	@param {Number} start
	 *			fitst value
	 *	@param {Number} stop
	 *			second value
	 *	@param {Number} amt
	 *			float: between 0.0 and 1.0
	 *
	 *	@return value between start and stop
	 *
	 */
	lerp: function(start, stop, amt) {
		// return start + (stop-start) * amt;
		return stop + (start-stop) * amt;
	},

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {Number} val
	 *			input value
	 *
	 *	@return val as degree 
	 *
	 */
	degrees: function(val) {
		return val * (180/Math.PI);
	},

	/**
	 *	
	 *	@param {Number} val
	 *			input value
	 *
	 *	@return val as radians
	 *
	 */
	radians: function(val) {
		return val * (Math.PI/180);
	},

	/**
	 *
	 *	@param {Point} point1
	 *			first point
	 *	@param {Point} point2
	 *			second point
	 *
	 *	@return vector angle in degrees
	 *
	 */
	getAngle: function(point1, point2) {
		return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
	},

	/**
	 *
	 *	@param {Size} slope
	 *			slope is expressed as rise (x) over run (y)
	 *
	 *	@return angle in degrees
	 *
	 */
	getSlopeAngle: function(slope) {
		return Math.atan( slope.width/slope.height ) * 180 / Math.PI;
	},

	// ------------------------------------------------------------------------
	/**
	 *	get common outer tangents of two circles (only works with circles!)
	 *
	 *	@param {Path.Circle} arg0
	 *				the first Circle
	 *	@param {Path.Circle} arg1
	 *				the second Circle
	 *
	 *	@return array of points
	 *
	 */
	getCommonTangents: function(arg0, arg1) {
		var dx = arg1.position.x - arg0.position.x;
		var dy = arg1.position.y - arg0.position.y;

		var r1 = Math.sqrt( arg0.bounds.size.area() );
		var r2 = Math.sqrt( arg1.bounds.size.area() );

		r1 /= 2;
		r2 /= 2;

		var dist = arg0.position.getDistance( arg1.position );

		if (dist <= Math.abs(r2 - r1)) {
			//	The circles are coinciding
			//	There are no valid tangents.
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

		return [pt1, pt2, pt3, pt4]
	},

	/**
	 *	get common outer tangents of two curves
	 *
	 *	@param arg0
	 *				the first Curve
	 *	@param arg1
	 *				the second Curve
	 *
	 *	@return array of points
	 *
	 */
	 // TODO:
	// getCommonTangents: function(arg0, arg1) {

	// },


	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {NumbeR} val
	 *			input value
	 *
	 *	@return squared value of val
	 *
	 */
	sq: function(val) {
		return val*val;
	},

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {Number} val
	 *			input boolean value
	 *
	 *	@return val as integer
	 *
	 */
	boolToInt: function(val) {
		return (val) ? 1 : 0;
	},

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {Object} object
	 *			object whose type to determine
	 *
	 *	@return string of Scriptographer object type
	 *
	 */
	getType: function(object) {
		if (object instanceof Point) return 'Point';
		else if (object instanceof Size) return 'Size';
		else if (object instanceof Rectangle) return 'Rectangle';
		else if (object instanceof Group) return 'Group';
		// else if (object instanceof PlacedItem) return 'PlacedItem';
		else if (object instanceof Raster) return 'Raster';
		// else if (object instanceof PlacedSymbol) return 'PlacedSymbol';
		else if (object instanceof Path) return 'Path';
		else if (object instanceof CompoundPath) return 'CompoundPath';
		else if (object instanceof Symbol) return 'Symbol';
		else if (object instanceof TextItem) return 'TextItem';
		else return 'undefined'
	},

	/**
	 *	
	 *	@param {Array} items
	 *			Array of items to go through
	 *	@param {String} name
	 *			name of Item to find
	 *
	 *	@return a path with the name that matches
	 *
	 */
	findByName: function(items, name) {
		var path;
		for(var i=0; i<items.length; i++) {
			var item = items[i];		
			if(item.name == name) path = item; // break;
		}
		return path;
	},




	// ------------------------------------------------------------------------
	// Strings
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {TextItem} textObj
	 *				Path.TextItem
	 *
	 *	@return string content which will will fit within the bounds of the input TextItem
	 *
	 */
	trimToFit: function(textObj) {
		var visibleContent = textObj.visibleRange.content;
		textObj.content = trim(visibleContent);
		return textObj;
	},

	/**
	 *	
	 *	trims white space from right (end) of String
	 *
	 *	@param {String} str
	 *			input String
	 *
	 *	@return trimmed input String
	 *
	 */
	rtrim: function(str) {
		for (var i=str.length-1; str.charAt(i) ==' '; i--) {
			str = str.substring(0, i);
		}
		return str;
	},

	/**
	 *	
	 *	trims all white space from String
	 *	
	 *	@param {String} str
	 *			input string
	 *
	 *	@return string of PaperJs object type
	 *
	 */
	trim: function(str) {
		str = str.replace(/(^\s*)|(\s*$)/gi,"");
		str = str.replace(/[ ]{2,}/gi," ");
		str = str.replace(/\n /,"\n");
		return str;
	},

	/**
	 *	
	 *	converts String to Boolean value
	 *	
	 *	@param {String} str
	 *			input string
	 *
	 *	@return Boolean value
	 *
	 */
	strToBool: function(str){
		switch(str.toLowerCase()){
			case "true": case "yes": case "1": return true;
			case "false": case "no": case "0": case null: return false;
			default: return Boolean(str);
		}
	},






	// ------------------------------------------------------------------------
	// Arrays
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {Array} arr1
	 *				Array of Numbers
	 *
	 *	@return {Number} median value
	 *
	 */
	median: function(arr) {
		var median = 0;
		arr.sort();
		if (arr.length % 2 === 0) {
			median = (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
		}
		else {
			median = arr[(arr.length - 1) / 2];
		}
		return median;
	},

	/**
	 *	
	 *	@param {Array} arr
	 *				Array of Objects
	 *
	 *	@return {Object} unique element
	 *
	 */
	unique: function(arr) {
		var u = [];
		o:for(var i=0, n=arr.length; i<n; i++) {
			for(var x=0, y=u.length; x<y; x++) {
				if(u[x] == arr[i]) {
					continue o;
				}
			}
			u[u.length] = arr[i];
		}
		return u;
	},

	/**
	 *	
	 *	merges (then shuffles) two Arrays
	 *	
	 *	@param {Array} arr1
	 *				Array object 1
	 *	@param {Array} arr2
	 *				Array object 2
	 *
	 *	@return new merged Array object
	 *
	 */
	merge: function(arr1, arr2) {
		var output = arr1.concat(arr2);
		output.shuffle();
		return output;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	sory Array in alphabetical order
	 *
	 *	http://www.brain4.de/programmierecke/js/arraySort.php
	 *
	 */
	alphabetical: function(a, b) {
		/*
		var A = a.toLowerCase();
		var B = b.toLowerCase();

		if (A < B) return -1;
		else if (A > B) return  1;
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

		return(a == b) ? 0:(a>b) ? 1:-1;
	},

	/**
	 *	
	 *	sort array by distance of object from center of canvas
	 *
	 */
	distanceToCenter: function(a, b) {
		var valueA = a.distanceToCenter();
		var valueB = b.distanceToCenter();
		var comparisonValue = 0;

		if (valueA > valueB) comparisonValue = -1;
		else if (valueA < valueB) comparisonValue = 1;

		return comparisonValue;
	}

};



/*
 *
 *	Arrays
 *
 *
 */

// ------------------------------------------------------------------------
/**
 *	
 *	@param {Number} start
 *				start position in array
 *	@param {Number} stop
 *				stop position in array
 *
 *	@return maximum value within array
 *
 */
Array.prototype.max = function(start, stop) {
	var _start = (start != undefined) ? start : 0;
	var _stop = (stop != undefined) ? stop : this.length;
	var max = this[_start];

	for(var i=(_start+1); i<_stop; i++) if(this[i] > max) max = i;
	return max;
};

/**
 *	
 *	@param {Number} start
 *				start position in array
 *	@param {Number} stop
 *				stop position in array
 *
 *	@return minimum value within array
 *
 */
Array.prototype.min = function(start, stop) {
	var _start = (start != undefined) ? start : 0;
	var _stop = (stop != undefined) ? stop : this.length;
	var min = this[_start];

	for (var i=(_start+1); i<_stop; i++) if(this[i] < min) min = i;
	return min;
};

/**
 *
 *	http://jsfromhell.com/array/shuffle
 *	http://www.brain4.de/programmierecke/js/arrayShuffle.php
 *
 *	@return original array but with the order "shuffled"
 *
 */
Array.prototype.shuffle = function() {
	for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
};



/*
 *
 *	Global Scope
 *
 */
// Script.inject({
global.inject({
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	// constants
	EPSILON: 1.0e-6,

	// have to keep frameRate low... because well...
	// it's illustrator, don't be greedy
	// formula:
	// 1/12 = 0.08333 (fps -> seconds)
	// 0.08333 * 1000 = 83.33 (seconds -> ms)
	FRAMERATE: 12, // 500 == 2 ms

	// event holder for animations events
	// mimics PaperJs
	_event: { 
		count: 0, // number of frames
		time: 0.0,  // seconds elapsed
		delta: 0.0  // difference since last frame
	},



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	@param {Object} obj
	 *				any Javascript Object
	 */
	println: function(obj) {
		console.log( obj );
		console.log( '\n' );
	},


	//-----------------------------------------------------------------------------
	/*
	 *	animation function that mimics PaperJs
	 */
	/**
	 *	@param {Boolean} isOn
	 *				true if we want to use animations
	 *	@param {Number} frameRate
	 *				the frame rate for the animatons default is 12
	 */
	Animate: function(isOn, frameRate) {
		frameRate = (frameRate === undefined) ? FRAMERATE : frameRate;
		var interval = parseInt((1/frameRate)*1000);

		if( isOn ) {
			var updater = setInterval( function() { 
				onFrame(interval, Update)
				}, interval
			);
		}
	},

	/**
	 *	@param {Number} interval
	 *				how often in MS to fire event - defaul: 83
	 */
	onFrame: function(interval, func) {
		interval = (interval === undefined) ? 2 : interval;

		_event.count++;
		_event.time += (interval * 0.001);
		_event.delta -= _event.time;

		// this clears the exceptions
		// from being printed in the console
		try {
			func(_event);
		}
		catch(err) {}

		_event.delta = _event.time;
	}

});



/*
 *
 *	Point
 *
 */
Point.inject({
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param {Point} startPoint
	 *				start Point
	 *	@param {Point} stopPoint
	 *				stop Point
	 *
	 *	@return {Point} normalized Point
	 *
	 */
	norm: function(startPoint, stopPoint) {
		this.x = frederickkScript.norm(this.x, start.x, stop.x);
		this.y = frederickkScript.norm(this.y, start.y, stop.y);
		return this;
	},

	/**
	 *	@param {Array} arg0
	 *				random range of x [0,artboard.bounds.width]
	 *	@param {Array} arg1
	 *				random range of y [0,artboard.bounds.height]
	 *
	 *	@return {Point} random Point
	 *
	 */
	random: function( arg0, arg1 ) {
		this.x = (arg0 != undefined) ? frederickkScript.random(arg0[0],arg0[1]) : Math.random()*artboard.bounds.width;
		this.y = (arg1 != undefined) ? frederickkScript.random(arg1[0],arg1[1]) : Math.random()*artboard.bounds.height;
		return this;
	},

	/**
	 *	
	 *	@return {Point} vector heading of Point
	 *
	 */
	heading: function() {
		return -1 * (Math.atan2(-this.y, this.x));
	},

	/**
	 *
	 *  https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
	 *	
	 *	@return {Point} interpolated Point
	 *
	 */
	interpolateTo: function(p2, f) {
		this.x += ((p2.x - this.x) * f);
		this.y += ((p2.y - this.y) * f);
		return this;
	},

	/**
	 *
	 *	@param {Point} arg0
	 *			start Point
	 *	@param {Point} arg1
	 *			end Point
	 *	@param {Number} arg2
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Point} lerped Point
	 *
	 */
	/**
	 *
	 *	@param {Color} arg1
	 *			end Point
	 *	@param {Number} arg2
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Point} lerped Point
	 *
	 */
	lerp: function( arg0, arg1, arg2 ) {
		var x,y;
		if(typeof arg1 === 'number') {
			x = frederickkScript.lerp(this.x,	arg0.x,	arg1);
			y = frederickkScript.lerp(this.y,	arg0.y,	arg1);
		}
		else {
			x = frederickkScript.lerp(arg0.x,	arg1.x,	arg2);
			y = frederickkScript.lerp(arg0.y,	arg1.y,	arg2);
		}
		return new Point(x,y);
	},


	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return {Point} limit Point
	 *
	 */
	limit: function(lim) {
		if (this.magSq() > lim * lim) {
			this.normalize();
			this.mult * lim;
			return this;
		}
		return this;
	},


	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return {Point} vector mag squared
	 *
	 */
	magSq: function() {
		return this.x * this.x + this.y * this.y;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	http://gmc.yoyogames.com/index.php?showtopic=290349
	 *
	 *	@param {Size} spacing
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 *	@return {Point} snapped Point
	 *
	 */
	snapGrid: function(spacing) {
		var ix, iy;
		ix = Math.round(this.y/spacing.height - this.x/spacing.width);
		iy = Math.round(this.y/spacing.height + this.x/spacing.width);

		this.x = (iy - ix)/2*spacing.width;
		this.y = (iy + ix)/2*spacing.height;
		
		return this;
	},

	/**
	 *	snaps point to an isometric grid
	 *	
	 *	@param {Number} scale
	 *				scale of the grid (1.0 = 32x16)
	 *
	 *	@return {Point} snapped isometric Point
	 *
	 */
	snapIso: function(scale) {
		if(scale === null) scale = 1;
		return this.snapGrid( new Size(32*scale,16*scale) );
	},



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return {Number} angle of point as radians
	 *
	 */
	getAngle: function() {
		return Math.atan2(this.y - 0, this.x - 0);
	}

});



/*
 *
 *	Size
 *
 */
Size.inject({
	/**
	 *	@param minw
	 *				minmum width (default: 0)
	 *	@param maxw
	 *				maximum width (default: artboard.bounds.width)
	 *	@param minh
	 *				minmum height (default: 0)
	 *	@param maxh
	 *				maximum height (default: artboard.bounds.height)
	 *
	 *	@return {Size} random size
	 *
	 */
	random: function(minw, maxw, minh, maxh) {
		minw = (minw != undefined) ? minw : 0;
		maxw = (maxw != undefined) ? maxw : artboard.bounds.width;
		minh = (minh != undefined) ? minh : 0;
		maxh = (maxh != undefined) ? maxh : artboard.bounds.height;

		this.width = frederickkScript.random(minw, maxw);
		this.height = frederickkScript.random(minh, maxh);
		return this;
	},

	/**
	 *	
	 *	@return {Number} area
	 *
	 */
	area: function() {
		return (this.width * this.height);
	},

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return {Number} outer radius
	 *
	 */
	outerRadius: function() {
		var a = this.width / 2;
		var b = this.height / 2;
		return (Math.sqrt(a * a + b * b));
	}



});



/*
 *
 *	Color
 *
 */
Color.inject({
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} pct
	 *			percentage to darken color
	 *	@param {Boolean} isNew
	 *			(option) if true a new Color is returned
	 *
	 *	@return {Color} darkened Color by input percentage
	 *
	 */
	darken: function(pct, isNew) {
		isNew = (isNew == undefined) ? false : isNew;
		if( !isNew ) {
			this.red -= pct;
			this.red = clamp(this.red, 0.0,1.0);

			this.green -= pct;
			this.green = clamp(this.green, 0.0,1.0);

			this.blue -= pct;
			this.blue = clamp(this.blue, 0.0,1.0);

			return this;
		}
		else {
			var r = clamp(this.red - pct, 0.0,1.0);
			var g = clamp(this.green - pct, 0.0,1.0);
			var b = clamp(this.blue - pct, 0.0,1.0);

			return new RGBColor(r,g,b);
		}
	},

	/**
	 *
	 *	@param {Number} pct
	 *			percentage to lighten color
	 *	@param {Boolean} isNew
	 *			(option) if true a new Color is returned
	 *
	 *	@return {Color} lightened Color by input percentage
	 *
	 */
	lighten: function(pct, isNew) {
		isNew = (isNew == undefined) ? false : isNew;
		if( !isNew ) {
			this.red += pct;
			this.red = clamp(this.red, 0.0,1.0);

			this.green += pct;
			this.green = clamp(this.green, 0.0,1.0);

			this.blue += pct;
			this.blue = clamp(this.blue, 0.0,1.0);

			return this;
		}
		else {
			var r = clamp(this.red + pct, 0.0,1.0);
			var g = clamp(this.green + pct, 0.0,1.0);
			var b = clamp(this.blue + pct, 0.0,1.0);

			return new RGBColor(r,g,b);
		}
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Color} arg0
	 *			start color
	 *	@param {Color} arg1
	 *			end color
	 *	@param {Number} arg2
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Color} lerped color
	 *
	 *	@example
	 *	var color1 = new RGBColor( 0.0, 1.0, 0.7 );
	 *	var color2 = new RGBColor( 0.0, 0.7, 1.0 );
	 *	var lerpColor = new RGBColor().lerpColor( color1, color2, 0.5 );
	 *
	 */
	/**
	 *
	 *	@param {Color} arg1
	 *			end color
	 *	@param {Number} arg2
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Color} lerped color
	 *
	 *	@example
	 *	var color1 = new RGBColor( 0.0, 1.0, 0.7 );
	 *	var color2 = new RGBColor( 0.0, 0.7, 1.0 );
	 *	var lerpColor = color1.lerpColor( color2, 0.5 );
	 *
	 */
	/*
	 *	TODO: move this to individual Color classes?
	 */
	lerp: function( arg0, arg1, arg2 ) {
		var r,g,b, h,s,l, a;

		if( arg0.type == 'gray' || this.type == 'gray' ) {
			if(typeof arg1 === 'number') {
				g = frederickkScript.lerp(this.gray,		arg0.gray,	arg1);
				a = frederickkScript.lerp(this.alpha,	arg0.alpha,	arg1);
			}
			else {
				g = frederickkScript.lerp(arg0.gray,		arg1.gray,	arg2);
				a = frederickkScript.lerp(arg0.alpha,	arg1.alpha,	arg2);
			}
			// this.gray = g;
			// this.alpha = a;
			return new GrayColor( g,a );
		}
		else if( arg0.type == 'rgb' || this.type == 'rgb' ) {
			if(typeof arg1 === 'number') {
				r = frederickkScript.lerp(this.red,		arg0.red,	arg1);
				g = frederickkScript.lerp(this.green,	arg0.green,	arg1);
				b = frederickkScript.lerp(this.blue,		arg0.blue,	arg1);
				a = frederickkScript.lerp(this.alpha,	arg0.alpha,	arg1);
			}
			else {
				r = frederickkScript.lerp(arg0.red,		arg1.red,	arg2);
				g = frederickkScript.lerp(arg0.green,	arg1.green,	arg2);
				b = frederickkScript.lerp(arg0.blue,		arg1.blue,	arg2);
				a = frederickkScript.lerp(arg0.alpha,	arg1.alpha,	arg2);
			}
			// this.red = r;
			// this.green = g;
			// this.blue = b;
			// this.alpha = a;
			return new RGBColor( r,g,b,a );
		}
		// else if( arg0.type == 'hsl' || this.type == 'hsl' ) {
		// 	if(typeof arg1 === 'number') {
		// 		h = frederickkScript.lerp(this.hue,			arg0.hue,		arg1);
		// 		s = frederickkScript.lerp(this.saturation,	arg0.saturation,arg1);
		// 		l = frederickkScript.lerp(this.lightness,	arg0.lightness,	arg1);
		// 		a = frederickkScript.lerp(this.alpha,		arg0.alpha,		arg1);
		// 	}
		// 	else {
		// 		h = frederickkScript.lerp(arg0.hue,			arg1.hue,		arg2);
		// 		s = frederickkScript.lerp(arg0.saturation,	arg1.saturation,arg2);
		// 		l = frederickkScript.lerp(arg0.lightness,	arg1.lightness,	arg2);
		// 		a = frederickkScript.lerp(arg0.alpha,		arg1.alpha,		arg2);
		// 	}
		// 	// this.hue = h;
		// 	// this.saturation = s;
		// 	// this.lightness = l;
		// 	// this.alpha = a;
		// 	return new HslColor( h,s,l,a );
		// }
		// else if( arg0.type == 'hsb' || this.type == 'hsb' ) {
		// 	if(typeof arg1 === 'number') {
		// 		h = frederickkScript.lerp(this.hue,			arg0.hue,			arg1);
		// 		s = frederickkScript.lerp(this.saturation,	arg0.saturation,	arg1);
		// 		b = frederickkScript.lerp(this.brightness,	arg0.brightness,	arg1);
		// 		a = frederickkScript.lerp(this.alpha,		arg0.alpha,			arg1);
		// 	}
		// 	else {
		// 		h = frederickkScript.lerp(arg0.hue,			arg1.hue,			arg2);
		// 		s = frederickkScript.lerp(arg0.saturation,	arg1.saturation,	arg2);
		// 		b = frederickkScript.lerp(arg0.brightness,	arg1.brightness,	arg2);
		// 		a = frederickkScript.lerp(arg0.alpha,		arg1.alpha,			arg2);
		// 	}
		// 	// this.hue = h;
		// 	// this.saturation = s;
		// 	// this.brightness = b;
		// 	// this.alpha = a;
		// 	return new HsbColor( h,s,b,a );
		// }

		// return this;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} component
	 *						input value to convert
	 *
	 *	@return {String} hex value of input color as string
	 *
	 */
	componentToHex: function( component ) {
		var hex = component.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	},


	/**
	 *
	 *	http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	 *
	 *	@return {String} hex value of input color as string
	 *
	 */
	colorToHex: function() {
		var r, g, b;
		var str = '';
		try {
			r = this.red*255;
			g = this.green*255;
			b = this.blue*255;
			str = '#'+ this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
		}
		catch(err) {
			console.log( err );
			// str = '#ffffff'; // on error return white
		}
		return str;
	},

	/**
	 *
	 *	@param {String} hex
	 *			value as string hex value (i.e. '#00b2ff')
	 *
	 *	@return {Color} value of hex as Color
	 *
	 */
	hex: function(hex) {
		// var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		// var r = parseInt(result[1], 16);
		// var g = parseInt(result[2], 16);
		// var b = parseInt(result[3], 16);

		if( hex.length >= 7 ) hex = hex.split('#')[1];
		else hex = hex;

		var big = parseInt(hex, 16);
		this.red = ((big>> 16) & 255)/255;
		this.green = ((big>> 8) & 255)/255;
		this.blue = (big& 255)/255;

		return this;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return {Number} value of input color as integer
	 *
	 */
	colorToInt: function() {
		var RgbInt;
		try {
			RgbInt = this.red;
			RgbInt = RgbInt << 8;
			RgbInt |= this.green;
			RgbInt = RgbInt << 8;
			RgbInt |= this.blue;
		}
		catch(err) {
			console.log( err );
			RgbInt = 16777215; // on error return white
		}
		return RgbInt;
	},

	/**
	 *
	 *	@param {Number} RgbInt
	 *			value as integer
	 *
	 *	@return {Color} value of integer as Color
	 *
	 */
	integer: function(RgbInt) {
		this.red = (RgbInt>> 16) & 255;
		this.green = (RgbInt>> 8) & 255;
		this.blue = RgbInt& 255;
		return this;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} arg0
	 *			red as byte value (0-255)
	 *	@param {Number} arg1
	 *			green as byte value (0-255)
	 *	@param {Number} arg2
	 *			blue as byte value (0-255)
	 *	@param {Number} arg3
	 *			alpha as byte value (0-255)
	 *
	 *	@return {Color}
	 *
	 */
	bytes: function(arg0, arg1, arg2, arg3) {
		this.red = arg0/255;
		this.green = (arg1 != undefined) ? arg1/255 : arg0/255;
		this.blue = (arg2 != undefined) ? arg2/255 : arg0/255;
		this.alpha = (arg3 != undefined) ? arg3/255 : 1.0;
		return this;
	}

});

GrayColor.inject({
	/**
	 *
	 *	@param {Array} arg0
	 *			random range of gray [0.0,1.0]
	 *	@param {Array} arg1
	 *			random range of alpha [0.0,1.0]
	 *
	 *	@return {Color} random GrayColor()
	 *
	 */
	random: function( arg0, arg1 ) {
		this.gray = (arg0 != undefined) ? frederickkScript.random(arg0[0],arg0[1]) : Math.random();
		this.alpha = (arg1 != undefined) ? frederickkScript.random(arg1[0],arg1[1]) : Math.random();
		return this;
	}
});

RGBColor.inject({
	/**
	 *
	 *	@param {Array} arg0
	 *			random range of red [0.0,1.0]
	 *	@param {Array} arg1
	 *			random range of green [0.0,1.0]
	 *	@param {Array} arg2
	 *			random range of blue [0.0,1.0]
	 *	@param {Array} arg3
	 *			random range of alpha [0.0,1.0]
	 *
	 *	@return {Color} random RGBColor()
	 *
	 */
	random: function( arg0, arg1, arg2, arg3 ) {
		this.red = Math.random();
		this.green = Math.random();
		this.blue = Math.random();
		this.alpha = (arg3 != undefined) ? frederickkScript.random(arg3[0],arg3[1]) : Math.random();
		return this;
	}
});


// ------------------------------------------------------------------------
/*
 *	bringing in HSB and HSL colors from PaperJs
 *
 *	https://github.com/paperjs/paper.js/blob/master/src/color/Color.js
 */
// For hsb-rgb conversion, used to lookup the right parameters 
// in the values array.
var hsbIndices = [
	[0, 3, 1], // 0
	[2, 0, 1], // 1
	[1, 0, 3], // 2
	[1, 2, 0], // 3
	[3, 1, 0], // 4
	[0, 1, 2]  // 5
];

/**
 *
 *	@param {Number} hue
 *				the hue of the color as a value in degrees between 0 and 360.
 *	@param {Number} saturation
 *				the saturation of the color as a value between 0 and 1
 *	@param {Number} brightness
 *				the brightness of the color as a value between 0 and 1
 *	@param {Number} alpha
 *				(optional) the alpha of the color as a value between 0 and 1
 */
var HSBColor = function(hue, saturation, brightness, alpha) {
	// these mean nothing
	// because RGBColor is returned
	// TODO: actually inject HSLColor into Color
	this.type = 'hsb';
	this.hue = hue;
	this.saturation = saturation;
	this.brightness = brightness;
	this.alpha = (alpha === undefined) ? 1.0 : alpha;

	var h = (this.hue / 60) % 6, // Scale to 0..6
		s = this.saturation,
		b = this.brightness,
		i = Math.floor(h), // 0..5
		f = h - i,
		i = hsbIndices[i],
		v = [
			b,						// b, index 0
			b * (1 - s),			// p, index 1
			b * (1 - s * f),		// q, index 2
			b * (1 - s * (1 - f))	// t, index 3
		];
	return new RGBColor(v[i[0]], v[i[1]], v[i[2]], this.alpha);
};

/**
 *
 *	@param {Number} hue
 *				the hue of the color as a value in degrees between 0 and 360.
 *	@param {Number} saturation
 *				the saturation of the color as a value between 0 and 1
 *	@param {Number} lightness
 *				the lightness of the color as a value between 0 and 1
 *	@param {Number} alpha
 *				(optional) the alpha of the color as a value between 0 and 1
 */
var HSLColor = function(hue, saturation, lightness, alpha) {
	// these mean nothing
	// because RGBColor is returned
	// TODO: actually inject HSLColor into Color
	this.type = 'hsl';
	this.hue = hue;
	this.saturation = saturation;
	this.lightness = lightness;
	this.alpha = (alpha === undefined) ? 1.0 : alpha;

	var s = this.saturation,
		h = this.hue / 360,
		l = this.lightness;
	if (s == 0)
		return new RGBColor(l, l, l, this.alpha);
	var t3s = [ h + 1 / 3, h, h - 1 / 3 ],
		t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
		t1 = 2 * l - t2,
		c = [];
	for (var i = 0; i < 3; i++) {
		var t3 = t3s[i];
		if (t3 < 0) t3 += 1;
		if (t3 > 1) t3 -= 1;
		c[i] = 6 * t3 < 1
			? t1 + (t2 - t1) * 6 * t3
			: 2 * t3 < 1
				? t2
				: 3 * t3 < 2
					? t1 + (t2 - t1) * ((2 / 3) - t3) * 6
					: t1;
	}
	return new RGBColor(c[0], c[1], c[2], this.alpha);
};

// TODO:
//
// HslColor.inject({
// 	/**
// 	 *
// 	 *	@param {Array} arg0
// 	 *			random range of hue [0,360]
// 	 *	@param {Array} arg1
// 	 *			random range of saturation [0.0,1.0]
// 	 *	@param {Array} arg1
// 	 *			random range of lightness [0.0,1.0]
// 	 *	@param {Array} arg3
// 	 *			random range of alpha [0.0,1.0]
// 	 *
// 	 *	@return {Color} random HslColor()
// 	 *
// 	 */
// 	random: function( arg0, arg1, arg2, arg3 ) {
// 		this.hue = (arg0 != undefined) ? frederickkScript.random(arg0[0],arg0[1]) : Math.random()*360;
// 		this.saturation = (arg1 != undefined) ? frederickkScript.random(arg1[0],arg2[1]) : Math.random();
// 		this.lightness = (arg2 != undefined) ? frederickkScript.random(arg1[0],arg2[1]) : Math.random();
// 		this.alpha = (arg3 != undefined) ? frederickkScript.random(arg3[0],arg3[1]) : Math.random();
// 		return this;
// 	}
// });

// HsbColor.inject({
// 	/**
// 	 *
// 	 *	@param {Array} arg0
// 	 *			random range of hue [0,360]
// 	 *	@param {Array} arg1
// 	 *			random range of saturation [0.0,1.0]
// 	 *	@param {Array} arg2
// 	 *			random range of brightness [0.0,1.0]
// 	 *	@param {Array} arg3
// 	 *			random range of alpha [0.0,1.0]
// 	 *
// 	 *	@return {Color} random HsbColor()
// 	 *
// 	 */
// 	random: function( arg0, arg1, arg2, arg3 ) {
// 		this.hue = (arg0 != undefined) ? frederickkScript.random(arg0[0],arg0[1]) : Math.random()*360;
// 		this.saturation = (arg1 != undefined) ? frederickkScript.random(arg1[0],arg2[1]) : Math.random();
// 		this.brightness = (arg2 != undefined) ? frederickkScript.random(arg1[0],arg2[1]) : Math.random();
// 		this.alpha = (arg3 != undefined) ? frederickkScript.random(arg3[0],arg3[1]) : Math.random();
// 		return this;
// 	}
// });

// ------------------------------------------------------------------------
/**
 *
 *	@param {String} hex
 *			value as string hex value (i.e. '#00b2ff')
 *
 *	@return {Color} value of hex as Color
 *
 */
var HexColor = function(str) {
	return new RGBColor(0,0,0).hex(str);
};



/**
 *  
 *  
 *	FConversions
 *	A collection of helpful conversion ratios
 *
 */
frederickkScript.FConversions = {
	// conversions
	ptToMm: 0.352777778,
	mmToPt: 2.83464567,

	ptToCm: 0.0352777778,
	CmToPt: 28.3464567,

	ptToIn: 0.0138888889,
	inToPt: 72,

	ptToPi: 0.0833333333,
	piToPt: 12

};



/**
 *  
 *
 *	FIO
 *	A collection of I/O methods;
 *
 *	Jürg Lehni
 *	http://scriptographer.org/forum/help/save-array-data-to-external-file/?pos=0#Post-3279
 *
 */
frederickkScript.FIO = {
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param str
	 *				the String of information to save (JSON encoded)
	 *	@param fname
	 *				the name of the file to save to
	 */
	saveFile: function(str, fname) {
		var file = new File(script.file.parent, fname);
		if (file.exists()) file.remove();
		file.open();
		file.write( Json.encode(str) );
		file.close();
	},

	/**
	 *	@param fname
	 *				the name of the file to open
	 */
	openFile: function(fname) {
		var file = new File(script.file.parent, fname);
		file.open();
		var data = Json.decode( file.readAll() );
		file.close();
		
		return data;
	},

	/**
	 *	@param fname
	 *				the name of the file to delete
	 */
	deleteFile: function(fname) {
		var file = new File(script.file.parent, fname);
		// If file exists, we need to remove it first in order to overwrite its content.
		if (file.exists()) file.remove();
	},

	/**
	 *	@param fname
	 *				the name of the file to verify exists
	 */
	checkFile: function(fname) {
		var file = new File(script.file.parent, fname);
		if (file.exists()) return true;
		else return false
	}

};



/**
 *  
 *
 *	FDate
 *
 */
frederickkScript.FTime.FDate = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	public
	 */
	this.date;

	/*
	 *	private
	 */
	var _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var _shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/*
	 *	private
	 */
	var _addZero = function(val) {
		if (val.length == 1) val = '0' + val;
		return val;
	};


	// ------------------------------------------------------------------------
	/*
	 *	public
	 */
	/**
	 *	@return return the current year as 'YYYY'
	 */
	this.year = function() {
		if(this.date === undefined) this.date = new Date();
		var year = String( this.date.getFullYear() ); 
		return year;
	};

	/**
	 *	@return return the current month as 'MM'
	 */
	this.month = function() {
		if(this.date === undefined) this.date = new Date();
		var month = String( this.date.getMonth() ); 
		hour = _addZero(month);
		return month;
	};

	/**
	 *	@return return the current day as string 'DD'
	 */
	this.day = function() {
		if(this.date === undefined) this.date = new Date();
		var day = String( this.date.getDate() );
		return day;
	};

	/**
	 *	@return return the current hour as string 'HH'
	 */
	this.hour = function() {
		if(this.date === undefined) this.date = new Date();
		var hour = String( this.date.getHours() ); 
		hour = _addZero(hour);
		return hour;
	};

	/**
	 *	@return return the current minute as string 'mm'
	 */
	this.minute = function() {
		if(this.date === undefined) this.date = new Date();
		var minute = String( this.date.getMinutes() ); 
		minute = _addZero(minute);
		return minute;
	};

	/**
	 *	@return return the current second as string 'ss'
	 */
	this.second = function() {
		if(this.date === undefined) this.date = new Date();
		var second = String( this.date.getSeconds() ); 
		second = _addZero(second);
		return second;
	};

	/**
	 *	return the current date as string "yyyyMMdd"
	 * 
	 *	@return date
	 */
	// this.date = function() {
	// 	return this.year() + this.month() + this.day();
	// };

	/**
	 *	@param format
	 *			boolean array = [hours, minutes, seconds]
	 *
	 *	@return the current time
	 */
	this.now = function(format) {
		var disp = [];
		if( format === undefined ) disp = [true, true, true];
		else disp = format;

		var str = '';
		if(disp[0]) str += this.hour();
		if(disp[0] && disp[1]) str += ':';
		if(disp[1]) str += this.minute();
		if(disp[1] && disp[2]) str += ':';
		if(disp[2]) str += this.second();
		return str;
	};

	this.nowMilliseconds = function() {
		return this.toMillsecond(
			this.hour(),
			this.minute(),
			this.second()
		);
	};

	/**
	 *	add to time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.add = function(_d, _h, _m, _s) {
		return this.date + (24 * _d + 60 * _h + 60 * _m + 1000 * s);
	};

	/**
	 *	sub from time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.sub = function(_d, _h, _m, _s) {
		return this.date - (24 * _d + 60 * _h + 60 * _m + 1000 * s);
	};


 
	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	set to a specific time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.set = function(_d, _h, _m, _s) {
		this.time = new Date();
		this.time.setTime( (24 * _d + 60 * _h + 60 * _m + 1000 * s) );
		return this.time;
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	@param ms
	 *			input as milliseconds
	 *	@param format
	 *			boolean array = [hours, minutes, seconds]
	 *
	 *	@return human readable default is hh:mm:ss
	 */
	this.get = function(ms, format) {
		var disp;
		if( format === undefined ) disp = new Array(true, true, true);
		else disp = format;

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
	 *	@param h
	 *			input as hours OR input string as hh:mm:ss OR mm:ss
	 *	@param m
	 *			input as minutes
	 *	@param s
	 *			input as seconds
	 *
	 *	@return time in milliseconds
	 */
	this.toMillsecond = function(_h, _m, _s) {
		var h,m,s;
		if(_m === undefined && _s === undefined) {
			h = this.toArray(_h)[0];
			m = this.toArray(_h)[1];
			s = this.toArray(_h)[2];
		}
		else {
			h = _h;
			m = _m;
			s = _s;
		}
		return parseInt(3600000 * h + 60000 * m + 1000 * s);
	};

	/**
	 *	@param strHMS
	 *			input string as hh:mm:ss
	 *
	 *	@return array of time [0] hours [1] minutes [2] seconds
	 */
	this.toArray = function(strHMS) {
		var temp = strHMS.split(':');
		return [ temp[0], temp[1], temp[2] ];
	};


};



/**
 *  
 *  
 *	FStepper
 *
 */
frederickkScript.FTime.FStepper = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	private
	 */
	var _stepMillis = 1000; // Set to default of 1s OR 1000ms
	
	var _timeStart = 0.0;
	var _timeEnd = 0.0;
	
	var _bToggleStart = 0;
	var _bBeginStpper = false;
	var _bIn = false;
	var _bOut = false;
	var _bDone = true;

	var _easing = 0.05;
	var _bEase = true;

	/*
	 *	public
	 */
	this.delta = 1.0;
	this.counter = -1;


	
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	toggle (start/stop) the stepper
	 *	
	 */
	this.toggle = function() {
		if (_bToggleStart == 0) {
			_bToggleStart = 1;
			this.stepOut();
		}
		else {
			_bToggleStart = 0;
			this.stepIn();
		}
	}

	// ------------------------------------------------------------------------
	/**
	 *	TODO: implement _easing
	 *
	 *	required function to keep the timing in sync
	 *	with the application
	 *
	 *	@param currentTime
	 *			the elapsed time of the application in seconds
	 */
	this.update = function(currentTime) {
		if(_bBeginStpper) {
			_bBeginStpper = false;
			_timeStart = currentTime;
			if(_bIn) {
				_timeEnd = frederickkScript.roundDecimal( (currentTime + ((1.0 - this.delta) * _stepMillis)), 3 );
			}
			else {
				_timeEnd = frederickkScript.roundDecimal( (currentTime + (this.delta*_stepMillis)), 3 );
			}
			if(_timeEnd <= currentTime) {
				if(_bIn) {
					_bIn = false;
					this.delta = 1.0;
				}
				else {
					_bOut = false;
					this.delta = 0.0;
				}
			}
		}
		if(_bIn) {
			this.delta = frederickkScript.roundDecimal( (1.0 - ((_timeEnd - currentTime) / _stepMillis)), 3 );
			// if(_bEase) {
			// }

			if(currentTime == _timeEnd) {
				_bIn = false;
				this.delta = 1.0;
				this.counter++;
				return;
			}
		}
		else if(_bOut) {
			this.delta = frederickkScript.roundDecimal( ((_timeEnd - currentTime) / _stepMillis), 3 );
			// if(_bEase) {
			// }

			if(currentTime == _timeEnd) {
				_bIn = false;
				this.delta = 0.0;
				this.counter++;
				return;
			}
		}
	};

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	toggle stepping in (++)
	 *	
	 */
	this.stepIn = function() {
		if(_bIn) return;
		if(this.delta == 1.0) return;
		_bBeginStpper = true;
		_bIn = true;
		_bOut = false;
	};

	/**
	 *	
	 *	toggle stepping out (--)
	 *	
	 */
	this.stepOut = function() {
		if(_bOut) return;
		if(this.delta == 0.0) return;
		_bBeginStpper = true;
		_bOut = true;
		_bIn = false;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@return if the object is stepping in
	 */
	this.isIn = function() {
		return _bIn;
	};
	/**
	 *	@return if the object is stepping out
	 */
	this.isOut = function() {
		return _bOut;
	};

	/**
	 *	@return if the object has finished it's stepping
	 */
	this.isDone = function() {
		if(this.delta < 1.0 && this.delta > 0.0) return false;
		else if(this.delta >= 1.0) {
			this.delta = 1.0;
			return true;
		}
		else if(this.delta <= 0.0) {
			this.delta = 0.0;
			return true;
		}
	};

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	stop stepping
	 *	
	 */
	this.stop = function() {
		_bBeginStpper = _bIn = _bOut = false;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param _seconds
	 *			length of fade in seconds 
	 */
	this.setSeconds = function(_seconds) {
		this.setMillis( parseInt(_seconds * 1000.0) );
	};
	/**
	 *	@param _millis
	 *			length of fade in milliseconds 
	 */
	this.setMillis = function(_millis) {
		_stepMillis = _millis;
		_stepMillis /= 1000;
	};

	/**
	 *	@param _val
	 *			to ease or not to ease...
	 *	@param __easing
	 *			(optional) degree of _easing
	 */
	// this.setEasing = function(_val, _easeing) {
	// 	_bEase = _val;
	// 	_easing = _easeing;
	// };

	// ------------------------------------------------------------------------
	/**
	 *	@param _val
	 *			set a value for the delta 0.0 - 1.0
	 */
	this.setDelta = function(_val) {
		this.delta = _val;
	};
};



/**
 *  
 *
 *	FStopwatch
 *	A simple stopwatch
 *
 */
frederickkScript.FTime.FStopwatch = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	private
	 */
	var _now;
	var _then;
	var _timeInMs = 0;
	var _bStart = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	toggle (start/stop) the stopwatch
	 *	
	 */
	this.toggle = function() {
		if (_bStart == 0) {
			this.start();
		}
		else {
			this.pause();
		}
	};

	/**
	 *	
	 *	start the stopwatch
	 *	
	 */
	this.start = function() {
		// start
		_bStart = 1;
		_then = new Date();
		_then.setTime(_then.getTime() - _timeInMs);
	};

	/**
	 *	
	 *	pause the stopwatch
	 *	
	 */
	this.pause = function() {
		// pause
		_bStart = 0;
		_now = new Date();
		_timeInMs = _now.getTime() - _then.getTime();
	};

	/**
	 *	
	 *	reset the stopwatch
	 *	
	 */
	this.reset = function() {
		_bStart = 0;
		_timeInMs = 0;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	set the stopwatch
	 *
	 *	@param ms
	 *			milliseconds to start the stopwatch with
	 *	@param run
	 *			whether the stopwatch should start or not
	 *	
	 */
	this.set = function(ms, run) {
		_timeInMs = ms;
		(run == true) ? _bStart = 0 : _bStart = 1;

		_then = new Date();
		_then.setTime(_then.getTime() - _timeInMs);
		this.toggle();
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return the time elapsed
	 *	
	 */
	this.get = function() {
		if (_bStart == 1)  {
			_now = new Date();
			_timeInMs = _now.getTime() - _then.getTime();
		}
		return _timeInMs;
	};

	/**
	 *	
	 *	@return whether the stopwatch is running
	 *	
	 */
	this.isRunning = function() {
		return (_bStart) ? true : false;
	};

};



// /**
//  *  
//  *	3D Path Shape Constructors
//  *
//  *	A barebones collection of primitive shapes for 3D rendering
//  *
//  *	code inspired by
//  *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
//  *	https://github.com/mrdoob/three.js/
//  *
//  *	modified/expanded for use in PaperJS by Ken Frederick
//  *
//  */
// // FPath3.inject({ statics: new function() {


// // }});


// /**
//  *  
//  *	3D Path Class
//  *
//  *	A barebones collection of classes for primitive 3D rendering
//  *
//  *	code inspired by
//  *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
//  *	https://github.com/mrdoob/three.js/
//  *
//  *	modified/expanded for use in PaperJS by Ken Frederick
//  *
//  */
// var F3D.FPath3 = this.FPath3 = Path.extend({
// 	// ------------------------------------------------------------------------
// 	// Properties
// 	// ------------------------------------------------------------------------
// 	/*
// 	 *	private
// 	 */
// 	_type: 'FPath3',
	
// 	// scene
// 	_scene: null,
// 	_matrix: null,

// 	// 3D points array
// 	_fpoints3: null,

// 	// transformations
// 	_rotation: null,
// 	_translation: null,

// 	/*
// 	 *	public
// 	 */
// 	position3: null,



// 	// ------------------------------------------------------------------------
// 	// Methods
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	@param scene
// 	 *				the scene to attach this path to
// 	 *
// 	 */
// 	initialize : function(scene) {
// 		this.base();
// 		this._closed = false;

// 		this.position3 = new F3D.FPoint3();

// 		// setup scene
// 		this._scene = scene;

// 		// setup matrix
// 		this._matrix = new Matrix3D();

// 		// setup transformation
// 		this._rotation = new F3D.FPoint3();
// 		this._translation = new F3D.FPoint3();

// 		// setup 3D points array
// 		this._fpoints3 = [];

// 		this.name = 'FPath3';
// 		// return this;
// 	},



// 	// ------------------------------------------------------------------------
// 	// Sets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param scene
// 	 *			scene to associate points with
// 	 */
// 	setScene : function(scene) {
// 		// the scene
// 		this._scene = scene;

// 		for(var i=0; i<this._fpoints3.length; i++) {
// 			this._fpoints3[i].setup( this._scene );
// 		}
// 	},

// 	/**
// 	 *	@param _fpoint3
// 	 *			add FPoint3 to path
// 	 */
// 	add3 : function(fpoint3) {
// 		this._fpoints3[ this._fpoints3.length ] = fpoint3;
// 	},

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param arg0
// 	 *			FPoint3 for transformation
// 	 */
// 	/**
// 	 *	@param arg0
// 	 *			x point
// 	 *	@param arg1
// 	 *			y point
// 	 *	@param arg2
// 	 *			z point
// 	 */
// 	translate : function(arg0, arg1, arg2) {
// 		if(typeof arg0 == 'number') {
// 			this._translation.x = arg0;
// 			this._translation.y = arg1;
// 			this._translation.z = arg2;
// 		}
// 		else if(typeof arg0 == 'object') { // FPoint3
// 			this._translation.x = arg0.x;
// 			this._translation.y = arg1.y;
// 			this._translation.z = arg2.z;
// 		}
// 		else {
// 			this._translation.x = arg0 != undefined ? arg0 : 0;
// 			this._translation.y = arg1 != undefined ? arg1 : 0;
// 			this._translation.z = arg2 != undefined ? arg2 : 0;
// 		}

// 		for(var i=0; i<this._fpoints3.length; i++) {
// 			var pt3 = this._fpoints3[i];
// 			pt3.setX( (pt3.x + this._translation.x) );
// 			pt3.setY( (pt3.y + this._translation.y) );
// 			pt3.setZ( (pt3.z + this._translation.z) );
// 		}
// 	},

// 	/**
// 	 *	@param val
// 	 *			degree value for x axis rotation
// 	 */
// 	rotateX : function(val) {
// 		this._rotation.x = val;
// 	},

// 	/**
// 	 *	@param val
// 	 *			degree value for y axis rotation
// 	 */
// 	rotateY : function(val) {
// 		this._rotation.y = val;
// 	},

// 	/**
// 	 *	@param val
// 	 *			degree value for z axis rotation
// 	 */
// 	rotateZ : function(val) {
// 		this._rotation.z = val;
// 	},



// 	// ------------------------------------------------------------------------
// 	// Gets
// 	// ------------------------------------------------------------------------
// 	get : function() {
// 		// clear segments
// 		this._segments = [];

// 		// push points into 2D path
// 		for(var i=0; i<this._fpoints3.length; i++) {
// 			var pt3 = this._fpoints3[i];
// 			this.add( 
// 				new Point( pt3.x2D(), pt3.y2D() )
// 			);
// 		}
// 		return this;
// 	},

// });


// /**
//  *  
//  *	FPoint3
//  *
//  *	A barebones collection of classes for primitive 3D rendering
//  *
//  *	code inspired by
//  *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
//  *	https://github.com/mrdoob/three.js/
//  *
//  *	modified/expanded for use in PaperJS by Ken Frederick
//  *
//  */

// /**
//  *	@param arg0
//  *			x coordinate
//  *	@param arg1
//  *			y coordinate
//  *	@param arg2
//  *			z coordinate
//  */
// var F3D.FPoint3 = this.FPoint3 = function(arg0, arg1, arg2) {
// 	// ------------------------------------------------------------------------
// 	// Properties
// 	// ------------------------------------------------------------------------
// 	/*
// 	 *	private
// 	 */
// 	var _scene = null;

// 	var _xIndex = 0;
// 	var _yIndex = 0;
// 	var _zIndex = 0;
	
// 	var _xIndex2D = 0;
// 	var _yIndex2D = 0;


// 	/*
// 	 *	public
// 	 */
// 	this.x = arg0 != undefined ? arg0 : 0;
// 	this.y = arg1 != undefined ? arg1 : 0;
// 	this.z = arg2 != undefined ? arg2 : 0;



// 	// ------------------------------------------------------------------------
// 	// Methods
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param scene
// 	 *			the scene with which the points are
// 	 *			associated with
// 	 */
// 	this.setup = function(scene) {
// 		// setup scene
// 		_scene = scene;

// 		var index = _scene.setupPoint(this.x, this.y, this.z);
// 		var i3 = index*3;
// 		var i2 = index*2;

// 		// 3D indicies
// 		_xIndex = i3;
// 		_yIndex = i3+1;
// 		_zIndex = i3+2;

// 		// 2D indicies
// 		_xIndex2D = i2;
// 		_yIndex2D = i2+1;
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	
// 	 *	@return random point
// 	 *
// 	 */
// 	/**
// 	 *	@param minx
// 	 *				minmum x (default: 0)
// 	 *	@param maxx
// 	 *				maximum x (default: artboard.bounds.width)
// 	 *	@param miny
// 	 *				minmum y (default: 0)
// 	 *	@param maxy
// 	 *				maximum y (default: artboard.bounds.height)
// 	 *	@param minz
// 	 *				minmum z (default: 0)
// 	 *	@param maxz
// 	 *				maximum z (default: 1000)
// 	 *
// 	 *	@return random point
// 	 *
// 	 */
// 	this.random = function(minx, maxx, miny, maxy, minz, maxz) {
// 		minx = (minx != undefined) ? minx : 0;
// 		maxx = (maxx != undefined) ? maxx : artboard.bounds.width;
// 		miny = (miny != undefined) ? miny : 0;
// 		maxy = (maxy != undefined) ? maxy : artboard.bounds.height;
// 		minz = (minz != undefined) ? miny : 0;
// 		maxz = (maxz != undefined) ? maxy : 1000;

// 		this.x = frederickkScript.random(minx, maxx);
// 		this.y = frederickkScript.random(miny, maxy);
// 		this.z = frederickkScript.random(minz, maxz);

// 		return new F3D.FPoint3(this.x, this.y, this.z);
// 	};



// 	// ------------------------------------------------------------------------
// 	// Sets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	@param val
// 	 *			set x value
// 	 */
// 	this.setX = function(val) {
// 		if( _scene != null ) _scene.points3D[_xIndex] = val;
// 		this.x = val;
// 	};
	
// 	/**
// 	 *
// 	 *	@param val
// 	 *			set y value
// 	 */
// 	this.setY = function(val) {
// 		if( _scene != null ) _scene.points3D[_yIndex] = val;
// 		this.y = val;
// 	};

// 	/**
// 	 *
// 	 *	@param val
// 	 *			set z value
// 	 */
// 	this.setZ = function(val) {
// 		if( _scene != null ) _scene.points3D[_zIndex] = val;
// 		this.z = val;
// 	};

// 	// ------------------------------------------------------------------------
// 	this.set = function(arg0, arg1, arg2) {
// 		this.setX(arg0);
// 		this.setY(arg1);
// 		this.setZ(arg2);
// 	};



// 	// ------------------------------------------------------------------------
// 	// Gets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@return a copy of this point
// 	 */
// 	this.get = function() {
// 		return new F3D.FPoint3(this.x, this.y, this.z);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@return projected 2D x
// 	 */
// 	this.x2D = function() {
// 		return _scene.points2D[_xIndex2D];
// 	};

// 	/**
// 	 *	@return projected 2D y
// 	 */
// 	this.y2D = function() {
// 		return _scene.points2D[_yIndex2D];
// 	};

// 	// ------------------------------------------------------------------------
// 	this.getSceneIndex = function() {
// 		return _sceneIndex;
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Calculate the magnitude (length) of the point
// 	 *
// 	 *	@return the magnitude of the point
// 	 */
// 	this.mag = function() {
// 		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Add a point to this point
// 	 *
// 	 *	@param arg0
// 	 *			the FPoint3 to be added
// 	 */
// 	/**
// 	 *	Add a point to this point
// 	 *
// 	 *	@param arg0
// 	 *			the x point to be added
// 	 *	@param arg1
// 	 *			the y point to be added
// 	 *	@param arg2
// 	 *			the z point to be added
// 	 */
// 	this.add = function(arg0, arg1, arg2) {
// 		if(typeof arg0 == 'number') {
// 			this.x += arg0;
// 			this.y += arg1;
// 			this.z += arg2;
// 		}
// 		else if(typeof arg0 == 'object') { // FPoint3
// 			this.x += arg0.x();
// 			this.y += arg0.y();
// 			this.z += arg0.z();
// 		}
// 		this.set(this.x, this.y, this.z);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Subtract a point to this point
// 	 *
// 	 *	@param arg0
// 	 *			the FPoint3 to be subtracted
// 	 */
// 	/**
// 	 *	Subtract a point to this point
// 	 *
// 	 *	@param arg0
// 	 *			the x point to be subtracted
// 	 *	@param arg1
// 	 *			the y point to be subtracted
// 	 *	@param arg2
// 	 *			the z point to be subtracted
// 	 */
// 	this.sub = function(arg0, arg1, arg2) {
// 		if(typeof arg0 == 'number') {
// 			this.x -= arg0;
// 			this.y -= arg1;
// 			this.z -= arg2;
// 		}
// 		else if(typeof arg0 == 'object') { // FPoint3
// 			this.x -= arg0.x();
// 			this.y -= arg0.y();
// 			this.z -= arg0.z();
// 		}
// 		this.set(this.x, this.y, this.z);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Scale this point by a scalar
// 	 *
// 	 *	@param n
// 	 *			the value to scale by
// 	 */
// 	this.scale = function(n) {
// 		this.x *= n;
// 		this.y *= n;
// 		this.z *= n;
// 		this.set(this.x, this.y, this.z);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Multiply each element of one point by the elements of another point.
// 	 *
// 	 *	@param arg0
// 	 *			the FPoint3 to be multiplied
// 	 */
// 	/**
// 	 *	Multiply each element of one point by the elements of another point.
// 	 *
// 	 *	@param arg0
// 	 *			the x point to be multiplied
// 	 *	@param arg1
// 	 *			the y point to be multiplied
// 	 *	@param arg2
// 	 *			the z point to be multiplied
// 	 */
// 	this.mult = function(arg0, arg1, arg2) {
// 		if(typeof arg0 == 'number') {
// 			this.x *= arg0;
// 			this.y *= arg1;
// 			this.z *= arg2;
// 		}
// 		else if(typeof arg0 == 'object') { // FPoint3
// 			this.x *= arg0.x();
// 			this.y *= arg0.y();
// 			this.z *= arg0.z();
// 		}
// 		this.set(this.x, this.y, this.z);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Divide each element of one point by the elements of another point.
// 	 *
// 	 *	@param arg0
// 	 *			the FPoint3 to be divided
// 	 */
// 	/**
// 	 *	Divide each element of one point by the elements of another point.
// 	 *
// 	 *	@param arg0
// 	 *			the x point to be divided
// 	 *	@param arg1
// 	 *			the y point to be divided
// 	 *	@param arg2
// 	 *			the z point to be divided
// 	 */
// 	this.div = function(arg0, arg1, arg2) {
// 		if(typeof arg0 == 'number') {
// 			this.x /= arg0;
// 			this.y /= arg1;
// 			this.z /= arg2;
// 		}
// 		else if(typeof arg0 == 'object') { // FPoint3
// 			this.x /= arg0.x();
// 			this.y /= arg0.y();
// 			this.z /= arg0.z();
// 		}
// 		this.set(this.x, this.y, this.z);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Calculate the Euclidean distance between two points (considering a point as a vector object)
// 	 *
// 	 *	@param _fpoint3
// 	 *			another point
// 	 *
// 	 *	@return the Euclidean distance between
// 	 */
// 	this.getDistance = function(_fpoint3) {
// 		var dx = this.x - _fpoint3.x();
// 		var dy = this.y - _fpoint3.y();
// 		var dz = this.z - _fpoint3.z();
// 		return Math.sqrt(dx*dx + dy*dy + dz*dz);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 * Calculate the angle between two points, using the dot product
// 	 *
// 	 * @param _fpoint3a
// 	 *				a point
// 	 * @param _fpoint3b
// 	 *				another point
// 	 *
// 	 * @return the angle between the points
// 	 */
// 	this.angleBetween = function(_fpoint3a, _fpoint3b) {
// 		var dot = _fpoint3a.x() * _fpoint3b.x() + _fpoint3a.y() * _fpoint3b.y() + _fpoint3a.z() * _fpoint3b.z();
// 		var _f1mag = Math.sqrt(_fpoint3a.x() * _fpoint3a.x() + _fpoint3a.y() * _fpoint3a.y() + _fpoint3a.z() * _fpoint3a.z());
// 		var _f2mag = Math.sqrt(_fpoint3b.x() * _fpoint3b.x() + _fpoint3b.y() * _fpoint3b.y() + _fpoint3b.z() * _fpoint3b.z());
// 		return Math.acos(dot / (_f1mag * _f2mag));
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
//    	 *	Normalize the point to length 1 (make it a unit point)
// 	 */
// 	this.normalize = function() {
// 	    var m = this.mag();
// 	    if (m != 0 && m != 1) {
//     	  this.div(m);
// 	    }
// 	};


// 	// ------------------------------------------------------------------------
// 	this.toString = function() {
// 		return '[ ' + this.x + ', ' + this.y + ', ' + this.z + ' ]';
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Return a representation of this point as an array.
// 	 */
// 	this.array = function() {
// 		return [this.x, this.y, this.z];
// 	};

// };


// /**
//  *  
//  *	3D Scene Class
//  *
//  *	A barebones collection of classes for primitive 3D rendering
//  *
//  *	code mostly taken from
//  *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
//  *	https://github.com/mrdoob/three.js/
//  *
//  *	modified/expanded for use in PaperJS by Ken Frederick
//  *
//  */



// /**
//  *
//  *	TODO:	leave as is and accept or redo entire engine
//  *			possibly look into using three.js as the engine	
//  *
//  */
// var F3D.FScene3D = this.FScene3D = function() {
// 	// ------------------------------------------------------------------------
// 	// Properties
// 	// ------------------------------------------------------------------------
// 	/*
// 	 *	private
// 	 */
// 	var _mode = 'PERSPECTIVE'; // default
// 	var _matrix = null;

// 	var _half = new F3D.FSize3(0,0,0);

// 	// transfomrations
// 	var _sceneScale = 1;
// 	var _rotation = new F3D.FPoint3(0,0,0);

// 	// items
// 	var _numPoints = 0;
// 	var _fpath3Arr = null;
// 	var _groupBot = null;
// 	var _groupTop = null;

// 	/*
// 	 *	public
// 	 */
// 	this.bounds = new F3D.FSize3(0,0,0);

// 	this.points3D = [];
// 	this.points2D = [];



// 	// ------------------------------------------------------------------------
// 	// Methods
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	matrix for isometric projection
// 	 *
// 	 *	TODO: figure out why this has to be
// 	 *	configured like this?
// 	 */
// 	this._ortho = function() {
// 		_matrix.makeOrtho( 
// 			-_half.height,	// left
// 			_half.height,	// right
// 			_half.height,	// top
// 			-_half.height,	// bottom
// 			-_half.height,	// near
// 			_half.height	// far
// 		);
// 	};

// 	/**
// 	 *	_perspective( for perspective projection
// 	 */
// 	this._perspective = function() {
// 		_matrix.makePerspective( 
// 			50,		// fov
// 			0.5 * this.bounds.width/this.bounds.height,	// aspect
// 			_half.depth,		// near
// 			this.bounds.depth*2	// far
// 		);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param width
// 	 *				width of scene
//  	 *				default: artboard.bounds.width
// 	 *	@param height
// 	 *				height of scene
//  	 *				default: artboard.bounds.height
// 	 *	@param focalLength
// 	 *				focal length of scene
//  	 *				default: 1000
// 	 *	@param mode
// 	 *				'PERSPECTIVE' objects scale to perspective
// 	 *				'ORTHO' objects do not scale (isometric)
// 	 *
// 	 */
// 	this.setup = function(width, height, focalLength, mode) {
// 		// setup point arrays
// 		this.points3D = [];
// 		this.points2D = [];

// 		// setup items array
// 		_fpath3Arr = [];

// 		// setup matrix
// 		_matrix = new Matrix3D();

// 		// setup world
// 		this.bounds.width  = width || artboard.bounds.width;
// 		this.bounds.height = height || artboard.bounds.height;
// 		this.bounds.depth = focalLength || 1000;

// 		_half.width = this.bounds.width*0.5;
// 		_half.height = this.bounds.height*0.5;
// 		_half.depth = this.bounds.depth*0.5;

// 		// set mode
// 		this.setMode(mode);

// 		// setup up group for items
// 		_groupBot = new Group();
// 		_groupTop = new Group();
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	draws FPath3 objects
// 	 *
// 	 *	@return group of FPath3 objects
// 	 *
// 	 */
// 	this.draw = function() {
// 		// transformation matrix
// 		_matrix.identity();

// 		// set perspective mode
// 		if(_mode == 'ORTHO') this._ortho();
// 		else this._perspective();

// 		// implement transformations
// 		_matrix.scale(_sceneScale, _sceneScale, _sceneScale);
// 		_matrix.rotateX( _rotation.x );
// 		_matrix.rotateY( _rotation.y );
// 		_matrix.rotateZ( _rotation.z );
// 		_matrix.translate(0, 0, this.bounds.depth);

// 		// transformed points
// 		var transformed = _matrix.transformArray(this.points3D);

// 		// cycle through transformed 3D points
// 		// pull out screen 2D points
// 		for(var i=0; i<_numPoints; i++) {
// 			var i3 = i*3;
// 			var i2 = i*2;

// 			var x = transformed[ i3 ];
// 			var y = transformed[ i3+1 ];
// 			var z = transformed[ i3+2 ];
			
// 			var scale = this.bounds.depth/(z+this.bounds.depth);

// 			this.points2D[ i2 ]   = x*scale+_half.width;
// 			this.points2D[ i2+1 ] = y*scale+_half.height;
// 		}

// 		// determine depth order of items
// 		// very crude and rudimentary
// 		var tindex = 0;
// 		var depthArr = []; // temp array to correlate transformed points to items
// 		for(var i=0; i<_fpath3Arr.length; i++) {
// 			var fpath3 = _fpath3Arr[i];

// 			var avgz = this.averageZ( 
// 				transformed,
// 				tindex,
// 				tindex+(fpath3._fpoints3.length*3)
// 			);

// 			var temp = {
// 				index: i,
// 				z: avgz
// 			};
// 			depthArr.push(temp);

// 			tindex += (fpath3._fpoints3.length*3)-1;
// 		}
// 		depthArr.sort(compare);

// 		// put the object into the group based on their z depth
// 		_groupBot.removeChildren(); // clear out in between draws
// 		_groupTop.removeChildren(); // clear out in between draws
// 		for(var i=0; i<depthArr.length; i++) {
// 			var path = _fpath3Arr[ depthArr[i].index ].get();
			
// 			if(path.name == 'Z-TOP') _groupTop.appendTop( path );
// 			else if(path.name == 'Z-BOTTOM') _groupBot.appendTop( path );
// 			else if(path != null) _groupBot.appendTop( path );
// 		}

// 		// TODO: fix this scaling issue
// 		if(_mode == 'ORTHO') {
// 			_groupTop.scale(200, _groupBot.position);
// 			_groupBot.scale(200, _groupBot.position);
// 		}

// 		return new Group( _groupBot,_groupTop );
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param arg0
// 	 *				x coordinate
// 	 *	@param arg1
// 	 *				y coordinate
// 	 *	@param arg2
// 	 *				z coordinate
// 	 *
// 	 *	@return total number of points added to scene
// 	 *
// 	 */
// 	this.setupPoint = function(arg0, arg1, arg2) {
// 		var returnVal = _numPoints;

// 		this.points2D[ this.points2D.length ] = 0;
// 		this.points2D[ this.points2D.length ] = 0;

// 		this.points3D[ this.points3D.length ] = arg0;
// 		this.points3D[ this.points3D.length ] = arg1;
// 		this.points3D[ this.points3D.length ] = arg2;

// 		_numPoints++;

// 		return returnVal;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param pointsArr
// 	 *				the array of points x[0], y[1], z[2]
// 	 *	@param start
// 	 *				start position in array
// 	 *	@param stop
// 	 *				stop position in array
// 	 *
// 	 *	@return average value of z
// 	 *
// 	 */
//  	this.averageZ = function(pointsArr, start, stop) {
// 		var avgz = 0;
// 		for(var i=start; i<stop; i+=2) {
// 		// 	// console.log( 'x\t' + pointsArr[i] );
// 		// 	// console.log( 'y\t' + pointsArr[i+1] );
// 		// 	// console.log( 'z\t' + pointsArr[i+2] );
// 			avgz += parseInt( pointsArr[i+2] );
// 		}
// 		var num = (stop-start)/3;
// 		return avgz/num;
// 	};

// 	/**
// 	 *
// 	 *	comparator to sort object by z value
// 	 *
// 	 */
//  	function compare(a,b) {
// 		if (a.z < b.z) return -1;
// 		if (a.z > b.z) return 1;
// 		return 0;
// 	};



// 	// ------------------------------------------------------------------------
// 	// Sets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param mode
// 	 *				'PERSPECTIVE' objects scale to perspective
// 	 *				'ORTHO' objects do not scale (isometric)
// 	 */
// 	this.setMode = function(mode) {
// 		_mode = mode != undefined ? mode : 'PERSPECTIVE';
// 	};

// 	/**
// 	 *	@param item
// 	 *			an FPath3 item to add to the scene
// 	 */
// 	/**
// 	 *	@param item
// 	 *			an array of FPath3 items to add to the scene
// 	 */
// 	this.addItem = function(item) {
// 		if(item.length > 0) {
// 			for(var i=0; i<item.length; i++) {
// 				_fpath3Arr[ _fpath3Arr.length ] = item[i];
// 				item[i].setScene(this);
// 			}
// 		}
// 		else {
// 			_fpath3Arr[ _fpath3Arr.length ] = item;
// 			item.setScene(this);
// 		}
// 	};
	
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param val
// 	 *			degree value for x axis rotation
// 	 */
// 	this.rotateX = function(val) {
// 		_rotation.setX(val);
// 	};

// 	/**
// 	 *	@param val
// 	 *			degree value for y axis rotation
// 	 */
// 	this.rotateY = function(val) {
// 		_rotation.setY(val);
// 	};

// 	/**
// 	 *	@param val
// 	 *			degree value for z axis rotation
// 	 */
// 	this.rotateZ = function(val) {
// 		_rotation.setZ(val);
// 	};



// 	// ------------------------------------------------------------------------
// 	// Gets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	@return scene path items as _groupBot 
// 	 *
// 	 */
// 	this.get = function() {
// 		return _groupBot;
// 	};

// 	/**
// 	 *
// 	 *	@return scene size as array [width, height, depth]
// 	 *
// 	 */
// 	this.getBounds = function() {
// 		return [ this.bounds.width, this.bounds.height, this.bounds.depth ];
// 	};

// 	/**
// 	 *
// 	 *	@return scene transformation _matrix
// 	 *
// 	 */
// 	this.getMatrix = function() {
// 		return _matrix;
// 	};

// 	/**
// 	 *
// 	 *	@return scene focal length (depth)
// 	 *
// 	 */
// 	this.getFocalLength = function() {
// 		return this.bounds.depth;
// 	};

// 	/**
// 	 *
// 	 *	@return scene scale
// 	 *
// 	 */
// 	this.getScale = function() {
// 		return _sceneScale;
// 	};


// };


// /**
//  *  
//  *	FSize3
//  *
//  *	A barebones collection of classes for primitive 3D rendering
//  *
//  *	code inspired by
//  *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
//  *	https://github.com/mrdoob/three.js/
//  *
//  *	modified/expanded for use in PaperJS by Ken Frederick
//  *
//  */



// /**
//  *	TODO: finish this
//  *
//  *	@param arg0
//  *			width
//  *	@param arg1
//  *			height
//  *	@param arg2
//  *			depth
//  */
// var F3D.FSize3 = this.FSize3 = function(arg0, arg1, arg2) {
// 	/*
// 	 *	public
// 	 */
// 	this.width = arg0 != undefined ? arg0 : 0;
// 	this.height = arg1 != undefined ? arg1 : 0;
// 	this.depth = arg2 != undefined ? arg2 : 0;



// 	// ------------------------------------------------------------------------
// 	// Sets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	@param val
// 	 *			set width value
// 	 */
// 	this.setWidth = function(val) {
// 		this.width = val;
// 	};
	
// 	/**
// 	 *
// 	 *	@param val
// 	 *			set height value
// 	 */
// 	this.setHeight = function(val) {
// 		this.height = val;
// 	};

// 	/**
// 	 *
// 	 *	@param val
// 	 *			set depth value
// 	 */
// 	this.setDepth = function(val) {
// 		this.depth = val;
// 	};

// 	// ------------------------------------------------------------------------
// 	this.set = function(arg0, arg1, arg2) {
// 		this.setWidth(arg0);
// 		this.setHeight(arg1);
// 		this.setDepth(arg2);
// 	};



// 	// ------------------------------------------------------------------------
// 	// Gets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	Get a copy of this size
// 	 */
// 	this.get = function() {
// 		return new F3D.FSize3(this.width, this.height, this.depth);
// 	};


// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	
// 	 *	@return random size
// 	 *
// 	 */
// 	/**
// 	 *	@param minw
// 	 *				minmum width (default: 0)
// 	 *	@param maxw
// 	 *				maximum width (default: artboard.bounds.width)
// 	 *	@param minh
// 	 *				minmum height (default: 0)
// 	 *	@param maxh
// 	 *				maximum height (default: artboard.bounds.height)
// 	 *	@param mind
// 	 *				minmum depth (default: 0)
// 	 *	@param maxd
// 	 *				maximum depth (default: 1000)
// 	 *
// 	 *	@return random size
// 	 *
// 	 */
// 	this.random = function(minw, maxw, minh, maxh, mind, maxd) {
// 		minw = (minw != undefined) ? minw : 0;
// 		maxw = (maxw != undefined) ? maxw : artboard.bounds.width;
// 		minh = (minh != undefined) ? minh : 0;
// 		maxh = (maxh != undefined) ? maxh : artboard.bounds.height;
// 		mind = (mind != undefined) ? mind : 0;
// 		maxd = (maxd != undefined) ? maxd : 1000;

// 		this.width = frederickkScript.random(minw, maxw);
// 		this.height = frederickkScript.random(minh, maxh);
// 		this.depth = frederickkScript.random(mind, maxd);
// 		return this;
// 	};

// 	/**
// 	 *	
// 	 *	@return volume
// 	 *
// 	 */
// 	this.volume = function() {
// 		return (this.width * this.height * this.depth);
// 	};


// };


/**
 *	
 *	Matrix3D
 *
 *	forked from daijimachine's "Matrix3D(lib)"
 *	http://jsdo.it/daijimachine/matrix3d
 * 
 *	@author Masayuki Daijima (ARCHETYP Inc.)
 *	http://www.daijima.jp/blog/
 *	http://twitter.com/daijimachine
 *
 *
 *	expanded and modified with inspiration from three.js
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	modification 
 *
 *	This library is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU Lesser General Public
 *	License as published by the Free Software Foundation; either
 *	version 2.1 of the License, or (at your option) any later version.
 *	
 *	http://creativecommons.org/licenses/LGPL/2.1/
 *	
 *	This library is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *	Lesser General Public License for more details.
 *	
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *	
 */
var Matrix3D = function( n11, n12, n13, n14, 
						 n21, n22, n23, n24, 
						 n31, n32, n33, n34, 
						 n41, n42, n43, n44 ) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	this.n11 = n11 || 1.0;	this.n12 = n12 || 0.0;	this.n13 = n13 || 0.0;	this.n14 = n14 || 0.0;
	this.n21 = n21 || 0.0;	this.n22 = n22 || 1.0;	this.n23 = n23 || 0.0;	this.n24 = n24 || 0.0;
	this.n31 = n31 || 0.0;	this.n32 = n32 || 0.0;	this.n33 = n33 || 1.0;	this.n34 = n34 || 0.0;
	this.n41 = n41 || 0.0;	this.n42 = n42 || 0.0;	this.n43 = n43 || 0.0;	this.n44 = n44 || 1.0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.clone = function() {
		return new Matrix3D( this.n11, this.n12, this.n13, this.n14,
							 this.n21, this.n22, this.n23, this.n24,
							 this.n31, this.n32, this.n33, this.n34,
							 this.n41, this.n42, this.n43, this.n44 );
	};

	// ------------------------------------------------------------------------
	this.concat = function(m) {
		var values = {};
	
		values.n11 = this.n11 * m.n11 + this.n12 * m.n21 + this.n13 * m.n31 + this.n14 * m.n41;
		values.n12 = this.n11 * m.n12 + this.n12 * m.n22 + this.n13 * m.n32 + this.n14 * m.n42;
		values.n13 = this.n11 * m.n13 + this.n12 * m.n23 + this.n13 * m.n33 + this.n14 * m.n43;
		values.n14 = this.n11 * m.n14 + this.n12 * m.n24 + this.n13 * m.n34 + this.n14 * m.n44;
							 
		values.n21 = this.n21 * m.n11 + this.n22 * m.n21 + this.n23 * m.n31 + this.n24 * m.n41;
		values.n22 = this.n21 * m.n12 + this.n22 * m.n22 + this.n23 * m.n32 + this.n24 * m.n42;
		values.n23 = this.n21 * m.n13 + this.n22 * m.n23 + this.n23 * m.n33 + this.n24 * m.n43;
		values.n24 = this.n21 * m.n14 + this.n22 * m.n24 + this.n23 * m.n34 + this.n24 * m.n44;
							 
		values.n31 = this.n31 * m.n11 + this.n32 * m.n21 + this.n33 * m.n31 + this.n34 * m.n41;
		values.n32 = this.n31 * m.n12 + this.n32 * m.n22 + this.n33 * m.n32 + this.n34 * m.n42;
		values.n33 = this.n31 * m.n13 + this.n32 * m.n23 + this.n33 * m.n33 + this.n34 * m.n43;
		values.n34 = this.n31 * m.n14 + this.n32 * m.n24 + this.n33 * m.n34 + this.n34 * m.n44;
							 
		values.n41 = this.n41 * m.n11 + this.n42 * m.n21 + this.n43 * m.n31 + this.n44 * m.n41;
		values.n42 = this.n41 * m.n12 + this.n42 * m.n22 + this.n43 * m.n32 + this.n44 * m.n42;
		values.n43 = this.n41 * m.n13 + this.n42 * m.n23 + this.n43 * m.n33 + this.n44 * m.n43;
		values.n44 = this.n41 * m.n14 + this.n42 * m.n24 + this.n43 * m.n34 + this.n44 * m.n44;
	
		this.initialize(values);
	};

	// ------------------------------------------------------------------------
	this.initialize = function(values) {
		for(var i in values) this[i] = values[i];
	};

	// ------------------------------------------------------------------------
	this.createBox = function(	scalex, scaley, scalez, 
								rotationx, rotationy, rotationz,
								tx, ty, tz ) {
		this.identity();
		if (rotationx != 0) this.rotateX( rotationx );
		if (rotationy != 0) this.rotateY( rotationy );
		if (rotationz != 0) this.rotateZ( rotationz );
		if (scalex != 1 || scaley != 1 || scalez != 1) this.scale( scalex, scaley, scalez );
		if (tx != 0 || ty != 0 || tz != 0) this.translate( tx, ty, tz );
	};


	// ------------------------------------------------------------------------
	this.identity = function() {
		this.initialize({ n11:1, n12:0, n13:0, n14:0, 
						  n21:0, n22:1, n23:0, n24:0, 
						  n31:0, n32:0, n33:1, n34:0, 
						  n41:0, n42:0, n43:0, n44:1 });
	};

	// ------------------------------------------------------------------------
	/**
	 *
	 *	Rotation
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
	 *	@param axis
	 *				FPoint3 xyz
	 *	@param angle 
	 *				rotation angle in degrees
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
			tx * x + cos, 		tx * y - sin * z, 	tx * z + sin * y, 	0,
			tx * y + sin * z, 	ty * y + cos, 		ty * z - sin * x, 	0,
			tx * z - sin * y, 	ty * z + sin * x, 	t * z * z + cos, 	0,
			0, 0, 0, 1
		);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Scaling
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
	/**
	 *	Translating
	 */
	this.translate = function(dx, dy, dz) {
		this.n41 += dx;
		this.n42 += dy;
		this.n43 += dz;
	};


	// ------------------------------------------------------------------------
	/**
	 *	Transforming
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
	
		for(var i=0; i<numPoints; i++) {
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
	/**
	 *	Position
	 */
	this.getPosition = function() {
		return [ this.n12, this.n13, this.n14 ];
	};

	/**
	 *
	 *	@param fpoint3
	 *				FPoint3 xyz
	 *
	 */
	this.setPosition = function(fpoint3) {
		this.n12 = fpoint3.x;
		this.n13 = fpoint3.y;
		this.n14 = fpoint3.z;
		return this;
	},

	/**
	 *
	 *	Frustrum
	 *	https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
	 *
	 */
	this.makeFrustum = function(left, right, bottom, top, near, far) {

		var values = {};

		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		values.n11 = x;	values.n12 = 0;	values.n13 = a;	 	values.n14 = 0;
		values.n21 = 0;	values.n22 = y;	values.n23 = b;	 	values.n24 = 0;
		values.n31 = 0;	values.n32 = 0;	values.n33 = c;	 	values.n34 = d;
		values.n41 = 0;	values.n42 = 0;	values.n43 = - 1;	values.n44 = 0;

		this.concat(values);
		// this.initialize(values);
	};

	/**
	 *
	 *	Presets modified from Three.js
	 *	https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
	 *
	 */
	// ------------------------------------------------------------------------
	this.makePerspective = function(fov, aspect, near, far) {
		var ymax = near * Math.tan( fov * Math.PI / 360 );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		this.makeFrustum( xmin, xmax, ymin, ymax, near, far );
	};

	// ------------------------------------------------------------------------
	this.makeOrtho = function(left, right, top, bottom, near, far) {

		var values = {};

		var w = right - left;
		var h = top - bottom;
		var p = far - near;

		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;

		values.n11 = 2/w;	values.n12 = 0;		values.n13 = 0;	 	values.n14 = -x;
		values.n21 = 0;		values.n22 = 2/h;	values.n23 = 0;	 	values.n24 = -y;
		values.n31 = 0;		values.n32 = 0;		values.n33 = -2/p; 	values.n34 = -z;
		values.n41 = 0;		values.n42 = 0;		values.n43 = 0;	 	values.n44 = 1;

		this.concat(values);
		// this.initialize(values);
	};


	// ------------------------------------------------------------------------
	this.toString = function() {
		return  this.n11 + ',' + this.n12 + ',' + this.n13 + ',' + this.n14 + ',' + 
				this.n21 + ',' + this.n22 + ',' + this.n23 + ',' + this.n24 + ',' + 
				this.n31 + ',' + this.n32 + ',' + this.n33 + ',' + this.n34 + ',' + 
				this.n41 + ',' + this.n42 + ',' + this.n43 + ',' + this.n44;
	};
};



/**
 *	
 *	FShape
 *	A collection of shapes for Path
 *	and methods for Item
 *
 *	I'm assuming that injecting all of the shapes into
 *	Path is not only cleaner but more efficient
 *	and therefore faster
 *
 *	FArrow
 *	FBubble
 *	FChain
 *	FCross
 *	FDrop
 *	FTriangle
 *
 */


/*
 *
 *	Item
 *
 */
Item.inject({
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	radius: 0,
	innerRadius: 0,



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	
	 *	@return {Number} distance of object from center of canvas
	 *
	 */
	distanceToCenter: function() {
		var dx = this.position.x - artboard.bounds.center.x;
		var dy = this.position.y - artboard.bounds.center.y;
		return (dx * dx + dy * dy) + 1;
	},

	/*
	 *	
	 *	@return {Number} radius
	 *
	 */
	// getRadius: function() {
	// 	// return this.size.radius();
	// },

	/**
	 *	@param {Size} spacing
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid: function(spacing) {
		this.position.snapGrid(spacing);
	},

	/**
	 *	snaps point to an isometric grid
	 *	
	 *	@param {Number} scale
	 *				scale of the grid (1.0 = 32x16)
	 *
	 */
	snapIso: function(scale) {
		this.position.snapIso(scale);
	},

	//-----------------------------------------------------------------------------
	/**
	 *	converts an CompoundPath into a Group otherwise returns original Item
	 *	
	 */
	toGroup: function() {
		if (frederickkScript.getType(this) == 'CompoundPath') {
			return new Group( this.children );
		}
		else {
			return this;
		}
	}

});



Path.inject({ 
	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/*
	 *
	 *	Additional Math Methods
	 *	TODO: fix bugs (downright false) math methods
	 *
	 */

	/**
	 *	@param b
	 *			array of barycentric coordinates
	 */		
	// TODO: currently implementation returns false point
	// toCartesian : function(bary) {
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		// var area = 0.5 * (p1.x * (p2.y - p3.y) +
	// 		// 				  p2.x * (p3.y - p1.y) +
	// 		// 				  p3.x * (p1.y - p2.y));

	// 		// var r = 2 * area / (a + b + c);
	// 		// var k = 2 * area / (a*bary[0] + b*bary[1] + c*bary[2]);

	// 		// var angleC = Math.acos((a*a + b*b - c*c) / (2*a*b));

	// 		// var cosC = Math.cos( angleC );
	// 		// var sinC = Math.sin( angleC );

	// 		// var x =	(k*bary[1] - r + (k*bary[0] - r)*cosC) / sinC;
	// 		// var y =	k*bary[0] - r;

	// 		// return new Point(
	// 		// 	x + this.getIncenter().x,
	// 		// 	y + this.getIncenter().y
	// 		// );

	// 		return new Point(
	// 			bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x,
	// 			bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x
	// 		);
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },

	/**
	 *	http://www.ssicom.org/js/x974780.htm
	 */
	sec : function(val) {
	   return 1/Math.cos(val);
	},



	//-----------------------------------------------------------------------------
	/*
	 *
	 *	FTriangle Center Methods
	 *	TODO: finish adding center methods
	 *
	 */

	/**
	 *	http://www.exaflop.org/docs/cgafaq/cga1.html
	 */
	getCircumCircle : function() {
		if( this.segments.length == 3 ) {
			var p1 = this.segments[0].point;
			var p2 = this.segments[1].point;
			var p3 = this.segments[2].point;

			var A = p2.x - p1.x; 
			var B = p2.y - p1.y; 
			var C = p3.x - p1.x; 
			var D = p3.y - p1.y; 

			var E = A*(p1.x + p2.x) + B*(p1.y + p2.y); 
			var F = C*(p1.x + p3.x) + D*(p1.y + p3.y); 

			var G = 2.0*(A*(p3.y - p2.y)-B*(p3.x - p2.x)); 
			
			var circumCenter;
			var dx, dy;

			if( Math.abs(G) < EPSILON ) {
				// Collinear - find extremes and use the midpoint

				function max3( a, b, c ) { return ( a >= b && a >= c ) ? a : ( b >= a && b >= c ) ? b : c; }
				function min3( a, b, c ) { return ( a <= b && a <= c ) ? a : ( b <= a && b <= c ) ? b : c; }

				var minx = min3( p1.x, p2.x, p3.x );
				var miny = min3( p1.y, p2.y, p3.y );
				var maxx = max3( p1.x, p2.x, p3.x );
				var maxy = max3( p1.y, p2.y, p3.y );

				circumCenter = new Point( ( minx + maxx ) / 2, ( miny + maxy ) / 2 );

				dx = circumCenter.x - minx;
				dy = circumCenter.y - miny;
			
			}
			else {
				var cx = (D*E - B*F) / G; 
				var cy = (A*F - C*E) / G;

				circumCenter = new Point( cx, cy );

				dx = circumCenter.x - p1.x;
				dy = circumCenter.y - p1.y;
			}

			this.radius = Math.sqrt( (dx * dx + dy * dy) );

			return circumCenter;
		}
		else {
			console.error( 'Not Path.FTriangle' );
			return null;
		}
	},

	/**
	 *	
	 *	@param {Point} v
	 *				Point to be checked if it lies within the circumcircle

	 */
	inCircumcircle : function( point ) {
		var dx = this.getCircumCircle().x - point.x;
		var dy = this.getCircumCircle().y - point.y;
		var ds = dx * dx + dy * dy;
		return ( ds <= sq(this.radius) );
	},

	// TODO: currently implementation returns false point
	// getInCircle : function() {
	// 	// vertices
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		var incenter = this.toCartesian( [1.0, 1.0, 1.0] );

	// 		var area = 0.5 * (p1.x * (p2.y - p3.y) +
	// 						  p2.x * (p3.y - p1.y) +
	// 						  p3.x * (p1.y - p2.y));

	// 		var semiperimeter = 0.5 * (a + b + c);

	// 		this.innerRadius = (area / semiperimeter);
	// 		return incenter;
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },

	getCentroid : function() {
		// vertices
		if( this.segments.length == 3 ) {
			var p1 = this.segments[0].point;
			var p2 = this.segments[1].point;
			var p3 = this.segments[2].point;

			return new Point(
				(p1.x + p2.x + p3.x)/3,
				(p1.y + p2.y + p3.y)/3
			);
		}
		else {
			console.error( 'Not Path.FTriangle' );
			return null;
		}
	},

	// TODO: currently implementation returns false point
	// getOrthocenter : function() {
	// 	// vertices
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		var bary = [
	// 			this.sec(a),
	// 			this.sec(b),
	// 			this.sec(c)
	// 		];
	// 		return this.toCartesian(bary);
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },

	// TODO: currently implementation returns false point
	// getIncenter : function() {
	// 	// vertices
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		var circum = a + b + c;

	// 		return new Point(
	// 			(a* p1.x + b * p2.x + c * p3.x) / circum,
	// 			(a * p1.y + b * p2.y + c * p3.y) / circum
	// 		);
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },

	// TODO: currently implementation returns false point
	// getSchifflerPoint : function() {
	// 	// vertices
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		var bary = [
	// 			1/(Math.cos(b) + Math.cos(c)),
	// 			1/(Math.cos(c) + Math.cos(a)),
	// 			1/(Math.cos(a) + Math.cos(b))
	// 		];
	// 		return this.toCartesian(bary, p1,p2,p3);
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },



	//-----------------------------------------------------------------------------
	statics: new function() {
		return {
			/**
			 *	
			 *	FArrow
			 *	Create simple arrow
			 *
			 *	@param {Point} headPoint
			 *				the head of the arrow
			 *	@param {Point} tailPoint
			 *				the tail of the arrow
			 *	@param {Size} arrowHeadSize
			 *				(optional) length of the arrow head
			 *
			 *	@example
			 *	var headPoint = new Point( 9,9 );
			 *	var tailPoint = new Point( 90,90 );
			 *	var arrowHeadSize = new Size( 18,18 );
			 *	var farrow = new Path.FArrow( headPoint, tailPoint, arrowHeadSize );
			 *
			 */
			FArrow: function( headPoint, tailPoint, arrowHeadSize ) {
				// the line part
				var path = new Path.Line( headPoint, tailPoint );

				// the arrow head
				arrowHeadSize = (arrowHeadSize != undefined) ? arrowHeadSize : new Size(headPoint.getDistance(tailPoint)*0.381924,headPoint.getDistance(tailPoint)*0.381924);

				// rotate arrow head around to correct position
				var a = Math.atan2( headPoint.x-tailPoint.x, tailPoint.y-headPoint.y );

				// slight "hack" to get strokCap correct
				var arrowHead = [];
				arrowHead[0] = new Path.Line( new Point(0,0), new Point(-arrowHeadSize.width,-arrowHeadSize.height) );
				arrowHead[1] = new Path.Line( new Point(0,0), new Point( arrowHeadSize.width,-arrowHeadSize.height) );
				for( var i=0; i<arrowHead.length; i++ ) {
					arrowHead[i].rotate( frederickkScript.radians(180+frederickkScript.degrees(a)), new Point(0,0) );
					arrowHead[i].translate( headPoint );
				}

				var group = new Group();
				group.appendTop( path );
				group.appendTop( arrowHead[0] );
				group.appendTop( arrowHead[1] );
				group.name = 'arrow';
				return group;
			},


			/**
			 *	
			 *	FBubble
			 *	Create a simple speech bubble
			 *
			 *	@param {Point} bubblePoint
			 *				the position of the bubble
			 *	@param {Size} bubbleSize
			 *				the size of the bubble
			 *	@param {Size} bubbleTagSize
			 *				the size of the tag
			 *	@param {String} bubbleTagCenter 
			 *				(optional)
			 *				'RANDOM'	randomly x-position the point (default)
			 *				'LEFT'		left align the x-position of the point
			 *				'CENTER'	center align the x-position of the point
			 *				'RIGHT'		right align the x-position of the point
			 *
			 *	@example
			 *	var bubblePoint = new Point( 45,45 );
			 *	var bubbleSize = new Size( 90,60 );
			 *	var bubbleTagSize = new Size( 9,9 );
			 *	var bubbleTagCenter = 'CENTER';
			 *	var b = new Path.FBubble( bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter );
			 *
			 */
			FBubble: function(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter) {
				var path = new Path();
				path.name = 'bubble';

				bubbleTagSize = (bubbleTagSize != undefined) ? bubbleTagSize : defaultFBubbleTagSize;
				if(bubbleSize.width < 10) {
					bubbleSize.width = 10;
					bubbleTagSize = new Size(10,10);
				}
				bubbleTagCenter = (bubbleTagCenter != undefined) ? bubbleTagCenter : 'RANDOM';

				// left side of bubble
				path.add( new Point(0,0) );
				var angle = 180;
				var through = new Point(
					bubbleSize.height/2 + Math.cos( frederickkScript.radians(angle) ) * (bubbleSize.height),
					bubbleSize.height/2 + Math.sin( frederickkScript.radians(angle) ) * (bubbleSize.height)
				);
				path.arcTo(through, new Point(0,bubbleSize.height));

				// middle bottom
				// create tag space somewhere along the bottom of the bubble
				var tagStart = frederickkScript.randomInt(0,bubbleSize.width-bubbleTagSize.width);

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
					tx = frederickkScript.randomInt(tagStart,tagStart+bubbleTagSize.width);
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
					bubbleSize.height/2 + Math.cos( frederickkScript.radians(angle) ) * (bubbleSize.height/2),
					bubbleSize.height/2 + Math.sin( frederickkScript.radians(angle) ) * (bubbleSize.height/2)
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
			 *	FChain
			 *	Create simple chain (a line with different endpoint sizes)
			 *	
			 *	@param {Point} arg0
			 *				point1 The first point (endpoint1)
			 *	@param {Number} arg1
			 *				radius of endpoint1
			 *	@param {Point} arg2
			 *				point2 The second point (endpoint2)
			 *	@param {Number} arg3
			 *				radius of endpoint2
			 *
			 *	@example
			 *	var point1 = new Point( 9,9 );
			 *	var radius1 = 9;
			 *	var point2 = new Point( 90,90 );
			 *	var radius2 = 90;
			 *	var fchain = new Path.FChain( point1, radius1, point2, radius2 );
			 *
			 */
			/**
			 *	
			 *	@param {Path} arg0
			 *				PathItem (endpoint1)
			 *	@param {Path} arg1
			 *				PathItem (endpoint2)
			 *
			 *	@example
			 *	var path1 = new Path.Circle( new Point(9,9), 9 );
			 *	var path2 = new Path.Circle( new Point(90,90), 90 );
			 *	var fchain = new Path.FChain( path1, path2 );
			 *
			 */
			FChain: function(arg0, arg1, arg2, arg3) {
				var obj1, obj2;

				// check for the type of arguments being passed
				var type = frederickkScript.getType(arg0);
				if( type == 'Point' ) {
					obj1 = new Path.Circle( arg0, arg1 );
					obj2 = new Path.Circle( arg2, arg3 );
				}
				else if( type == 'Path' ) {
					obj1 = arg0;
					obj2 = arg1;
				}
				else {
					return;
				}

				var tangents = frederickkScript.getCommonTangents(obj1, obj2);
				if( tangents != null ) {
					// path for chain
					var path = new Path();
					path.name = 'chain';

					path.add( tangents[0] );
					path.add( tangents[1] );

					// determine position of chain around endpoint2
					if( obj2.position.x > obj1.position.x ) angle = 0;
					else if( obj2.position.y < obj1.position.y ) angle = -90;
					else if( obj2.position.y > obj1.position.y ) angle = 90;
					else angle = 180;
					var tp2 = new Point(
						obj2.position.x + Math.cos( frederickkScript.radians(angle) ) * (obj2.bounds.width/2),
						obj2.position.y + Math.sin( frederickkScript.radians(angle) ) * (obj2.bounds.height/2)
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
						obj1.position.x + Math.cos( frederickkScript.radians(angle) ) * (obj1.bounds.width/2),
						obj1.position.y + Math.sin( frederickkScript.radians(angle) ) * (obj1.bounds.height/2)
					);
					path.arcTo(tp1, tangents[0]);
					path.closed = true;

					return path;
				}

			},


			/**
			 *
			 *	FCross
			 *	Create a cross
			 *	
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Size} size
			 *				size [width,height] of cross
			 *	@param {Number} strokeWidth
			 *				thickness of the cross
			 *	@param {String} crossType (optional)
			 *				'SHARP'		sharp edged cross (fill)
			 *				'LINE'		simple built of lines (stroke)
			 *
			 *	@example
			 *	var centerPoint = new Point( 45,45 );
			 *	var size = new Size( 45,45 );
			 *	var strokeWidth = 18;
			 *	var crossType = 'LINE';
			 *	var fcross = new Path.FCross( centerPoint, size, strokeWidth, crossType );
			 *
			 */
			FCross: function( centerPoint, size, strokeWidth, crossType ) {
				(strokeWidth != undefined) ? strokeWidth : 1.0;
				(crossType != undefined) ? crossType : 'LINE';

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
					line1.add( centerPoint.x + size.width, centerPoint.y - size.height );
					line1.add( centerPoint.x + size.width, (centerPoint.y - size.height) + (strokeWidth/2) );
					line1.add( (centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y + size.height );
					line1.add( centerPoint.x - size.width, centerPoint.y + size.height );
					line1.add( centerPoint.x - size.width, (centerPoint.y + size.height) - (strokeWidth/2) );
					line1.add( (centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y - size.height );
					line1.closed = true;

					line2 = new Path();
					line2.add( centerPoint.x - size.width, centerPoint.y - size.height );
					line2.add( (centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y - size.height );
					line2.add( centerPoint.x + size.width, (centerPoint.y + size.height) - (strokeWidth/2) );
					line2.add( centerPoint.x + size.width, centerPoint.y + size.height );
					line2.add( (centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y + size.height );
					line2.add( centerPoint.x - size.width, (centerPoint.y - size.height) + (strokeWidth/2) );
					line2.closed = true;
				}

				var group = new Group();
				group.appendTop( line1 );
				group.appendTop( line2 );
				group.name = 'cross';
				return group;
			},


			/**
			 *	FDrop
			 *	Create a (tear)drop
			 *
			 *	@param {Point} centerPoint
			 *				position of drop
			 *	@param {Number} arg1
			 *				scale drop, maintains intended proportion
			 *
			 *	@example
			 *	var centerPoint = new Point( 45,45 );
			 *	var scale = 45;
			 *	var fdrop = new Path.FDrop( centerPoint, scale );
			 *
			 */
			/**
			 *	
			 *	@param {Point} centerPoint
			 *				position of drop
			 *	@param {Size} arg1
			 *				scale drop, custom proportion
			 *
			 *	@example
			 *	var centerPoint = new Point( 45,45 );
			 *	var scale = new Size( 30,61.8 );
			 *	var fdrop = new Path.FDrop( centerPoint, scale );
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
				var type = frederickkScript.getType(arg1);
				if( type == 'Size' ) {
					path.scale( arg1.width, arg1.height );
				}
				else {
					path.scale( arg1 );
				}

				return path;
			},


			/**
			 *	FTriangle
			 *	Create a triangle
			 *
			 *	@param {Point} p1
			 *				first point of triangle
			 *	@param {Point} p2
			 *				second point of triangle
			 *	@param {Point} p3
			 *				third point of triangle
			 *
			 *	@example
			 *	var p1 = new Point( 9,9 );
			 *	var p2 = new Point( 90,45 );
			 *	var p3 = new Point( 45,90 ); 
			 *	var ftriangle = new Path.FTriangle( p1, p2, p3 );
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



// /**
//  *	
//  *	FBox
//  *	Create simple box
//  *
//  */
// 
// 
//  /**
//   *
//   *	TODO: make this an extension of FPath3
//   *
//   */
// var FShape.FBox = function(scene) {
// 	// ------------------------------------------------------------------------
// 	// Properties
// 	// ------------------------------------------------------------------------
// 	/*
// 	 *	public
// 	 */
// 	this.sides = new Array(6);

// 	this.vertices = [];

// 	// temporary until I figure out how
// 	// to extend Item properly
// 	this.name = '';

// 	this.visible = true;
// 	this.selected = false;

// 	this.strokeCap;
// 	this.strokeJoin;

// this.faceFRONT = [
// 		new F3D.FPoint3(-0.5, -0.5, -0.5),	// corner
// 		new F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
// 		new F3D.FPoint3( 0.5,	0.5, -0.5),	// corner
// 		new F3D.FPoint3(-0.5,	0.5, -0.5)	// corner
// 	];

// 	this.faceTOP = [
// 		new F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
// 		new F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
// 		new F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
// 		new F3D.FPoint3(-0.5, -0.5, -0.5)	// corner
// 	];

// 	this.faceBOTTOM = [
// 		new F3D.FPoint3(-0.5, 0.5,	0.5),	// corner
// 		new F3D.FPoint3( 0.5, 0.5,	0.5),	// corner
// 		new F3D.FPoint3( 0.5, 0.5, -0.5),	// corner
// 		new F3D.FPoint3(-0.5, 0.5, -0.5)	// corner
// 	];

// 	this.faceLEFT = [
// 		new F3D.FPoint3(-0.5, -0.5, -0.5),	// corner
// 		new F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
// 		new F3D.FPoint3(-0.5,	0.5,	0.5),	// corner
// 		new F3D.FPoint3(-0.5,	0.5, -0.5)	// corner
// 	];

// 	this.faceRIGHT = [
// 		new F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
// 		new F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
// 		new F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
// 		new F3D.FPoint3( 0.5,	0.5, -0.5)	// corner
// 	];

// 	this.faceBACK = [
// 		new F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
// 		new F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
// 		new F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
// 		new F3D.FPoint3(-0.5,	0.5,	0.5)	// corner
// 	];



// 	/*
// 	 *	private
// 	 */
// 	var _scene = scene;

// 	var _faces = [
// 		['front',	this.faceFRONT],
// 		['top',		this.faceTOP],
// 		['bottom',	this.faceBOTTOM],
// 		['left',	this.faceLEFT],
// 		['right',	this.faceRIGHT],
// 		['back',	this.faceBACK]
// 	];

// 	var _facesOpacity = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
// 	var _facesBlendModes = [
// 		'normal',	// FRONT
// 		'normal',	// TOP
// 		'normal',	// BOTTOM
// 		'normal',	// LEFT
// 		'normal',	// RIGHT
// 		'normal'	// BACK
// 	];

// 	var _facesFillColor = [
// 		new RGBColor(1.0, 1.0, 0.0, 0.8), // FRONT
// 		new RGBColor(1.0, 0.0, 1.0, 0.8), // TOP
// 		new RGBColor(0.0, 0.0, 1.0, 0.8), // BOTTOM
// 		new RGBColor(1.0, 0.0, 0.0, 0.8), // LEFT
// 		new RGBColor(0.0, 1.0, 1.0, 0.8), // RIGHT
// 		new RGBColor(0.0, 1.0, 0.0, 0.8)	// BACK
// 	];
// 	var _facesStrokeColor = [
// 		new RGBColor(1.0, 1.0, 0.0, 0.8), // FRONT
// 		new RGBColor(1.0, 0.0, 1.0, 0.8), // TOP
// 		new RGBColor(0.0, 0.0, 1.0, 0.8), // BOTTOM
// 		new RGBColor(1.0, 0.0, 0.0, 0.8), // LEFT
// 		new RGBColor(0.0, 1.0, 1.0, 0.8), // RIGHT
// 		new RGBColor(0.0, 1.0, 0.0, 0.8)	// BACK
// 	];
// 	var _facesStrokeWidth = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

// 	var _size = new F3D.FSize3(10,10,10);



// 	// ------------------------------------------------------------------------
// 	// Methods
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param arg0
// 	 *				translate x coordinate
// 	 *	@param arg1
// 	 *				translate y coordinate
// 	 *	@param arg2
// 	 *				translate z coordinate
// 	 *
// 	 */
// 	this.init = function(arg0, arg1, arg2) {
// 		for(var i=0; i<_faces.length; i++) {

// 			this.sides[i] = new F3D.FPath3();
// 			this.sides[i].name = _faces[i][0];

// 			this.vertices = _faces[i][1];
// 			for(var j=0; j<this.vertices.length; j++) {
// 				this.sides[i].add3( new F3D.FPoint3(
// 					this.vertices[j].x * _size.width,
// 					this.vertices[j].y * _size.height,
// 					this.vertices[j].z * _size.depth
// 				));
// 			}

// 			// ! temporary see above !
// 			this.sides[i].opacity = _facesOpacity[i];
// 			this.sides[i].blendMode = _facesBlendModes[i];
// 			this.sides[i].visible = this.visible;
// 			this.sides[i].selected = this.selected;

// 			this.sides[i].fillColor = _facesFillColor[i];

// 			this.sides[i].strokeColor = _facesStrokeColor[i];
// 			this.sides[i].strokeWidth = _facesStrokeWidth[i];
// 			this.sides[i].strokeCap = this.strokeCap;
// 			this.sides[i].strokeJoin = this.strokeJoin;

// 			this.sides[i].closed = true;
// 			this.sides[i].translate(arg0, arg1, arg2);

// 			_scene.addItem( this.sides[i] );
// 		}
// 	};



// 	// ------------------------------------------------------------------------
// 	// Sets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	all sets need to be called before .init()
// 	 *
// 	 */

// 	/**
// 	 *	@param name
// 	 *			name of the box (affects all faces)
// 	 */
// 	this.setName = function(name) {
// 		for(var i=0; i<_faces.length; i++) {
// 			_faces[i][0] = name;
// 		}
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param width
// 	 *			width of box
// 	 *	@param height
// 	 *			height of box
// 	 *	@param depth
// 	 *			depth of box
// 	 */
// 	this.setSize = function(width, height, depth) {
// 		_size.set(width, height, depth);
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param bVal
// 	 *			visibility of box (affects all faces)
// 	 */
// 	this.setVisible = function(bVal) {
// 		this.visible = bVal;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param bVal
// 	 *			selected of box (affects all faces)
// 	 */
// 	this.setSelected = function(bVal) {
// 		this.selected = bVal;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param face
// 	 *			opacity of box (affects all faces)
// 	 */
// 	/**
// 	 *	@param face
// 	 *			specific face
// 	 *	@param o
// 	 *			opacity value of face
// 	 */
// 	this.setOpacity = function(face, o) {
// 		if( face.length === undefined ) _facesOpacity[face] = o;
// 		else _facesOpacity = face;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param face
// 	 *			fill color of box (affects all faces)
// 	 */
// 	/**
// 	 *	@param face
// 	 *			specific face
// 	 *	@param col
// 	 *			fill color value of face (RGBColor())
// 	 */
// 	 this.setFillColor = function(face, col) {
// 		if( face.length === undefined ) _facesFillColor[face] = col;
// 		else _facesFillColor = face;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param face
// 	 *			stroke color of box (affects all faces)
// 	 */
// 	/**
// 	 *	@param face
// 	 *			specific face
// 	 *	@param col
// 	 *			stroke color value of face (RGBColor())
// 	 */
// 	this.setStrokeColor = function(face, col) {
// 		if( face.length === undefined ) _facesStrokeColor[face] = col;
// 		else _facesStrokeColor = face;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param face
// 	 *			stroke width of box (affects all faces)
// 	 */
// 	/**
// 	 *	@param face
// 	 *			specific face
// 	 *	@param w
// 	 *			stroke width
// 	 */
// 	this.setStrokeWidth = function(face, w) {
// 		if( face.length === undefined ) _facesStrokeWidth[face] = w;
// 		else _facesStrokeWidth = face;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param cap
// 	 *			stroke cap of box (affects all faces)
// 	 */
// 	this.setStrokeCap = function(cap) {
// 		this.strokeCap = cap;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *	@param join
// 	 *			stroke join of box (affects all faces)
// 	 */
// 	this.setStrokeJoin = function(join) {
// 		this.strokeJoin = join;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	clear fill of box
// 	 *
// 	 */
// 	this.noFill = function() {
// 		_facesFillColor = [];
// 	};

// 	/**
// 	 *
// 	 *	clear stroke of box
// 	 *
// 	 */
// 	this.noStroke = function() {
// 		_facesStrokeColor = [];
// 	}



// 	// ------------------------------------------------------------------------
// 	// Gets
// 	// ------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	@return array of FPath3 (faces)
// 	 *
// 	 */
// 	this.get = function() {
// 		return this.sides;
// 	};

// 	/**
// 	 *	@param index
// 	 *			face index number
// 	 *
// 	 *	@return FPath3
// 	 *
// 	 */
// 	this.get = function(index) {
// 		return this.sides[index];
// 	};

// 	//-----------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	@return number of faces
// 	 *
// 	 */
// 	this.getNumFaces = function() {
// 		return this.vertices.length-2;
// 	};

// 	// ------------------------------------------------------------------------
// 	/**
// 	 *
// 	 *	@return FSize3 dimensions of box
// 	 *
// 	 */
// 	this.getSize = function() {
// 		return _size;
// 	};

// };



// /**
//  *	
//  *	FSphere
//  *	Create simple sphere
//  *
//  */


//  /**
//   *
//   *	TODO: make this an extension of FPath3
//   *
//   */
// var FShape.FSphere = function(scene) {
// 	//-----------------------------------------------------------------------------
// 	// Properties
// 	//-----------------------------------------------------------------------------
// 	/*
// 	 *	public
// 	 */
// 	this.sides = [];
// 	this.vertices = [];

// 	// temporary until I figure out how
// 	// to extend Item properly
// 	this.name = '';

// 	this.visible = true;
// 	this.selected = false;

// 	this.strokeCap;
// 	this.strokeJoin;

// 	/*
// 	 *	private
// 	 */
// 	var _scene = scene;

// 	var _radius3 = 10;
// 	var _c = 0.5;

// 	var _lats;
// 	var _longs;

// 	var _facesOpacity = [];
// 	var _facesBlendModes = [];

// 	var _facesFillColor = [];
// 	var _facesStrokeColor = [];
// 	var _facesStrokeWidth = [];



// 	//-----------------------------------------------------------------------------
// 	// Methods
// 	//-----------------------------------------------------------------------------
// 	/**
// 	 *  @param lats
// 	 *  			number of latitude segments
// 	 *  @param longs
// 	 *  			number of longitude segments
// 	 */
// 	this._calculate = function(clats, clongs) {
// 		// this._calculate this.vertices
// 		this.vertices = [];
// 		for(var i=0; i<=clats; i++) {
// 			var lat0 = (Math.PI * (-_c + ( (i-1)/clats) ));
// 			var z0   = Math.sin(lat0);
// 			var zr0  = Math.cos(lat0);

// 			var lat1 = (Math.PI * (-_c + ( i/clats) ));
// 			var z1   = Math.sin(lat1);
// 			var zr1  = Math.cos(lat1);

// 			for(var j=0; j<=clongs; j++) {
// 				var lng = ((Math.PI*2) * ( (j-1)/clongs ));
// 				var x = Math.cos(lng);
// 				var y = Math.sin(lng);

// 				this.vertices.push( new F3D.FPoint3( x*zr0, y*zr0, z0 ) );
// 				this.vertices.push( new F3D.FPoint3( x*zr1, y*zr1, z1 ) );
// 			} // _longs
// 		} // _lats


// 		// Setup arrays
// 		this.sides = new Array(this.vertices.length-2);

// 		_facesOpacity = new Array(this.vertices.length-2);
// 		_facesBlendModes = new Array(this.vertices.length-2);
// 		_facesFillColor = new Array(this.vertices.length-2);
// 		_facesStrokeColor = new Array(this.vertices.length-2);
// 		_facesStrokeWidth = new Array(this.vertices.length-2);

// 		var numVertices = this.vertices.length-2;
// 		for(var i=0; i<numVertices; i++) {
// 			var v = this.vertices[i];
// 			var col = new HslColor( 360*i/numVertices, 0.9, 0.7);

// 			var depth = (v.z/scene.getFocalLength())*100;

// 			_facesOpacity[i] = 1.0;
// 			_facesBlendModes[i] = 'normal';

// 			_facesFillColor[i] = col.darken( depth );
// 			_facesStrokeColor[i] = col.darken( depth );
// 			_facesStrokeWidth[i] = 1.0;
// 		}
// 	};


// 	/**
// 	 *  @param arg0
// 	 *  			x translate value
// 	 *  @param arg1
// 	 *  			y translate value
// 	 *  @param arg2
// 	 *  			z translate value
// 	 */
// 	this.init = function(arg0, arg1, arg2) {
// 		if(_lats == null) this.setLatsLongs(6,6);

// 		for(var i=0; i<this.vertices.length-2; i++) {
// 			this.sides[i] = new F3D.FPath3();
// 			this.sides[i].name = 'face'+i;

// 			this.sides[i].add3( new F3D.FPoint3(
// 				this.vertices[i].x*(_radius3*0.5),
// 				this.vertices[i].y*(_radius3*0.5),
// 				this.vertices[i].z*(_radius3*0.5)
// 			));
// 			this.sides[i].add3( new F3D.FPoint3(
// 				this.vertices[i+1].x*(_radius3*0.5),
// 				this.vertices[i+1].y*(_radius3*0.5),
// 				this.vertices[i+1].z*(_radius3*0.5)
// 			));
// 			this.sides[i].add3( new F3D.FPoint3(
// 				this.vertices[i+2].x*(_radius3*0.5),
// 				this.vertices[i+2].y*(_radius3*0.5),
// 				this.vertices[i+2].z*(_radius3*0.5)
// 			));

// 			// ! temporary see above !
// 			this.sides[i].opacity = _facesOpacity[i];
// 			this.sides[i].blendMode = _facesBlendModes[i];
// 			this.sides[i].visible = this.visible;
// 			this.sides[i].selected = this.selected;

// 			this.sides[i].fillColor = _facesFillColor[i];

// 			this.sides[i].strokeColor = _facesStrokeColor[i];
// 			this.sides[i].strokeWidth = _facesStrokeWidth[i];
// 			this.sides[i].strokeCap = this.strokeCap;
// 			this.sides[i].strokeJoin = this.strokeJoin;

// 			this.sides[i].closed = true;
// 			this.sides[i].translate(arg0, arg1, arg2);

// 			scene.addItem( this.sides[i] );
// 		}
// 	};



// 	//-----------------------------------------------------------------------------
// 	// Sets
// 	//-----------------------------------------------------------------------------
// 	/**
// 	 *  @param r
// 	 *  		radius of sphere
// 	 */
// 	this.setSize = function(radius) {
// 		_radius3 = radius;
// 	};

// 	/**
// 	 *  @param lats
// 	 *  			number of latitude segments
// 	 *  @param longs
// 	 *  			number of longitude segments
// 	 */
// 	this.setLatsLongs = function(lats, longs) {
// 		_lats = (lats < 4) ? 4 : lats;
// 		_longs = (longs < 4) ? 4 : longs;
// 		this._calculate(_lats, _longs);
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setVisible = function(val) {
// 		this.visible = val;
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setSelected = function(val) {
// 		this.selected = val;
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setOpacity = function(face, o) {
// 		if( face.length === undefined ) _facesOpacity[face] = o;
// 		else _facesOpacity = face;
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setFillColor = function(face, col) {
// 		if( face.length === undefined ) _facesFillColor[face] = col;
// 		else {
// 			// _facesFillColor = face;
// 			for(var i=0; i<face.length; i++) {
// 				var v = this.vertices[i];
// 				var depth = (v.z/scene.getFocalLength())*100;
// 				_facesFillColor[i] = face.darken( depth );
// 			}
// 		}
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setStrokeColor = function(face, col) {
// 		if( face.length === undefined ) _facesStrokeColor[face] = col;
// 		else {
// 			// _facesStrokeColor = face;
// 			for(var i=0; i<face.length; i++) {
// 				var v = this.vertices[i];
// 				var depth = (v.z/scene.getFocalLength())*100;
// 				_facesStrokeColor[i] = face.darken( depth );
// 			}
// 		}
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setStrokeWidth = function(face, w) {
// 		if( face.length === undefined ) _facesStrokeWidth[face] = w;
// 		else _facesStrokeWidth = face;
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setStrokeCap = function(cap) {
// 		this.strokeCap = cap;
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setStrokeJoin = function(join) {
// 		this.strokeJoin = join;
// 	};

// 	// ------------------------------------------------------------------------
// 	this.noFill = function() {
// 		_facesFillColor = [];
// 	};
// 	this.noStroke = function() {
// 		_facesStrokeColor = [];
// 	};

// 	// ------------------------------------------------------------------------
// 	this.setVertices = function(vertice, val) {
// 		if( vertice.length === undefined ) this.vertices[vertice] = val;
// 		else this.vertices = vertice;
// 	};

	

// 	//-----------------------------------------------------------------------------
// 	// Gets
// 	//-----------------------------------------------------------------------------
// 	this.get = function() {
// 		return this.sides;
// 	};
// 	this.get = function(index) {
// 		return this.sides[index];
// 	};

// 	//-----------------------------------------------------------------------------
// 	this.getNumFaces = function() {
// 		return this.vertices.length-2;
// 	};

// 	//-----------------------------------------------------------------------------
// 	this.getVertices = function() {
// 		return this.vertices;
// 	};

// 	//-----------------------------------------------------------------------------
// 	this.getSize = function() {
// 		return _radius3;
// 	};



// };





/**
 *	
 *	Raster
 *
 *	A collection of supporing methods for
 *	creating & handling Raster objects
 *
 */
function RasterSetup() {
	var isRasterValid = false;
	var rasters = document.getItems({
		type: [Raster, PlacedFile],
		selected: true
	});

	if(rasters.length > 0) {
		raster = rasters.first;
		isRasterValid = true;
		if (raster instanceof PlacedFile && !raster.eps) {
			raster = raster.embed(false);
		}
	}
	else {
		isRasterValid = false;
		// RasterSelection();
	}
	
	// no image selected or created
	if(isRasterValid) {
		raster.selected = false;
	}
	else {
		console.log( 'Please select a valid image' );
	}

	return isRasterValid;
};

//-----------------------------------------------------------------------------
/**
 *
 *	@param {Item} sel
 *				a Path.Item (can also be a Group)
 *	@param {Number} width
 *				(optional) amount to add to overall width - default: 0
 *	@param {Number} height
 *				(optional) amount to add to overall height - default: 0
 *	@param {Number} res
 *				(optional) resolution - default: 72
 *
 *	@return Raster
 *
 */
function RasterSelection(sel, width, height, res) {
	width = (width === undefined) ? 0 : width;
	height = (height === undefined) ? 0 : height;
	res = (res === undefined) ? 72 : res;

	var groupSel = new Group();
	for( var i=0; i<sel.length; i++ ) {
		var obj = sel[i].clone();
		groupSel.appendTop( obj );
		sel[i].selected = false;
	}

	// set background
	var rect = new Path.Rectangle( groupSel.bounds );
	rect.bounds.width += width;
	rect.bounds.height += height;
	rect.position = groupSel.position;
	rect.fillColor = null;
	rect.strokeColor = null;
	groupSel.appendBottom( rect );

	// rasterize
	raster = groupSel.rasterize('rgb', res,0); 
	raster.selected = false;
	isRasterValid = true;

	// remove cloned items
	groupSel.remove();

	return raster;
};




/*
 *
 *	initiate global variable
 *
 */ 
var fs = frederickkScript || {};




