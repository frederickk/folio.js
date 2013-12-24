/*
 *
 * FString.js
 *
 * Extensions to JavaScript Array may be bad form... but whatever
 *
 */


/** ------------------------------------------------------------------------
 *
 * Strings
 *
 * ------------------------------------------------------------------------/

/**
 *
 * trims white space from right (end) of String
 *
 * @return {String} trimmed input String
 *
 */
String.prototype.trimEnd = function() {
	for (var i=this.length-1; this.charAt(i) ==' '; i--) {
		this.substring(0, i);
	}
	return this;
};

/**
 *
 * trims all white space from String
 *
 * @return {String} trimmed input string
 *
 */
String.prototype.trim = function() {
	this.replace(/(^\s*)|(\s*$)/gi,'');
	this.replace(/[ ]{2,}/gi,' ');
	this.replace(/\n /,'\n');
	return this;
};

/**
 *
 * converts String to Boolean value
 *
 * @return {Boolean}
 *
 */
String.prototype.toBool = function() {
	switch(this.toLowerCase()) {
		case 'true': case 'yes': case '1': return true;
		case 'false': case 'no': case '0': case null: return false;
		default: return Boolean(this);
	}
};


