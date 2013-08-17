 /**
 *  
 *	FString.js
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


/*	------------------------------------------------------------------------
 *
 *	Strings
 *
 *	------------------------------------------------------------------------/

/**
 *	
 *	trims white space from right (end) of String
 *
 *	@return trimmed input String
 *
 */
String.prototype.rtrim = function() {
	for (var i=str.length-1; str.charAt(i) ==' '; i--) {
		str = str.substring(0, i);
	}
	return str;
};

/**
 *	
 *	trims all white space from String
 *	
 *	@return string of PaperJs object type
 *
 */
String.prototype.trim = function() {
	str = str.replace(/(^\s*)|(\s*$)/gi,"");
	str = str.replace(/[ ]{2,}/gi," ");
	str = str.replace(/\n /,"\n");
	return str;
};

/**
 *	
 *	converts String to Boolean value
 *	
 *	@return Boolean value
 *
 */
String.prototype.toBool = function() {
	switch(this.toLowerCase()) {
		case "true": case "yes": case "1": return true;
		case "false": case "no": case "0": case null: return false;
		default: return Boolean(this);
	}
};


