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
	// private
	var points = [];
	// var startPoint = new Frederickk.F3D.FPoint3();
	// var endPoint = new Frederickk.F3D.FPoint3();



	// Methods
	/**
	 *	@return path
	 *			projected 2D path
	 */
	this.draw = function() {
		var path = new Path();
		for(var i=0; i<points.length; i++) {
			path.add( new Point( points[i].x2D, points[i].y2D ) );
		}
		path.closed = true;
		return path;
	};


	// set
	/**
	 *	@param scene
	 *			scene to associate points with
	 */
	this.addToScene = function(scene) {
		for(var i=0; i<points.length; i++) {
			points[i].setup(scene);
		}
	};

	/**
	 *	@param point
	 *			add points to path
	 */
	this.add = function(point) {
		points[points.length] = point;
	};
	
};


