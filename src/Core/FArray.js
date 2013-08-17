 /**
 *  
 *	FArray.js
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
 *	Extensions to JavaScript Array
 *	may be bad form... but whatever
 *
 */


/*
 *
 *	Array
 *
 */

/**
 *	
 *	@return {Number} median value
 *
 */
Array.prototype.median = function() {
	var median = 0;
	this.sort();
	if (this.length % 2 === 0) {
		median = (this[this.length / 2 - 1] + this[this.length / 2]) / 2;
	}
	else {
		median = this[(this.length - 1) / 2];
	}
	return median;
};

/**
 *	
 *	@return {Object} unique element
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
 *	
 *	merges (then shuffles) two Arrays
 *	
 *	@param {Array} arr2
 *				Array object 2
 *
 *	@return new merged Array object
 *
 */
Array.prototype.merge = function(arr) {
	var output = this.concat(arr);
	output.shuffle();
	return output;
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
	start = (start != undefined) 
		? start
		: 0;
	stop = (stop != undefined)
		? stop
		: this.length;
	var max = this[start];

	for(var i=(start+1); i<stop; i++) if(this[i] > max) max = i;
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
	start = (start != undefined)
		? start
		: 0;
	stop = (stop != undefined)
		? stop
		: this.length;
	var min = this[start];

	for (var i=(start+1); i<stop; i++) if(this[i] < min) min = i;
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

/**
 *
 *	@param {Number} decimalPlaces
 *			number of decimal places
 *				
 *	@return original array with rounded values
 *
 */
Array.prototype.round = function(decimalPlaces) {
	var multi = Math.pow(10,decimalPlaces);
	for (var i=0; i<this.length; i++) this[i] = Math.round(this[i] * multi)/multi;
	return this;
};
