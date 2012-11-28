/**
 *  
 *	FrederickkPaper.js
 *	v0.0 / 25. November 2012
 *
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	A collection of methods/functions that i find useful
 *	specifically for application within PaperJs (http://paperjs.org/) 
 *	most of which are based on my Frederickk library for Processing
 *	(http://github.com/frederickk/frederickk)
 *
 *
 *	Not all of the code in here was created by me
 *	but credit and links are given where credit is due
 *
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *  
 *  http://creativecommons.org/licenses/LGPL/2.1/
 *  
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *  
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *  
 */



// ------------------------------------------------------------------------
// Libraries 
// ------------------------------------------------------------------------
/**
 *	REQUIRED!
 */
// PaperJs @ http://paperjs.org/
// JQuery @  http://jquery.com/download/




// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// var bVerbose = true;


var Frederickk = function() {
	// initalization message
	console.log('\nFrederickkPaper.js');
	console.log('ken.frederick@gmx.de');
	console.log('------------------------------------\n');



	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	var f = this;

	// conversions
	this.ptToMm = 0.352777778;
	this.mmToPt = 2.83464567;

	this.ptToCm = 0.0352777778;
	this.CmToPt = 28.3464567;

	this.ptToIn = 0.0138888889;
	this.inToPt = 72;

	this.ptToPi = 0.0833333333;
	this.piToPt = 12;



	// ------------------------------------------------------------------------
	// Classes
	// ------------------------------------------------------------------------
	/**
	 *
	 *	FTools
	 *	a collection of tools that i tend to use frequently
	 *
	 */

	/*
	 *
	 *	FFade
	 *
	 */
	 this.FFade = {
	 	// properties
		alpha: 1.0,
		fadeMillis: 1000, // set to default of 1s OR 1000ms
		
		timeStartFade: 0.0,
		timeEndFade: 0.0,
		
		bBeginFade: false,
		bFadeIn: false,
		bFadeOut: false,


		// methods
		update : function() {
			_currentTime = new Date().getMilliseconds();
			this.update(_currentTime);
		},
		update : function(currentTime) {
			if(this.bBeginFade) {
				this.bBeginFade = false;
				this.timeStartFade = currentTime;
				if(this.bFadeIn) {
					this.timeEndFade = currentTime + parseFloat((1.0 - this.alpha) * this.fadeMillis);
				}
				else {
					this.timeEndFade = currentTime + parseFloat(this.alpha*this.fadeMillis);
				}
				if(this.timeEndFade == currentTime) {
					if(this.bFadeIn) {
						this.bFadeIn = false;
						this.alpha = 1.0;
					}
					else {
						this.bFadeOut = false;
						this.alpha = 0.0;
					}
				}
			}
			if(this.bFadeIn) {
				this.alpha = 1.0 - parseFloat((this.timeEndFade - currentTime) / this.fadeMillis);
				if(currentTime > this.timeEndFade) {
					this.bFadeIn = false;
					this.alpha = 1.0;
				}
			}
			else if(this.bFadeOut) {
				this.alpha = parseFloat((this.timeEndFade - currentTime) / this.fadeMillis);
				if(currentTime > this.timeEndFade) {
					this.bFadeIn = false;
					this.alpha = 0.0;
				}
			}
		},

		fadeIn : function() {
			if(this.bFadeIn)return;
			if(this.alpha == 1.0) return;
			this.bBeginFade = true;
			this.bFadeIn = true;
			this.bFadeOut = false;
		},
		fadeOut : function() {
			if(this.bFadeOut)return;
			if(this.alpha == 0.0) return;
			this.bBeginFade = true;
			this.bFadeOut = true;
			this.bFadeIn = false;
		},

		isFadingIn : function() {
			return this.bFadeIn;
		},
		isFadingOut : function() {
			return this.bFadeOut;
		},
		stopFade : function() {
			this.bBeginFade = this.bFadeIn = this.bFadeOut = false;
		},


		// sets
		/**
		 *	@param _seconds
		 *			length of fade in seconds 
		 */
		setFadeSeconds : function(_seconds) {
			setFadeMillis( parseInt(_seconds * 1000.0) );
		},
		/**
		 *	@param _millis
		 *			length of fade in milliseconds 
		 */
		setFadeMillis : function(_millis) {
			this.fadeMillis = _millis;
		}

	 };


	/*
	 *
	 *	FTime
	 *
	 */
	this.FTime = {
		// properties
		date: new Date(),


		// methods
		addZero : function(val) {
			if (val.length == 1) val = '0' + val;
			return val;
		},
		/**
		 *	@return hour
		 *			return the current hour as string 'HH'
		 */
		hour : function() {
			date = new Date();
			var hour = String( date.getHours() ); 
			hour = this.addZero(hour);
			return hour;
		},
		/**
		 *	@return minute
		 *			return the current minute as string 'mm'
		 */
		minute : function() {
			date = new Date();
			var minute = String( date.getMinutes() ); 
			minute = this.addZero(minute);
			return minute;
		},
		/**
		 *	@return second
		 *			return the current second as string 'ss'
		 */
		second : function() {
			date = new Date();
			var second = String( date.getSeconds() ); 
			second = this.addZero(second);
			return second;
		},

		add : function(h, m, s) {
			//date = new Date();
			date.setHours( date.getHours() + h, date.getMinutes() + m, date.getSeconds() + s );
			console.log( date );
			return date;
		},


		// gets
		/**
		 *	@param ms
		 *			input as milliseconds
		 *	@param format
		 *			boolean array = [hours, minutes, seconds]
		 *
		 *	@return human readable default is hh:mm:ss
		 */
		get : function(ms, format) {
			var disp;
			if( format === undefined ) disp = new Array(true, true, true);
			else disp = format;

			var seconds = parseInt( (ms / 1000) % 60 );
			var minutes = parseInt( ((ms / 1000) / 60) % 60 );
			var hours   = parseInt( (((ms / 1000) / 60) / 60) % 24 );

			var sec, min, hrs;
			if(seconds < 10)  sec = '0' + seconds;
			else              sec =  '' + seconds;
			if(minutes < 10)  min = '0' + minutes;
			else              min =  '' + minutes;
			if(hours < 10)    hrs = '0' + hours;
			else              hrs =  '' + hours;

		// 	var str = '';
		// 	if(disp[0]) str += this.addZero(hrs);
		// 	if(disp[0] && disp[1]) str += ':';
		// 	if(disp[1]) str += this.addZero(min);
		// 	if(disp[1] && disp[2]) str += ':';
		// 	if(disp[2]) str += this.addZero(sec);
		// 	return str;

			var str = '';
			if(disp[0]) str += hrs;
			if(disp[0] && disp[1]) str += ':';
			if(disp[1]) str += min;
			if(disp[1] && disp[2]) str += ':';
			if(disp[2]) str += sec;
			return str;
		}

	};


	/*
	 *
	 *	FColor
	 *
	 */
	this.FColor = {
		// properties


		// methods
		lerpCMYKColor : function(c1,c2, amt) {
			var c = f.lerp(c1.cyan,		c2.cyan,		amt);
			var m = f.lerp(c1.magenta,	c2.magenta,		amt);
			var y = f.lerp(c1.yellow,	c2.yellow,		amt);
			var k = f.lerp(c1.black,		c2.black,		amt);
			
			var col = new paper.CMYKColor(c,m,y,k);
			return col;
		},
		lerpRGBColor : function(c1,c2, amt) {
			var r = f.lerp(c1.red,	c2.red,		amt);
			var g = f.lerp(c1.green,	c2.green,	amt);
			var b = f.lerp(c1.blue,	c2.blue,	amt);
			
			var col = new paper.RGBColor(r,g,b);
			return col;
		},
		random : function() {
			return randomRGBColor();
		},
		randomRGBColor : function() {
			return new paper.RGBColor( Math.random(),Math.random(),Math.random() );
		},
		randomCMYKColor : function() {
			return new paper.CMYKColor( Math.random(),Math.random(),Math.random(),Math.random() );
		},
		randomGrayColor : function() {
			return new paper.GrayColor( Math.random() );
		},

		// ------------------------------------------------------------------------
		ColorToInt : function(col) {
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
		},
		IntToColor : function(RGBint) {
			var r = (RGB>> 16) & 255;
			var g = (RGB>> 8) & 255;
			var b = RGB& 255;
			return new paper.RGBColor( (r/255), (g/255), (b/255) );
		},

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
		ColorToHex : function(col) {
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
		},
		componentToHex : function(c) {
			var hex = c.toString(16);
			return hex.length == 1 ? '0' + hex : hex;
		},
		HexToColor : function(hex) {
			// var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			// var r = parseInt(result[1], 16);
			// var g = parseInt(result[2], 16);
			// var b = parseInt(result[3], 16);

			var big= parseInt(hex, 16);
			var r = (big>> 16) & 255;
			var g = (big>> 8) & 255;
			var b = big& 255;

			return new paper.RGBColor(r,g,b);
		},


		// ------------------------------------------------------------------------
		/*
		 *
		 *	http://www.easyrgb.com/math.html
		 *
		 *	@param h
		 *			0.0 - 1.0
		 *	@param s
		 *			0.0 - 1.0
		 *	@param v
		 *			0.0 - 1.0
		 *
		 *	@return
		 *		new paper.RGBColor object (values = 0.0 - 1.0)
		 *
		 */
		HSVtoColor : function(h, s, v) {
			var r, g, b;
			var RGB = new paper.RGBColor(Math.round(v), Math.round(v), Math.round(v));
			if(s!=0) { 
				// h must be < 1
				var var_h = h * 6;
				if (var_h==6) var_h = 0;
				var var_i = Math.floor( var_h );
				var var_1 = v*(1-s);
				var var_2 = v*(1-s*(var_h-var_i));
				var var_3 = v*(1-s*(1-(var_h-var_i)));
				if(var_i==0) { 
					var_r = v; 
					var_g = var_3; 
					var_b = var_1;
				}
				else if(var_i==1) { 
					var_r = var_2;
					var_g = v;
					var_b = var_1;
				}
				else if(var_i==2) { 
					var_r = var_1;
					var_g = v;
					var_b = var_3
				}
				else if(var_i==3) { 
					var_r = var_1;
					var_g = var_2;
					var_b = v;
				}
				else if (var_i==4) { 
					var_r = var_3;
					var_g = var_1;
					var_b = v;
				}
				else { 
					var_r = v;
					var_g = var_1;
					var_b = var_2
				}
				RGB.red = Math.round(var_r);
				RGB.green = Math.round(var_g);
				RGB.blue = Math.round(var_b);
			}
			return RGB;
		}

	};



	// ------------------------------------------------------------------------
	/*
	 *
	 *	FGeom
	 *
	 */


	/*
	 *
	 *	FPoint
	 *
	 */
	this.FPoint = paper.Point.extend({
		norm : function(startPt, stopPt) {
			this.x = f.norm(this.x, start.x, stop.x);
			this.y = f.norm(this.y, start.y, stop.y);
			return this;
		},

		random : function() {
			this.x = f.random(0, view.bounds.width);
			this.y = f.random(0, view.bounds.height);
			return this;
		},

		heading : function() {
			return -1 * (Math.atan2(-this.y, this.x));
		},

		/**
		 *
		 *  https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
		 *
		 */
		interpolateTo : function(v2, f) {
			this.x += ((v2.x - this.x) * f);
			this.y += ((v2.y - this.y) * f);
			return this;
		},


		// ------------------------------------------------------------------------
		limit : function(lim) {
			if (this.magSq() > lim * lim) {
				this.normalize();
				this.mult * lim;
				return this;
			}
			return this;
		},

		// ------------------------------------------------------------------------
		magSq : function() {
			return this.x * this.x + this.y * this.y;
		},

		/**
		 *
		 *	http://gmc.yoyogames.com/index.php?showtopic=290349
		 *
		 *	@param spacing
		 *				paper.Size()
		 *				spacing.width  = the horizontal snapping value, width of the grid.
		 *				spacing.height = the vertical snapping value, height of the grid.
		 *
		 */
		snapGrid : function(spacing) {
			var ix, iy;
			ix = Math.round(this.y/spacing.height - this.x/spacing.width);
			iy = Math.round(this.y/spacing.height + this.x/spacing.width);

			this.x = (iy - ix)/2*spacing.width;
			this.y = (iy + ix)/2*spacing.height;
			return this;
		},
		snapIso : function(scale) {
			if(scale === null) scale = 1;
			return this.snapGrid( new Size(32*scale,16*scale) );
		}

	});




	// ------------------------------------------------------------------------
	// Global Methods
	// ------------------------------------------------------------------------
	this.random = function(minr, maxr) {
		if(maxr === undefined) {
			maxr = minr;
			minr = 0;
		}
		return (minr + Math.random() * (maxr - minr));
	}
	this.randomInt = function(minr, maxr) {
		return parseInt( this.random(minr,maxr) );
	}

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
	this.randomBias = function(minr, maxr, bias) {
		var _map = new Array(90.0, 9.00, 4.00, 2.33, 1.50, 1.00, 0.66, 0.43, 0.25, 0.11, 0.01);
		bias = Math.max(0, Math.min(bias, 1)) * 10;

		var i = parseInt(Math.floor(bias))
		var n = _map[i]
		if(bias < 10) n += (_map[i+1]-n) * (bias-i);

		return Math.pow( Math.random(),n ) * (maxr-minr) + minr;
	}



	// ------------------------------------------------------------------------
	this.clamp = function(val,min,max) {
		return val < min ? min:val > max ? min:val;
	}
	this.norm = function(val,start,stop) {
		return (val - start) / (stop - start);
	}

	this.map = function(value, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	}



	// ------------------------------------------------------------------------
	this.roundDecimal = function(orig, deci) {
		var multi = Math.pow(10,deci);
		return Math.round(orig * multi)/multi;
	}


	/**
	 *
	 *	snap from:
	 *	http://stackoverflow.com/questions/4507784/snap-to-grid-functionality-using-javascript
	 *
	 */
	this.snap = function(value, gridSize, roundFunction) {
		if (roundFunction === undefined) roundFunction = Math.round;
		return gridSize * roundFunction(value / gridSize);
	}



	/*
	 *
	 * @param amt
	 *			float: between 0.0 and 1.0
	 *
	 */
	this.lerp = function(start, stop, amt) {
		return start + (stop-start) * amt;
	}



	// ------------------------------------------------------------------------
	this.degrees = function(val) {
		return val * (180/Math.PI);
	}
	this.radians = function(val) {
		return val * (Math.PI/180);
	}
	this.getAngle = function(point) {
		var angle = Math.atan2(point.y - 0, point.x - 0);
		return angle;
	}



	// ------------------------------------------------------------------------
	this.boolToInt = function(val) {
		return (val) ? 1:0;
	}



	// ------------------------------------------------------------------------
	this.getType = function(object) {
		if (object instanceof paper.Tracing) return 'Tracing';
		else if (object instanceof paper.TextItem) return 'TextItem';
		else if (object instanceof paper.Raster) return 'Raster';
		else if (object instanceof paper.PlacedSymbol) return 'PlacedSymbol';
		else if (object instanceof paper.PlacedFile) return 'PlacedFile';
		else if (object instanceof paper.Path) return 'Path';
		else if (object instanceof paper.CompoundPath) return 'CompoundPath';
		else if (object instanceof paper.Group) return 'Group';
		else return 'undefined'
	}





	// ------------------------------------------------------------------------
	// Strings
	// ------------------------------------------------------------------------
	this.trimToFit = function(textObj) {
		var visibleContent = textObj.visibleRange.content;
		textObj.content = trim(visibleContent);
		return textObj;
	}

	this.rtrim = function(str) {
		for (var i=str.length-1; str.charAt(i) ==' '; i--) {
			str = str.substring(0, i);
		}
		return str;
	}
	this.trim = function(str) {
		str = str.replace(/(^\s*)|(\s*$)/gi,"");
		str = str.replace(/[ ]{2,}/gi," ");
		str = str.replace(/\n /,"\n");
		return str;
	}



	// ------------------------------------------------------------------------
	// I/O
	// ------------------------------------------------------------------------
	/**
	 *
	 *	Jürg Lehni
	 *	http://scriptographer.org/forum/help/save-array-data-to-external-file/?pos=0#Post-3279
	 *
	 */
	this.saveFile = function(str, fname) {
		var file = new File(fname);
		if (file.exists()) file.remove();
		file.open();
		file.write( Json.encode(str) );
		file.close();
	}
	this.openFile = function(fname) {
		var file = new File(script.file.parent, fname);
		file.open();
		var data = Json.decode( file.readAll() );
		file.close();
		
		return data;
	}
	this.deleteFile = function(fname) {
		var file = new File(fname);
		// If file exists, we need to remove it first in order to overwrite its content.
		if (file.exists()) file.remove();
	}
	this.checkFile = function(fname) {
		var file = new File(fname);
		if (file.exists()) return true;
		else return false
	}

	/**
	 *
	 *	http://www.quirksmode.org/js/cookies.html
	 *
	 */
	this.saveCookie = function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = name + '=' + value + expires + '; path=/';
	}

	this.openCookie = function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	this.deleteCookie = function(name) {
		createCookie(name, '', -1);
	}



	// ------------------------------------------------------------------------
	// Arrays
	// ------------------------------------------------------------------------
	this.merge = function(arr1, arr2) {
		var output = arr1.concat(arr2);
		output.shuffle();
		return output;
	}


	// ------------------------------------------------------------------------
	/**
	 *
	 *	http://www.brain4.de/programmierecke/js/arraySort.php
	 *
	 */
	this.alphabetical = function(a, b) {
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



/**
 * 
 *	Additional Methods
 *
 */



// ------------------------------------------------------------------------
// Geometry
// ------------------------------------------------------------------------
paper.Item.prototype.snapGrid = function(spacing) {
	this.position.snapGrid(spacing);
}
paper.Item.prototype.snapIso = function(scale) {
	this.position.snapIso(scale);
}



// ------------------------------------------------------------------------
// Colors
// ------------------------------------------------------------------------
paper.Color.prototype.darken = function(pct) {
	this.red -= pct;
	this.green -= pct;
	this.blue -= pct;
	return this;
}
paper.Color.prototype.lighten = function(pct) {
	this.red += pct;
	this.green += pct;
	this.blue += pct;
	return this;
}



// ------------------------------------------------------------------------
// Arrays
// ------------------------------------------------------------------------
Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	//for(var i=1; i<len; i++) if(this[i] > max) max = this[i];
	for(var i=1; i<len; i++) if(this[i] > max) max = i;
	return max;
}
Array.prototype.min = function() {
	var min = this[0];
	var len = this.length;
	//for (var i=1; i<len; i++) if(this[i] < min) min = this[i];
	for (var i=1; i<len; i++) if(this[i] < min) min = i;
	return min;
}

/**
 *
 *	http://jsfromhell.com/array/shuffle
 *	http://www.brain4.de/programmierecke/js/arrayShuffle.php
 *
 */
Array.prototype.shuffle = function() {
	for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
};









