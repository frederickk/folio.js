/**
 *  
 *	FIO.js
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
		Frederickk.FIO.saveCookie(name, '', -1);
	}

};


