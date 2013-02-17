/**
 *  
 *	FColor.js
 *	v0.2a
 *  
 *	16. February 2013
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
 */


/**
 *
 *	depreciating FColor namespace
 *
 */
frederickkPaper.FColor = function() {
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.lerp = function(arg0, arg1, arg2) {
		return arg0.lerp( arg1, arg2 );
	};
	this.randomRGBColor = function() {
		return new RgbColor().random();
	};
	this.randomGrayColor = function() {
		return new new GrayColor().random();
	};


	// ------------------------------------------------------------------------
	var componentToHex = function( component ) {
		return Color().componentToHex( component );
	};

	this.colorToHex = function(col) {
		return col.colorToHex();
	};

	this.hex = function(hex) {
		return new RgbColor().hexToColor(hex);
	};


	// ------------------------------------------------------------------------
	this.colorToInt = function(col) {
		return col.colorToInt();
	};

	this.integer = function(RgbInt) {
		return new RgbColor().intToColor();
	};


	// ------------------------------------------------------------------------
	this.bytes = function(arg0, arg1, arg2, arg3) {
		return new RgbColor().bytes(arg0, arg1, arg2, arg3);
	};


};



