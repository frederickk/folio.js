/*
 *
 * FPoint3.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 * @param arg0
 *      x coordinate
 * @param arg1
 *      y coordinate
 * @param arg2
 *      z coordinate
 */
folio.F3D.FPoint3 = this.FPoint3 = function(arg0, arg1, arg2) {
    // ------------------------------------------------------------------------
    // Properties
    // ------------------------------------------------------------------------
    /**
     * private
     */
    var _scene = null;

    var _xIndex = 0;
    var _yIndex = 0;
    var _zIndex = 0;

    var _xIndex2D = 0;
    var _yIndex2D = 0;


    /**
     * public
     */
    this.x = arg0 != undefined ? arg0 : 0;
    this.y = arg1 != undefined ? arg1 : 0;
    this.z = arg2 != undefined ? arg2 : 0;



    // ------------------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------------------
    /**
     * @param scene
     *      the scene with which the points are
     *      associated with
     */
    this.setup = function(scene) {
        // setup scene
        _scene = scene;

        var index = _scene.setupPoint(this.x, this.y, this.z);
        var i3 = index*3;
        var i2 = index*2;

        // 3D indicies
        _xIndex = i3;
        _yIndex = i3+1;
        _zIndex = i3+2;

        // 2D indicies
        _xIndex2D = i2;
        _yIndex2D = i2+1;
    };


    // ------------------------------------------------------------------------
    /**
     *
     * @return random point
     *
     */
    /**
     * @param minx
     *          minmum x (default: 0)
     * @param maxx
     *          maximum x (default: view.bounds.width)
     * @param miny
     *          minmum y (default: 0)
     * @param maxy
     *          maximum y (default: view.bounds.height)
     * @param minz
     *          minmum z (default: 0)
     * @param maxz
     *          maximum z (default: 1000)
     *
     * @return random point
     *
     */
    this.random = function(minx, maxx, miny, maxy, minz, maxz) {
        minx = (minx != undefined) ? minx : 0;
        maxx = (maxx != undefined) ? maxx : view.bounds.width;
        miny = (miny != undefined) ? miny : 0;
        maxy = (maxy != undefined) ? maxy : view.bounds.height;
        minz = (minz != undefined) ? miny : 0;
        maxz = (maxz != undefined) ? maxy : 1000;

        this.x = paper.random(minx, maxx);
        this.y = paper.random(miny, maxy);
        this.z = paper.random(minz, maxz);

        return new folio.F3D.FPoint3(this.x, this.y, this.z);
    };



    // ------------------------------------------------------------------------
    // Sets
    // ------------------------------------------------------------------------
    /**
     *
     * @param val
     *      set x value
     */
    this.setX = function(val) {
        if (_scene != null ) _scene.points3D[_xIndex] = val;
        this.x = val;
    };

    /**
     *
     * @param val
     *      set y value
     */
    this.setY = function(val) {
        if (_scene != null ) _scene.points3D[_yIndex] = val;
        this.y = val;
    };

    /**
     *
     * @param val
     *      set z value
     */
    this.setZ = function(val) {
        if (_scene != null ) _scene.points3D[_zIndex] = val;
        this.z = val;
    };

    // ------------------------------------------------------------------------
    this.set = function(arg0, arg1, arg2) {
        this.setX(arg0);
        this.setY(arg1);
        this.setZ(arg2);
    };



    // ------------------------------------------------------------------------
    // Gets
    // ------------------------------------------------------------------------
    /**
     * @return a copy of this point
     */
    this.get = function() {
        return new folio.F3D.FPoint3(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * @return projected 2D x
     */
    this.x2D = function() {
        return _scene.points2D[_xIndex2D];
    };

    /**
     * @return projected 2D y
     */
    this.y2D = function() {
        return _scene.points2D[_yIndex2D];
    };

    // ------------------------------------------------------------------------
    this.getSceneIndex = function() {
        return _sceneIndex;
    };


    // ------------------------------------------------------------------------
    /**
     * Calculate the magnitude (length) of the point
     *
     * @return the magnitude of the point
     */
    this.mag = function() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Add a point to this point
     *
     * @param arg0
     *      the FPoint3 to be added
     */
    /**
     * Add a point to this point
     *
     * @param arg0
     *      the x point to be added
     * @param arg1
     *      the y point to be added
     * @param arg2
     *      the z point to be added
     */
    this.add = function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this.x += arg0;
            this.y += arg1;
            this.z += arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this.x += arg0.x();
            this.y += arg0.y();
            this.z += arg0.z();
        }
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Subtract a point to this point
     *
     * @param arg0
     *      the FPoint3 to be subtracted
     */
    /**
     * Subtract a point to this point
     *
     * @param arg0
     *      the x point to be subtracted
     * @param arg1
     *      the y point to be subtracted
     * @param arg2
     *      the z point to be subtracted
     */
    this.sub = function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this.x -= arg0;
            this.y -= arg1;
            this.z -= arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this.x -= arg0.x();
            this.y -= arg0.y();
            this.z -= arg0.z();
        }
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Scale this point by a scalar
     *
     * @param n
     *      the value to scale by
     */
    this.scale = function(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Multiply each element of one point by the elements of another point.
     *
     * @param arg0
     *      the FPoint3 to be multiplied
     */
    /**
     * Multiply each element of one point by the elements of another point.
     *
     * @param arg0
     *      the x point to be multiplied
     * @param arg1
     *      the y point to be multiplied
     * @param arg2
     *      the z point to be multiplied
     */
    this.mult = function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this.x *= arg0;
            this.y *= arg1;
            this.z *= arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this.x *= arg0.x();
            this.y *= arg0.y();
            this.z *= arg0.z();
        }
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Divide each element of one point by the elements of another point.
     *
     * @param arg0
     *      the FPoint3 to be divided
     */
    /**
     * Divide each element of one point by the elements of another point.
     *
     * @param arg0
     *      the x point to be divided
     * @param arg1
     *      the y point to be divided
     * @param arg2
     *      the z point to be divided
     */
    this.div = function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this.x /= arg0;
            this.y /= arg1;
            this.z /= arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this.x /= arg0.x();
            this.y /= arg0.y();
            this.z /= arg0.z();
        }
        this.set(this.x, this.y, this.z);
    };


    // ------------------------------------------------------------------------
    /**
     * Calculate the Euclidean distance between two points (considering a point as a vector object)
     *
     * @param _fpoint3
     *      another point
     *
     * @return the Euclidean distance between
     */
    this.getDistance = function(_fpoint3) {
        var dx = this.x - _fpoint3.x();
        var dy = this.y - _fpoint3.y();
        var dz = this.z - _fpoint3.z();
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    };


    // ------------------------------------------------------------------------
    /**
     * Calculate the angle between two points, using the dot product
     *
     * @param _fpoint3a
     *          a point
     * @param _fpoint3b
     *          another point
     *
     * @return the angle between the points
     */
    this.angleBetween = function(_fpoint3a, _fpoint3b) {
        var dot = _fpoint3a.x() * _fpoint3b.x() + _fpoint3a.y() * _fpoint3b.y() + _fpoint3a.z() * _fpoint3b.z();
        var _f1mag = Math.sqrt(_fpoint3a.x() * _fpoint3a.x() + _fpoint3a.y() * _fpoint3a.y() + _fpoint3a.z() * _fpoint3a.z());
        var _f2mag = Math.sqrt(_fpoint3b.x() * _fpoint3b.x() + _fpoint3b.y() * _fpoint3b.y() + _fpoint3b.z() * _fpoint3b.z());
        return Math.acos(dot / (_f1mag * _f2mag));
    };


    // ------------------------------------------------------------------------
    /**
     * Normalize the point to length 1 (make it a unit point)
     */
    this.normalize = function() {
        var m = this.mag();
        if (m != 0 && m != 1) {
      this.div(m);
        }
    };


    // ------------------------------------------------------------------------
    this.toString = function() {
        return '[ ' + this.x + ', ' + this.y + ', ' + this.z + ' ]';
    };


    // ------------------------------------------------------------------------
    /**
     * Return a representation of this point as an array.
     */
    this.array = function() {
        return [this.x, this.y, this.z];
    };

};


