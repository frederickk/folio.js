/**
 *  
 *	FPath3.js
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
 *	3D Path Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code mostly taken from
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */
Frederickk.F3D.FPath3 = function() {
	// Properties
	// public
	this.name = '';
	this.closed = false;


	// private
	var points = [];



	// Methods
	/**
	 *	@return path
	 *			projected 2D path
	 */
	this.draw = function() {
		var path = new paper.Path();
		path.name = this.name;
		for(var i=0; i<points.length; i++) {
			path.add( new paper.Point( points[i].x2D(), points[i].y2D() ) );
		}
		path.closed = this.closed;
		return path;
	};



	// Sets
	/**
	 *	@param _scene
	 *			scene to associate points with
	 */
	this.addToScene = function(_scene) {
		for(var i=0; i<points.length; i++) {
			points[i].setup(_scene);
		}
	};

	/**
	 *	@param _point
	 *			add points to path
	 */
	this.add = function(_point) {
		points[points.length] = _point;
	};
	
};


