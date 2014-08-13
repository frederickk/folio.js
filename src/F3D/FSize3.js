/*
 *
 * FSize3.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 * TODO: finish this
 *
 * @param arg0
 *      width
 * @param arg1
 *      height
 * @param arg2
 *      depth
 */
folio.F3D.FSize3 = this.FSize3 = function(arg0, arg1, arg2) {
    /**
     * public
     */
    this.width = arg0 != undefined ? arg0 : 0;
    this.height = arg1 != undefined ? arg1 : 0;
    this.depth = arg2 != undefined ? arg2 : 0;



    // ------------------------------------------------------------------------
    // Sets
    // ------------------------------------------------------------------------
    /**
     *
     * @param val
     *      set width value
     */
    this.setWidth = function(val) {
        this.width = val;
    };

    /**
     *
     * @param val
     *      set height value
     */
    this.setHeight = function(val) {
        this.height = val;
    };

    /**
     *
     * @param val
     *      set depth value
     */
    this.setDepth = function(val) {
        this.depth = val;
    };

    // ------------------------------------------------------------------------
    this.set = function(arg0, arg1, arg2) {
        this.setWidth(arg0);
        this.setHeight(arg1);
        this.setDepth(arg2);
    };



    // ------------------------------------------------------------------------
    // Gets
    // ------------------------------------------------------------------------
    /**
     * Get a copy of this size
     */
    this.get = function() {
        return new folio.F3D.FSize3(this.width, this.height, this.depth);
    };


    // ------------------------------------------------------------------------
    /**
     *
     * @return random size
     *
     */
    /**
     * @param minw
     *          minmum width (default: 0)
     * @param maxw
     *          maximum width (default: view.bounds.width)
     * @param minh
     *          minmum height (default: 0)
     * @param maxh
     *          maximum height (default: view.bounds.height)
     * @param mind
     *          minmum depth (default: 0)
     * @param maxd
     *          maximum depth (default: 1000)
     *
     * @return random size
     *
     */
    this.random = function(minw, maxw, minh, maxh, mind, maxd) {
        minw = (minw != undefined) ? minw : 0;
        maxw = (maxw != undefined) ? maxw : view.bounds.width;
        minh = (minh != undefined) ? minh : 0;
        maxh = (maxh != undefined) ? maxh : view.bounds.height;
        mind = (mind != undefined) ? mind : 0;
        maxd = (maxd != undefined) ? maxd : 1000;

        this.width = paper.random(minw, maxw);
        this.height = paper.random(minh, maxh);
        this.depth = paper.random(mind, maxd);
        return this;
    };

    /**
     *
     * @return volume
     *
     */
    this.volume = function() {
        return (this.width * this.height * this.depth);
    };


};


