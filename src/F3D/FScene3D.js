/**
 *  
 *	FScene3D.js
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



frederickkPaper.F3D.FScene3D = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var group;

	var mode;
	var matrix = new Matrix3D();

	var halfWidth;
	var halfHeight;

	var rotationX = 0;
	var rotationY = 0;
	var rotationZ = 0;
	var sceneScale = 1;

	var focalLength = 0;
	var sceneWidth = 0;
	var sceneHeight = 0;

	var numPoints = 0;

	var items = [];


	// public
	this.points3D = [];
	this.points2D = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param _width
	 *				width of scene
 	 *				default: view.bounds.width
	 *	@param _height
	 *				height of scene
 	 *				default: view.bounds.height
	 *	@param _focalLength
	 *				focal length of scene
 	 *				default: 1000
	 *	@param _mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
	 *
	 */
	this.setup = function(_width, _height, _focalLength, _mode) {
		focalLength = _focalLength || 1000;
		sceneWidth  = _width || paper.view.bounds.width;
		sceneHeight = _height || paper.view.bounds.height;

		halfWidth = sceneWidth*0.5;
		halfHeight = sceneHeight*0.5;

		mode = _mode != undefined ? _mode : 'PERSPECTIVE';
		this.setMode(mode);


		group = new paper.Group();
	};

	// ------------------------------------------------------------------------
	this.draw = function() {
		matrix.identity();

		if(mode == 'ORTHO') ortho();
		else perspective();

		matrix.scale(sceneScale, sceneScale, sceneScale);
		matrix.rotateX(rotationX);
		matrix.rotateY(rotationY);
		matrix.rotateZ(rotationZ);
		matrix.translate(0, 0, focalLength);

		var transformed = matrix.transformArray(this.points3D);
		
		for(var i=0; i<numPoints; i++) {
			var i3 = i*3;
			var i2 = i*2;

			// var x = this.points3D[i3];
			// var y = this.points3D[i3+1];
			// var z = this.points3D[i3+2];
			var x = transformed[i3];
			var y = transformed[i3+1];
			var z = transformed[i3+2];
			
			var scale = focalLength/(z+focalLength);

			this.points2D[ i2 ]   = x*scale+halfWidth;
			this.points2D[ i2+1 ] = y*scale+halfHeight;
		}

		
		group.removeChildren(); // clear out in between draws
		for(var i=0; i<items.length; i++) {
			var paths = items[i].draw();
			group.appendTop( paths );
		}

		// TODO: fix this scaling issue
		if(mode == 'ORTHO') group.scale(200);

		return group;
	};

	// ------------------------------------------------------------------------
	this.setupPoint = function(x, y, z) {
		var returnVal = numPoints;

		this.points2D[ this.points2D.length ] = 0;
		this.points2D[ this.points2D.length ] = 0;

		this.points3D[ this.points3D.length ] = x;
		this.points3D[ this.points3D.length ] = y;
		this.points3D[ this.points3D.length ] = z;

		numPoints++;

		return returnVal;
	};


	// ------------------------------------------------------------------------
	/**
	 * matrix for isometric projection
	 *
	 *	TODO: figure out why this has to be
	 *	configured like this?
	 */
	var ortho = function() {
		matrix.makeOrtho( 
			-halfHeight, halfHeight,
			halfHeight, -halfHeight,
			-halfHeight, halfHeight
		);
	};

	/**
	 * matrix for perspective projection
	 */
	var perspective = function() {
		matrix.makePerspective( 
			50,
			1,
			focalLength,
			focalLength*2
		);
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setMode = function(_mode) {
		mode = _mode;
	};

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



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	@return scene path items as group 
	 */
	this.get = function() {
		return group;
	};

	/**
	 *	@return scene size as array [width, height, depth]
	 */
	this.getSize = function() {
		return [ sceneWidth, sceneHeight, focalLength ];
	};

	/**
	 *	@return scene transformation matrix
	 */
	this.getMatrix = function() {
		return matrix;
	};

};


