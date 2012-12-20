/**
 *  
 *	FScene3D.js
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
 *	3D Scene Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code mostly taken from
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */



/**
 *
 *	TODO: fix Z order
 */
frederickkPaper.F3D.FScene3D = this.FScene3D = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	private
	 */
	var _mode = 'PERSPECTIVE'; // default
	var _matrix = null;

	var _half = new frederickkPaper.F3D.FSize3(0,0,0);

	// transfomrations
	var _sceneScale = 1;
	var _rotation = new frederickkPaper.F3D.FPoint3(0,0,0);

	// items
	var _numPoints = 0;
	var _itemsArr = null;
	var _group = null;

	/*
	 *	public
	 */
	this.bounds = new frederickkPaper.F3D.FSize3(0,0,0);

	this.points3D = [];
	this.points2D = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 * matrix for isometric projection
	 *
	 *	TODO: figure out why this has to be
	 *	configured like this?
	 */
	this._ortho = function() {
		_matrix.makeOrtho( 
			-_half.height, _half.height,
			_half.height, -_half.height,
			-_half.height, _half.height
		);
	};

	/**
	 * _perspective( for perspective projection
	 */
	this._perspective = function() {
		_matrix.makePerspective( 
			50,
			1,
			this.bounds.depth,
			this.bounds.depth*4 //*2
		);
	};


	// ------------------------------------------------------------------------
	/**
	 *	@param width
	 *				width of scene
 	 *				default: view.bounds.width
	 *	@param height
	 *				height of scene
 	 *				default: view.bounds.height
	 *	@param focalLength
	 *				focal length of scene
 	 *				default: 1000
	 *	@param mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
	 *
	 */
	this.setup = function(width, height, focalLength, mode) {
		// setup point arrays
		this.points3D = [];
		this.points2D = [];

		// setup items array
		_itemsArr = [];

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
		_group = new paper.Group();
	};

	// ------------------------------------------------------------------------
	this.draw = function() {
		_matrix.identity();

		if(_mode == 'ORTHO') this._ortho();
		else this._perspective();

		_matrix.scale(_sceneScale, _sceneScale, _sceneScale);
		_matrix.rotateX(_rotation.x);
		_matrix.rotateY(_rotation.y);
		_matrix.rotateZ(_rotation.z);
		_matrix.translate(0, 0, this.bounds.depth);

		var transformed = _matrix.transformArray(this.points3D);
		
		for(var i=0; i<_numPoints; i++) {
			var i3 = i*3;
			var i2 = i*2;

			// var x = this.points3D[ i3 ];
			// var y = this.points3D[ i3+1 ];
			// var z = this.points3D[ i3+2 ];
			var x = transformed[ i3 ];
			var y = transformed[ i3+1 ];
			var z = transformed[ i3+2 ];
			
			var scale = this.bounds.depth/(z+this.bounds.depth);

			this.points2D[ i2 ]   = x*scale+_half.width;
			this.points2D[ i2+1 ] = y*scale+_half.height;
		}

		_group.removeChildren(); // clear out in between draws
		for(var i=0; i<_itemsArr.length; i++) {
			var paths = _itemsArr[i].get();
			
			console.log( paths._points3 );
			if( paths.children != null ) {
				console.log( paths.children.length );
			}

			if(paths != null) _group.appendTop( paths );
		}
		console.log( '---------' );

		// TODO: fix this scaling issue
		if(_mode == 'ORTHO') _group.scale(200);

		return _group;
	};

	// ------------------------------------------------------------------------
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
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
	 */
	this.setMode = function(mode) {
		_mode = mode != undefined ? mode : 'PERSPECTIVE';
	};

	/**
	 *	@param item
	 *			an FPath3 item to add to the scene
	 */
	/**
	 *	@param item
	 *			an array of FPath3 items to add to the scene
	 */
	this.addItem = function(item) {
		if(item.length != null || item.length > 0) {
			for(var i=0; i<item.length; i++) {
				_itemsArr[ _itemsArr.length ] = item[i];
				item[i].setScene(this);
			}
		}
		else {
			_itemsArr[ _itemsArr.length ] = item;
			item.setScene(this);
		}
	};
	
	// ------------------------------------------------------------------------
	/**
	 *	@param val
	 *			degree value for x axis rotation
	 */
	this.rotateX = function(val) {
		_rotation.setX(val);
	};

	/**
	 *	@param val
	 *			degree value for y axis rotation
	 */
	this.rotateY = function(val) {
		_rotation.setY(val);
	};

	/**
	 *	@param val
	 *			degree value for z axis rotation
	 */
	this.rotateZ = function(val) {
		_rotation.setZ(val);
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	@return scene path items as _group 
	 */
	this.get = function() {
		return _group;
	};

	/**
	 *	@return scene size as array [width, height, depth]
	 */
	this.getBounds = function() {
		return [ this.bounds.width, this.bounds.height, this.bounds.depth ];
	};

	/**
	 *	@return scene transformation _matrix
	 */
	this.getMatrix = function() {
		return _matrix;
	};

	/**
	 *	@return scene focal length
	 */
	this.getFocalLength = function() {
		return this.bounds.depth;
	};


};


