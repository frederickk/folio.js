/**
 *  
 *	Core.js
 *	v0.1
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
	random : function(minr, maxr) {
		if(maxr === undefined) {
			maxr = minr;
			minr = 0;
		}
		return (minr + Math.random() * (maxr - minr));
	},
	randomInt : function(minr, maxr) {
		return parseInt( frederickkPaper.random(minr,maxr) );
	},

	/*
	 *
	 *	http://www.siafoo.net/snippet/191
	 *
	 *	Returns a number between v1 and v2, including v1 but not v2.
	 *	The bias represents the preference towards lower or higher numbers,
	 *	as a number between 0.0 and 1.0. For example: 
	 *	random(0, 10, bias=0.9) will return 9 much more often than 1.
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
	clamp : function(val,min,max) {
		return val < min ? min:val > max ? min:val;
	},
	norm : function(val,start,stop) {
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



	/*
	 *
	 * @param amt
	 *			float: between 0.0 and 1.0
	 *
	 */
	lerp : function(start, stop, amt) {
		return start + (stop-start) * amt;
	},



	// ------------------------------------------------------------------------
	degrees : function(val) {
		return val * (180/Math.PI);
	},
	radians : function(val) {
		return val * (Math.PI/180);
	},
	getAngle : function(point) {
		var angle = Math.atan2(point.y - 0, point.x - 0);
		return angle;
	},


	// ------------------------------------------------------------------------
	sq : function(num) {
		return num*num;
	},


	// ------------------------------------------------------------------------
	boolToInt : function(val) {
		return (val) ? 1:0;
	},



	// ------------------------------------------------------------------------
	getType : function(object) {
		if (object instanceof paper.Tracing) return 'Tracing';
		else if (object instanceof paper.TextItem) return 'TextItem';
		else if (object instanceof paper.Raster) return 'Raster';
		else if (object instanceof paper.PlacedSymbol) return 'PlacedSymbol';
		else if (object instanceof paper.PlacedFile) return 'PlacedFile';
		else if (object instanceof paper.Path) return 'Path';
		else if (object instanceof paper.CompoundPath) return 'CompoundPath';
		else if (object instanceof paper.Group) return 'Group';
		else return 'undefined'
	},

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
	}

};



/*
 *
 *	Arrays
 *
 *
 */
Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	//for(var i=1; i<len; i++) if(this[i] > max) max = this[i];
	for(var i=1; i<len; i++) if(this[i] > max) max = i;
	return max;
};
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
	snapGrid : function(spacing) {
		this.position.snapGrid(spacing);
	},
	snapIso : function(scale) {
		this.position.snapIso(scale);
	}
});




/*
 *
 *	paper.Size
 *
 */
paper.Size.inject({
	area : function() {
		return (this.width * this.height);
	}
});



