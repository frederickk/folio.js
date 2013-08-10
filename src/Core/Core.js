 /**
 *  
 *	Core.js
 *	v0.5
 *  
 *	15. May 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *  
 *  
 *	Core Methods
 *
 */


folio = {
	// ------------------------------------------------------------------------
 	// Namespaces
	// ------------------------------------------------------------------------
 	FTime: {},
 	FIO: {},
 	F3D: {},
 	FPath: {},



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
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
	 *				random(0, 10, bias=0.9) will return 9 much more often than 1.
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
	 *	@return string of PaperJs object type
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

	/**
	 *	
	 *	@param {Array} items
	 *			Array of items to go through
	 *	@param {Number} name
	 *			name of Item to find
	 *
	 *	@return a path with the id that matches
	 *
	 */
	findById: function(items, id) {
		var path;
		for(var i=0; i<items.length; i++) {
			var item = items[i];		
			if(item.id == id) path = item; // break;
		}
		return path;
	},



	/*	------------------------------------------------------------------------
	 *
	 *	Strings
	 *
	 *	------------------------------------------------------------------------/

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



	/*	------------------------------------------------------------------------
	 *
	 *	Arrays
	 *
	 *	------------------------------------------------------------------------/

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

		return(a == b) ? 0 : (a>b) ? 1 : -1;
	},

	/**
	 *	
	 *	sort array by distance of object from center of canvas
	 *
	 */
	distanceToCenter: function(a, b) {
		var valueA = a.distanceToCenter();
		console.log( valueA );
		var valueB = b.distanceToCenter();
		console.log( valueB );
		var comparisonValue = 0;

		if (valueA > valueB) comparisonValue = -1;
		else if (valueA < valueB) comparisonValue = 1;

		return comparisonValue;
	}

};

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

/**
 *
 *	http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
 *
 *	@return original array without duplicates
 *
 */
Array.prototype.removeDuplicates = function() {
	return this.reduce(function(accum, cur) { 
		if (accum.indexOf(cur) === -1) accum.push(cur); 
		return accum; 
	}, [] );
};






/*
 *
 *	Global Scope (Paper.js core)
 *
 */
PaperScope.inject({
	enumerable: true,


	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	Java style println output
	 *
	 *	@param {Object} obj
	 *				any Javascript Object
	 */
	println: function(obj) {
		console.log( obj );
		console.log( '\n' );
	},

	/**
	 *	Java style print output
	 *
	 *	@param {Object} obj
	 *				any Javascript Object
	 */
	print: function(obj) {
		console.log( obj );
	}

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

});






/*
 *
 *	paper.Color
 *
 */
paper.Color.inject({
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

