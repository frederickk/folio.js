/**
 *	
 *	frederickkPaper.js
 *	v0.2a
 *	https://github.com/frederickk/frederickkPaper
 *
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *	
 *	
 *	A collection of methods/functions that i find useful
 *	specifically for application within PaperJs (http://paperjs.org/) 
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
/**
 *
 *	REQUIRED LIBRARIES!
 *
 *	PaperJs @ http://paperjs.org/
 *	JQuery @  http://jquery.com/download/
 *
 */



// ------------------------------------------------------------------------
var frederickkPaper = frederickkPaper || {};



(function() {
	console.log('\nfrederickkPaper.js');
	console.log('v.0.1a');
	console.log('https://github.com/frederickk/frederickkPaper');
	console.log('ken.frederick@gmx.de');
	console.log('------------------------------------\n');
})();


/**
 *  
 *	Core.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	Core Methods
 *
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
	random : function(minr, maxr) {
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
	randomInt : function(minr, maxr) {
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
	randomBias : function(minr, maxr, bias) {
		var _map = new Array(90.0, 9.00, 4.00, 2.33, 1.50, 1.00, 0.66, 0.43, 0.25, 0.11, 0.01);
		bias = Math.max(0, Math.min(bias, 1)) * 10;

		var i = parseInt(Math.floor(bias))
		var n = _map[i]
		if(bias < 10) n += (_map[i+1]-n) * (bias-i);

		return Math.pow( Math.random(),n ) * (maxr-minr) + minr;
	},



	// ------------------------------------------------------------------------
	clamp : function(val, min, max) {
		return val < min ? min:val > max ? min:val;
	},
	norm : function(val, start, stop) {
		return (val - start) / (stop - start);
	},

	map : function(value, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	},



	// ------------------------------------------------------------------------
	roundDecimal : function(orig, deci) {
		var multi = Math.pow(10,deci);
		return Math.round(orig * multi)/multi;
	},


	/**
	 *
	 *	snap from:
	 *	http://stackoverflow.com/questions/4507784/snap-to-grid-functionality-using-javascript
	 *
	 */
	snap : function(value, gridSize, roundFunction) {
		if (roundFunction === undefined) roundFunction = Math.round;
		return gridSize * roundFunction(value / gridSize);
	},



	/**
	 *
	 *	@param amt
	 *			float: between 0.0 and 1.0
	 *
	 */
	lerp : function(start, stop, amt) {
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
	degrees : function(val) {
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
	radians : function(val) {
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
	getAngle : function(point1, point2) {
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
	getCommonTangents : function(arg0, arg1) {
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
	sq : function(val) {
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
	boolToInt : function(val) {
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
	getType : function(object) {
		if (object instanceof paper.Point) return 'Point';
		else if (object instanceof paper.Size) return 'Size';
		else if (object instanceof paper.Rectangle) return 'Rectangle';
		else if (object instanceof paper.Group) return 'Group';
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
	findByName : function(items, name) {
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
	trimToFit : function(textObj) {
		var visibleContent = textObj.visibleRange.content;
		textObj.content = trim(visibleContent);
		return textObj;
	},

	rtrim : function(str) {
		for (var i=str.length-1; str.charAt(i) ==' '; i--) {
			str = str.substring(0, i);
		}
		return str;
	},
	trim : function(str) {
		str = str.replace(/(^\s*)|(\s*$)/gi,"");
		str = str.replace(/[ ]{2,}/gi," ");
		str = str.replace(/\n /,"\n");
		return str;
	},

	strToBool : function(str){
		switch(str.toLowerCase()){
			case "true": case "yes": case "1": return true;
			case "false": case "no": case "0": case null: return false;
			default: return Boolean(str);
		}
	},


	// ------------------------------------------------------------------------
	// Arrays
	// ------------------------------------------------------------------------
	merge : function(arr1, arr2) {
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
	alphabetical : function(a, b) {
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
	distanceToCenter : function(a, b) {
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
 *	@return maximum value within array
 *
 */
Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	//for(var i=1; i<len; i++) if(this[i] > max) max = this[i];
	for(var i=1; i<len; i++) if(this[i] > max) max = i;
	return max;
};

/**
 *	
 *	@return minimum value within array
 *
 */
Array.prototype.min = function() {
	var min = this[0];
	var len = this.length;
	//for (var i=1; i<len; i++) if(this[i] < min) min = this[i];
	for (var i=1; i<len; i++) if(this[i] < min) min = i;
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
 *	paper.Item
 *
 */
paper.Item.inject({
	/**
	 *	
	 *	@return distance of object from center of canvas
	 *
	 */
	distanceToCenter : function() {
		var dx = this.position.x - activeDocument.activeArtboard.bounds.center.x;
		var dy = this.position.y - activeDocument.activeArtboard.bounds.center.y;
		var distance = (dx * dx + dy * dy) + 1;

		return distance;
	},

	/*
	 *	
	 *	@return radius
	 *
	 */
	getRadius : function() {
		return this.size.radius();
	},

	/**
	 *	@param spacing
	 *				Size()
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid : function(spacing) {
		var pt = new frederickkPaper.FPoint().snapGrid(spacing);
		this.position = pt;
	},

	/**
	 *	snaps point to an isometric grid
	 *	
	 *	@param scale
	 *				scale of the grid (1.0 = 32x16)
	 *
	 */
	snapIso : function(scale) {
		var pt = new frederickkPaper.FPoint().snapIso(scale);
		this.position = pt;
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
	 *
	 *	@return random size
	 *
	 */
	random : function(minw, maxw, minh, maxh) {
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
	 *	@return area
	 *
	 */
	area : function() {
		return (this.width * this.height);
	},

	/**
	 *	
	 *	@return radius
	 *
	 */
	radius : function() {
		var a = this.width;
		var b = this.height;
		return (Math.sqrt(a * a + b * b) / 2);
	}
});




/*
 *
 *	paper.Point
 *	TODO: thinking about getting rid of FPoint
 *
 */
paper.Point.inject({
});


/**
 *  
 *	FColor.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	FColor
 *
 *	Expands paper.Color some of these may be redundant to
 *	the paperjs api, that's due to the legacy of the library's
 *	initially creation for use in Scriptographer.
 *
 */

frederickkPaper.FColor = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	// private
	var componentToHex = function(col) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	};


	// public
	this.lerpRGBColor = function(c1,c2, amt) {
		var r = frederickkPaper.lerp(c1.red,	c2.red,		amt);
		var g = frederickkPaper.lerp(c1.green,	c2.green,	amt);
		var b = frederickkPaper.lerp(c1.blue,	c2.blue,	amt);
		
		var col = new paper.RGBColor(r,g,b);
		return col;
	};
	this.randomRGBColor = function() {
		return new paper.RGBColor( Math.random(),Math.random(),Math.random() );
	};
	this.randomCMYKColor = function() {
		return new paper.CMYKColor( Math.random(),Math.random(),Math.random(),Math.random() );
	};
	this.randomGrayColor = function() {
		return new paper.GrayColor( Math.random() );
	};
	this.random = function() {
		return this.randomRGBColor();
	};

	// ------------------------------------------------------------------------
	this.ColorToInt = function(col) {
		var rgbInt;
		try {
			rgbInt = col.red;
			rgbInt = rgbInt << 8;
			rgbInt |= col.green;
			rgbInt = rgbInt << 8;
			rgbInt |= col.blue;
		}
		catch(err) {
			console.log( err );
			rgbInt = 16777215; // on error return white
		}
		return rgbInt;
	};
	this.IntToColor = function(RGBint) {
		var r = (RGB>> 16) & 255;
		var g = (RGB>> 8) & 255;
		var b = RGB& 255;
		return new paper.RGBColor( (r/255), (g/255), (b/255) );
	};

	// ------------------------------------------------------------------------
	/*
	 *	http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	 *
	 *	@param col
	 *			value as paper.RGBColor()
	 *
	 *	@return str
	 *			hex value of input color as string
	 *
	 */
	this.ColorToHex = function(col) {
		var r, g, b;
		var str = '';
		try {
			r = col.red*255;
			g = col.green*255;
			b = col.blue*255;
			str = '#'+ componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
		catch(err) {
			console.log( err );
			// str = '#ffffff'; // on error return white
		}
		return str;
	};
	this.HexToColor = function(_hex) {
		// var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		// var r = parseInt(result[1], 16);
		// var g = parseInt(result[2], 16);
		// var b = parseInt(result[3], 16);

		if( _hex.length >= 7 ) hex = _hex.split('#')[1];
		else hex = _hex;

		var big= parseInt(hex, 16);
		var r = (big>> 16) & 255;
		var g = (big>> 8) & 255;
		var b = big& 255;

		return new paper.RGBColor(r/255,g/255,b/255);
	};


	// ------------------------------------------------------------------------
	this.ByteToColor = function(r255, g255, b255, a255)  {
		var r = r255/255;
		var g = g255/255;
		var b = b255/255;
		var a = (a255 != undefined) ? a255/255 : 1.0;
		return new paper.RGBColor(r,g,b,a);
	};


	// ------------------------------------------------------------------------
	// /*
	//  *
	//  *	@param h
	//  *			0.0 - 1.0
	//  *	@param s
	//  *			0.0 - 1.0
	//  *	@param v
	//  *			0.0 - 1.0
	//  *
	//  *	@return
	//  *		new paper.RGBColor object (values = 0.0 - 1.0)
	//  *
	//  */
	// this.HSVtoColor = function(h, s, v) {
	// 	var r, g, b;
	// 	var RGB = new paper.RGBColor(Math.round(v), Math.round(v), Math.round(v));
	// 	if(s!=0) { 
	// 		// h must be < 1
	// 		var var_h = h * 6;
	// 		if (var_h==6) var_h = 0;
	// 		var var_i = Math.floor( var_h );
	// 		var var_1 = v*(1-s);
	// 		var var_2 = v*(1-s*(var_h-var_i));
	// 		var var_3 = v*(1-s*(1-(var_h-var_i)));
	// 		if(var_i==0) { 
	// 			var_r = v; 
	// 			var_g = var_3; 
	// 			var_b = var_1;
	// 		}
	// 		else if(var_i==1) { 
	// 			var_r = var_2;
	// 			var_g = v;
	// 			var_b = var_1;
	// 		}
	// 		else if(var_i==2) { 
	// 			var_r = var_1;
	// 			var_g = v;
	// 			var_b = var_3
	// 		}
	// 		else if(var_i==3) { 
	// 			var_r = var_1;
	// 			var_g = var_2;
	// 			var_b = v;
	// 		}
	// 		else if (var_i==4) { 
	// 			var_r = var_3;
	// 			var_g = var_1;
	// 			var_b = v;
	// 		}
	// 		else { 
	// 			var_r = v;
	// 			var_g = var_1;
	// 			var_b = var_2
	// 		}
	// 		RGB.red = Math.round(var_r);
	// 		RGB.green = Math.round(var_g);
	// 		RGB.blue = Math.round(var_b);
	// 	}
	// 	return RGB;
	// };

};


/**
 *
 *	paper.Color
 *
 */
paper.Color.inject({
	darken : function(pct) {
		this.red -= pct;
		this.green -= pct;
		this.blue -= pct;
		return this;
	},
	lighten : function(pct) {
		this.red += pct;
		this.green += pct;
		this.blue += pct;
		return this;
	}
});


/**
 *  
 *	FConversions.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	FConversions
 *
 *	A collection of helpful conversion ratios
 *
 */
frederickkPaper.FConversions = function() {
	// conversions
	this.ptToMm = 0.352777778;
	this.mmToPt = 2.83464567;

	this.ptToCm = 0.0352777778;
	this.CmToPt = 28.3464567;

	this.ptToIn = 0.0138888889;
	this.inToPt = 72;

	this.ptToPi = 0.0833333333;
	this.piToPt = 12;

};


/**
 *  
 *	FPoint.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	FPoint
 *	TODO: thinking about getting rid of FPoint
 *
 */
frederickkPaper.FPoint = paper.Point.extend({
	norm : function(startPt, stopPt) {
		this.x = frederickkPaper.norm(this.x, start.x, stop.x);
		this.y = frederickkPaper.norm(this.y, start.y, stop.y);
		return this;
	},

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
	 *
	 *	@return random size
	 *
	 */
	random : function(minx, maxx, miny, maxy) {
		minx = (minx != undefined) ? minx : 0;
		maxx = (maxx != undefined) ? maxx : view.bounds.width;
		miny = (miny != undefined) ? miny : 0;
		maxy = (maxy != undefined) ? maxy : view.bounds.height;

		this.x = frederickkPaper.random(minx, maxx);
		this.y = frederickkPaper.random(miny, maxy);
		return this;
	},

	/**
	 *	
	 *	@return vector heading of point
	 *
	 */
	heading : function() {
		return -1 * (Math.atan2(-this.y, this.x));
	},

	/**
	 *
	 *  https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
	 *
	 */
	interpolateTo : function(p2, f) {
		this.x += ((p2.x - this.x) * f);
		this.y += ((p2.y - this.y) * f);
		return this;
	},

	lerp : function(p1,p2, amt) {
		var x = frederickkPaper.lerp(p1.x,	p2.x,	amt);
		var y = frederickkPaper.lerp(p1.y,	p2.y,	amt);
		
		return new Point(x,y);
	},


	// ------------------------------------------------------------------------
	limit : function(lim) {
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
	 *	@return vector mag squared
	 *
	 */
	magSq : function() {
		return this.x * this.x + this.y * this.y;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	http://gmc.yoyogames.com/index.php?showtopic=290349
	 *
	 *	@param spacing
	 *				Size()
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid : function(spacing) {
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
	 *	@param scale
	 *				scale of the grid (1.0 = 32x16)
	 *
	 */
	snapIso : function(scale) {
		if(scale === null) scale = 1;
		return this.snapGrid( new Size(32*scale,16*scale) );
	},



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return angle of point
	 *
	 */
	getAngle : function() {
		return Math.atan2(this.y - 0, this.x - 0);
	}


});


/**
 *  
 *	FIO.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FIO
 *
 *	A collection of I/O methods;
 *
 */
frederickkPaper.FIO = {
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

	/*
	 *	retrieve our saved value (default: as string)
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getLocal : function(name) {
		return localStorage.getItem(name);
	},

	/*
	 *	retrieve our saved value as an int
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getLocalInt : function(name) {
		return parseInt( getLocal(name) );
	},

	/*
	 *	retrieve our saved value as a float
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
	 *
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

	/*
	 *	retrieve our saved value (default: as string)
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSession : function(name) {
		return sessionStorage.getItem(name);
	},

	/*
	 *	retrieve our saved value as an int
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSessionInt : function(name) {
		return parseInt( getSession(name) );
	},

	/*
	 *	retrieve our saved value as a float
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSessionFloat : function(name) {
		return parseFloat( getSession(name) );
	},

	/*
	 *	@return a list of all items saved in session storage
	 *
	 */
	getAllSession : function() {
		return sessionStorage;

	},

	/**
	 *
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
	 *
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
	 *
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
	 *
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
 *	FDate.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FDate
 *
 */
frederickkPaper.FTime.FDate = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	this.date;

	// private
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	// private
	var addZero = function(val) {
		if (val.length == 1) val = '0' + val;
		return val;
	};


	// public
	this.year = function() {
		if(this.date === undefined) this.date = new Date();
		var year = String( this.date.getFullYear() ); 
		return year;
	};

	/**
	 *	@return hour
	 *			return the current hour as string 'HH'
	 */
	this.month = function() {
		if(this.date === undefined) this.date = new Date();
		var month = String( this.date.getMonth() ); 
		hour = addZero(month);
		return month;
	};

	/**
	 *	@return hour
	 *			return the current hour as string 'HH'
	 */
	this.day = function() {
		if(this.date === undefined) this.date = new Date();
		var day = String( this.date.getDate() );
		return day;
	};

	/**
	 *	@return hour
	 *			return the current hour as string 'HH'
	 */
	this.hour = function() {
		if(this.date === undefined) this.date = new Date();
		var hour = String( this.date.getHours() ); 
		hour = addZero(hour);
		return hour;
	};

	/**
	 *	@return minute
	 *			return the current minute as string 'mm'
	 */
	this.minute = function() {
		if(this.date === undefined) this.date = new Date();
		var minute = String( this.date.getMinutes() ); 
		minute = addZero(minute);
		return minute;
	};

	/**
	 *	@return second
	 *			return the current second as string 'ss'
	 */
	this.second = function() {
		if(this.date === undefined) this.date = new Date();
		var second = String( this.date.getSeconds() ); 
		second = addZero(second);
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
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	FStepper
 *
 */
frederickkPaper.FTime.FStepper = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var stepMillis = 1000; // set to default of 1s OR 1000ms
	
	var timeStart = 0.0;
	var timeEnd = 0.0;
	
	var bToggleStart = 0;
	var bBeginStpper = false;
	var bIn = false;
	var bOut = false;
	var bDone = true;

	var easing = 0.05;
	var bEase = true;

	// public
	this.delta = 1.0;
	this.counter = -1;


	
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.toggle = function() {
		if (bToggleStart == 0) {
			bToggleStart = 1;
			this.stepOut();
		}
		else {
			bToggleStart = 0;
			this.stepIn();
		}
	}

	// ------------------------------------------------------------------------
	/**
	 *	TODO: implement easing
	 *
	 *	required function to keep the timing in sync
	 *	with the application
	 *
	 *	@param currentTime
	 *			the elapsed time of the application in seconds
	 */
	this.update = function(currentTime) {
		if(bBeginStpper) {
			bBeginStpper = false;
			timeStart = currentTime;
			if(bIn) {
				timeEnd = frederickkPaper.roundDecimal( (currentTime + ((1.0 - this.delta) * stepMillis)), 3 );
			}
			else {
				timeEnd = frederickkPaper.roundDecimal( (currentTime + (this.delta*stepMillis)), 3 );
			}
			if(timeEnd <= currentTime) {
				if(bIn) {
					bIn = false;
					this.delta = 1.0;
				}
				else {
					bOut = false;
					this.delta = 0.0;
				}
			}
		}
		if(bIn) {
			this.delta = frederickkPaper.roundDecimal( (1.0 - ((timeEnd - currentTime) / stepMillis)), 3 );
			// if(bEase) {
			// }

			if(currentTime == timeEnd) {
				bIn = false;
				this.delta = 1.0;
				this.counter++;
				return;
			}
		}
		else if(bOut) {
			this.delta = frederickkPaper.roundDecimal( ((timeEnd - currentTime) / stepMillis), 3 );
			// if(bEase) {
			// }

			if(currentTime == timeEnd) {
				bIn = false;
				this.delta = 0.0;
				this.counter++;
				return;
			}
		}
	};

	// ------------------------------------------------------------------------
	this.stepIn = function() {
		if(bIn) return;
		if(this.delta == 1.0) return;
		bBeginStpper = true;
		bIn = true;
		bOut = false;
	};
	this.stepOut = function() {
		if(bOut) return;
		if(this.delta == 0.0) return;
		bBeginStpper = true;
		bOut = true;
		bIn = false;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@return
	 *			if the object is stepping in
	 */
	this.isIn = function() {
		return bIn;
	};
	/**
	 *	@return
	 *			if the object is stepping out
	 */
	this.isOut = function() {
		return bOut;
	};

	/**
	 *	@return
	 *			if the object has finished it's stepping
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
	this.stop = function() {
		bBeginStpper = bIn = bOut = false;
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
		stepMillis = _millis;
		stepMillis /= 1000;
	};

	/**
	 *	@param _val
	 *			to ease or not to ease...
	 *	@param _easing
	 *			(optional) degree of easing
	 */
	// this.setEasing = function(_val, _easeing) {
	// 	bEase = _val;
	// 	easing = _easeing;
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
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FStopwatch
 *
 *	A simple stopwatch
 *
 */
frederickkPaper.FTime.FStopwatch = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var now;
	var then;
	var timeInMs = 0;
	var bStart = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.toggle = function() {
		if (bStart == 0) {
			this.start();
		}
		else {
			this.pause();
		}
	};

	this.start = function() {
		// start
		bStart = 1;
		then = new Date();
		then.setTime(then.getTime() - timeInMs);
	};

	this.pause = function() {
		// pause
		bStart = 0;
		now = new Date();
		timeInMs = now.getTime() - then.getTime();
	};

	this.reset = function() {
		bStart = 0;
		timeInMs = 0;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.set = function(ms, run) {
		timeInMs = ms;
		(run == true) ? bStart = 0 : bStart = 1;

		then = new Date();
		then.setTime(then.getTime() - timeInMs);
		this.toggle();
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.get = function() {
		if (bStart == 1)  {
			now = new Date();
			timeInMs = now.getTime() - then.getTime();
		}
		return timeInMs;
	};

	this.isRunning = function() {
		return (bStart) ? true : false;
	};

};


/**
 *  
 *	FPath3.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
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
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */

/**
 *	TODO: maek FPath3 an extension of paper.Item
frederickkPaper.F3D.FPath3 = Item.extend({
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------


});
*/
frederickkPaper.F3D.FPath3 = function(_scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public

	// temporary until I figure out how
	// to extend paper.Item properly
	this.path = new Path();

	this.name = '';
	this.closed = false;

	this.opacity = 1.0;
	this.blendMode = 'normal';
	this.visible = true;
	this.selected = false;

	this.fillColor;

	this.strokeColor;
	this.strokeWidth = 1;
	this.strokeCap;
	this.strokeJoin;

	this.rotation = new frederickkPaper.F3D.FPoint3();
	this.translation = new frederickkPaper.F3D.FPoint3();


	// private
	var scene = _scene;

	var points3 = [];

	var matrix = new Matrix3D();

	var rotationX = 0;
	var rotationY = 0;
	var rotationZ = 0;

	var translationX = 0;
	var translationY = 0;
	var translationZ = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@return path
	 *			projected 2D path
	 */
	this.draw = function() {
		this.path.remove();

		this.path = new Path();
		this.path.name = this.name;

		for(var i=0; i<points3.length; i++) {
			var pt3 = points3[i];
			this.path.add( new Point( pt3.x2D(), pt3.y2D() ) );
		}

		// ! temporary see above !
		this.path.opacity = this.opacity;
		this.path.blendMode = this.blendMode;
		this.path.visible = this.visible;
		this.path.selected = this.selected;

		this.path.fillColor = this.fillColor;

		this.path.strokeColor = this.strokeColor;
		this.path.strokeWidth = this.strokeWidth;
		this.path.strokeCap = this.strokeCap;
		this.path.strokeJoin = this.strokeJoin;

		this.path.closed = this.closed;

		return this.path;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param _scene
	 *			scene to associate points with
	 */
	this.addToScene = function(_scene) {
		console.log( 'path3.addToScene' );
		for(var i=0; i<points3.length; i++) {
			points3[i].setup(_scene);
		}
	};

	/**
	 *	@param _fpoint3
	 *			add FPoint3 to path
	 */
	this.add = function(_fpoint3) {
		points3[points3.length] = _fpoint3;
	};


	// ------------------------------------------------------------------------
	this.translate = function(_x, _y, _z) {
		translationX = _x != undefined ? _x : 0;
		translationY = _y != undefined ? _y : 0;
		translationZ = _z != undefined ? _z : 0;

		for(var i=0; i<points3.length; i++) {
			var pt3 = points3[i];
			pt3.setX( (pt3.x() + translationX) );
			pt3.setY( (pt3.y() + translationY) );
			pt3.setZ( (pt3.z() + translationZ) );
		}
	};


	// ------------------------------------------------------------------------
	this.rotateX = function(val) {
		rotationX = val;
	};
	this.rotateY = function(val) {
		rotationY = val;
	};
	this.rotateZ = function(val) {
		rotationZ = val;
	};


	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.get = function() {
		return this.path;
	};


};


/**
 *  
 *	FPoint3.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
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
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */

/**
 *	@param x
 *			x coordinate
 *	@param y
 *			y coordinate
 *	@param z
 *			z coordinate
 */
frederickkPaper.F3D.FPoint3 = function(_x, _y, _z) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	var x = _x != undefined ? _x : 0;
	var y = _y != undefined ? _y : 0;
	var z = _z != undefined ? _z : 0;


	// private
	var scene = null;

	var xIndex = 0;
	var yIndex = 0;
	var zIndex = 0;
	var xIndex2D = 0;
	var yIndex2D = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param scene
	 *			the scene with which the points are
	 *			associated with
	 */
	this.setup = function(_scene) {
		console.log( 'fpoint.setup' );
		scene = _scene;

		var index = scene.setupPoint(x, y, z);

		var i3 = index*3;
		var i2 = index*2;

		xIndex = i3;
		yIndex = i3+1;
		zIndex = i3+2;

		xIndex2D = i2;
		yIndex2D = i2+1;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setX = function(value) {
		if( scene != null ) scene.points3D[xIndex] = value;
		x = value;
	};
	this.setY = function(value) {
		if( scene != null ) scene.points3D[yIndex] = value;
		y = value;
	};
	this.setZ = function(value) {
		if( scene != null ) scene.points3D[zIndex] = value;
		z = value;
	};

	this.set = function(_x, _y, _z) {
		this.setX(_x);
		this.setY(_y);
		this.setZ(_z);
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	Get a copy of this point.
	 */
	this.get = function() {
		return new frederickkPaper.F3D.FPoint3(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	@return 3D x
	 */
	this.x = function() {
		return x;
	};
	/**
	 *	@return 3D y
	 */
	this.y = function() {
		return y;
	};
	/**
	 *	@return 3D z
	 */
	this.z = function() {
		return z;
	};


	// ------------------------------------------------------------------------
	/**
	 *	@return projected 2D x
	 */
	this.x2D = function() {
		return scene.points2D[xIndex2D];
	};

	/**
	 *	@return projected 2D y
	 */
	this.y2D = function() {
		return scene.points2D[yIndex2D];
	};


	this.getSceneIndex = function() {
		return sceneIndex;
	};


	// ------------------------------------------------------------------------
	/**
	 *	Calculate the magnitude (length) of the point
	 *
	 *	@return the magnitude of the point
	 */
	this.mag = function() {
		return Math.sqrt(x*x + y*y + z*z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Add a point to this point
	 *
	 *	@param _fpoint3
	 *			the point to be added
	 */
	this.add = function(_fpoint3) {
		x += _fpoint3.x();
		y += _fpoint3.y();
		z += _fpoint3.z();
		this.set(x,y,z);
	};
	this.add = function(_x, _y, _z) {
		x += _x;
		y += _y;
		z += _z;
		this.set(x,y,z);

	};


	// ------------------------------------------------------------------------
	/**
	 *	Subtract a point from this point
	 *
	 *	@param _fpoint3
	 *			the point to be subtracted
	 */
	this.sub = function(_fpoint3) {
		x -= _fpoint3.x();
		y -= _fpoint3.y();
		z -= _fpoint3.z();
		this.set(x,y,z);
	};
	this.sub = function(_x, _y, _z) {
		x -= _x;
		y -= _y;
		z -= _z;
		this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Scale this point by a scalar
	 *
	 *	@param n
	 *			the value to scale by
	 */
	this.scale = function(n) {
		x *= n;
		y *= n;
		z *= n;
		this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Multiply each element of one point by the elements of another point.
	 *
	 *	@param _fpoint3
	 *			the point to multiply by
	 */
	this.mult = function(_fpoint3) {
		x *= _fpoint3.x();
		y *= _fpoint3.y();
		z *= _fpoint3.z();
		this.set(x,y,z);
	};
	this.mult = function(_x, _y, _z) {
		x *= _x;
		y *= _y;
		z *= _z;
		// this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Divide each element of one point by the elements of another point.
	 *
	 *	@param _fpoint3
	 *			the point to multiply by
	 */
	this.div = function(_fpoint3) {
		x /= _fpoint3.x();
		y /= _fpoint3.y();
		z /= _fpoint3.z();
		this.set(x,y,z);
	};
	this.div = function(_x, _y, _z) {
		x /= _x;
		y /= _y;
		z /= _z;
		this.set(x,y,z);

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
		var dx = x - _fpoint3.x();
		var dy = y - _fpoint3.y();
		var dz = z - _fpoint3.z();
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
		return '[ ' + x + ', ' + y + ', ' + z + ' ]';
	};


	// ------------------------------------------------------------------------
	/**
	 *	Return a representation of this point as an array.
	 */
	 
	this.array = function() {
		return [x, y, z];
	};

};


/**
 *  
 *	FScene3D.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	3D Scene Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code mostly taken from
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */

/**
 *
 *	TODO: fix Z order
 */
frederickkPaper.F3D.FScene3D = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var group;

	var mode;
	var matrix = new Matrix3D();

	var halfWidth;
	var halfHeight;

	var rotationX = 0;
	var rotationY = 0;
	var rotationZ = 0;
	var sceneScale = 1;

	var focalLength = 0;
	var sceneWidth = 0;
	var sceneHeight = 0;

	var numPoints = 0;

	var items = [];


	// public
	this.points3D = [];
	this.points2D = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param _width
	 *				width of scene
 	 *				default: view.bounds.width
	 *	@param _height
	 *				height of scene
 	 *				default: view.bounds.height
	 *	@param _focalLength
	 *				focal length of scene
 	 *				default: 1000
	 *	@param _mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
	 *
	 */
	this.setup = function(_width, _height, _focalLength, _mode) {
		focalLength = _focalLength || 1000;
		sceneWidth  = _width || paper.view.bounds.width;
		sceneHeight = _height || paper.view.bounds.height;

		halfWidth = sceneWidth*0.5;
		halfHeight = sceneHeight*0.5;

		mode = _mode != undefined ? _mode : 'PERSPECTIVE';
		this.setMode(mode);

		group = new paper.Group();
	};

	// ------------------------------------------------------------------------
	this.draw = function() {
		matrix.identity();

		if(mode == 'ORTHO') ortho();
		else perspective();

		matrix.scale(sceneScale, sceneScale, sceneScale);
		matrix.rotateX(rotationX);
		matrix.rotateY(rotationY);
		matrix.rotateZ(rotationZ);
		matrix.translate(0, 0, focalLength);

		var transformed = matrix.transformArray(this.points3D);
		
		for(var i=0; i<numPoints; i++) {
			var i3 = i*3;
			var i2 = i*2;

			// var x = this.points3D[i3];
			// var y = this.points3D[i3+1];
			// var z = this.points3D[i3+2];
			var x = transformed[i3];
			var y = transformed[i3+1];
			var z = transformed[i3+2];
			
			var scale = focalLength/(z+focalLength);

			this.points2D[ i2 ]   = x*scale+halfWidth;
			this.points2D[ i2+1 ] = y*scale+halfHeight;
		}

		console.log( 'items.length\t' + items.length);

		group.removeChildren(); // clear out in between draws
		for(var i=0; i<items.length; i++) {
			var paths = items[i].draw();
			if(paths != null) group.appendTop( paths );
		}

		// TODO: fix this scaling issue
		if(mode == 'ORTHO') group.scale(200);

		return group;
	};

	// ------------------------------------------------------------------------
	this.setupPoint = function(x, y, z) {
		var returnVal = numPoints;

		this.points2D[ this.points2D.length ] = 0;
		this.points2D[ this.points2D.length ] = 0;

		this.points3D[ this.points3D.length ] = x;
		this.points3D[ this.points3D.length ] = y;
		this.points3D[ this.points3D.length ] = z;

		numPoints++;

		return returnVal;
	};


	// ------------------------------------------------------------------------
	/**
	 * matrix for isometric projection
	 *
	 *	TODO: figure out why this has to be
	 *	configured like this?
	 */
	var ortho = function() {
		matrix.makeOrtho( 
			-halfHeight, halfHeight,
			halfHeight, -halfHeight,
			-halfHeight, halfHeight
		);
	};

	/**
	 * matrix for perspective projection
	 */
	var perspective = function() {
		matrix.makePerspective( 
			50,
			1,
			focalLength,
			focalLength*2
		);
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setMode = function(_mode) {
		mode = _mode;
	};

	this.addItem = function(item) {
		console.log( 'scene.addItem' );
		items[items.length] = item;
		item.addToScene(this);
	};
	
	this.rotateX = function(val) {
		rotationX = val;
	};
	this.rotateY = function(val) {
		rotationY = val;
	};
	this.rotateZ = function(val) {
		rotationZ = val;
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	@return scene path items as group 
	 */
	this.get = function() {
		return group;
	};

	/**
	 *	@return scene size as array [width, height, depth]
	 */
	this.getSize = function() {
		return [ sceneWidth, sceneHeight, focalLength ];
	};

	/**
	 *	@return scene transformation matrix
	 */
	this.getMatrix = function() {
		return matrix;
	};

	/**
	 *	@return scene focal length
	 */
	this.getFocalLength = function() {
		return focalLength;
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
	this.createBox = function(scalex, scaley, scalez, rotationx, rotationy, rotationz, tx, ty, tz) {
		this.identity();
		if (rotationx != 0) this.rotateX(rotationx);
		if (rotationy != 0) this.rotateY(rotationy);
		if (rotationz != 0) this.rotateZ(rotationz);
		if (scalex != 1 || scaley != 1 || scalez != 1) this.scale(scalex, scaley, scalez);
		if (tx != 0 || ty != 0 || tz != 0) this.translate(tx, ty, tz);
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
	 *	Rotation
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
	
		for(var i=0;i<numPoints;i++) {
			var i3=i*3;
			var x=arr[i3];
			var y=arr[i3+1];
			var z=arr[i3+2];
		
			rVal[i3]=this.n11*x+this.n21*y+this.n31*z+this.n41;
			rVal[i3+1]=this.n12*x+this.n22*y+this.n32*z+this.n42;
			rVal[i3+2]=this.n13*x+this.n23*y+this.n33*z+this.n43;
		}
	
		return rVal;
	};


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
 *	FArrow.js
 *	v0.2a
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FArrow
 *
 *	Create simple sphere
 */



frederickkPaper.FShape.FArrow = this.FArrow = Path.extend({
	 /**
	  *	
	  *	@param headPoint
	  *				the head of the arrow
	  *	@param tailPoint
	  *				the tail of the arrow
	  *	@param arrowHeadSize
	  *				(optional) length of the arrow head
	  */
	initialize : function(headPoint, tailPoint, arrowHeadSize) {
		// the line part
		this.path = new Path( headPoint, tailPoint );

		// the arrow head
		arrowHeadSize = (arrowHeadSize != undefined) ? arrowHeadSize : new Size(headPoint.getDistance(tailPoint)*0.381924,headPoint.getDistance(tailPoint)*0.381924);

		// rotate arrow head around to correct position
		var a = Math.atan2( headPoint.x-tailPoint.x, tailPoint.y-headPoint.y );

		// slight "hack" to get strokCap correct
		var arrowHead = [];
		arrowHead[0] = new Path( new Point(0,0), new Point(-arrowHeadSize.width,-arrowHeadSize.height) );
		arrowHead[1] = new Path( new Point(0,0), new Point( arrowHeadSize.width,-arrowHeadSize.height) );
		for( var i=0; i<arrowHead.length; i++ ) {
			arrowHead[i].rotate( 180+frederickkPaper.degrees(a), new Point(0,0) );
			arrowHead[i].translate( headPoint );
		}

		var group = new Group( this.path, arrowHead[0], arrowHead[1] );
		group.name = 'arrow';
		return group;
	}

});


/**
 *	
 *	FBox.js
 *	v0.2a
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FBox
 *
 *	Create simple box
 *
 */



 /**
  *
  *	TODO: make this an extension of FPath3
  *
  */
frederickkPaper.FShape.FBox = function(_scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	this.sides = new Array(6);

	// temporary until I figure out how
	// to extend paper.Item properly
	this.name = '';

	this.visible = true;
	this.selected = false;

	this.strokeCap;
	this.strokeJoin;


	// private
	var scene = _scene;


	this.faceFRONT = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceTOP = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5) //corner
	];

	this.faceBOTTOM = [
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5, -0.5) //corner
	];
	
	this.faceLEFT = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceRIGHT = [
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5) //corner
	];
	
	this.faceBACK = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5) //corner
	];


	var faces = [
		['front',	this.faceFRONT],
		['top',		this.faceTOP],
		['bottom',	this.faceBOTTOM],
		['left',	this.faceLEFT],
		['right',	this.faceRIGHT],
		['back',	this.faceBACK]
	];


	var facesOpacity = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
	var facesBlendModes = [
		'normal',	// FRONT
		'normal',	// TOP
		'normal',	// BOTTOM
		'normal',	// LEFT
		'normal',	// RIGHT
		'normal'	// BACK
	];

	var facesFillColor = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];
	var facesStrokeColor = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];
	var facesStrokeWidth = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];



	var size = new frederickkPaper.F3D.FPoint3(10,10,10);



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.init = function(_x, _y, _z) {
		for(var i=0; i<faces.length; i++) {

			this.sides[i] = new frederickkPaper.F3D.FPath3();
			this.sides[i].name = faces[i][0];

			var vertices = faces[i][1];
			for(var j=0; j<vertices.length; j++) {
				this.sides[i].add( new frederickkPaper.F3D.FPoint3(
					vertices[j].x()*size.x(),
					vertices[j].y()*size.y(),
					vertices[j].z()*size.z()
				));
			}

			// ! temporary see above !
			this.sides[i].opacity = facesOpacity[i];
			this.sides[i].blendMode = facesBlendModes[i];
			this.sides[i].visible = this.visible;
			this.sides[i].selected = this.selected;

			this.sides[i].fillColor = facesFillColor[i];

			this.sides[i].strokeColor = facesStrokeColor[i];
			this.sides[i].strokeWidth = facesStrokeWidth[i];
			this.sides[i].strokeCap = this.strokeCap;
			this.sides[i].strokeJoin = this.strokeJoin;

			this.sides[i].closed = true;
			this.sides[i].translate(_x,_y,_z);

			scene.addItem( this.sides[i] );
		}
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setSize = function(_width, _height, _depth) {
		size.set(_width, _height, _depth);
	};


	// ------------------------------------------------------------------------
	this.setVisible = function(val) {
		this.visible = val;
	};

	// ------------------------------------------------------------------------
	this.setSelected = function(val) {
		this.selected = val;
	};

	// ------------------------------------------------------------------------
	this.setOpacity = function(face, o) {
		if( face.length === undefined ) facesOpacity[face] = o;
		else facesOpacity = face;
	};

	// ------------------------------------------------------------------------
	this.setFillColor = function(face, col) {
		if( face.length === undefined ) facesFillColor[face] = col;
		else facesFillColor = face;
	};

	// ------------------------------------------------------------------------
	this.setStrokeColor = function(face, col) {
		if( face.length === undefined ) facesStrokeColor[face] = col;
		else facesStrokeColor = face;
	};

	// ------------------------------------------------------------------------
	this.setStrokeWidth = function(face, w) {
		if( face.length === undefined ) facesStrokeWidth[face] = w;
		else facesStrokeWidth = face;
	};

	// ------------------------------------------------------------------------
	this.setStrokeCap = function(cap) {
		this.strokeCap = cap;
	};

	// ------------------------------------------------------------------------
	this.setStrokeJoin = function(join) {
		this.strokeJoin = join;
	};

	// ------------------------------------------------------------------------
	this.noFill = function() {
		facesFillColor = [];
	};
	this.noStroke = function() {
		facesStrokeColor = [];
	}



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.get = function() {
		return this.sides;
	};
	this.get = function(index) {
		return this.sides[index];
	};

	//-----------------------------------------------------------------------------
	this.getNumFaces = function() {
		return vertices.length-2;
	};

	// ------------------------------------------------------------------------
	this.getSize = function() {
		return size;
	};

};





/**
 *	
 *	FBubble.js
 *	v0.2a
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FBubble
 *
 *	Create a simple speech bubble
 *
 */



frederickkPaper.FShape.FBubble = this.FBubble = Path.extend({
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	defaultTagSize: new Size(20,20),



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	 /**
	  *	
	  *	@param bubblePoint
	  *				the position of the bubble
	  *	@param bubbleSize
	  *				the size of the bubble
	  *	@param _tagSize
	  *				the size of the tag
	  *	@param _tagPointCenter 
	  *				(optional)
	  *				'RANDOM'	randomly x-position the point (default)
	  *				'LEFT'		left align the x-position of the point
	  *				'CENTER'	center align the x-position of the point
	  *				'RIGHT'		right align the x-position of the point
	  */
	initialize : function(bubblePoint, bubbleSize, _tagSize, _tagPointCenter) {
		_tagSize = (_tagSize != undefined) ? _tagSize : defaultTagSize;
		if(bubbleSize.width < 10) {
			bubbleSize.width = 10;
			_tagSize = new Size(10,10);
		}
		_tagPointCenter = (_tagPointCenter != undefined) ? _tagPointCenter : 'RANDOM';


		this.path = new Path();
		this.path.name = 'bubble';

		// left side of bubble
		this.path.add( new Point(0,0) );
		var angle = 180;
		var through = new Point(
			bubbleSize.height/2 + Math.cos( f.radians(angle) ) * (bubbleSize.height),
			bubbleSize.height/2 + Math.sin( f.radians(angle) ) * (bubbleSize.height)
		);
		this.path.arcTo(through, new Point(0,bubbleSize.height));

		// middle bottom
		// create tag space somewhere along the bottom of the bubble
		var tagStart = frederickkPaper.randomInt(0,bubbleSize.width-_tagSize.width);

		// create tag
		this.path.add( new Point(tagStart,bubbleSize.height) );

		var tx, ty;
		if(_tagPointCenter == 'LEFT') {
			tx = tagStart;
		}
		else if(_tagPointCenter == 'CENTER') {
			tx = tagStart + (_tagSize.width/2);
		}
		else if(_tagPointCenter == 'RIGHT') {
			tx = tagStart+_tagSize.width;
		}
		else { // if(_tagPointCenter == 'RANDOM') { 
			tx = frederickkPaper.randomInt(tagStart,tagStart+_tagSize.width);
		}

		// the length of the tag
		ty = bubbleSize.height + _tagSize.height;
		this.path.add( new Point(tx,ty) ); 

		// continue bottom
		this.path.add( new Point(tagStart+_tagSize.width,bubbleSize.height) );
		this.path.add( new Point(bubbleSize.width,bubbleSize.height) );


		// right side of bubble
		angle = 0;
		through = new Point(
			bubbleSize.height/2 + Math.cos( f.radians(angle) ) * (bubbleSize.height/2),
			bubbleSize.height/2 + Math.sin( f.radians(angle) ) * (bubbleSize.height/2)
		);
		this.path.arcTo( new Point(bubbleSize.width,0), false );

		// middle top
		this.path.closed = true;

		// center the bubble
		// compensated for the tag's length
		this.path.position = new Point(bubblePoint.x,bubblePoint.y+(_tagSize.height/2));
		
		return this.path;
	}


});


/**
 *	
 *	FChain.js
 *	v0.2a
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FChain
 *
 *	Create simple chain (a line with different endpoint sizes)
 *
 */



frederickkPaper.FShape.FChain = this.FChain = Path.extend({
	 /**
	  *	
	  *	@param arg0
	  *				point1 The first point (endpoint1)
	  *	@param arg1
	  *				radius of endpoint1
	  *	@param arg2
	  *				point2 The second point (endpoint2)
	  *	@param arg3
	  *				radius of endpoint2
	  */
	 /**
	  *	
	  *	@param arg0
	  *				PathItem (endpoint1)
	  *	@param arg1
	  *				PathItem (endpoint2)
	  */
	initialize : function(arg0, arg1, arg2, arg3) {
		var obj1, obj2;

		// check for the type of arguments being passed
		var type = f.getType(arg0);
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

		var tangents = frederickkPaper.getCommonTangents(obj1, obj2);
		if( tangents != null ) {
			// path for chain
			this.path = new Path();
			this.path.name = 'chain';

			this.path.add( tangents[0] );
			this.path.add( tangents[1] );

			// determine position of chain around endpoint2
			if( obj2.position.x > obj1.position.x ) angle = 0;
			else if( obj2.position.y < obj1.position.y ) angle = -90;
			else if( obj2.position.y > obj1.position.y ) angle = 90;
			else angle = 180;
			var tp2 = new Point(
				obj2.position.x + Math.cos( frederickkPaper.radians(angle) ) * (obj2.bounds.width/2),
				obj2.position.y + Math.sin( frederickkPaper.radians(angle) ) * (obj2.bounds.height/2)
			);
			this.path.arcTo(tp2, tangents[2]);

			this.path.add(tangents[2]);
			this.path.add(tangents[3]);

			// determine position of chain around endpoint1
			if( obj1.position.x > obj2.position.x ) angle = 0;
			else if( obj1.position.y < obj2.position.y ) angle = -90;
			else if( obj1.position.y > obj2.position.y ) angle = 90;
			else angle = 180;
			var tp1 = new Point(
				obj1.position.x + Math.cos( frederickkPaper.radians(angle) ) * (obj1.bounds.width/2),
				obj1.position.y + Math.sin( frederickkPaper.radians(angle) ) * (obj1.bounds.height/2)
			);
			this.path.arcTo(tp1, tangents[0]);
			this.path.closed;

			return this.path;
		}

	}


});


/**
 *	
 *	FCross.js
 *	v0.2a
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FCross
 *
 *	Create a cross
 *
 */



frederickkPaper.FShape.FCross = this.FCross = Path.extend({
	 /**
	  *	
	  *	@param point
	  *				position of cross
	  *	@param size
	  *				size [width,height] of cross
	  *	@param _thickness
	  *				thickness of the cross
	  *	@param _type (optional)
	  *				'SHARP'		sharp edged cross (fill)
	  *				'LINE'		simple built of lines (stroke)
	  */
	initialize : function( point, size, _thickness, _type) {
		(_thickness != undefined) ? _thickness : 1.0;
		(_type != undefined) ? _type : 'LINE';

		// var point = new Point(_x,_y);
		// var size = new Size(_width,_height);
		var line1, line2;

		if( _type == 'LINE' ) {
			line1 = new paper.Path.Line(
				point.x + size.width, point.y - size.height, 
				point.x - size.width, point.y + size.height
			);
			line1.strokeWidth = _thickness;
			line2 = new paper.Path.Line(
				point.x + size.width, point.y + size.height, 
				point.x - size.width, point.y - size.height
			);
			line2.strokeWidth = _thickness;
		}
		else if( _type == 'SHARP' ) {
			line1 = new Path();
			line1.add( point.x + size.width, point.y - size.height );
			line1.add( point.x + size.width, (point.y - size.height) + (_thickness/2) );
			line1.add( (point.x - size.width) + (_thickness/2), point.y + size.height );
			line1.add( point.x - size.width, point.y + size.height );
			line1.add( point.x - size.width, (point.y + size.height) - (_thickness/2) );
			line1.add( (point.x + size.width) - (_thickness/2), point.y - size.height );
			line1.closed = true;

			line2 = new Path();
			line2.add( point.x - size.width, point.y - size.height );
			line2.add( (point.x - size.width) + (_thickness/2), point.y - size.height );
			line2.add( point.x + size.width, (point.y + size.height) - (_thickness/2) );
			line2.add( point.x + size.width, point.y + size.height );
			line2.add( (point.x + size.width) - (_thickness/2), point.y + size.height );
			line2.add( point.x - size.width, (point.y - size.height) + (_thickness/2) );
			line2.closed = true;
		}

		var group = new paper.Group( line1, line2 );
		group.name = 'cross';
		return group;
	}

});


/**
 *	
 *	FSphere.js
 *	v0.2a
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FSphere
 *
 *	Create simple sphere
 *
 */



 /**
  *
  *	TODO: make this an extension of FPath3
  *
  */
frederickkPaper.FShape.FSphere = function(_scene) {
	//-----------------------------------------------------------------------------
	// properties
	//-----------------------------------------------------------------------------
	// public
	this.sides = [];
	this.vertices = [];

	// temporary until I figure out how
	// to extend paper.Item properly
	this.name = '';

	this.visible = true;
	this.selected = false;

	this.strokeCap;
	this.strokeJoin;


	// private
	var scene = _scene;

	var r = 10;
	var c = 0.5;

	var lats;
	var longs;


	var facesOpacity = [];
	var facesBlendModes = [];

	var facesFillColor = [];
	var facesStrokeColor = [];
	var facesStrokeWidth = [];



	//-----------------------------------------------------------------------------
	// methods
	//-----------------------------------------------------------------------------
	/**
	 *  @param lats
	 *  			number of latitude segments
	 *  @param longs
	 *  			number of longitude segments
	 */
	var calculate = function(lats, longs) {
		// calculate vertices
		vertices = [];
		for(var i=0; i<=lats; i++) {
			var lat0 = (Math.PI * (-c + ( (i-1)/lats) ));
			var z0   = Math.sin(lat0);
			var zr0  = Math.cos(lat0);

			var lat1 = (Math.PI * (-c + ( i/lats) ));
			var z1   = Math.sin(lat1);
			var zr1  = Math.cos(lat1);

			for(var j=0; j<=longs; j++) {
				var lng = ((Math.PI*2) * ( (j-1)/longs ));
				var x = Math.cos(lng);
				var y = Math.sin(lng);

				vertices.push( new frederickkPaper.F3D.FPoint3( x*zr0, y*zr0, z0 ) );
				vertices.push( new frederickkPaper.F3D.FPoint3( x*zr1, y*zr1, z1 ) );
			} // longs
		} // lats


		// setup arrays
		this.sides = new Array(vertices.length-2);

		facesOpacity = new Array(vertices.length-2);
		facesBlendModes = new Array(vertices.length-2);
		facesFillColor = new Array(vertices.length-2);
		facesStrokeColor = new Array(vertices.length-2);
		facesStrokeWidth = new Array(vertices.length-2);

		var numVertices = vertices.length-2;
		for(var i=0; i<numVertices; i++) {
			var v = vertices[i];
			var col = new paper.HSLColor( 360*i/numVertices, 0.9, 0.7);

			var depth = (v.z()/scene.getFocalLength())*100;

			facesOpacity[i] = 1.0;
			facesBlendModes[i] = 'normal';

			facesFillColor[i] = col.darken( depth );
			facesStrokeColor[i] = col.darken( depth );
			facesStrokeWidth[i] = 1.0;
		}
	};


	/**
	 *  @param lats
	 *  			number of latitude segments
	 *  @param longs
	 *  			number of longitude segments
	 */
	this.init = function(_x, _y, _z) {
		if(lats == null) this.setLatsLongs(6,6);

		for(var i=0; i<vertices.length-2; i++) {
			this.sides[i] = new frederickkPaper.F3D.FPath3();
			this.sides[i].name = 'face'+i;

			this.sides[i].add( new frederickkPaper.F3D.FPoint3(
				vertices[i].x()*(r*0.5),
				vertices[i].y()*(r*0.5),
				vertices[i].z()*(r*0.5)
			));
			this.sides[i].add( new frederickkPaper.F3D.FPoint3(
				vertices[i+1].x()*(r*0.5),
				vertices[i+1].y()*(r*0.5),
				vertices[i+1].z()*(r*0.5)
			));
			this.sides[i].add( new frederickkPaper.F3D.FPoint3(
				vertices[i+2].x()*(r*0.5),
				vertices[i+2].y()*(r*0.5),
				vertices[i+2].z()*(r*0.5)
			));

			// ! temporary see above !
			this.sides[i].opacity = facesOpacity[i];
			this.sides[i].blendMode = facesBlendModes[i];
			this.sides[i].visible = this.visible;
			this.sides[i].selected = this.selected;

			this.sides[i].fillColor = facesFillColor[i];

			this.sides[i].strokeColor = facesStrokeColor[i];
			this.sides[i].strokeWidth = facesStrokeWidth[i];
			this.sides[i].strokeCap = this.strokeCap;
			this.sides[i].strokeJoin = this.strokeJoin;

			this.sides[i].closed = true;
			this.sides[i].translate(_x,_y,_z);

			scene.addItem( this.sides[i] );
		}
	};



	//-----------------------------------------------------------------------------
	// sets
	//-----------------------------------------------------------------------------
	/**
	 *  @param r
	 *  		radius of sphere
	 */
	this.setSize = function(_r) {
		r = _r;
	}

	/**
	 *  @param lats
	 *  			number of latitude segments
	 *  @param longs
	 *  			number of longitude segments
	 */
	this.setLatsLongs = function(_lats, _longs) {
		lats = (_lats < 4) ? 4 : _lats;
		longs = (_longs < 4) ? 4 : _longs;
		calculate(lats, longs);
	};

	// ------------------------------------------------------------------------
	this.setVisible = function(val) {
		this.visible = val;
	};

	// ------------------------------------------------------------------------
	this.setSelected = function(val) {
		this.selected = val;
	};

	// ------------------------------------------------------------------------
	this.setOpacity = function(face, o) {
		if( face.length === undefined ) facesOpacity[face] = o;
		else facesOpacity = face;
	};

	// ------------------------------------------------------------------------
	this.setFillColor = function(face, col) {
		if( face.length === undefined ) facesFillColor[face] = col;
		else {
			// facesFillColor = face;
			for(var i=0; i<face.length; i++) {
				var v = vertices[i];
				var depth = (v.z()/scene.getFocalLength())*100;
				facesFillColor[i] = face.darken( depth );
			}
		}
	};

	// ------------------------------------------------------------------------
	this.setStrokeColor = function(face, col) {
		if( face.length === undefined ) facesStrokeColor[face] = col;
		else {
			// facesStrokeColor = face;
			for(var i=0; i<face.length; i++) {
				var v = vertices[i];
				var depth = (v.z()/scene.getFocalLength())*100;
				facesStrokeColor[i] = face.darken( depth );
			}
		}
	};

	// ------------------------------------------------------------------------
	this.setStrokeWidth = function(face, w) {
		if( face.length === undefined ) facesStrokeWidth[face] = w;
		else facesStrokeWidth = face;
	};

	// ------------------------------------------------------------------------
	this.setStrokeCap = function(cap) {
		this.strokeCap = cap;
	};

	// ------------------------------------------------------------------------
	this.setStrokeJoin = function(join) {
		this.strokeJoin = join;
	};

	// ------------------------------------------------------------------------
	this.noFill = function() {
		facesFillColor = [];
	};
	this.noStroke = function() {
		facesStrokeColor = [];
	}

	// ------------------------------------------------------------------------
	this.setVertices = function(vertice, val) {
		if( vertice.length === undefined ) vertices[vertice] = val;
		else vertices = vertice;
	};

	

	//-----------------------------------------------------------------------------
	// gets
	//-----------------------------------------------------------------------------
	this.get = function() {
		return this.sides;
	};
	this.get = function(index) {
		return this.sides[index];
	};

	//-----------------------------------------------------------------------------
	this.getNumFaces = function() {
		return vertices.length-2;
	};

	//-----------------------------------------------------------------------------
	this.getVertices = function() {
		return vertices;
	};

	//-----------------------------------------------------------------------------
	this.getSize = function() {
		return r;
	};



};
/**
 *  
 *	FControl.js
 *	v0.2a
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FControl
 *
 *	A collection of methods for adding HTML form elements
 *	for use as a GUI
 *
 */

/**
 *
 *	TODO: finish
 *
 */
frederickkPaper.FControl = function(_divId) { // #divId
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	this.divId = _divId;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param name
	 *			name of element
	 *	@param value
	 *			true or false
	 */
	this.addCheck = function(name, value) {
		var input = document.createElement('input');
		input.setAttribute('type', 'chackbox');
		input.setAttribute('value', value);
		input.setAttribute('name', name);

		// here is where x and y coords could be added
		var newdiv = document.createElement('div');
		newdiv.appendChild(input);

		var div = document.getElementById( this.divId );
		div.appendChild(newdiv);
	};

	/**
	 *	@param name
	 *			name of element
	 *	@param value
	 *			?
	 */
	this.addInput = function(name, value) {
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('className', 'txt');
		input.setAttribute('value', value);
		input.setAttribute('name', name);

		// here is where x and y coords could be added
		var newdiv = document.createElement('div');
		newdiv.appendChild(input);

		var div = document.getElementById( this.divId );
		div.appendChild(newdiv);
	};


};








// var FInputField = function() {


// 	//-----------------------------------------------------------------------------
// 	// events
// 	//-----------------------------------------------------------------------------
// 	this.keyPressed(event) {
// 		int id = event.getID();
// 		char key = event.getKeyChar();

// 		if(FOCUS) {
// 			if (id == KeyEvent.VK_SPACE) {
// 				if (t.length() < 40) {
// 					t += key;
// 				}
// 			}		
// 			else if(id == KeyEvent.VK_ENTER) {
// 				FOCUS = false;
// 			}
// 			else if(id == KeyEvent.VK_ESCAPE) {
// 				FOCUS = false;
// 			}
// 		}
// 	}

// 	this.keyUp(event) {
// 	}

// 	this.keyDown(event) {
// 		char key = event.getKeyChar();

// 		if(FOCUS) {
// 			if (key == KeyEvent.VK_BACK_SPACE || key == KeyEvent.VK_DELETE) {
// 				if (t.length() > 0) {
// 					t = t.substring(0,t.length() - 1);
// 				}
// 			}
// 			else {
// 				t += key;
// 			}
// 		}
// 	}


// };