/**
 *  
 *	FColor.js
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
 *	FColor
 *
 *	Expands paper.Color some of these may be redundant to
 *	the paperjs api, that's due to the legacy of the library's
 *	initially creation for use in Scriptographer.
 *
 */

frederickkPaper.FColor = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	// private
	var componentToHex = function(col) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	};


	// public
	this.lerpRGBColor = function(c1,c2, amt) {
		var r = frederickkPaper.lerp(c1.red,	c2.red,		amt);
		var g = frederickkPaper.lerp(c1.green,	c2.green,	amt);
		var b = frederickkPaper.lerp(c1.blue,	c2.blue,	amt);
		
		var col = new paper.RGBColor(r,g,b);
		return col;
	};
	this.randomRGBColor = function() {
		return new paper.RGBColor( Math.random(),Math.random(),Math.random() );
	};
	this.randomCMYKColor = function() {
		return new paper.CMYKColor( Math.random(),Math.random(),Math.random(),Math.random() );
	};
	this.randomGrayColor = function() {
		return new paper.GrayColor( Math.random() );
	};
	this.random = function() {
		return this.randomRGBColor();
	};

	// ------------------------------------------------------------------------
	this.ColorToInt = function(col) {
		var rgbInt;
		try {
			rgbInt = col.red;
			rgbInt = rgbInt << 8;
			rgbInt |= col.green;
			rgbInt = rgbInt << 8;
			rgbInt |= col.blue;
		}
		catch(err) {
			console.log( err );
			rgbInt = 16777215; // on error return white
		}
		return rgbInt;
	};
	this.IntToColor = function(RGBint) {
		var r = (RGB>> 16) & 255;
		var g = (RGB>> 8) & 255;
		var b = RGB& 255;
		return new paper.RGBColor( (r/255), (g/255), (b/255) );
	};

	// ------------------------------------------------------------------------
	/*
	 *	http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	 *
	 *	@param col
	 *			value as paper.RGBColor()
	 *
	 *	@return str
	 *			hex value of input color as string
	 *
	 */
	this.ColorToHex = function(col) {
		var r, g, b;
		var str = '';
		try {
			r = col.red*255;
			g = col.green*255;
			b = col.blue*255;
			str = '#'+ componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
		catch(err) {
			console.log( err );
			// str = '#ffffff'; // on error return white
		}
		return str;
	};
	this.HexToColor = function(_hex) {
		// var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		// var r = parseInt(result[1], 16);
		// var g = parseInt(result[2], 16);
		// var b = parseInt(result[3], 16);

		if( _hex.length >= 7 ) hex = _hex.split('#')[1];
		else hex = _hex;

		var big= parseInt(hex, 16);
		var r = (big>> 16) & 255;
		var g = (big>> 8) & 255;
		var b = big& 255;

		return new paper.RGBColor(r/255,g/255,b/255);
	};


	// ------------------------------------------------------------------------
	this.ByteToColor = function(r255, g255, b255, a255)  {
		var r = r255/255;
		var g = g255/255;
		var b = b255/255;
		var a = (a255 != undefined) ? a255/255 : 1.0;
		return new paper.RGBColor(r,g,b,a);
	};


	// ------------------------------------------------------------------------
	// /*
	//  *
	//  *	@param h
	//  *			0.0 - 1.0
	//  *	@param s
	//  *			0.0 - 1.0
	//  *	@param v
	//  *			0.0 - 1.0
	//  *
	//  *	@return
	//  *		new paper.RGBColor object (values = 0.0 - 1.0)
	//  *
	//  */
	// this.HSVtoColor = function(h, s, v) {
	// 	var r, g, b;
	// 	var RGB = new paper.RGBColor(Math.round(v), Math.round(v), Math.round(v));
	// 	if(s!=0) { 
	// 		// h must be < 1
	// 		var var_h = h * 6;
	// 		if (var_h==6) var_h = 0;
	// 		var var_i = Math.floor( var_h );
	// 		var var_1 = v*(1-s);
	// 		var var_2 = v*(1-s*(var_h-var_i));
	// 		var var_3 = v*(1-s*(1-(var_h-var_i)));
	// 		if(var_i==0) { 
	// 			var_r = v; 
	// 			var_g = var_3; 
	// 			var_b = var_1;
	// 		}
	// 		else if(var_i==1) { 
	// 			var_r = var_2;
	// 			var_g = v;
	// 			var_b = var_1;
	// 		}
	// 		else if(var_i==2) { 
	// 			var_r = var_1;
	// 			var_g = v;
	// 			var_b = var_3
	// 		}
	// 		else if(var_i==3) { 
	// 			var_r = var_1;
	// 			var_g = var_2;
	// 			var_b = v;
	// 		}
	// 		else if (var_i==4) { 
	// 			var_r = var_3;
	// 			var_g = var_1;
	// 			var_b = v;
	// 		}
	// 		else { 
	// 			var_r = v;
	// 			var_g = var_1;
	// 			var_b = var_2
	// 		}
	// 		RGB.red = Math.round(var_r);
	// 		RGB.green = Math.round(var_g);
	// 		RGB.blue = Math.round(var_b);
	// 	}
	// 	return RGB;
	// };

};


/**
 *
 *	paper.Color
 *
 */
paper.Color.inject({
	darken : function(pct) {
		this.red -= pct;
		this.green -= pct;
		this.blue -= pct;
		return this;
	},
	lighten : function(pct) {
		this.red += pct;
		this.green += pct;
		this.blue += pct;
		return this;
	}
});


