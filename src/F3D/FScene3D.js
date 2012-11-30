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
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */
 // _f3d.FScene3D = function() {

 // }
Frederickk.F3D.FScene3D = function() {
	// Properties
	// private
	var group;
	var matrix = new Matrix3D();

	var rotationX = 0;
	var rotationY = 0;
	var rotationZ = 0;
	var scale = 1;

	var focalLength = 0;
	var sceneWidth = 0;
	var sceneHeight = 0;

	var points3D = [];
	var points2D = [];
	var numPoints = 0;

	var items = [];



	// Methods
	/**
	 *	@param _width
	 *			width of scene
 	 *			default: view.bounds.width
	 *	@param _height
	 *			height of scene
 	 *			default: view.bounds.height
	 *	@param _focalLength
	 *			focal length of scene
 	 *			default: 1000
	 */
	this.setup = function(_width, _height, _focalLength) {
		focalLength = _focalLength || 1000;
		sceneWidth  = _width || paper.view.bounds.width;
		sceneHeight = _height || paper.view.bounds.height;

// 		this.sceneWidth = width != undefined ? width : view.bounds.width;
// 		this.sceneHeight = height != undefined ? height : view.bounds.height;
// 		this.focalLength = focalLength != undefined ? focalLength : 1000;

		group = new paper.Group();
	};


	this.draw = function() {
		var halfWidth = sceneWidth*0.5;
		var halfHeight = sceneHeight*0.5;

		matrix.identity();
		matrix.scale(scale, scale, scale);
		matrix.rotateX(rotationX);
		matrix.rotateY(rotationY);
		matrix.rotateZ(rotationZ);
		matrix.translate(0, 0, 1000);

		var transformed = matrix.transformArray(points3D);
		
		// group.removeChildren();
		for(var i=0; i<numPoints; i++) {
			var i3 = i*3;
			var i2 = i*2;

			// var x = points3D[i3];
			// var y = points3D[i3+1];
			// var z = points3D[i3+2];
			var x = transformed[i3];
			var y = transformed[i3+1];
			var z = transformed[i3+2];
			
			var scale = focalLength/(z+focalLength);

			points2D[i2]   = x*scale+halfWidth;
			points2D[i2+1] = y*scale+halfHeight;
		}

		for(var i=0; i<items.length; i++) {
			var paths = items[i].draw();
			paths.strokeColor = new paper.RGBColor(1.0,0.0,1.0);
			console.log( 'scene.draw()' );
			console.log( paths );
			group.appendTop( paths );
			console.log( i );
		}

		return group;
	};

	this.setupPoint = function(x, y, z) {
		var returnVal = numPoints;

		points2D[points2D.length] = 0;
		points2D[points2D.length] = 0;

		points3D[points3D.length] = x;
		points3D[points3D.length] = y;
		points3D[points3D.length] = z;

		numPoints++;

		return returnVal;
	};


	// set
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


	// get
	/**
	 *	@return scene path items as group 
	 */
	this.get = function() {
		return group;
	};

};


