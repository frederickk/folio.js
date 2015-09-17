/*
 *
 * FPath3.js
 *
 * A barebones collection of classes for primitive 3D rendering
 *
 */



folio.F3D.FPath3 = Path.extend(/** @lends Path# */{
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    _class: 'FPath3',
    _serializeFields: {
        segments: [],
        closed: false,

        // F3D
        scene: null,
        matrix: null,
        size: null,
        position3: null,
        fpoints3: [],
        rotation: null,
        translation: null
    },



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     *
     * @param scene
     *          the scene to attach this path to
     *
     */
    initialize: function FPath3(scene) {
        this._closed = false;
        this._segments = [];

        this._scene = scene;
        this._matrix = new Matrix3D();
        this._size = new folio.F3D.FSize3();
        this._position3 = new folio.F3D.FPoint3();

        // setup 3D points array
        this._fpoints3 = [];

        // setup transformation
        this._rotation = new folio.F3D.FPoint3();
        this._translation = new folio.F3D.FPoint3();

        // set generic name
        this.name = 'FPath3';

        Path.call(this);

        this._initialize();
    },



    // ------------------------------------------------------------------------
    //
    // Sets
    //
    /**
     * @param scene
     *      scene to associate points with
     */
    setScene: function(scene) {
        // the scene
        this._scene = scene;

        for (var i = 0; i < this._fpoints3.length; i++) {
            this._fpoints3[i].setup( this._scene );
        }
    },

    /**
     * @param _fpoint3
     *      add FPoint3 to path
     */
    add3: function(fpoint3) {
        this._fpoints3[ this._fpoints3.length ] = fpoint3;
    },


    // setSegments: function(segments) {
    // }


    // ------------------------------------------------------------------------
    /**
     * @param arg0
     *      FPoint3 for transformation
     */
    /**
     * @param arg0
     *      x point
     * @param arg1
     *      y point
     * @param arg2
     *      z point
     */
    translate: function(arg0, arg1, arg2) {
        if (typeof arg0 == 'number') {
            this._translation.x = arg0;
            this._translation.y = arg1;
            this._translation.z = arg2;
        }
        else if (typeof arg0 == 'object') { // FPoint3
            this._translation.x = arg0.x;
            this._translation.y = arg0.y;
            this._translation.z = arg0.z;
        }
        else {
            this._translation.x = (arg0 != undefined)
                ? arg0
                : 0;
            this._translation.y = (arg1 != undefined)
                ? arg1
                : 0;
            this._translation.z = (arg2 != undefined)
                ? arg2
                : 0;
        }

        for (var i = 0; i < this._fpoints3.length; i++) {
            var pt3 = this._fpoints3[i];
            pt3.setX( (pt3.x + this._translation.x) );
            pt3.setY( (pt3.y + this._translation.y) );
            pt3.setZ( (pt3.z + this._translation.z) );
        }
    },

    /**
     * @param val
     *      degree value for x axis rotation
     */
    rotateX:  function(val) {
        this._rotation.x = val;
    },

    /**
     * @param val
     *      degree value for y axis rotation
     */
    rotateY:  function(val) {
        this._rotation.y = val;
    },

    /**
     * @param val
     *      degree value for z axis rotation
     */
    rotateZ:  function(val) {
        this._rotation.z = val;
    },



    // ------------------------------------------------------------------------
    //
    // Gets
    //

    get: function() {
        // clear segments
        this._segments = [];

        // push points into 2D path
        for (var i = 0; i < this._fpoints3.length; i++) {
            var pt3 = this._fpoints3[i];
            this.add(
                new Point( pt3.x2D(), pt3.y2D() )
            );
        }
        return this;
    }


// }, new function() { // Scope for drawing

//  return {
//      _draw: function(ctx, param) {
//      },
//  };

// }, {

// statics: {

// }

});
