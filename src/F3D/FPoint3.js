/**
 *  
 *	FPoint3.js
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
 *	FPoint3
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



/**
 *	@param x
 *			x coordinate
 *	@param y
 *			y coordinate
 *	@param z
 *			z coordinate
 */
frederickkPaper.F3D.FPoint3 = function(_x, _y, _z) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
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



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param scene
	 *			the scene with which the points are
	 *			associated with
	 */
	this.setup = function(_scene) {
		console.log( 'fpoint.setup' );
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



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
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

	this.set = function(_x, _y, _z) {
		this.setX(_x);
		this.setY(_y);
		this.setZ(_z);
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	Get a copy of this point.
	 */
	this.get = function() {
		return new frederickkPaper.F3D.FPoint3(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	@return 3D x
	 */
	this.x = function() {
		return x;
	};
	/**
	 *	@return 3D y
	 */
	this.y = function() {
		return y;
	};
	/**
	 *	@return 3D z
	 */
	this.z = function() {
		return z;
	};


	// ------------------------------------------------------------------------
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


	// ------------------------------------------------------------------------
	/**
	 *	Calculate the magnitude (length) of the point
	 *
	 *	@return the magnitude of the point
	 */
	this.mag = function() {
		return Math.sqrt(x*x + y*y + z*z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Add a point to this point
	 *
	 *	@param _fpoint3
	 *			the point to be added
	 */
	this.add = function(_fpoint3) {
		x += _fpoint3.x();
		y += _fpoint3.y();
		z += _fpoint3.z();
		this.set(x,y,z);
	};
	this.add = function(_x, _y, _z) {
		x += _x;
		y += _y;
		z += _z;
		this.set(x,y,z);

	};


	// ------------------------------------------------------------------------
	/**
	 *	Subtract a point from this point
	 *
	 *	@param _fpoint3
	 *			the point to be subtracted
	 */
	this.sub = function(_fpoint3) {
		x -= _fpoint3.x();
		y -= _fpoint3.y();
		z -= _fpoint3.z();
		this.set(x,y,z);
	};
	this.sub = function(_x, _y, _z) {
		x -= _x;
		y -= _y;
		z -= _z;
		this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Scale this point by a scalar
	 *
	 *	@param n
	 *			the value to scale by
	 */
	this.scale = function(n) {
		x *= n;
		y *= n;
		z *= n;
		this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Multiply each element of one point by the elements of another point.
	 *
	 *	@param _fpoint3
	 *			the point to multiply by
	 */
	this.mult = function(_fpoint3) {
		x *= _fpoint3.x();
		y *= _fpoint3.y();
		z *= _fpoint3.z();
		this.set(x,y,z);
	};
	this.mult = function(_x, _y, _z) {
		x *= _x;
		y *= _y;
		z *= _z;
		// this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Divide each element of one point by the elements of another point.
	 *
	 *	@param _fpoint3
	 *			the point to multiply by
	 */
	this.div = function(_fpoint3) {
		x /= _fpoint3.x();
		y /= _fpoint3.y();
		z /= _fpoint3.z();
		this.set(x,y,z);
	};
	this.div = function(_x, _y, _z) {
		x /= _x;
		y /= _y;
		z /= _z;
		this.set(x,y,z);

	};


	// ------------------------------------------------------------------------
	/**
	 *	Calculate the Euclidean distance between two points (considering a point as a vector object)
	 *
	 *	@param _fpoint3
	 *			another point
	 *
	 *	@return the Euclidean distance between
	 */
	this.getDistance = function(_fpoint3) {
		var dx = x - _fpoint3.x();
		var dy = y - _fpoint3.y();
		var dz = z - _fpoint3.z();
		return Math.sqrt(dx*dx + dy*dy + dz*dz);
	};


	// ------------------------------------------------------------------------
	/**
	 * Calculate the angle between two points, using the dot product
	 *
	 * @param _fpoint3a
	 *				a point
	 * @param _fpoint3b
	 *				another point
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
   	 *	Normalize the point to length 1 (make it a unit point)
	 */
	this.normalize = function() {
	    var m = this.mag();
	    if (m != 0 && m != 1) {
    	  this.div(m);
	    }
	};


	// ------------------------------------------------------------------------
	this.toString = function() {
		return '[ ' + x + ', ' + y + ', ' + z + ' ]';
	};


	// ------------------------------------------------------------------------
	/**
	 *	Return a representation of this point as an array.
	 */
	 
	this.array = function() {
		return [x, y, z];
	};

};


