/*!
 *	
 *	folio.js
 *	v0.5
 *	https://github.com/frederickk/folio.js
 *
 *	16. February 2013
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
/*!
 *
 *	REQUIRED LIBRARIES!
 *
 *	PaperJs @ http://paperjs.org/
 *	JQuery @	http://jquery.com/download/
 *
 */



// ------------------------------------------------------------------------
var folio = folio || {};



/*
 *
 *	Initialize Structure
 *
 */
// (function() {
	// console.log('\nfolio.js');
	// console.log('v.0.5');
	// console.log('https://github.com/frederickk/folio.js');
	// console.log('ken.frederick@gmx.de');
	// console.log('------------------------------------\n');


	// create methods
	// drawing
	var Setup = function(){};
	var Draw = function(){};
	var Update = function(event){};

	var Animate = function(object){};
	var AnimateClear = function(){};

	// events
	// mouse
	var onMouseUp = function(event){};
	var onMouseDown = function(event){};
	var onMouseMove = function(event){};
	var onMouseDrag = function(event){};

	// keyboard
	var onKeyDown = function(event){};
	var onKeyUp = function(event){};


	// install Paper.js into window
	paper.install(window);


	// once the DOM is ready, setup Paper.js
	window.onload = function() {
 		paper.setup('canvas');
		console.log('Paper.js is go!');
		


		// ------------------------------------------------------------------------
		// Methods
		// ------------------------------------------------------------------------
		Setup();


		Draw();


		// ------------------------------------------------------------------------
		var AnimationGroup = new Group();
		AnimationGroup.name = '__AnimationGroup';

		function Animate(object, order) {
			// object must be a valid paper.js item
			// default is to add object to top
			if( order === 'bottom' ) AnimationGroup.appendBottom( object );
			else AnimationGroup.appendTop( object );
		};
		function AnimateClear() {
			if( project.activeLayer.children['__AnimationGroup'] ) {
				project.activeLayer.children['__AnimationGroup'].remove();
			}
		};

		

		// ------------------------------------------------------------------------
		// Events
		// ------------------------------------------------------------------------
		view.onFrame = function(event) {
			// TODO: 	add a method which clears an "animation group" each frame
			Update(event);
			AnimateClear();
		};
		
		view.onResize = function(event) {
			onResize(event);
		};

		// ------------------------------------------------------------------------
		var tool = new Tool();
		tool.onMouseUp = function(event) {
			onMouseUp(event);
		};
		
		tool.onMouseDown = function(event) {
			onMouseDown(event);
		};
		
		tool.onMouseMove = function(event) {
			onMouseMove(event);
		};
		
		tool.onMouseDrag = function(event) {
			onMouseDrag(event);
		};


		// ------------------------------------------------------------------------
		tool.onKeyDown = function(event) {
			onKeyDown(event);
		};

		tool.onKeyUp = function(event) {
			onKeyUp(event);
		};
		
		
		// ------------------------------------------------------------------------
		view.draw(); // draw the screen



		/**
		 *
		 *	Supporting Methods
		 *	
		 */
		// ------------------------------------------------------------------------
		function resizeCanvas() {
			// var width = window.innerWidth;
			// var height = window.innerHeight;
			
			// set canvas width and height
			var canvas = document.getElementById('canvas');
			var parent = canvas.parentNode;
			if (canvas.getContext) {  
				// canvas.width = width;
				// canvas.height = height;
				canvas.width = parent.offsetWidth;
				canvas.height = parent.offsetHeight;
			}

			// clear out view
			for( var i=0; i<projects.length; i++ ) {
				for( var j=0; j<projects[i].layers.length; j++ ) {
					var layer = projects[i].layers[j];
					// console.log( 'removing' );
					layer.removeChildren();
				}
			}

			// re-initiate setup
			Setup();
			// re-initiate draw
			Draw();

			// make sure view does its draw
			view.draw();
		};

		// ------------------------------------------------------------------------
		var resizeTimeout;
		$(window).resize(function() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resizeCanvas, 100);
		});
		resizeCanvas();

	};

// })();
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

/**
 *	
 *	FPath.js
 *	v0.5
 *	
 *	16. February 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	FPath
 *	A collection of shapes for paper.Path
 *	and methods for paper.Item
 *
 *	I'm assuming that injecting all of the shapes into
 *	paper.Path is not only cleaner but more efficient
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
 *	paper.Item
 *
 */
paper.Item.inject({
	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	@param {Size} spacing
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid: function(spacing) {
		// this.position = pt;
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
		// this.position = pt;
		this.position.snapIso(scale);
	},

	//-----------------------------------------------------------------------------
	/**
	 *	converts an CompoundPath into a Group otherwise returns original Item
	 *	
	 */
	toGroup: function() {
		if (folio.getType(this) == 'CompoundPath') {
			return new Group( this.children );
		}
		else {
			return this;
		}
	}

});



paper.Path.inject({ 
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

	//-----------------------------------------------------------------------------
	/*
	 *
	 *	FTriangle Center Methods
	 *	TODO: finish adding center methods
	 *
	 */



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
			 *	var headPoint = new paper.Point( 9,9 );
			 *	var tailPoint = new paper.Point( 90,90 );
			 *	var arrowHeadSize = new paper.Size( 18,18 );
			 *	var farrow = new paper.Path.FArrow( headPoint, tailPoint, arrowHeadSize );
			 *
			 */
			FArrow: function( headPoint, tailPoint, arrowHeadSize ) {
				// the line part
				var path = new Path( headPoint, tailPoint );

				// the arrow head
				arrowHeadSize = (arrowHeadSize != undefined) ? arrowHeadSize : new Size(headPoint.getDistance(tailPoint)*0.381924,headPoint.getDistance(tailPoint)*0.381924);

				// rotate arrow head around to correct position
				var a = Math.atan2( headPoint.x-tailPoint.x, tailPoint.y-headPoint.y );

				// slight "hack" to get strokCap correct
				var arrowHead = [];
				arrowHead[0] = new Path( new Point(0,0), new Point(-arrowHeadSize.width,-arrowHeadSize.height) );
				arrowHead[1] = new Path( new Point(0,0), new Point( arrowHeadSize.width,-arrowHeadSize.height) );
				for( var i=0; i<arrowHead.length; i++ ) {
					arrowHead[i].rotate( 180+paper.degrees(a), new Point(0,0) );
					arrowHead[i].translate( headPoint );
				}

				var group = new Group( path, arrowHead[0], arrowHead[1] );
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
			 *	var bubblePoint = new paper.Point( 45,45 );
			 *	var bubbleSize = new paper.Size( 90,60 );
			 *	var bubbleTagSize = new paper.Size( 9,9 );
			 *	var bubbleTagCenter = 'CENTER';
			 *	var b = new paper.Path.FBubble( bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter );
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
			 *	var point1 = new paper.Point( 9,9 );
			 *	var radius1 = 9;
			 *	var point2 = new paper.Point( 90,90 );
			 *	var radius2 = 90;
			 *	var fchain = new paper.Path.FChain( point1, radius1, point2, radius2 );
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
			 *	var path1 = new paper.Path.Circle( new Point(9,9), 9 );
			 *	var path2 = new paper.Path.Circle( new Point(90,90), 90 );
			 *	var fchain = new paper.Path.FChain( path1, path2 );
			 *
			 */
			FChain: function(arg0, arg1, arg2, arg3) {
				var obj1, obj2;

				// check for the type of arguments being passed
				if( arg0.type == 'Point' ) {
					obj1 = new Path.Circle( arg0, arg1 );
					obj2 = new Path.Circle( arg2, arg3 );
				}
				else if( arg0.type == 'Path' ) {
					obj1 = arg0;
					obj2 = arg1;
				}
				else {
					return;
				}

				var tangents = folio.getCommonTangents(obj1, obj2);
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
					path.closed;

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
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var size = new paper.Size( 45,45 );
			 *	var strokeWidth = 18;
			 *	var crossType = 'LINE';
			 *	var fcross = new paper.Path.FCross( centerPoint, size, strokeWidth, crossType );
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

				var group = new Group( line1, line2 );
				group.name = 'cross';
				return group;
			},


			/**
			 *	FDrop
			 *	Create a (tear)drop
			 *
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Number} arg1
			 *				scale drop, maintains intended proportion
			 *
			 *	@example
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var scale = 45;
			 *	var fdrop = new paper.Path.FDrop( centerPoint, scale );
			 *
			 */
			/**
			 *	
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Size} arg1
			 *				scale drop, custom proportion
			 *
			 *	@example
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var scale = new paper.Size( 30,61.8 );
			 *	var fdrop = new paper.Path.FDrop( centerPoint, scale );
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
				var type = folio.getType(arg1);
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
			 *	var p1 = new paper.Point( 9,9 );
			 *	var p2 = new paper.Point( 90,45 );
			 *	var p3 = new paper.Point( 45,90 ); 
			 *	var ftriangle = new paper.Path.FTriangle( p1, p2, p3 );
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

/**
 *  
 *	FIO.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	FIO
 *	A collection of I/O methods;
 *
 */


folio.FIO = {
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/*
	 *	Local Storage
	 */

	/**
	 *	save a value using HTML5 Local Storage
	 *	http://www.w3schools.com/html/html5_webstorage.asp
	 *	
	 *	@param name
	 *				the name (key) of what we want to save
	 *	@param value
	 *				what we want to save
	 */
	saveLocal : function(name, value) {
		if(window.localStorage) {
			localStorage.setItem(name, String(value));
		}
		else {
			console.error('localStorage not supported');
		}
	},

	/**
	 *	retrieve saved value (default: as string)
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getLocal : function(name) {
		return localStorage.getItem(name);
	},

	/**
	 *	retrieve saved value as an int
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getLocalInt : function(name) {
		return parseInt( getLocal(name) );
	},

	/**
	 *	retrieve saved value as a float
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getLocalFloat : function(name) {
		return parseFloat( getLocal(name) );
	},

	/*
	 *	@return a list of all items saved in local storage
	 *
	 */
	getAllLocal : function() {
		return sessionStorage;

	},

	/**
	 *	delete a saved value from local storage
	 *	
	 *	@param name
	 *				the name (key) of what we want to delete
	 *
	 */
	deleteLocal : function(name) {
		localStorage.removeItem(name);
	},



	/*
	 *	Session Storage
	 */

	/**
	 *	save a value using HTML5 Session Storage
	 *	http://www.w3schools.com/html/html5_webstorage.asp
	 *	
	 *	@param name
	 *				the name (key) of what we want to save
	 *	@param value
	 *				what we want to save
	 */
	saveSession : function(name, value) {
		if(window.sessionStorage) {
			sessionStorage.setItem(name, String(value));
		}
		else {
			console.error('sessionStorage not supported');
		}
	},

	/**
	 *	retrieve saved value (default: as string)
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSession : function(name) {
		return sessionStorage.getItem(name);
	},

	/**
	 *	retrieve saved value as an int
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSessionInt : function(name) {
		return parseInt( getSession(name) );
	},

	/**
	 *	retrieve saved value as a float
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSessionFloat : function(name) {
		return parseFloat( getSession(name) );
	},

	/**
	 *	@return a list of all items saved in session storage
	 *
	 */
	getAllSession : function() {
		return sessionStorage;

	},

	/**
	 *	delete a saved value from session storage
	 *	
	 *	@param name
	 *				the name (key) of what we want to delete
	 *
	 */
	deleteSession : function(name) {
		sessionStorage.removeItem(name);
	},



	/*
	 *	Cookies
	 *	http://www.quirksmode.org/js/cookies.html
	 */
	
	/**
	 *	save a value as a cookie
	 *	
	 *	@param name
	 *				the name (key) of what we want to save
	 *	@param value
	 *				what we want to save
	 *	@param days
	 *				how many days do we want to save it for
	 */
	saveCookie : function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = name + '=' + value + expires + '; path=/';
	},

	/**
	 *	retrieve a value from a cookie
	 *	
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	openCookie : function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	/**
	 *	delete a cookie
	 *	
	 *	@param name
	 *				the name (key) of what we want to delete
	 */
	deleteCookie : function(name) {
		saveCookie(name, '', -1);
	}

};


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

/**
 *	
 *	Easing.js
 *	v0.5
 *	
 *	Easing Functions
 *	originally inspired from http://gizma.com/easing/
 *	https://gist.github.com/gre/1650294
 *	
 *	KeySpline Function
 *	use bezier curve for transition easing function
 *	as inspired from Firefox's nsSMILKeySpline.cpp
 *	https://gist.github.com/gre/1926947#file-keyspline-js
 *	http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
 *	
 *	Copyright (c) 2012
 *	
 *	Gaetan Renaudeau
 *	renaudeau.gaetan@gmail.com
 *
 *	
 *	modified and augemented for usage with Paper.js
 *
 *	7. August 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	
 *	MIT License
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a
 *	copy of this software and associated documentation files (the "Software"),
 *	to deal in the Software without restriction, including without limitation
 *	the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *	and/or sell copies of the Software, and to permit persons to whom the
 *	Software is furnished to do so, subject to the following conditions:
 *	
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *	
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *	THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *	DEALINGS IN THE SOFTWARE.
 */


folio.FTime.Ease = function() {
	/**
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
	 *	use bezier curve for transition easing function
	 *	
	 *	@param {Array} arg0
	 *					an array (4) of normalized X,Y values [ x1, y1, x2, y2 ] 
	 *	
	 *	@example
	 *	var spline = new KeySpline(0.25, 0.1, 0.25, 1.0)
	 *	spline.get(t) // returns the normalized easing value | t must be in [0, 1] range
	 *	
	 */
	/**
	 * 
	 *	use bezier curve for transition easing function
	 *	
	 *	@param {Point} arg0
	 *					Point 1
	 *	@param {Point} arg1
	 *					Point 2
	 *	
	 *	@example
	 *	var spline = new KeySpline(
	 *		new Point( 80, 80 ),
	 *		new Point( 10, 45 )
	 *	);
	 *	spline.get(t) // returns the normalized easing value | t must be in [0, 1] range
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
		 *	@param {Number} t
		 *				 	a float from 0.0 - 1.0
		 *	@param {Number} arg0
		 *					x1 or y1
		 *	@param {Number} arg1
		 *					x2 or y2
		 *					
		 *	@return x(t)
		 *	
		 */
		function CalcBezier(t, arg0, arg1) {
			return ((A(arg0, arg1)*t + B(arg0, arg1))*t + C(arg0))*t;
		};
	 
		/**
		 *	@param {Number} t
		 *				 	a float from 0.0 - 1.0
		 *	@param {Number} arg0
		 *					x1 or y1
		 *	@param {Number} arg1
		 *					x2 or y2
		 *					
		 *	@return dx/dt
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


	// public
	return {
		/**
		 *	see http://easings.net/de for visual examples
		 *	of each spline method
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

};/**
 *  
 *	FDate.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	FDate
 *
 */


folio.FTime.FDate = function() {
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
 *	FStepper.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *  
 *  
 *	FStepper
 *
 */


folio.FTime.FStepper = function() {
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
	 *	TODO: implement ability to add _easing functions
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
				_timeEnd = paper.roundDecimal( (currentTime + ((1.0 - this.delta) * _stepMillis)), 3 );
			}
			else {
				_timeEnd = paper.roundDecimal( (currentTime + (this.delta*_stepMillis)), 3 );
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
			this.delta = paper.roundDecimal( (1.0 - ((_timeEnd - currentTime) / _stepMillis)), 3 );
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
			this.delta = paper.roundDecimal( ((_timeEnd - currentTime) / _stepMillis), 3 );
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
		else if(this.delta > 1.0) {
			this.delta = 1.0;
			return true;
		}
		else if(this.delta < 0.0) {
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
 *	FStopwatch.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	FStopwatch
 *	A simple stopwatch
 *
 */


folio.FTime.FStopwatch = function() {
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
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
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



/**
 *
 *	Matrix3D
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
 *	F3D.js
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
 *	3D Engine
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in Paper.js by Ken Frederick
 *	
 */


folio.F3D = {
	// ------------------------------------------------------------------------
 	// Namespaces
	// ------------------------------------------------------------------------
	FScene3: {},

	FPoint3: {},
	FSize3: {},
	FPath3: function() {},


	// ------------------------------------------------------------------------
 	// Methods
	// ------------------------------------------------------------------------
};

/**
 *  
 *	FPath3.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *  
 *
 *	3D Path Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in Paper.js by Ken Frederick
 *
 */



folio.F3D.FPath3 = Path.extend(/** @lends Path# */{
	// ------------------------------------------------------------------------
	// Properties
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
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param scene
	 *				the scene to attach this path to
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
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param scene
	 *			scene to associate points with
	 */
	setScene: function(scene) {
		// the scene
		this._scene = scene;

		for(var i=0; i<this._fpoints3.length; i++) {
			this._fpoints3[i].setup( this._scene );
		}
	},

	/**
	 *	@param _fpoint3
	 *			add FPoint3 to path
	 */
	add3: function(fpoint3) {
		this._fpoints3[ this._fpoints3.length ] = fpoint3;
	},


	// setSegments: function(segments) {
	// }


	// ------------------------------------------------------------------------
	/**
	 *	@param arg0
	 *			FPoint3 for transformation
	 */
	/**
	 *	@param arg0
	 *			x point
	 *	@param arg1
	 *			y point
	 *	@param arg2
	 *			z point
	 */
	translate: function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this._translation.x = arg0;
			this._translation.y = arg1;
			this._translation.z = arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
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

		for(var i=0; i<this._fpoints3.length; i++) {
			var pt3 = this._fpoints3[i];
			pt3.setX( (pt3.x + this._translation.x) );
			pt3.setY( (pt3.y + this._translation.y) );
			pt3.setZ( (pt3.z + this._translation.z) );
		}
	},

	/**
	 *	@param val
	 *			degree value for x axis rotation
	 */
	rotateX:  function(val) {
		this._rotation.x = val;
	},

	/**
	 *	@param val
	 *			degree value for y axis rotation
	 */
	rotateY:  function(val) {
		this._rotation.y = val;
	},

	/**
	 *	@param val
	 *			degree value for z axis rotation
	 */
	rotateZ:  function(val) {
		this._rotation.z = val;
	},



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	get: function() {
		// clear segments
		this._segments = [];

		// push points into 2D path
		for(var i=0; i<this._fpoints3.length; i++) {
			var pt3 = this._fpoints3[i];
			this.add( 
				new Point( pt3.x2D(), pt3.y2D() )
			);
		}
		return this;
	},


// }, new function() { // Scope for drawing

// 	return {
// 		_draw: function(ctx, param) {
// 		},
// 	};

// }, {

// statics: {

// }
	
});
/**
 *  
 *	FPath3Constuctors.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *  
 *
 *	FPath3 Constuctors
 *	
 *	A collection of primitive 3D shapes for folio.F3D.FPath3
 *
 *	FBox
 *	FSphere
 *
 */



folio.F3D.FPath3.inject({

	//-----------------------------------------------------------------------------
	statics: new function() {
		return {

			/**
			 * 
			 *	FBox
			 *	Create simple box
			 *
			 *	@param {folio.F3D.FScene3D} scene
			 *				the scene to attach the Box to
			 *	@param {folio.F3D.FPoint3} fpoint3
			 *	       		the position of the Box
			 *	@param {folio.F3D.FSize3} fsize3
			 *				the size of the Box
			 *
			 */
			FBox: function(scene, fpoint3, fsize3) {
				this._position3 = (fpoint3 != undefined) 
					? fpoint3
					: new folio.F3D.FPoint3( 0,0,0 );

				this._size = (fsize3 != undefined)
					? fsize3
					: new folio.F3D.FSize3( 10,10,10 );

				var sides = new Array(6);
				var faceFRONT = [
					new folio.F3D.FPoint3(-0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5, -0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5, -0.5)	// corner
				],
					faceTOP = [
					new folio.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3(-0.5, -0.5, -0.5)	// corner
				],
					faceBOTTOM = [
					new folio.F3D.FPoint3(-0.5, 0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, 0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, 0.5, -0.5),	// corner
					new folio.F3D.FPoint3(-0.5, 0.5, -0.5)	// corner
				],
					faceLEFT = [
					new folio.F3D.FPoint3(-0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5, -0.5)	// corner
				],
					faceRIGHT = [
					new folio.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5, -0.5)	// corner
				],
					faceBACK = [
					new folio.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5,	0.5)	// corner
				];

				var faces = [
					['front',	faceFRONT],
					['top',		faceTOP],
					['bottom',	faceBOTTOM],
					['left',	faceLEFT],
					['right',	faceRIGHT],
					['back',	faceBACK]
				];

				var vertices = [];
				for(var i=0; i<faces.length; i++) {
					sides[i] = new folio.F3D.FPath3();
					// sides[i].name = faces[i][0];
					sides[i].name = 'Z-TOP'; // hack until FScene3D is fixed

					vertices = faces[i][1];
					for(var j=0; j<vertices.length; j++) {
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
			 *	FSphere
			 *	Create simple sphere
			 *
			 *	@param {folio.F3D.FScene3D} scene
			 *				the scene to attach the Sphere to
			 *	@param {folio.F3D.FPoint3} fpoint3
			 *	       		the position of the Sphere
			 *	@param {folio.F3D.FSize3} radius
			 *				the radius of the Sphere
			 *	@param {Array} detail (optional)
			 *				the longitude and latitude detail
			 *				default: [6,6]
			 *				*** anything over [21,21] and you should probably be using Three.js ***
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
				for(var i=0; i<=latlon[0]; i++) {
					var lat0 = (Math.PI * (-_c + ( (i-1)/latlon[0]) ));
					var z0   = Math.sin(lat0);
					var zr0  = Math.cos(lat0);

					var lat1 = (Math.PI * (-_c + ( i/latlon[0]) ));
					var z1   = Math.sin(lat1);
					var zr1  = Math.cos(lat1);

					for(var j=0; j<=latlon[1]; j++) {
						var lng = ((Math.PI*2) * ( (j-1)/latlon[1] ));
						var x = Math.cos(lng);
						var y = Math.sin(lng);

						vertices.push( new folio.F3D.FPoint3( x*zr0, y*zr0, z0 ) );
						vertices.push( new folio.F3D.FPoint3( x*zr1, y*zr1, z1 ) );
					} // _longs
				} // _lats
				var sides = new Array(vertices.length-2);

				for(var i=0; i<vertices.length-2; i++) {
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

/**
 *  
 *	FPoint3.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *  
 *
 *	FPoint3
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in Paper.js by Ken Frederick
 *
 */



/**
 *	@param arg0
 *			x coordinate
 *	@param arg1
 *			y coordinate
 *	@param arg2
 *			z coordinate
 */
folio.F3D.FPoint3 = this.FPoint3 = function(arg0, arg1, arg2) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	private
	 */
	var _scene = null;

	var _xIndex = 0;
	var _yIndex = 0;
	var _zIndex = 0;
	
	var _xIndex2D = 0;
	var _yIndex2D = 0;


	/*
	 *	public
	 */
	this.x = arg0 != undefined ? arg0 : 0;
	this.y = arg1 != undefined ? arg1 : 0;
	this.z = arg2 != undefined ? arg2 : 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param scene
	 *			the scene with which the points are
	 *			associated with
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
	 *	@return random point
	 *
	 */
	/**
	 *	@param minx
	 *				minmum x (default: 0)
	 *	@param maxx
	 *				maximum x (default: view.bounds.width)
	 *	@param miny
	 *				minmum y (default: 0)
	 *	@param maxy
	 *				maximum y (default: view.bounds.height)
	 *	@param minz
	 *				minmum z (default: 0)
	 *	@param maxz
	 *				maximum z (default: 1000)
	 *
	 *	@return random point
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
	 *	@param val
	 *			set x value
	 */
	this.setX = function(val) {
		if( _scene != null ) _scene.points3D[_xIndex] = val;
		this.x = val;
	};
	
	/**
	 *
	 *	@param val
	 *			set y value
	 */
	this.setY = function(val) {
		if( _scene != null ) _scene.points3D[_yIndex] = val;
		this.y = val;
	};

	/**
	 *
	 *	@param val
	 *			set z value
	 */
	this.setZ = function(val) {
		if( _scene != null ) _scene.points3D[_zIndex] = val;
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
	 *	@return a copy of this point
	 */
	this.get = function() {
		return new folio.F3D.FPoint3(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	@return projected 2D x
	 */
	this.x2D = function() {
		return _scene.points2D[_xIndex2D];
	};

	/**
	 *	@return projected 2D y
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
	 *	Calculate the magnitude (length) of the point
	 *
	 *	@return the magnitude of the point
	 */
	this.mag = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Add a point to this point
	 *
	 *	@param arg0
	 *			the FPoint3 to be added
	 */
	/**
	 *	Add a point to this point
	 *
	 *	@param arg0
	 *			the x point to be added
	 *	@param arg1
	 *			the y point to be added
	 *	@param arg2
	 *			the z point to be added
	 */
	this.add = function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this.x += arg0;
			this.y += arg1;
			this.z += arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this.x += arg0.x();
			this.y += arg0.y();
			this.z += arg0.z();
		}
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Subtract a point to this point
	 *
	 *	@param arg0
	 *			the FPoint3 to be subtracted
	 */
	/**
	 *	Subtract a point to this point
	 *
	 *	@param arg0
	 *			the x point to be subtracted
	 *	@param arg1
	 *			the y point to be subtracted
	 *	@param arg2
	 *			the z point to be subtracted
	 */
	this.sub = function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this.x -= arg0;
			this.y -= arg1;
			this.z -= arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this.x -= arg0.x();
			this.y -= arg0.y();
			this.z -= arg0.z();
		}
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Scale this point by a scalar
	 *
	 *	@param n
	 *			the value to scale by
	 */
	this.scale = function(n) {
		this.x *= n;
		this.y *= n;
		this.z *= n;
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Multiply each element of one point by the elements of another point.
	 *
	 *	@param arg0
	 *			the FPoint3 to be multiplied
	 */
	/**
	 *	Multiply each element of one point by the elements of another point.
	 *
	 *	@param arg0
	 *			the x point to be multiplied
	 *	@param arg1
	 *			the y point to be multiplied
	 *	@param arg2
	 *			the z point to be multiplied
	 */
	this.mult = function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this.x *= arg0;
			this.y *= arg1;
			this.z *= arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this.x *= arg0.x();
			this.y *= arg0.y();
			this.z *= arg0.z();
		}
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Divide each element of one point by the elements of another point.
	 *
	 *	@param arg0
	 *			the FPoint3 to be divided
	 */
	/**
	 *	Divide each element of one point by the elements of another point.
	 *
	 *	@param arg0
	 *			the x point to be divided
	 *	@param arg1
	 *			the y point to be divided
	 *	@param arg2
	 *			the z point to be divided
	 */
	this.div = function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this.x /= arg0;
			this.y /= arg1;
			this.z /= arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this.x /= arg0.x();
			this.y /= arg0.y();
			this.z /= arg0.z();
		}
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Calculate the Euclidean distance between two points (considering a point as a vector object)
	 *
	 *	@param _fpoint3
	 *			another point
	 *
	 *	@return the Euclidean distance between
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
	 *				a point
	 * @param _fpoint3b
	 *				another point
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
   	 *	Normalize the point to length 1 (make it a unit point)
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
	 *	Return a representation of this point as an array.
	 */
	this.array = function() {
		return [this.x, this.y, this.z];
	};

};


/**
 *  
 *	FScene3D.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *  
 *  
 *	3D Scene Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in Paper.js by Ken Frederick
 *
 */



/**
 *
 *	TODO:	leave as is and accept or redo entire engine
 *			possibly look into using three.js as the engine	
 *
 */
folio.F3D.FScene3D = this.FScene3D = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	private
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

	/*
	 *	public
	 */
	this.bounds = new folio.F3D.FSize3(0,0,0);

	this.points3D = [];
	this.points2D = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	matrix for isometric projection
	 *
	 *	TODO: figure out why this has to be
	 *	configured like this?
	 */
	this._ortho = function() {
		_matrix.makeOrtho( 
			-_half.height,	// left
			_half.height,	// right
			_half.height,	// top
			-_half.height,	// bottom
			-_half.height,	// near
			_half.height	// far
		);
	};

	/**
	 *	_perspective( for perspective projection
	 */
	this._perspective = function() {
		_matrix.makePerspective( 
			50,		// fov
			0.5 * this.bounds.width/this.bounds.height,	// aspect
			_half.depth,		// near
			this.bounds.depth*2	// far
		);
	};


	// ------------------------------------------------------------------------
	/**
	 *	@param width
	 *				width of scene
 	 *				default: view.bounds.width
	 *	@param height
	 *				height of scene
 	 *				default: view.bounds.height
	 *	@param focalLength
	 *				focal length of scene
 	 *				default: 1000
	 *	@param mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
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
	 *	draws FPath3 objects
	 *
	 *	@return group of FPath3 objects
	 *
	 */
	this.draw = function() {
		// transformation matrix
		_matrix.identity();

		// set perspective mode
		if(_mode == 'ORTHO') this._ortho();
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
		for(var i=0; i<_numPoints; i++) {
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
		for(var i=0; i<_fpath3Arr.length; i++) {
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
		for(var i=0; i<depthArr.length; i++) {
			var path = _fpath3Arr[ depthArr[i].index ].get();
			
			if(path.name == 'Z-TOP') _groupTop.appendTop( path );
			else if(path.name == 'Z-BOTTOM') _groupBot.appendTop( path );
			else if(path != null) _groupBot.appendTop( path );
		}

		// TODO: fix this scaling issue
		if(_mode == 'ORTHO') {
			_groupTop.scale(200, _groupBot.position);
			_groupBot.scale(200, _groupBot.position);
		}

		return new Group( _groupBot,_groupTop );
	};


	// ------------------------------------------------------------------------
	/**
	 *	@param arg0
	 *				x coordinate
	 *	@param arg1
	 *				y coordinate
	 *	@param arg2
	 *				z coordinate
	 *
	 *	@return total number of points added to scene
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
	 *	@param pointsArr
	 *				the array of points x[0], y[1], z[2]
	 *	@param start
	 *				start position in array
	 *	@param stop
	 *				stop position in array
	 *
	 *	@return average value of z
	 *
	 */
 	this.averageZ = function(pointsArr, start, stop) {
		var avgz = 0;
		for(var i=start; i<stop; i+=2) {
		// 	// console.log( 'x\t' + pointsArr[i] );
		// 	// console.log( 'y\t' + pointsArr[i+1] );
		// 	// console.log( 'z\t' + pointsArr[i+2] );
			avgz += parseInt( pointsArr[i+2] );
		}
		var num = (stop-start)/3;
		return avgz/num;
	};

	/**
	 *
	 *	comparator to sort object by z value
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
	 *	@param mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
	 */
	this.setMode = function(mode) {
		_mode = mode != undefined ? mode : 'PERSPECTIVE';
	};

	/**
	 *	@param item
	 *			an FPath3 item to add to the scene
	 */
	/**
	 *	@param item
	 *			an array of FPath3 items to add to the scene
	 */
	this.addItem = function(item) {
		if(item.length > 0) {
			for(var i=0; i<item.length; i++) {
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
	 *	@param val
	 *			degree value for x axis rotation
	 */
	this.rotateX = function(val) {
		_rotation.setX(val);
	};

	/**
	 *	@param val
	 *			degree value for y axis rotation
	 */
	this.rotateY = function(val) {
		_rotation.setY(val);
	};

	/**
	 *	@param val
	 *			degree value for z axis rotation
	 */
	this.rotateZ = function(val) {
		_rotation.setZ(val);
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return scene path items as _groupBot 
	 *
	 */
	this.get = function() {
		return _groupBot;
	};

	/**
	 *
	 *	@return scene size as array [width, height, depth]
	 *
	 */
	this.getBounds = function() {
		return [ this.bounds.width, this.bounds.height, this.bounds.depth ];
	};

	/**
	 *
	 *	@return scene transformation _matrix
	 *
	 */
	this.getMatrix = function() {
		return _matrix;
	};

	/**
	 *
	 *	@return scene focal length (depth)
	 *
	 */
	this.getFocalLength = function() {
		return this.bounds.depth;
	};

	/**
	 *
	 *	@return scene scale
	 *
	 */
	this.getScale = function() {
		return _sceneScale;
	};


};


/**
 *  
 *	FSize3.js
 *	v0.5
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *  
 *
 *	FSize3
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in Paper.js by Ken Frederick
 *
 */



/**
 *	TODO: finish this
 *
 *	@param arg0
 *			width
 *	@param arg1
 *			height
 *	@param arg2
 *			depth
 */
folio.F3D.FSize3 = this.FSize3 = function(arg0, arg1, arg2) {
	/*
	 *	public
	 */
	this.width = arg0 != undefined ? arg0 : 0;
	this.height = arg1 != undefined ? arg1 : 0;
	this.depth = arg2 != undefined ? arg2 : 0;



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param val
	 *			set width value
	 */
	this.setWidth = function(val) {
		this.width = val;
	};
	
	/**
	 *
	 *	@param val
	 *			set height value
	 */
	this.setHeight = function(val) {
		this.height = val;
	};

	/**
	 *
	 *	@param val
	 *			set depth value
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
	 *	Get a copy of this size
	 */
	this.get = function() {
		return new folio.F3D.FSize3(this.width, this.height, this.depth);
	};


	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return random size
	 *
	 */
	/**
	 *	@param minw
	 *				minmum width (default: 0)
	 *	@param maxw
	 *				maximum width (default: view.bounds.width)
	 *	@param minh
	 *				minmum height (default: 0)
	 *	@param maxh
	 *				maximum height (default: view.bounds.height)
	 *	@param mind
	 *				minmum depth (default: 0)
	 *	@param maxd
	 *				maximum depth (default: 1000)
	 *
	 *	@return random size
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
	 *	@return volume
	 *
	 */
	this.volume = function() {
		return (this.width * this.height * this.depth);
	};


};


