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
 * trims white space from left (start) of String
 *
 * @return {String} trimmed input String
 *
 */
String.prototype.trimStart = function() {
	return this.replace(/^\s\s*/, '');
};

/**
 *
 * trims white space from right (end) of String
 *
 * @return {String} trimmed input String
 *
 */
String.prototype.trimEnd = function() {
	return this.replace(/\s\s*$/, '');
};

/**
 * trims all white space from String
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
 *
 * @return {String} trimmed input string
 *
 */
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/gm, '');
  };
}

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


