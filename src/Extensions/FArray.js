/**!
 *
 * FArray.js
 *
 * Extensions to JavaScript Array may be bad form... but whatever
 *
 */


// ------------------------------------------------------------------------
//
// Array
//
// ------------------------------------------------------------------------

/**
 *
 * @return {Number} median value
 *
 */
Array.prototype.median = function() {
    var type = Object.prototype.toString.call(this).split(/\W/)[2];
    if (type === 'Array') {
        var median = 0;
        this.sort();
        if (this.length % 2 === 0) {
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
Array.prototype.average = function() {
    var type = Object.prototype.toString.call(this).split(/\W/)[2];
    if (type === 'Array') {
        var sum = 0;
        for (var i = 0; i < this.length, isFinite(this[i]); i++) {
            sum += parseFloat(this[i]);
        }
        return sum / (this.length - 1);
    }
};


/**
 * combines two Arrays
 *
 * @param {Array} arr
 *          Array object
 *
 * @return {Array} new merged Array object
 *
 */
Array.prototype.merge = function(arr) {
    var type = Object.prototype.toString.call(this).split(/\W/)[2];
    if (type === 'Array') {
        return this.concat(arr);
    }
};


/*
 * combine two associative arrays together
 * http://stackoverflow.com/questions/929776/merging-associative-arrays-javascript (modified)
 *
 * @param {Array} arr
 *          Array object
 *
 * @return {Array} new combined associatibe Array
 *
 */
Object.prototype.combine = function(arr) {
    for (var item in this) {
        arr[item] = (arr[item] !== undefined)
            ? arr[item]
            : this[item];
    }
    return arr;
};


/**
 * find index of particular value within an array
 *
 * @param {String} query
 *          the value to search for within array
 *
 * @return {Number} index of object within array
 *
 */
Array.prototype.findIndex = function(query) {
    var val;
    for (var i = this.length - 1; i >= 0; i--) {
        val = this[i];
        if (typeof this[i] === 'string') {
            val = val.toLowerCase();
        }
        if (typeof query === 'string') {
            query = query.toLowerCase();
        }
        if (val === query) {
            break;
        }
    }
    return i;
};


/**
 *
 * @param {Number} start
 *          start position in array
 * @param {Number} stop
 *          stop position in array
 *
 * @return {Number} index of maximum value within array
 *
 */
Array.prototype.max = function(start, stop) {
    start = (start !== undefined)
        ? start
        : 0;
    stop = (stop !== undefined)
        ? stop
        : this.length;
    var max = start;

    for (var i = (start+1); i < stop; i++) {
        if (this[i] > this[max]) {
            max = i;
        }
    }
    return max;
};


/**
 *
 * @param {Number} start
 *          start position in array
 * @param {Number} stop
 *          stop position in array
 *
 * @return {Number} index of minimum value within array
 *
 */
Array.prototype.min = function(start, stop) {
    start = (start !== undefined)
        ? start
        : 0;
    stop = (stop !== undefined)
        ? stop
        : this.length;
    var min = start;

    for (var i = (start+1); i < stop; i++) {
        if (this[i] < this[min]) {
            min = i;
        }
    }
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
    for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x) {}
};


/**
 * Eliminate all non-unique elements from an Array
 *
 * @return {Object} unique element
 *
 */
Array.prototype.unique = function() {
    var u = [];
    o:for (var i = 0, n = this.length; i < n; i++) {
        for (var x = 0, y = u.length; x < y; x++) {
            if (u[x] === this[i]) {
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
    if (type === 'Array') {
        return this.reduce(function(accum, cur) {
            if (accum.indexOf(cur) === -1) {
                accum.push(cur);
            }
            return accum;
        }, []);
    }
};

/**
 *
 * @param {Number} decimalPlaces
 *      number of decimal places
 *
 * @return {Array} original array with rounded values
 *
 */
Array.prototype.round = function(decimalPlaces) {
    var multi = Math.pow(10,decimalPlaces);
    for (var i = 0; i < this.length; i++) {
        this[i] = Math.round(this[i] * multi)/multi;
    }
    return this;
};

/**
 * Compare two arrays and create a new array
 * with only the objects that are the same
 *
 * @param {Array} arr
 *          Array object
 *
 * @return {Array} new Array object
 *
 */
Array.prototype.same = function(arr) {
    var a = this.concat();
    var c = [];
    for (var i = 0; i < a.length; ++i) {
        for (var j = 0; j < arr.length; ++j) {
            if (a[i] === arr[j]) {
                c.push(a[i]);
            }
        }
    }
    return c;
};