/**
 *  
 *	Core.js
 *	v0.3a
 *  
 *	16. February 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	Core Methods
 *	A collection mathematical operations, similar
 *	to those found in Processing
 *
 */


frederickkPaper = {
	// ------------------------------------------------------------------------
 	// Namespaces
	// ------------------------------------------------------------------------
 	//FControl: {}, 
 	FIO: {},
 	F3D: {},
 	FShape: {},
 	FTime: {},



	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param minr
	 *				minmum range
	 *	@param maxr
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
	 *	@param minr
	 *				minmum range
	 *	@param maxr
	 *				maximum range
	 *
	 *	@return random number as integer
	 *
	 */
	randomInt: function(minr, maxr) {
		return parseInt( frederickkPaper.random(minr,maxr) );
	},

	/**
	 *
	 *	http://www.siafoo.net/snippet/191
	 *
	 *	@param minr
	 *				minmum range
	 *	@param maxr
	 *				maximum range
	 *	@param bias
	 *				bias represents the preference towards lower or higher numbers,
	 *				as a number between 0.0 and 1.0. For example: 
	 *				random(0, 10, bias=0.9) will return 9 much more often than 1.
	 *
	 *	@return a random number
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
	clamp: function(val, min, max) {
		return val < min ? min:val > max ? min:val;
	},
	norm: function(val, start, stop) {
		return (val - start) / (stop - start);
	},

	map: function(value, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	},



	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param val
	 *			number
	 *	@param deci
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
	 */
	snap: function(value, gridSize, roundFunction) {
		if (roundFunction === undefined) roundFunction = Math.round;
		return gridSize * roundFunction(value / gridSize);
	},



	/**
	 *
	 *	@param {Number} amt
	 *			float: between 0.0 and 1.0
	 *
	 */
	lerp: function(start, stop, amt) {
		// return start + (stop-start) * amt;
		return stop + (start-stop) * amt;
	},



	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param val
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
	 *	@param val
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
	 *	@param point1
	 *			first point
	 *	@param point2
	 *			second point
	 *
	 *	@return vector angle in degrees
	 *
	 */
	getAngle: function(point1, point2) {
		return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
	},

	// ------------------------------------------------------------------------
	/**
	 *	get common outer tangents of two circles
	 *
	 *	@param arg0
	 *				the first PathItem (Circle)
	 *	@param arg1
	 *				the second PathItem (Circle)
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


	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param val
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
	 *	@param val
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
	 *	@param object
	 *			object whose type to determine
	 *
	 *	@return paperjs object type
	 *
	 */
	getType: function(object) {
		if (object instanceof paper.Point) return 'Point';
		else if (object instanceof paper.Size) return 'Size';
		else if (object instanceof paper.Rectangle) return 'Rectangle';
		else if (object instanceof Group) return 'Group';
		else if (object instanceof paper.PlacedItem) return 'PlacedItem';
		else if (object instanceof paper.Raster) return 'Raster';
		else if (object instanceof paper.PlacedSymbol) return 'PlacedSymbol';
		else if (object instanceof paper.Path) return 'Path';
		else if (object instanceof paper.CompoundPath) return 'CompoundPath';
		else if (object instanceof paper.Symbol) return 'Symbol';
		else if (object instanceof paper.TextItem) return 'TextItem';
		else return 'undefined'
	},

	/**
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
	trimToFit: function(textObj) {
		var visibleContent = textObj.visibleRange.content;
		textObj.content = trim(visibleContent);
		return textObj;
	},

	rtrim: function(str) {
		for (var i=str.length-1; str.charAt(i) ==' '; i--) {
			str = str.substring(0, i);
		}
		return str;
	},
	trim: function(str) {
		str = str.replace(/(^\s*)|(\s*$)/gi,"");
		str = str.replace(/[ ]{2,}/gi," ");
		str = str.replace(/\n /,"\n");
		return str;
	},

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
	merge: function(arr1, arr2) {
		var output = arr1.concat(arr2);
		output.shuffle();
		return output;
	},


	// ------------------------------------------------------------------------
	/**
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

/**
 *	
 *	@param start
 *				start position in array
 *	@param stop
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
 *	@param start
 *				start position in array
 *	@param stop
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
 *	paper (core)
 *
 */
paper.inject({
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	// constants
	EPSILON: 1.0e-6,
});



/*
 *
 *	paper.Point
 *
 */
paper.Point.inject({
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
		this.x = frederickkPaper.norm(this.x, start.x, stop.x);
		this.y = frederickkPaper.norm(this.y, start.y, stop.y);
		return this;
	},

	/**
	 *	@param {Array} arg0
	 *				random range of x [0,view.bounds.width]
	 *	@param {Array} arg1
	 *				random range of y [0,view.bounds.height]
	 *
	 *	@return {Point} random Point
	 *
	 */
	random: function( arg0, arg1 ) {
		this.x = (arg0 != undefined) ? frederickkPaper.random(arg0[0],arg0[1]) : Math.random()*view.bounds.width;
		this.y = (arg1 != undefined) ? frederickkPaper.random(arg1[0],arg1[1]) : Math.random()*view.bounds.height;
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
			x = frederickkPaper.lerp(this.x,	arg0.x,	arg1);
			y = frederickkPaper.lerp(this.y,	arg0.y,	arg1);
		}
		else {
			x = frederickkPaper.lerp(arg0.x,	arg1.x,	arg2);
			y = frederickkPaper.lerp(arg0.y,	arg1.y,	arg2);
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
	 *	@return {Number} angle of point
	 *
	 */
	getAngle: function() {
		return Math.atan2(this.y - 0, this.x - 0);
	}

});



/*
 *
 *	paper.Size
 *
 */
paper.Size.inject({
	/**
	 *	@param minw
	 *				minmum width (default: 0)
	 *	@param maxw
	 *				maximum width (default: view.bounds.width)
	 *	@param minh
	 *				minmum height (default: 0)
	 *	@param maxh
	 *				maximum height (default: view.bounds.height)
	 *
	 *	@return {Size} random size
	 *
	 */
	random: function(minw, maxw, minh, maxh) {
		minw = (minw != undefined) ? minw : 0;
		maxw = (maxw != undefined) ? maxw : view.bounds.width;
		minh = (minh != undefined) ? minh : 0;
		maxh = (maxh != undefined) ? maxh : view.bounds.height;

		this.width = frederickkPaper.random(minw, maxw);
		this.height = frederickkPaper.random(minh, maxh);
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

	/**
	 *	
	 *	@return {Number} radius
	 *
	 */
	radius: function() {
		var a = this.width;
		var b = this.height;
		return (Math.sqrt(a * a + b * b) / 2);
	}
});



/*
 *
 *	paper.Color
 *
 */
paper.Color.inject({
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} pct
	 *			percentage to darken color
	 *
	 *	@return {Color} darkened Color by input percentage
	 *
	 */
	darken: function(pct) {
		this.red -= pct;
		this.green -= pct;
		this.blue -= pct;
		return this;
	},

	/**
	 *
	 *	@param {Number} pct
	 *			percentage to lighten color
	 *
	 *	@return {Color} lightened Color by input percentage
	 *
	 */
	lighten: function(pct) {
		this.red += pct;
		this.green += pct;
		this.blue += pct;
		return this;
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
	 *	var color1 = new RgbColor( 0.0, 1.0, 0.7 );
	 *	var color2 = new RgbColor( 0.0, 0.7, 1.0 );
	 *	var lerpColor = new RgbColor().lerpColor( color1, color2, 0.5 );
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
	 *	var color1 = new RgbColor( 0.0, 1.0, 0.7 );
	 *	var color2 = new RgbColor( 0.0, 0.7, 1.0 );
	 *	var lerpColor = color1.lerpColor( color2, 0.5 );
	 *
	 */
	/*
	 *	TODO: move this to individual Color classes?
	 */
	lerp: function( arg0, arg1, arg2 ) {
		var r,g,b, h,s,l, a;

		if( arg0.getType() == 'gray' || this.getType() == 'gray' ) {
			if(typeof arg1 === 'number') {
				g = frederickkPaper.lerp(this.gray,		arg0.gray,	arg1);
				a = frederickkPaper.lerp(this.alpha,	arg0.alpha,	arg1);
			}
			else {
				g = frederickkPaper.lerp(arg0.gray,		arg1.gray,	arg2);
				a = frederickkPaper.lerp(arg0.alpha,	arg1.alpha,	arg2);
			}
			// this.gray = g;
			// this.alpha = a;
			return new GrayColor( g,a );
		}
		else if( arg0.getType() == 'rgb' || this.getType() == 'rgb' ) {
			if(typeof arg1 === 'number') {
				r = frederickkPaper.lerp(this.red,		arg0.red,	arg1);
				g = frederickkPaper.lerp(this.green,	arg0.green,	arg1);
				b = frederickkPaper.lerp(this.blue,		arg0.blue,	arg1);
				a = frederickkPaper.lerp(this.alpha,	arg0.alpha,	arg1);
			}
			else {
				r = frederickkPaper.lerp(arg0.red,		arg1.red,	arg2);
				g = frederickkPaper.lerp(arg0.green,	arg1.green,	arg2);
				b = frederickkPaper.lerp(arg0.blue,		arg1.blue,	arg2);
				a = frederickkPaper.lerp(arg0.alpha,	arg1.alpha,	arg2);
			}
			// this.red = r;
			// this.green = g;
			// this.blue = b;
			// this.alpha = a;
			return new RgbColor( r,g,b,a );
		}
		else if( arg0.getType() == 'hsl' || this.getType() == 'hsl' ) {
			if(typeof arg1 === 'number') {
				h = frederickkPaper.lerp(this.hue,			arg0.hue,		arg1);
				s = frederickkPaper.lerp(this.saturation,	arg0.saturation,arg1);
				l = frederickkPaper.lerp(this.lightness,	arg0.lightness,	arg1);
				a = frederickkPaper.lerp(this.alpha,		arg0.alpha,		arg1);
			}
			else {
				h = frederickkPaper.lerp(arg0.hue,			arg1.hue,		arg2);
				s = frederickkPaper.lerp(arg0.saturation,	arg1.saturation,arg2);
				l = frederickkPaper.lerp(arg0.lightness,	arg1.lightness,	arg2);
				a = frederickkPaper.lerp(arg0.alpha,		arg1.alpha,		arg2);
			}
			// this.hue = h;
			// this.saturation = s;
			// this.lightness = l;
			// this.alpha = a;
			return new HslColor( h,s,l,a );
		}
		else if( arg0.getType() == 'hsb' || this.getType() == 'hsb' ) {
			if(typeof arg1 === 'number') {
				h = frederickkPaper.lerp(this.hue,			arg0.hue,			arg1);
				s = frederickkPaper.lerp(this.saturation,	arg0.saturation,	arg1);
				b = frederickkPaper.lerp(this.brightness,	arg0.brightness,	arg1);
				a = frederickkPaper.lerp(this.alpha,		arg0.alpha,			arg1);
			}
			else {
				h = frederickkPaper.lerp(arg0.hue,			arg1.hue,			arg2);
				s = frederickkPaper.lerp(arg0.saturation,	arg1.saturation,	arg2);
				b = frederickkPaper.lerp(arg0.brightness,	arg1.brightness,	arg2);
				a = frederickkPaper.lerp(arg0.alpha,		arg1.alpha,			arg2);
			}
			// this.hue = h;
			// this.saturation = s;
			// this.brightness = b;
			// this.alpha = a;
			return new HsbColor( h,s,b,a );
		}

		// return this;
	},


	// ------------------------------------------------------------------------
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
		this.gray = (arg0 != undefined) ? frederickkPaper.random(arg0[0],arg0[1]) : Math.random();
		this.alpha = (arg1 != undefined) ? frederickkPaper.random(arg1[0],arg1[1]) : Math.random();
		return this;
	}
});

paper.RgbColor.inject({
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
	 *	@return {Color} random RgbColor()
	 *
	 */
	random: function( arg0, arg1, arg2, arg3 ) {
		this.red = Math.random();
		this.green = Math.random();
		this.blue = Math.random();
		this.alpha = (arg3 != undefined) ? frederickkPaper.random(arg3[0],arg3[1]) : Math.random();
		return this;
	}
});

paper.HslColor.inject({
	/**
	 *
	 *	@param {Array} arg0
	 *			random range of hue [0,360]
	 *	@param {Array} arg1
	 *			random range of saturation [0.0,1.0]
	 *	@param {Array} arg1
	 *			random range of lightness [0.0,1.0]
	 *	@param {Array} arg3
	 *			random range of alpha [0.0,1.0]
	 *
	 *	@return {Color} random HslColor()
	 *
	 */
	random: function( arg0, arg1, arg2, arg3 ) {
		this.hue = (arg0 != undefined) ? frederickkPaper.random(arg0[0],arg0[1]) : Math.random()*360;
		this.saturation = (arg1 != undefined) ? frederickkPaper.random(arg1[0],arg2[1]) : Math.random();
		this.lightness = (arg2 != undefined) ? frederickkPaper.random(arg1[0],arg2[1]) : Math.random();
		this.alpha = (arg3 != undefined) ? frederickkPaper.random(arg3[0],arg3[1]) : Math.random();
		return this;
	}
});

paper.HsbColor.inject({
	/**
	 *
	 *	@param {Array} arg0
	 *			random range of hue [0,360]
	 *	@param {Array} arg1
	 *			random range of saturation [0.0,1.0]
	 *	@param {Array} arg2
	 *			random range of brightness [0.0,1.0]
	 *	@param {Array} arg3
	 *			random range of alpha [0.0,1.0]
	 *
	 *	@return {Color} random HsbColor()
	 *
	 */
	random: function( arg0, arg1, arg2, arg3 ) {
		this.hue = (arg0 != undefined) ? frederickkPaper.random(arg0[0],arg0[1]) : Math.random()*360;
		this.saturation = (arg1 != undefined) ? frederickkPaper.random(arg1[0],arg2[1]) : Math.random();
		this.brightness = (arg2 != undefined) ? frederickkPaper.random(arg1[0],arg2[1]) : Math.random();
		this.alpha = (arg3 != undefined) ? frederickkPaper.random(arg3[0],arg3[1]) : Math.random();
		return this;
	}
});


