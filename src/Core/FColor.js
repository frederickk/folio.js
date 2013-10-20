 /**
 *
 *	FColor.js
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
 *	A collection of extensions for paper.Color
 *
 */


/*
 *
 *	paper.Color
 *
 */
paper.Color.inject({
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} component
	 *						input value to convert
	 *
	 *	@return {String} hex value of input color as string
	 *
	 */
	componentToHex: function( component ) {
		var hex = component.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	},


	/**
	 *
	 *	http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	 *
	 *	@return {String} hex value of input color as string
	 *
	 */
	colorToHex: function() {
		var r, g, b;
		var str = '';
		try {
			r = this.red*255;
			g = this.green*255;
			b = this.blue*255;
			str = '#'+ this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
		}
		catch(err) {
			console.log( err );
			// str = '#ffffff'; // on error return white
		}
		return str;
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return {Number} value of input color as integer
	 *
	 */
	colorToInt: function() {
		var RgbInt;
		try {
			RgbInt = this.red;
			RgbInt = RgbInt << 8;
			RgbInt |= this.green;
			RgbInt = RgbInt << 8;
			RgbInt |= this.blue;
		}
		catch(err) {
			console.log( err );
			RgbInt = 16777215; // on error return white
		}
		return RgbInt;
	},

	/**
	 *
	 *	@param {Number} RgbInt
	 *			value as integer
	 *
	 *	@return {Color} value of integer as Color
	 *
	 */
	integer: function(RgbInt) {
		this.red = (RgbInt>> 16) & 255;
		this.green = (RgbInt>> 8) & 255;
		this.blue = RgbInt& 255;
		return this;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} arg0
	 *			red as byte value (0-255)
	 *	@param {Number} arg1
	 *			green as byte value (0-255)
	 *	@param {Number} arg2
	 *			blue as byte value (0-255)
	 *	@param {Number} arg3
	 *			alpha as byte value (0-255)
	 *
	 *	@return {Color}
	 *
	 */
	bytes: function(arg0, arg1, arg2, arg3) {
		this.red = arg0/255;
		this.green = (arg1 != undefined) ? arg1/255 : arg0/255;
		this.blue = (arg2 != undefined) ? arg2/255 : arg0/255;
		this.alpha = (arg3 != undefined) ? arg3/255 : 1.0;
		return this;
	},


	// ------------------------------------------------------------------------
	/**
	 *	desaturate a color (based on hsb model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to desaturate color
	 *
	 *	@return {Color} desaturated Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.desaturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var desaturated = color.desaturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	desaturate: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		return color;
	},

	/**
	 *	saturate a color (based on hsb model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to saturate color
	 *
	 *	@return {Color} saturated Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.saturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var saturated = color.saturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	saturate: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation + (this.saturation * amt), 0,1 );
		return color;
	},

	/**
	 *	darken a color (based on hsl model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to darken color
	 *
	 *	@return {Color} darkened Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.darken(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var darkened = color.darken(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	darken: function(amt) {
		var color = new Color( this );
		color.lightness = paper.clamp( this.lightness - (this.lightness * amt), 0,1 );
		return color;
	},

	/**
	 *	dim a color (based on hsl model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to dim color
	 *
	 *	@return {Color} dimmed Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.dim(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var dimmed = color.dim(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	dim: function(amt) {
		var color = new Color( this );
		color.brightness = paper.clamp( this.brightness - (this.brightness * amt), 0,1 );
		return color;
	},

	/**
	 *	lighten a color (based on hsl model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to lighten color
	 *
	 *	@return {Color} lightened Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.lighten(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var lightened = color.lighten(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	lighten: function(amt) {
		var color = new Color( this );
		// color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		color.lightness = paper.clamp( this.lightness + (this.lightness * amt), 0,1 );
		return color;
	},

	/**
	 *	brighten a color (based on hsb model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to brighten color
	 *
	 *	@return {Color} brightened Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.brighten(0.2);
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var brightened = color.brighten(0.2);
	 *
	 */
	brighten: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		color.brightness = paper.clamp( this.brightness + (this.brightness * amt), 0,1 );
		return color;
	},


	/**
	 *	increase color contrast (based on hsb model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to increase contrast
	 *
	 *	@return {Color} Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.contrast(0.2);
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var contrasted = color.contrast(0.2);
	 *
	 */
	contrast: function(amt) {
		var color = new Color( this );
		return color.lightness < 0.5
			? color.darken(amt)
			: color.lighten(amt);
	},


	/**
	 *	invert color
	 *	NOTE: Color operators aren't working
	 *
	 *	@return {Color} inverted Color
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.invert();
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var inverted = color.invert();
	 *
	 */
	invert: function() {
		var color = new Color( this );
		for( var i=0; i<color._components.length; i++ ) {
			color._components[i] = 1-color._components[i];
		}
		return color;
	},

	/**
	 *	rotate color around hsb/l color wheel other components remain the same
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} degree
	 *			(0.0 - 360.0) rotation degree
	 *
	 *	@return {Color} rotated Color
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var compliment = color.rotate(180);
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var triad = [
	 *		color,
	 *		color.rotate(120),
	 *		color.rotate(240)
 	 * 	];
	 *
	 */
	rotate: function(degree) {
		var color = new Color( this );
		color.hue += degree;
		return color;
	},

	/**
	 *	interpolate color
	 *
	 *	@param {Color} from
	 *			start color
	 *	@param {Color} to
	 *			end color
	 *	@param {Number} amt
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Color} interpolated color
	 *
	 *	@example
	 *	var color1 = new Color( 0.0, 1.0, 0.7 );
	 *	var color2 = new Color( 0.0, 0.7, 1.0 );
	 *	var interpolateColor = new Color().interpolate( color1, color2, 0.5 );
	 *
	 */
	/**
	 *
	 *	@param {Color} to
	 *			end color
	 *	@param {Number} amt
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Color} interpolated color
	 *
	 *	@example
	 *	var color1 = new Color( 0.0, 1.0, 0.7 );
	 *	var color2 = new Color( 0.0, 0.7, 1.0 );
	 *	var interpolateColor = color1.interpolate( color2, 0.5 );
	 *
	 */
	//
	//	TODO: would interpolateTo make more sense?
	//
	// interpolateTo: function(toColor, amt) {
	// 	var color = new Color( this );
	// 	for( var i=0; i<color._components.length; i++ ) {
	// 		color._components[i] += ((toColor._components[i] - color._components[i]) * amt);
	// 	}
	// 	return color;
	// },
	interpolate: function( arg0, arg1, arg2 ) {
		var color = new Color( this );

		if(typeof arg1 === 'number') {
			var to = arg0.getComponents();
			for( var i=0; i<color._components.length; i++ ) {
				// color._components[i] += ((to[i] - color._components[i]) * arg1);
				color._components[i] = paper.interpolate( color._components[i], to[i], arg1 );
			}
		}
		else {
			var from = arg0.getComponents();
			var to = arg1.getComponents();
			for( var i=0; i<color._components.length; i++ ) {
				// color._components[i] += ((to[i] - from[i]) * arg2);
				color._components[i] = paper.interpolate( from[i], to[i], arg2 );
			}
		}

		color.setType( this.type );
		return color;
	},


	/**
	 *
	 *	@return {Color} random Color based on initialization arguments
	 *
	 *	@example
	 *	var color = new Color().random();
	 *	// all values between 0.0 and 1.0
	 *	// [ red: 0.1, green: 0.5, blue: 1.0 ]
	 *
	 *	var color = new Color(0.5).random();
	 *	// value between 0.5 and 1.0
	 *	// [ gray: 0.7 ]
	 *
	 *	var color = new Color(0.3, 0.6, 0.9).random();
	 *	// red value between 0.4 and 1.0, etc.
	 *	// [ red: 0.4, green: 0.7, blue: 1.0 ]
	 *
	 *	var color = new Color({ hue: 90, saturation: 1, brightness: 0.8 }).random();
	 *	// hue value between 90 and 360, etc.
	 *	// [ hue: 154, saturation: 1, brightness: 0.9 ]
	 *
	 *	var color = new Color({ hue: 90, saturation: 1, lightness: 0.8 }).random();
	 *	// hue value between 90 and 360, etc.
	 *	// [ hue: 274, saturation: 1, lightness: 0.9 ]
	 *
	 */
	random: function() {
		this._components[0] = ( this.type == 'hsb' || this.type == 'hsl' )
			? random( this._components[0], 360 )
			: random( this._components[0], 1 );
		for( var i=1; i<this._components.length; i++ ) {
			this._components[i] = random( this._components[i], 1 );
		}
		return this;
	}


});


