/*
 *
 * FScene3.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 *
 * TODO:    leave as is and accept or redo entire engine
 *      possibly look into using three.js as the engine
 *
 */
folio.F3D.FScene3D = this.FScene3D = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    /**
     * private
     */
    var _mode = 'PERSPECTIVE'; // default
    var _matrix = null;

    var _half = new folio.F3D.FSize3(0,0,0);

    // transfomrations
    var _sceneScale = 1;
    var _rotation = new folio.F3D.FPoint3(0,0,0);

    // items
    var _numPoints = 0;
    var _fpath3Arr = null;
    var _groupBot = null;
    var _groupTop = null;

    /**
     * public
     */
    this.bounds = new folio.F3D.FSize3(0,0,0);

    this.points3D = [];
    this.points2D = [];



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     * matrix for isometric projection
     *
     * TODO: figure out why this has to be
     * configured like this?
     */
    this._ortho = function() {
        _matrix.makeOrtho(
            -_half.height,  // left
            _half.height,   // right
            _half.height,   // top
            -_half.height,  // bottom
            -_half.height,  // near
            _half.height    // far
        );
    };

    /**
     * _perspective( for perspective projection
     */
    this._perspective = function() {
        _matrix.makePerspective(
            50,     // fov
            0.5 * this.bounds.width/this.bounds.height, // aspect
            _half.depth,        // near
            this.bounds.depth*2 // far
        );
    };


    // ------------------------------------------------------------------------
    /**
     * @param width
     *          width of scene
     *          default: view.bounds.width
     * @param height
     *          height of scene
     *          default: view.bounds.height
     * @param focalLength
     *          focal length of scene
     *          default: 1000
     * @param mode
     *          'PERSPECTIVE' objects scale to perspective
     *          'ORTHO' objects do not scale (isometric)
     *
     */
    this.setup = function(width, height, focalLength, mode) {
        // setup point arrays
        this.points3D = [];
        this.points2D = [];

        // setup items array
        _fpath3Arr = [];

        // setup matrix
        _matrix = new Matrix3D();

        // setup world
        this.bounds.width  = width || paper.view.bounds.width;
        this.bounds.height = height || paper.view.bounds.height;
        this.bounds.depth = focalLength || 1000;

        _half.width = this.bounds.width*0.5;
        _half.height = this.bounds.height*0.5;
        _half.depth = this.bounds.depth*0.5;

        // set mode
        this.setMode(mode);

        // setup up group for items
        _groupBot = new Group();
        _groupTop = new Group();
    };

    // ------------------------------------------------------------------------
    /**
     * draws FPath3 objects
     *
     * @return group of FPath3 objects
     *
     */
    this.draw = function() {
        // transformation matrix
        _matrix.identity();

        // set perspective mode
        if (_mode == 'ORTHO') this._ortho();
        else this._perspective();

        // implement transformations
        _matrix.scale(_sceneScale, _sceneScale, _sceneScale);
        _matrix.rotateX( _rotation.x );
        _matrix.rotateY( _rotation.y );
        _matrix.rotateZ( _rotation.z );
        _matrix.translate(0, 0, this.bounds.depth);

        // transformed points
        var transformed = _matrix.transformArray(this.points3D);

        // cycle through transformed 3D points
        // pull out screen 2D points
        for (var i = 0; i < _numPoints; i++) {
            var i3 = i*3;
            var i2 = i*2;

            var x = transformed[ i3 ];
            var y = transformed[ i3+1 ];
            var z = transformed[ i3+2 ];

            var scale = this.bounds.depth/(z+this.bounds.depth);

            this.points2D[ i2 ]   = x*scale+_half.width;
            this.points2D[ i2+1 ] = y*scale+_half.height;
        }

        // determine depth order of items
        // very crude and rudimentary
        var tindex = 0;
        var depthArr = []; // temp array to correlate transformed points to items
        for (var i = 0; i < _fpath3Arr.length; i++) {
            var fpath3 = _fpath3Arr[i];

            var avgz = this.averageZ(
                transformed,
                tindex,
                tindex+(fpath3._fpoints3.length*3)
            );

            var temp = {
                index: i,
                z: avgz
            };
            depthArr.push(temp);

            tindex += (fpath3._fpoints3.length*3)-1;
        }
        depthArr.sort(compare);

        // put the object into the group based on their z depth
        _groupBot.removeChildren(); // clear out in between draws
        _groupTop.removeChildren(); // clear out in between draws
        for (var i = 0; i < depthArr.length; i++) {
            var path = _fpath3Arr[ depthArr[i].index ].get();

            if (path.name == 'Z-TOP') _groupTop.appendBottom( path );
            else if (path.name == 'Z-BOTTOM') _groupBot.appendBottom( path );
            else if (path != null) _groupBot.appendBottom( path );
        }

        // TODO: fix this scaling issue
        if (_mode == 'ORTHO') {
            _groupTop.scale(200, _groupBot.position);
            _groupBot.scale(200, _groupBot.position);
        }

        return new Group( _groupBot,_groupTop );
    };


    // ------------------------------------------------------------------------
    /**
     * @param arg0
     *          x coordinate
     * @param arg1
     *          y coordinate
     * @param arg2
     *          z coordinate
     *
     * @return total number of points added to scene
     *
     */
    this.setupPoint = function(arg0, arg1, arg2) {
        var returnVal = _numPoints;

        this.points2D[ this.points2D.length ] = 0;
        this.points2D[ this.points2D.length ] = 0;

        this.points3D[ this.points3D.length ] = arg0;
        this.points3D[ this.points3D.length ] = arg1;
        this.points3D[ this.points3D.length ] = arg2;

        _numPoints++;

        return returnVal;
    };

    // ------------------------------------------------------------------------
    /**
     * @param pointsArr
     *          the array of points x[0], y[1], z[2]
     * @param start
     *          start position in array
     * @param stop
     *          stop position in array
     *
     * @return average value of z
     *
     */
    this.averageZ = function(pointsArr, start, stop) {
        var avgz = 0;
        for (var i=start; i<stop; i+=2) {
        //  // console.log( 'x\t' + pointsArr[i] );
        //  // console.log( 'y\t' + pointsArr[i+1] );
        //  // console.log( 'z\t' + pointsArr[i+2] );
            avgz += parseInt( pointsArr[i+2] );
        }
        var num = (stop-start)/3;
        return avgz/num;
    };

    /**
     *
     * comparator to sort object by z value
     *
     */
    function compare(a,b) {
        if (a.z < b.z) return -1;
        if (a.z > b.z) return 1;
        return 0;
    };



    // ------------------------------------------------------------------------
    // Sets
    // ------------------------------------------------------------------------
    /**
     * @param mode
     *          'PERSPECTIVE' objects scale to perspective
     *          'ORTHO' objects do not scale (isometric)
     */
    this.setMode = function(mode) {
        _mode = mode != undefined ? mode : 'PERSPECTIVE';
    };

    /**
     * @param item
     *      an FPath3 item to add to the scene
     */
    /**
     * @param item
     *      an array of FPath3 items to add to the scene
     */
    this.addItem = function(item) {
        if (item.length > 0) {
            for (var i = 0; i < item.length; i++) {
                _fpath3Arr[ _fpath3Arr.length ] = item[i];
                item[i].setScene(this);
            }
        }
        else {
            _fpath3Arr[ _fpath3Arr.length ] = item;
            item.setScene(this);
        }
    };

    // ------------------------------------------------------------------------
    /**
     * @param val
     *      degree value for x axis rotation
     */
    this.rotateX = function(val) {
        _rotation.setX(val);
    };

    /**
     * @param val
     *      degree value for y axis rotation
     */
    this.rotateY = function(val) {
        _rotation.setY(val);
    };

    /**
     * @param val
     *      degree value for z axis rotation
     */
    this.rotateZ = function(val) {
        _rotation.setZ(val);
    };



    // ------------------------------------------------------------------------
    // Gets
    // ------------------------------------------------------------------------
    /**
     *
     * @return scene path items as _groupBot
     *
     */
    this.get = function() {
        return _groupBot;
    };

    /**
     *
     * @return scene size as array [width, height, depth]
     *
     */
    this.getBounds = function() {
        return [ this.bounds.width, this.bounds.height, this.bounds.depth ];
    };

    /**
     *
     * @return scene transformation _matrix
     *
     */
    this.getMatrix = function() {
        return _matrix;
    };

    /**
     *
     * @return scene focal length (depth)
     *
     */
    this.getFocalLength = function() {
        return this.bounds.depth;
    };

    /**
     *
     * @return scene scale
     *
     */
    this.getScale = function() {
        return _sceneScale;
    };


};


