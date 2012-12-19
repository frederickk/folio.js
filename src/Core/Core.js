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


