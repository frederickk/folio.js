/**
 *  
 *	FPoint3.js
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
 *	FPoint3
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code mostly taken from
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */

/**
 *	@param x
 *			x coordinate
 *	@param y
 *			y coordinate
 *	@param z
 *			z coordinate
 */
Frederickk.F3D.FPoint3 = function(_x, _y, _z) {
	// Properties
	// public
	var x = _x != undefined ? _x : 0;
	var y = _y != undefined ? _y : 0;
	var z = _z != undefined ? _z : 0;


	// private
	var scene = null;

	var xIndex = 0;
	var yIndex = 0;
	var zIndex = 0;
	var xIndex2D = 0;
	var yIndex2D = 0;



	// Methods
	/**
	 *	@param scene
	 *			the scene with which the points are
	 *			associated with
	 */
	this.setup = function(_scene) {
		scene = _scene;

		var index = scene.setupPoint(x, y, z);

		var i3 = index*3;
		var i2 = index*2;

		xIndex = i3;
		yIndex = i3+1;
		zIndex = i3+2;

		xIndex2D = i2;
		yIndex2D = i2+1;
	};


	// sets
	this.setX = function(value) {
		if( scene != null ) scene.points3D[xIndex] = value;
		x = value;
	};
	this.setY = function(value) {
		if( scene != null ) scene.points3D[yIndex] = value;
		y = value;
	};
	this.setZ = function(value) {
		if( scene != null ) scene.points3D[zIndex] = value;
		z = value;
	};


	// gets
	this.x = function() {
		return _x;
	}
	this.y = function() {
		return _y;
	}
	this.z = function() {
		return _z;
	}


	/**
	 *	@return projected 2D x
	 */
	this.x2D = function() {
		return scene.points2D[xIndex2D];
	};

	/**
	 *	@return projected 2D y
	 */
	this.y2D = function() {
		return scene.points2D[yIndex2D];
	};


	this.getSceneIndex = function() {
		return sceneIndex;
	};

};


