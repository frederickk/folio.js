/**
 *  
 *	FPath3.js
 *	v0.2a
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
 *	3D Path Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */



frederickkPaper.F3D.FPath3 = this.FPath3 = Path.extend({
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	private
	 */
	_type: 'FPath3',
	
	// scene
	_scene: null,
	_matrix: null,

	// 3D points array
	_points3: null,

	// transformations
	_rotation: null,
	_translation: null,



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param scene
	 *				the scene to attach this path to
	 *
	 */
	initialize : function(scene) {
		this.base();
		this._closed = false;

		// setup scene
		this._scene = scene;

		// setup matrix
		this._matrix = new Matrix3D();

		// setup transformation
		this._rotation = new frederickkPaper.F3D.FPoint3();
		this._translation = new frederickkPaper.F3D.FPoint3();

		// setup 3D points array
		this._points3 = [];

		this.name = 'FPath3';
		// return this;
	},


	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param scene
	 *			scene to associate points with
	 */
	setScene : function(scene) {
		this._scene = scene;
		for(var i=0; i<this._points3.length; i++) {
			this._points3[i].setup( this._scene );
		}
	},

	/**
	 *	@param _fpoint3
	 *			add FPoint3 to path
	 */
	add3 : function(fpoint3) {
		this._points3[ this._points3.length ] = fpoint3;
	},

	// ------------------------------------------------------------------------
	/**
	 *	@param arg0
	 *			FPoint3 for transformation
	 */
	/**
	 *	@param arg0
	 *			x point
	 *	@param arg1
	 *			y point
	 *	@param arg2
	 *			z point
	 */
	translate : function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this._translation.x = arg0;
			this._translation.y = arg1;
			this._translation.z = arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this._translation.x = arg0.x;
			this._translation.y = arg1.y;
			this._translation.z = arg2.z;
		}
		else {
			this._translation.x = arg0 != undefined ? arg0 : 0;
			this._translation.y = arg1 != undefined ? arg1 : 0;
			this._translation.z = arg2 != undefined ? arg2 : 0;
		}

		for(var i=0; i<this._points3.length; i++) {
			var pt3 = this._points3[i];
			pt3.setX( (pt3.x + this._translation.x) );
			pt3.setY( (pt3.y + this._translation.y) );
			pt3.setZ( (pt3.z + this._translation.z) );
		}
	},

	/**
	 *	@param val
	 *			degree value for x axis rotation
	 */
	rotateX : function(val) {
		this._rotation.x = val;
	},

	/**
	 *	@param val
	 *			degree value for y axis rotation
	 */
	rotateY : function(val) {
		this._rotation.y = val;
	},

	/**
	 *	@param val
	 *			degree value for z axis rotation
	 */
	rotateZ : function(val) {
		this._rotation.z = val;
	},


	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	get : function() {
		this._segments = [];
		for(var i=0; i<this._points3.length; i++) {
			var pt3 = this._points3[i];
			this.add( 
				new Point( pt3.x2D(), pt3.y2D() )
			);
		}
		return this;
	}



	// // ------------------------------------------------------------------------
	// return {
	// 	Line: function() {
	// 		return new Path(
	// 			Point.read(arguments),
	// 			Point.read(arguments)
	// 		);
	// 	}
	// }

	

});


