/**!
 *
 * FString.js
 *
 * Extensions to JavaScript Array may be bad form... but whatever
 *
 */


//------------------------------------------------------------------------
//
// Strings
//
//------------------------------------------------------------------------

/**
 * converts given string to Title Case
 * http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
 *
 * @return {String} input String in Title Case
 *
 */
String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

/**
 * trims white space from left (start) of String
 * http://stackoverflow.com/questions/3000649/trim-spaces-from-start-and-end-of-string
 *
 * @return {String} trimmed input String
 *
 */
String.prototype.trimStart = function() {
    return this.replace(/^\s\s*/, '');
};
if (!String.prototype.trimLeft) {
    String.prototype.trimLeft = String.prototype.trimStart;
}

/**
 * trims white space from right (end) of String
 * http://stackoverflow.com/questions/3000649/trim-spaces-from-start-and-end-of-string
 *
 * @return {String} trimmed input String
 *
 */
String.prototype.trimEnd = function() {
    return this.replace(/\s\s*$/, '');
};
if (!String.prototype.trimRight) {
    String.prototype.trimRight = String.prototype.trimEnd;
}

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

/**
 * reverse the order of a String
 *
 * @return {String}
 */
String.prototype.reverse = function() {
    var lines = this.split('\n'),
        temp = '';
    for (var i = 0; i < lines.length; i++) {
        lines[i].trim();
        temp = lines[i] + '\n' + temp;
    }

    return temp;
};

/**
 * split String to contain specific amount of content per line, as defined by the delimitter
 *
 * @param  {Number} amt        amount of content
 * @param  {String} delimitter (option) what to break the original String on
 *
 * @return {String}
 */
String.prototype.perLine = function(amt, delimitter) {
    delimitter = delimitter || ' ';
    var words = this.split(delimitter),
        temp = '',
        count = 1;
    for (var i = 0; i < words.length; i++) {
        words[i].trim();
        temp = (count % amt === 0 && count !== 1)
            ? temp + words[i] + '\n'
            : temp + words[i] + delimitter;
        count++;
    }

    return temp;
};

/**
 * generate a String of random characters
 *
 * @param  {Number} length number of charaters in random String (default: 36)
 *
 * @return {String}
 */
String.prototype.random = function(length) {
    length = length || 36;
    var val = '';
    for (; val.length < length; val += Math.random().toString(36).substr(2)) {}
    return val.substr(0, length);
};
