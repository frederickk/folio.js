/*
 *
 * Core.js
 *
 * Core Methods and a collection of extensions for paper globally
 *
 */


folio = {
    //
    // Setup Core Namespaces
    //
    FTime: {},
    FIO: {},
    F3D: {}
};



/**
 *
 * Global Scope (Paper.js core)
 *
 */
PaperScope.inject({
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    enumerable: true,



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    /**
     * Java style println output
     *
     * @param {Object} obj
     *        any Javascript Object
     */
    println: function(obj) {
        console.log(obj);
        console.log('\n');
    },

    // ------------------------------------------------------------------------
    /**
     *
     * @param {Boolean} val
     *    input boolean value
     *
     * @return {Number} val as integer
     *
     */
    boolToInt: function(val) {
        return (val) ? 1 : 0;
    },

    // ------------------------------------------------------------------------
    /**
     *
     * @param {Number} val
     *    input number value
     *
     * @return {Number} val as boolean
     *
     */
    numToBool: function(val) {
        return (val != 0) ? true : false;
    },

    // ------------------------------------------------------------------------
    /**
     * http://stackoverflow.com/questions/4775722/check-if-object-is-array
     *
     * @param {Object} obj
     *    object whose type to determine
     *
     * @return {String} Paper.js object type
     *
     */
    getType: function(obj) {
        if (obj instanceof Point) {
            return 'Point';
        }
        else if (obj instanceof Size) {
            return 'Size';
        }
        else if (obj instanceof Rectangle) {
            return 'Rectangle';
        }
        else if (obj instanceof Group) {
            return 'Group';
        }
        else if (obj instanceof Raster) {
            return 'Raster';
        }
        else if (obj instanceof PlacedSymbol) {
            return 'PlacedSymbol';
        }
        else if (obj instanceof Path) {
            return 'Path';
        }
        else if (obj instanceof CompoundPath) {
            return 'CompoundPath';
        }
        else if (obj instanceof Symbol) {
            return 'Symbol';
        }
        else if (obj instanceof TextItem) {
            return 'TextItem';
        }
        else {
            return Object.prototype.toString.call(obj).split(/\W/)[2];
        }
    },

    /**
     *
     * @param {Array} items
     *    Array of items to go through
     * @param {String} name
     *    name of Item to find
     *
     * @return {Path} path with the name that matches
     *
     */
    findByName: function(items, name) {
        var path;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.name === name) {
                path = item;
            }
            // break;
        }
        return path;
    },

    /**
     *
     * @param {Array} items
     *    Array of items to go through
     * @param {Number} name
     *    name of Item to find
     *
     * @return {Path} path with the id that matches
     *
     */
    findById: function(items, id) {
        var path;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.id === id) {
                path = item;
            }
            // break;
        }
        return path;
    },


    /**
     * Iterate through and array
     *
     * @param  {Array}    arr
     * @param  {Function} callback
     *
     * @return {boolean}
     *
     */
    forEach: function(arr, callback) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (callback(arr[i],i) === false) {
                return false;
            }
        }
        return true;
    },


    /**
     * Clear the paper view (canvas)
     *
     * @param  {String} arg0 layerName name
     * @param  {Function} arg1 callback
     *
     */
    /**
     * Clear the paper view (canvas)
     *
     * @param  {String} arg0 callback
     *
     */
    clear: function(arg0, arg1) {
        var layerName, callback;
        var layer;

        if (arguments.length === 2) {
            layerName = arg0;
            callback = arg1;
        }
        else if (arguments.length === 1) {
            layerName = undefined;
            callback = arg0;
        }

        for (var i = 0; i < projects.length; i++) {
            if (layerName !== undefined) {
                try {
                    layer = projects[i].layers[layerName];
                    layer.removeChildren();
                }
                catch(err) {}
            }
            else {
                projects[i].clear();
                layer = new Layer();
                // for (var j = 0; j < projects[i].layers.length; j++) {
                //     layer = projects[i].layers[j];
                //     if (callback) {
                //         callback(layer);
                //     }
                //     layer.removeChildren();
                // }
            }

            if (callback) {
                callback(layer);
            }
        }
    }

});


