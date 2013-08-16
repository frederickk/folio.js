/*!
 *	
 *	folio.js
 *	v0.5
 *	https://github.com/frederickk/folio.js
 *
 *	11. August 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *	
 *	
 *	Folio.js is a library for Paper.js http://paperjs.org/. Folio.js
 *	serves as a collection of functions for supporting animations,
 *	rudimentary 3D, additional Path items and lastly a structured
 *	framework/chain of operations similar to that of Processing,
 *	OpenFrameworks, Cinder, et. al. 
 *
 *	Not all of the code in here was created by me
 *	but credit and links are given where credit is due
 *
 *	Additional information and demos can be found here
 *	http://kennethfrederick.de/folio.js/
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
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the GNU
 *	Lesser General Public License for more details.
 *	
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA	02110-1301	USA
 *	
 */



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

/*
 *	shim for using same code base for
 *	both versions of folio.js
 */
var paper = PaperScope = global;



/**
 *	Note from the Scriptographer.org Team
 *	
 *	In Scriptographer 2.9, we switched to a top-down coordinate system and
 *	degrees for angle units as an easier alternative to radians.
 *	
 *	For backward compatibility we offer the possibility to still use the old
 *	bottom-up coordinate system and radians for angle units, by setting the two
 *	values bellow. Read more about this transition on our website:
 *	http://scriptographer.org/news/version-2.9.064-arrived/
 */

script.coordinateSystem = 'top-down';
script.angleUnits = 'degrees';



/*
 *
 *	Scriptographer Global Scope
 *
 * 	The following are components that I have included within my
 * 	unsupported fork of Paper.js, which are not available natively
 * 	within Scriptogpraher
 * 
 *
 */
// Script.inject({
global.inject({
	enumerable: true,



	/**
	 *
	 *	These are specific methods for the
	 *	Scriptographer version of folio.js
	 * 
	 */

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
	},



	//-----------------------------------------------------------------------------
	/**
	 * 	@name Calculation
	 *
	 * 	@class A collection of global mathematical operations, similar
	 * 	to those found in Processing/OpenFrameworks/etc.
	 *
	 *	@example paper.map( ... ) OR if using with JavaScript directly map( ... )
	 *
	 */

	/**
	 *	@param {Number} minr
	 *				minmum range
	 *	@param {Number} maxr
	 *				maximum range
	 *
	 *	@return random number as float
	 *
	 *	@example
	 * 	var rand = Calculation.random(30, 90);
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
	 *	@example
	 * 	var randInt = Calculation.randomInt(30, 90);
	 *	
	 */
	randomInt: function(minr, maxr) {
		return parseInt( this.random(minr,maxr) );
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
	 *	@example
	 * 	var clamped = Calculation.clamp(120, 0, 90); // 90
	 *	
	 */
	clamp: function(val, min, max) {
		return (val < min) ? min : ((val > max) ? max : val);
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
	 *	@example
	 * 	var normed = Calculation.norm(45, 0, 90); // 0.5
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
	 *	@example
	 * 	var mapped = Calculation.map(180, 0, 360, 0.0, 2.0); // 1
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
	 *	@example
	 * 	var rounded = Calculation.roundDecimal(0.586, 2); // 0.59
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
	 *	@example
	 * 	var snapped = Calculation.snap(0.66, 0.2); // 0.6
	 *	
	 */
	snap: function(val, snapInc, roundFunction) {
		if (roundFunction === undefined) roundFunction = Math.round;
		return this.roundDecimal( snapInc * roundFunction(val / snapInc), 2 );
	},

	/**
	 *
	 *	@param {Number} start
	 *			fitst value
	 *	@param {Number} stop
	 *			second value
	 *	@param {Number} val
	 *			float: between 0.0 and 1.0
	 *
	 *	@return value between start and stop
	 *
	 *	@example
	 * 	var interpolateed = Calculation.interpolate(0, 100, 0.5); // 50
	 *	
	 */
	interpolate: function(start, stop, val) {
		return start + (stop-start) * val;
	},


	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {Number} val
	 *			input value
	 *
	 *	@return val as degree 
	 *
	 *	@example
	 * 	var deg = Calculation.degrees(Math.PI); // 180
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
	 *	@example
	 * 	var rad = Calculation.radians(180); // Math.PI
	 *	
	 */
	radians: function(val) {
		return val * (Math.PI/180);
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *	Calculate secants
	 *
	 *	http://www.ssicom.org/js/x974780.htm
	 *
	 *	@param {Number} val
	 *			input value
	 *
	 *	@example
	 * 	var s = Calculation.sec(180);
	 *	
	 */
	sec: function(val) {
		return 1/Math.cos(val);
	},

	/**
	 *
	 *	Calculate cosecants
	 *
	 *	http://www.ssicom.org/js/x974284.htm
	 *
	 *	@param {Number} val
	 *			input value
	 *
	 *	@example
	 * 	var cs = Calculation.cosec(180);
	 *	
	 */
	cosec: function(val) {
		return 1/Math.sin(val);
	},

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {Number} val
	 *			input value
	 *
	 *	@return squared value of val
	 *
	 *	@example
	 * 	var squared = Calculation.sq(30); // 900
	 *	
	 */
	sq: function(val) {
		return val*val;
	},

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param {Point} point
	 *			input point
	 *
	 *	@return slope ratio
	 *
	 */
	slope: function(point) {
	}


});



/**
 * 	@name Conversions
 *
 * 	@class A collection of helpful conversion ratios from and to pixels (or points)
 *
 */
var Conversions = new function() {

	return {
		// millimeters
		PIXEL_TO_MM: 0.352777778,
		MM_TO_PIXEL: 2.83464567,

		// centimeters
		PIXEL_TO_CM: 0.0352777778,
		CM_TO_PIXEL: 28.3464567,

		// inches
		PIXEL_TO_INCH: 0.0138888889,
		INCH_TO_PIXEL: 72,

		// picas
		PIXEL_TO_PICA: 0.0833333333,
		PICA_TO_PIXEL: 12
	};

};



/*
 *
 *	paper.Point
 *
 */
paper.Point.inject({

	/**
	 *
	 *  https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
	 *	
	 *	@param {Point} toPoint
	 *			interpolates the point towards a given target point
	 *	@param {Number} amt
	 *			(0.0 - 1.0) interpolation factor
	 *	@return {Point} interpolated Point
	 *
	 *	@example
	 *	var point = new Point(0, 0);
	 *	var toPoint = new Point(100, 100);
	 *	point.interpolateTo(toPoint, 0.5); // {x: 50, y: 50}
	 *
	 */
	interpolateTo: function(toPoint, amt) {
		this.x += ((toPoint.x - this.x) * amt);
		this.y += ((toPoint.y - this.y) * amt);
		return this;
	},

	/**
	 *
	 *	@param {Point} arg0
	 *			ending Point
	 *	@param {Number} arg1
	 *			(0.0 - 1.0) interpolate factor
	 *
	 *	@return {Point} new interpolateed Point
	 *
	 *	@example
	 *	var point = new Point(0, 30);
	 *	var end = new Point(360, 90);
	 *
	 *	point.interpolate( end, 0.5 );
	 *	console.log( interpolate ); // { x: 180, y: 60 }
	 *
	 */
	/**
	 *
	 *	@param {Point} arg0
	 *			starting Point
	 *	@param {Point} arg1
	 *			ending Point
	 *	@param {Number} arg2
	 *			(0.0 - 1.0) interpolate factor
	 *
	 *	@return {Point} new interpolateed Point
	 *
	 *	@example
	 *	var start = new Point(0, 30);
	 *	var end = new Point(360, 90);
	 *	var interpolate = new Point.interpolate( start, end, 0.5 );
	 *	console.log( interpolate ); // { x: 180, y: 60 }
	 *
	 */
	interpolate: function( arg0, arg1, arg2 ) {
		if(typeof arg1 === 'number') {
			// hmm... duplicate of interpolateTo( ... )
			// this.x = paper.interpolate(this.x, arg0.x, arg1);
			// this.y = paper.interpolate(this.y, arg0.y, arg1);
			// return this;
			return new Point(
				paper.interpolate(this.x, arg0.x, arg1),
				paper.interpolate(this.y, arg0.y, arg1)
			);
		}
		else {
			// return new interpolateed point from two points
			return new Point(
				paper.interpolate(arg0.x, arg1.x, arg2),
				paper.interpolate(arg0.y, arg1.y, arg2)
			);
		}
	},

	/**
	 *	{@grouptitle Distance & Length}
	 *
	 *	Returns the distance between the point and the center of the canvas
	 *
	 *	@return {Number}
	 *
	 */
	getDistanceToCenter: function() {
		// var dx = this.x - view.bounds.center.x;
		// var dy = this.y - view.bounds.center.y;
		// return (dx * dx + dy * dy) + 1;
		return this.getDistance( view.bounds.center );
	},


	/**
	 *	Normalize a point between two other points (start and end).
	 *
	 *	@param {Point} start
	 *				start Point
	 *	@param {Point} stop
	 *				stop Point
	 *
	 *	@return {Point} normalized Point
	 *
	 *	@example
	 *	var point = new Point(30, 270);
	 *	var start = new Point(90, 180);
	 *	var stop = new Point(180, 360);
	 *	point.norm(start, stop); // { x: -0.66667, y: 0.5 }')
	 *
	 */
	norm: function(start, stop) {
		this.x = paper.norm(this.x, start.x, stop.x);
		this.y = paper.norm(this.y, start.y, stop.y);
		return this;
	},

	// /**
	//  *	
	//  *	@return {Point} limit Point
	//  *
	//  */
	// limit: function(lim) {
	// 	if (this.magSq() > lim * lim) {
	// 		this.normalize();
	// 		this.mult * lim;
	// 		return this;
	// 	}
	// 	return this;
	// },

	/**
	 *	
	 *	Returns the heading angle (radians) of a point
	 *
	 *	@return {Number} vector heading of Point
	 *
	 *	@example
	 * 	var point = new Point(0, 90);
	 *	var result = point.getHeading();
	 *	console.log( paper.degrees(result) ); // 90
	 *
	 */
	getHeading: function() {
		console.log( 'getHeading' );
		return -1 * (Math.atan2(-this.y, this.x));
	},
	
	/**
	 *	{@grouptitle Vector Math Functions}
	 *
	 *	@return {Number} vector mag squared
	 *
	 *	@example
	 *	var point = new Point(0, 90);
	 *	var result = point.magSq();
	 *	console.log(result); // 8100
	 *
	 */
	magSq: function() {
		return this.x * this.x + this.y * this.y;
	}


});



/*
 *
 *	paper.Size
 *
 */
paper.Size.inject({

	/**
	 *	
	 *	@return {Number} area
	 *
	 *	@example
	 *	var size = new Size(10, 20);
	 *	var a = size.getArea(); // 200
	 *
	 */
	area: function() {
		return (this.width * this.height);
	},

	/**
	 *	
	 *	@return {Number} circumscribed radius
	 *
	 *	@example
	 * 	var size = new Size(10, 20);
	 *	var r = size.radius(); // 11.180339887498949
	 *
	 */
	radius: function() {
		var a = this.width;
		var b = this.height;
		return (Math.sqrt(a * a + b * b) / 2);
	},

	/**
	 *	
	 *	@return {Number} circumscribed diameter
	 *
	 *	@example
	 * 	var size = new Size(10, 20);
	 *	var d = size.diameter(); // 22.3606797749979
	 *
	 */
	diameter: function() {
		var a = this.width;
		var b = this.height;
		return (Math.sqrt(a * a + b * b));
	}

});



// ------------------------------------------------------------------------
var folio = folio || {};

