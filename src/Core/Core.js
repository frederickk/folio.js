/*
 *
 *  Core.js
 *
 *  Core Methods and a collection of extensions for paper globally
 *
 */


folio = {
	// ------------------------------------------------------------------------
	// Setup Core Namespaces
	// ------------------------------------------------------------------------
	FTime: {},
	FIO: {},
	F3D: {}
};



/**
 *
 *  Global Scope (Paper.js core)
 *
 */
PaperScope.inject({
	enumerable: true,


	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *  Java style println output
	 *
	 *  @param {Object} obj
	 *              any Javascript Object
	 */
	println: function(obj) {
		console.log(obj);
		console.log('\n');
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *  @param {Boolean} val
	 *          input boolean value
	 *
	 *  @return {Number} val as integer
	 *
	 */
	boolToInt: function(val) {
		return (val) ? 1 : 0;
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *  @param {Number} val
	 *          input number value
	 *
	 *  @return {Number} val as boolean
	 *
	 */
	numToBool: function(val) {
		return (val != 0) ? true : false;
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *  @param {Object} object
	 *          object whose type to determine
	 *
	 *  @return {String} Paper.js object type
	 *
	 */
	getType: function(object) {
		if (typeof object == 'object') {
			if (object instanceof paper.Point) return 'Point';
			else if (object instanceof paper.Size) return 'Size';
			else if (object instanceof paper.Rectangle) return 'Rectangle';
			else if (object instanceof Group) return 'Group';
			else if (object instanceof paper.PlacedItem) return 'PlacedItem';
			else if (object instanceof paper.Raster) return 'Raster';
			else if (object instanceof paper.PlacedSymbol) return 'PlacedSymbol';
			else if (object instanceof paper.Path) return 'Path';
			else if (object instanceof paper.CompoundPath) return 'CompoundPath';
			else if (object instanceof paper.Symbol) return 'Symbol';
			else if (object instanceof paper.TextItem) return 'TextItem';
			else return 'undefined';
		}
		else {
			return typeof object;
		}
	},

	/**
	 *
	 *  @param {Array} items
	 *          Array of items to go through
	 *  @param {String} name
	 *          name of Item to find
	 *
	 *  @return {Path} path with the name that matches
	 *
	 */
	findByName: function(items, name) {
		var path;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.name == name) path = item; // break;
		}
		return path;
	},

	/**
	 *
	 *  @param {Array} items
	 *          Array of items to go through
	 *  @param {Number} name
	 *          name of Item to find
	 *
	 *  @return {Path} path with the id that matches
	 *
	 */
	findById: function(items, id) {
		var path;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.id == id) path = item; // break;
		}
		return path;
	}

});


