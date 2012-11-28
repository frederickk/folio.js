/**
 *  
 *	FrederickkPaper.js
 *	v0.1 / 25. November 2012
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
/**
 *
 *	REQUIRED LIBRARIES!
 *
 *	PaperJs @ http://paperjs.org/
 *	JQuery @  http://jquery.com/download/
 *
 */



// ------------------------------------------------------------------------
// Core
var Frederickk = Frederickk || {};

// FTools
// var Frederickk.FTools = Frederickk.FTools || {};  


(function() {
	console.log('\nFrederickkPaper.js');
	console.log('ken.frederick@gmx.de');
	console.log('------------------------------------\n');
})();



// ------------------------------------------------------------------------
/**
 *
 *	Core Methods
 *
 *	A collection mathematical operations, similar
 *	to those found in Processing
 *
 */
Frederickk = {
 	// Namespaces
 	FIO: {},
 	F3D: {},


	// Properties


	// Methods
	random : function(minr, maxr) {
		if(maxr === undefined) {
			maxr = minr;
			minr = 0;
		}
		return (minr + Math.random() * (maxr - minr));
	},
	randomInt : function(minr, maxr) {
		return parseInt( random(minr,maxr) );
	},

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
	randomBias : function(minr, maxr, bias) {
		var _map = new Array(90.0, 9.00, 4.00, 2.33, 1.50, 1.00, 0.66, 0.43, 0.25, 0.11, 0.01);
		bias = Math.max(0, Math.min(bias, 1)) * 10;

		var i = parseInt(Math.floor(bias))
		var n = _map[i]
		if(bias < 10) n += (_map[i+1]-n) * (bias-i);

		return Math.pow( Math.random(),n ) * (maxr-minr) + minr;
	},



	// ------------------------------------------------------------------------
	clamp : function(val,min,max) {
		return val < min ? min:val > max ? min:val;
	},
	norm : function(val,start,stop) {
		return (val - start) / (stop - start);
	},

	map : function(value, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	},



	// ------------------------------------------------------------------------
	roundDecimal : function(orig, deci) {
		var multi = Math.pow(10,deci);
		return Math.round(orig * multi)/multi;
	},


	/**
	 *
	 *	snap from:
	 *	http://stackoverflow.com/questions/4507784/snap-to-grid-functionality-using-javascript
	 *
	 */
	snap : function(value, gridSize, roundFunction) {
		if (roundFunction === undefined) roundFunction = Math.round;
		return gridSize * roundFunction(value / gridSize);
	},



	/*
	 *
	 * @param amt
	 *			float: between 0.0 and 1.0
	 *
	 */
	lerp : function(start, stop, amt) {
		return start + (stop-start) * amt;
	},



	// ------------------------------------------------------------------------
	degrees : function(val) {
		return val * (180/Math.PI);
	},
	radians : function(val) {
		return val * (Math.PI/180);
	},
	getAngle : function(point) {
		var angle = Math.atan2(point.y - 0, point.x - 0);
		return angle;
	},



	// ------------------------------------------------------------------------
	boolToInt : function(val) {
		return (val) ? 1:0;
	},



	// ------------------------------------------------------------------------
	getType : function(object) {
		if (object instanceof paper.Tracing) return 'Tracing';
		else if (object instanceof paper.TextItem) return 'TextItem';
		else if (object instanceof paper.Raster) return 'Raster';
		else if (object instanceof paper.PlacedSymbol) return 'PlacedSymbol';
		else if (object instanceof paper.PlacedFile) return 'PlacedFile';
		else if (object instanceof paper.Path) return 'Path';
		else if (object instanceof paper.CompoundPath) return 'CompoundPath';
		else if (object instanceof paper.Group) return 'Group';
		else return 'undefined'
	},





	// ------------------------------------------------------------------------
	// Strings
	// ------------------------------------------------------------------------
	trimToFit : function(textObj) {
		var visibleContent = textObj.visibleRange.content;
		textObj.content = trim(visibleContent);
		return textObj;
	},

	rtrim : function(str) {
		for (var i=str.length-1; str.charAt(i) ==' '; i--) {
			str = str.substring(0, i);
		}
		return str;
	},
	trim : function(str) {
		str = str.replace(/(^\s*)|(\s*$)/gi,"");
		str = str.replace(/[ ]{2,}/gi," ");
		str = str.replace(/\n /,"\n");
		return str;
	},



	// ------------------------------------------------------------------------
	// Arrays
	// ------------------------------------------------------------------------
	merge : function(arr1, arr2) {
		var output = arr1.concat(arr2);
		output.shuffle();
		return output;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	http://www.brain4.de/programmierecke/js/arraySort.php
	 *
	 */
	alphabetical : function(a, b) {
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

/*
 *
 *	FConversions
 *
 *	A collection of helpful conversion ratios
 *
 */
Frederickk.FConversions = function() {
	// conversions
	this.ptToMm = 0.352777778;
	this.mmToPt = 2.83464567;

	this.ptToCm = 0.0352777778;
	this.CmToPt = 28.3464567;

	this.ptToIn = 0.0138888889;
	this.inToPt = 72;

	this.ptToPi = 0.0833333333;
	this.piToPt = 12;

};



/*
 *
 *	FIO
 *
 *	A collection of I/O methods;
 *
 */
Frederickk.FIO = {
	/**
	 *
	 *	Jürg Lehni
	 *	http://scriptographer.org/forum/help/save-array-data-to-external-file/?pos=0#Post-3279
	 *
	 */
	saveFile : function(str, fname) {
		var file = new File(fname);
		if (file.exists()) file.remove();
		file.open();
		file.write( Json.encode(str) );
		file.close();
	},
	openFile : function(fname) {
		var file = new File(script.file.parent, fname);
		file.open();
		var data = Json.decode( file.readAll() );
		file.close();
		
		return data;
	},
	deleteFile : function(fname) {
		var file = new File(fname);
		// If file exists, we need to remove it first in order to overwrite its content.
		if (file.exists()) file.remove();
	},
	checkFile : function(fname) {
		var file = new File(fname);
		if (file.exists()) return true;
		else return false
	},

	/**
	 *
	 *	http://www.quirksmode.org/js/cookies.html
	 *
	 */
	saveCookie : function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = name + '=' + value + expires + '; path=/';
	},

	openCookie : function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	deleteCookie : function(name) {
		createCookie(name, '', -1);
	}

};

/*
 *
 *	Arrays
 *
 *
 */
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



// ------------------------------------------------------------------------
/**
 *
 *	FGeom
 *
 *	A collection of tools that I tend to use frequently
 *
 */


/*
 *
 *	paper.Item
 *
 */
paper.Item.prototype.snapGrid = function(spacing) {
	this.position.snapGrid(spacing);
}
paper.Item.prototype.snapIso = function(scale) {
	this.position.snapIso(scale);
}


/*
 *
 *	FPoint
 *
 */
Frederickk.FPoint = paper.Point.extend({
	norm : function(startPt, stopPt) {
		this.x = Frederickk.norm(this.x, start.x, stop.x);
		this.y = Frederickk.norm(this.y, start.y, stop.y);
		return this;
	},

	random : function() {
		this.x = Frederickk.random(0, view.bounds.width);
		this.y = Frederickk.random(0, view.bounds.height);
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
/**
 *
 *	FTools
 *
 *	A collection of tools that I tend to use frequently
 *
 */


/*
 *
 *	FColor
 *
 *	Expands paper.Color some of these may be redundant to
 *	the paperjs api, that's due to the legacy of the library's
 *	initially creation for use in Scriptographer.
 *
 */

Frederickk.FColor = function() {
	// Properties


	// Methods
	// private
	var componentToHex = function(col) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	};


	// public
	this.lerpCMYKColor = function(c1,c2, amt) {
		var c = Frederickk.lerp(c1.cyan,		c2.cyan,		amt);
		var m = Frederickk.lerp(c1.magenta,		c2.magenta,		amt);
		var y = Frederickk.lerp(c1.yellow,		c2.yellow,		amt);
		var k = Frederickk.lerp(c1.black,		c2.black,		amt);
		
		var col = new paper.CMYKColor(c,m,y,k);
		return col;
	};
	this.lerpRGBColor = function(c1,c2, amt) {
		var r = Frederickk.lerp(c1.red,		c2.red,		amt);
		var g = Frederickk.lerp(c1.green,	c2.green,	amt);
		var b = Frederickk.lerp(c1.blue,	c2.blue,	amt);
		
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
	this.HexToColor = function(hex) {
		// var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		// var r = parseInt(result[1], 16);
		// var g = parseInt(result[2], 16);
		// var b = parseInt(result[3], 16);

		var big= parseInt(hex, 16);
		var r = (big>> 16) & 255;
		var g = (big>> 8) & 255;
		var b = big& 255;

		return new paper.RGBColor(r,g,b);
	};


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
	this.HSVtoColor = function(h, s, v) {
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
	};

}

paper.Color.prototype.darken = function(pct) {
	this.red -= pct;
	this.green -= pct;
	this.blue -= pct;
	return this;
};
paper.Color.prototype.lighten = function(pct) {
	this.red += pct;
	this.green += pct;
	this.blue += pct;
	return this;
};



/*
 *
 *	FFade
 *
 */
Frederickk.FFade = function() {
	// Properties
	// private
	var fadeMillis = 1000; // set to default of 1s OR 1000ms
	
	var timeStartFade = 0.0;
	var timeEndFade = 0.0;
	
	var bBeginFade = false;
	var bFadeIn = false;
	var bFadeOut = false;

	// public
	this.alpha = 1.0;


	
	// Methods
	this.update = function() {
		_currentTime = new Date().getMilliseconds();
		this.update(_currentTime);
	};
	this.update = function(currentTime) {
		if(bBeginFade) {
			bBeginFade = false;
			timeStartFade = currentTime;
			if(bFadeIn) {
				timeEndFade = currentTime + parseFloat((1.0 - this.alpha) * fadeMillis);
			}
			else {
				timeEndFade = currentTime + parseFloat(this.alpha*fadeMillis);
			}
			if(timeEndFade == currentTime) {
				if(bFadeIn) {
					bFadeIn = false;
					this.alpha = 1.0;
				}
				else {
					bFadeOut = false;
					this.alpha = 0.0;
				}
			}
		}
		if(bFadeIn) {
			this.alpha = 1.0 - parseFloat((timeEndFade - currentTime) / fadeMillis);
			if(currentTime > timeEndFade) {
				bFadeIn = false;
				this.alpha = 1.0;
			}
		}
		else if(bFadeOut) {
			this.alpha = parseFloat((timeEndFade - currentTime) / fadeMillis);
			if(currentTime > timeEndFade) {
				bFadeIn = false;
				this.alpha = 0.0;
			}
		}
	};

	this.fadeIn = function() {
		if(bFadeIn)return;
		if(this.alpha == 1.0) return;
		bBeginFade = true;
		bFadeIn = true;
		bFadeOut = false;
	};
	this.fadeOut = function() {
		if(bFadeOut)return;
		if(this.alpha == 0.0) return;
		bBeginFade = true;
		bFadeOut = true;
		bFadeIn = false;
	};

	this.isFadingIn = function() {
		return bFadeIn;
	};
	this.isFadingOut = function() {
		return bFadeOut;
	};
	this.stopFade = function() {
		bBeginFade = bFadeIn = bFadeOut = false;
	};



	// sets
	/**
	 *	@param _seconds
	 *			length of fade in seconds 
	 */
	this.setFadeSeconds = function(_seconds) {
		setFadeMillis( parseInt(_seconds * 1000.0) );
	};
	/**
	 *	@param _millis
	 *			length of fade in milliseconds 
	 */
	this.setFadeMillis = function(_millis) {
		fadeMillis = _millis;
	};

}


/*
 *
 *	FTime
 *
 */
Frederickk.FTime = function() {
	// Properties
	this.date = new Date();



	// Methods
	// private
	var addZero = function(val) {
		if (val.length == 1) val = '0' + val;
		return val;
	};


	// public
	/**
	 *	@return hour
	 *			return the current hour as string 'HH'
	 */
	this.hour = function() {
		date = new Date();
		var hour = String( date.getHours() ); 
		hour = addZero(hour);
		return hour;
	};
	/**
	 *	@return minute
	 *			return the current minute as string 'mm'
	 */
	this.minute = function() {
		date = new Date();
		var minute = String( date.getMinutes() ); 
		minute = addZero(minute);
		return minute;
	};
	/**
	 *	@return second
	 *			return the current second as string 'ss'
	 */
	this.second = function() {
		date = new Date();
		var second = String( date.getSeconds() ); 
		second = addZero(second);
		return second;
	};

	this.add = function(h, m, s) {
		//date = new Date();
		date.setHours( date.getHours() + h, date.getMinutes() + m, date.getSeconds() + s );
		console.log( date );
		return date;
	};



	// gets
	/**
	 *	@param ms
	 *			input as milliseconds
	 *	@param format
	 *			boolean array = [hours, minutes, seconds]
	 *
	 *	@return human readable default is hh:mm:ss
	 */
	this.get = function(ms, format) {
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
	// 	if(disp[0]) str += addZero(hrs);
	// 	if(disp[0] && disp[1]) str += ':';
	// 	if(disp[1]) str += addZero(min);
	// 	if(disp[1] && disp[2]) str += ':';
	// 	if(disp[2]) str += addZero(sec);
	// 	return str;

		var str = '';
		if(disp[0]) str += hrs;
		if(disp[0] && disp[1]) str += ':';
		if(disp[1]) str += min;
		if(disp[1] && disp[2]) str += ':';
		if(disp[2]) str += sec;
		return str;
	};

	/**
	 *	@param h
	 *			input as hours OR input string as hh:mm:ss OR mm:ss
	 *	@param m
	 *			input as minutes
	 *	@param s
	 *			input as seconds
	 *
	 *	@return time in milliseconds
	 */
	this.getMs = function(_h, _m, _s) {
		var h,m,s;
		if(_m === undefined && _s === undefined) {
			var temp = _h.split(':');
			if(temp.length == 2) {
				h = 0;
				m = temp[0];
				s = temp[1];
			}
			else {
				h = temp[0];
				m = temp[1];
				s = temp[2];
			}
		}
		else {
			h = _h;
			m = _m;
			s = _s;
		}
		return parseInt(3600000 * h + 60000 * m + 1000 * s);
	};



}




// ------------------------------------------------------------------------
/**
 *
 *	F3D
 *
 *	A barebones 3D class
 *
 *	code mostly taken from
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */


/*
 *
 *	FPoint3
 *
 *	A 3D point
 *
 */

/**
 *	@param x
 *			x coordinate
 *	@param y
 *			y coordinate
 *	@param z
 *			z coordinate
 */
Frederickk.F3D.FPoint3 = function(_x, _y, _z) {
	// properties
	this.x = _x != undefined ? _x : 0;
	this.y = _y != undefined ? _y : 0;
	this.z = _z != undefined ? _z : 0;

	var scene = null;

	var xIndex = 0;
	var yIndex = 0;
	var zIndex = 0;
	var xIndex2D = 0;
	var yIndex2D = 0;


	// methods
	/**
	 *	@param scene
	 *			the scene with which the points are
	 *			associated with
	 */
	this.setup = function(scene) {
		scene = scene;

		var idx = scene.setupPoint(this.x, this.y, this.z);

		var i3 = idx*3;
		var i2 = idx*2;

		xIndex = i3;
		yIndex = i3+1;
		zIndex = i3+2;

		xIndex2D = i2;
		yIndex2D = i2+1;
	};


	// sets
	this.setX = function(value) {
		if( scene != null ) scene.points3D[xIndex] = value;
		x = value;
	};
	this.setY = function(value) {
		if( scene != null ) scene.points3D[yIndex] = value;
		y = value;
	};
	this.setZ = function(value) {
		if( scene != null ) scene.points3D[zIndex] = value;
		z = value;
	};


	// gets
	this.getSceneIndex = function() {
		return mySceneIndex;
	};

	/**
	 *	@return projected 2D x
	 */
	this.x2D = function() {
		return scene.points2D[xIndex2D];
	};

	/**
	 *	@return projected 2D y
	 */
	this.y2D = function() {
		return scene.points2D[yIndex2D];
	};

}



/**
 *
 *	3D Path Class
 *
 */
Frederickk.F3D.FPath3 = function() {
	// properties
	var points = [];
	// var startPoint = new Frederickk.F3D.FPoint3();
	// var endPoint = new Frederickk.F3D.FPoint3();


	// methods
	/**
	 *	@return path
	 *			projected 2D path
	 */
	this.draw = function() {
		var path = new Path();
		for(var i=0; i<points.length; i++) {
			path.add( new Point( points[i].x2D, points[i].y2D ) );
		}
		path.closed = true;
		return path;
	};


	// set
	/**
	 *	@param scene
	 *			scene to associate points with
	 */
	this.addToScene = function(scene) {
		for(var i=0; i<points.length; i++) {
			points[i].setup(scene);
		}
	};

	/**
	 *	@param point
	 *			add points to path
	 */
	this.add = function(point) {
		points[points.length] = point;
	};
	
}



/**
 *
 *	3D Scene Class
 *
 */
 // _f3d.FScene3D = function() {

 // }
Frederickk.F3D.FScene3D = function() {
	// properties
	var group;
	var matrix = new Matrix3D();

	var rotationX = 0;
	var rotationY = 0;
	var rotationZ = 0;
	var scale = 1;

	var focalLength = 0;
	var sceneWidth = 0;
	var sceneHeight = 0;

	var points3D = [];
	var points2D = [];
	var numPoints = 0;

	var items = [];


	// methods
	/**
	 *	@param _width
	 *			width of scene
 	 *			default: view.bounds.width
	 *	@param _height
	 *			height of scene
 	 *			default: view.bounds.height
	 *	@param _focalLength
	 *			focal length of scene
 	 *			default: 1000
	 */
	this.setup = function(_width, _height, _focalLength) {
		focalLength = _focalLength || 1000;
		sceneWidth  = _width || paper.view.bounds.width;
		sceneHeight = _height || paper.view.bounds.height;

// 		this.sceneWidth = width != undefined ? width : view.bounds.width;
// 		this.sceneHeight = height != undefined ? height : view.bounds.height;
// 		this.focalLength = focalLength != undefined ? focalLength : 1000;

		group = new paper.Group();
	};


	this.draw = function() {
		var halfWidth = sceneWidth*0.5;
		var halfHeight = sceneHeight*0.5;

		matrix.identity();
		matrix.scale(scale, scale, scale);
		matrix.rotateX(rotationX);
		matrix.rotateY(rotationY);
		matrix.rotateZ(rotationZ);
		matrix.translate(0, 0, 1000);

		var transformed = matrix.transformArray(points3D);
		
		// group.removeChildren();
		for(var i=0; i<numPoints; i++) {
			var i3 = i*3;
			var i2 = i*2;

			// var x = points3D[i3];
			// var y = points3D[i3+1];
			// var z = points3D[i3+2];
			var x = transformed[i3];
			var y = transformed[i3+1];
			var z = transformed[i3+2];
			
			var scale = focalLength/(z+focalLength);

			points2D[i2]   = x*scale+halfWidth;
			points2D[i2+1] = y*scale+halfHeight;
		}

		for(var i=0; i<items.length; i++) {
			var paths = items[i].draw();
			paths.strokeColor = new paper.RGBColor(1.0,0.0,1.0);
			console.log( 'scene.draw()' );
			console.log( paths );
			group.appendTop( paths );
			console.log( i );
		}

		return group;
	};

	this.setupPoint = function(x, y, z) {
		var returnVal = numPoints;

		points2D[points2D.length] = 0;
		points2D[points2D.length] = 0;

		points3D[points3D.length] = x;
		points3D[points3D.length] = y;
		points3D[points3D.length] = z;

		numPoints++;

		return returnVal;
	};


	// set
	this.addItem = function(item) {
		items[items.length] = item;
		item.addToScene(this);
	};
	
	this.rotateX = function(val) {
		rotationX = val;
	};
	this.rotateY = function(val) {
		rotationY = val;
	};
	this.rotateZ = function(val) {
		rotationZ = val;
	};


	// get
	/**
	 *	@return scene path items as group 
	 */
	this.get = function() {
		return group;
	}

}



/**
 *
 *	Matrix3D
 *
 *	forked from daijimachine's "Matrix3D(lib)"
 *	http://jsdo.it/daijimachine/matrix3d
 * 
 *	@author Masayuki Daijima (ARCHETYP Inc.)
 *	http://www.daijima.jp/blog/
 *	http://twitter.com/daijimachine
 *
 */
var Matrix3D = function( n11, n12, n13, n14, 
					n21, n22, n23, n24, 
					n31, n32, n33, n34, 
					n41, n42, n43, n44 ) {
	this.n11 = n11 || 1;
	this.n12 = n12 || 0;
	this.n13 = n13 || 0;
	this.n14 = n14 || 0;
	this.n21 = n21 || 0;
	this.n22 = n22 || 1;
	this.n23 = n23 || 0;
	this.n24 = n24 || 0;
	this.n31 = n31 || 0;
	this.n32 = n32 || 0;
	this.n33 = n33 || 1;
	this.n34 = n34 || 0;
	this.n41 = n41 || 0;
	this.n42 = n42 || 0;
	this.n43 = n43 || 0;
	this.n44 = n44 || 1;



	// methods
	this.clone = function() {
		return new Matrix3D(this.n11, this.n12, this.n13, this.n14, this.n21, this.n22, this.n23, this.n24, this.n31, this.n32, this.n33, this.n34, this.n41, this.n42, this.n43, this.n44);
	}

	this.concat = function(m) {
		var values = {};
	
		values.n11 = this.n11 * m.n11 + this.n12 * m.n21 + this.n13 * m.n31 + this.n14 * m.n41;
		values.n12 = this.n11 * m.n12 + this.n12 * m.n22 + this.n13 * m.n32 + this.n14 * m.n42;
		values.n13 = this.n11 * m.n13 + this.n12 * m.n23 + this.n13 * m.n33 + this.n14 * m.n43;
		values.n14 = this.n11 * m.n14 + this.n12 * m.n24 + this.n13 * m.n34 + this.n14 * m.n44;
							 
		values.n21 = this.n21 * m.n11 + this.n22 * m.n21 + this.n23 * m.n31 + this.n24 * m.n41;
		values.n22 = this.n21 * m.n12 + this.n22 * m.n22 + this.n23 * m.n32 + this.n24 * m.n42;
		values.n23 = this.n21 * m.n13 + this.n22 * m.n23 + this.n23 * m.n33 + this.n24 * m.n43;
		values.n24 = this.n21 * m.n14 + this.n22 * m.n24 + this.n23 * m.n34 + this.n24 * m.n44;
							 
		values.n31 = this.n31 * m.n11 + this.n32 * m.n21 + this.n33 * m.n31 + this.n34 * m.n41;
		values.n32 = this.n31 * m.n12 + this.n32 * m.n22 + this.n33 * m.n32 + this.n34 * m.n42;
		values.n33 = this.n31 * m.n13 + this.n32 * m.n23 + this.n33 * m.n33 + this.n34 * m.n43;
		values.n34 = this.n31 * m.n14 + this.n32 * m.n24 + this.n33 * m.n34 + this.n34 * m.n44;
							 
		values.n41 = this.n41 * m.n11 + this.n42 * m.n21 + this.n43 * m.n31 + this.n44 * m.n41;
		values.n42 = this.n41 * m.n12 + this.n42 * m.n22 + this.n43 * m.n32 + this.n44 * m.n42;
		values.n43 = this.n41 * m.n13 + this.n42 * m.n23 + this.n43 * m.n33 + this.n44 * m.n43;
		values.n44 = this.n41 * m.n14 + this.n42 * m.n24 + this.n43 * m.n34 + this.n44 * m.n44;
	
		this.initialize(values);
	}

	this.initialize = function(values) {
		for(var i in values) this[i] = values[i];
	}

	this.createBox = function(scalex, scaley, scalez, rotationx, rotationy, rotationz, tx, ty, tz) {
		this.identity();
		if (rotationx != 0) this.rotateX(rotationx);
		if (rotationy != 0) this.rotateY(rotationy);
		if (rotationz != 0) this.rotateZ(rotationz);
		if (scalex != 1 || scaley != 1 || scalez != 1) this.scale(scalex, scaley, scalez);
		if (tx != 0 || ty != 0 || tz != 0) this.translate(tx, ty, tz);
	}

	this.identity = function() {
		this.initialize({n11:1, n12:0, n13:0, n14:0, n21:0, n22:1, n23:0, n24:0, n31:0, n32:0, n33:1, n34:0, n41:0, n42:0, n43:0, n44:1});
	}

	this.rotateX = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			1, 0, 0, 0, 
			0, cos, -sin, 0,	
			0, sin, cos, 0,	
			0, 0, 0, 1)
		);
	}

	this.rotateY = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			cos, 0, -sin, 0, 
			0, 1, 0, 0, 
			sin, 0, cos, 0, 
			0, 0, 0, 1)
		);
	}

	this.rotateZ = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			cos, sin, 0, 0, 
			-sin, cos, 0, 0, 
			0, 0, 1, 0, 
			0, 0, 0, 1)
		);
	}

	this.scale = function(sx, sy, sz) {
		this.concat(new Matrix3D(
			sx, 0, 0, 0, 
			0, sy, 0, 0, 
			0, 0, sz, 0, 
			0, 0, 0, 1)
		);
	}

	this.translate = function(dx, dy, dz) {
		this.n41 += dx;
		this.n42 += dy;
		this.n43 += dz;
	}

	this.transformPoint = function(point) {
		return new Vertex3D(
			this.n11 * point.x + this.n21 * point.y + this.n31 * point.z + this.n41, 
			this.n12 * point.x + this.n22 * point.y + this.n32 * point.z + this.n42, 
			this.n13 * point.x + this.n23 * point.y + this.n33 * point.z + this.n43
		);
	}

	this.transformArray = function(arr) {
		var rVal=[];

		var numPoints=arr.length/3;
	
		for(var i=0;i<numPoints;i++) {
			var i3=i*3;
			var x=arr[i3];
			var y=arr[i3+1];
			var z=arr[i3+2];
		
			rVal[i3]=this.n11*x+this.n21*y+this.n31*z+this.n41;
			rVal[i3+1]=this.n12*x+this.n22*y+this.n32*z+this.n42;
			rVal[i3+2]=this.n13*x+this.n23*y+this.n33*z+this.n43;
		}
	
		return rVal;
	}

	this.toString = function() {
		return this.n11+","+this.n12+","+this.n13+","+this.n14+","+
			this.n21+","+this.n22+","+this.n23+","+this.n24+","+
			this.n31+","+this.n32+","+this.n33+","+this.n34+","+
			this.n41+","+this.n42+","+this.n43+","+this.n44;
	}
	
}




// ------------------------------------------------------------------------
/**
 *
 *	FControl
 *
 *	A collection of methods for adding HTML form elements
 *	for use as a GUI
 *
 */


Frederickk.FControl = function(_divId) { // #divId
	this.divId = _divId;

	/**
	 *	@param name
	 *			name of element
	 *	@param value
	 *			true or false
	 */
	this.addCheck = function(name, value) {
		var input = document.createElement('input');
		input.setAttribute('type', 'chackbox');
		input.setAttribute('value', value);
		input.setAttribute('name', name);

		// here is where x and y coords could be added
		var newdiv = document.createElement('div');
		newdiv.appendChild(input);

		var div = document.getElementById( this.divId );
		div.appendChild(newdiv);
	};

	/**
	 *	@param name
	 *			name of element
	 *	@param value
	 *			?
	 */
	this.addInput = function(name, value) {
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('className', 'txt');
		input.setAttribute('value', value);
		input.setAttribute('name', name);

		// here is where x and y coords could be added
		var newdiv = document.createElement('div');
		newdiv.appendChild(input);

		var div = document.getElementById( this.divId );
		div.appendChild(newdiv);
	};


}

