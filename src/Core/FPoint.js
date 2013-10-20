 /**
 *
 *	FPoint.js
 *	v0.5
 *
 *	15. May 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	A collection of extensions for paper.Point
 *
 */


/*
 *
 *	paper.Point
 *
 */
paper.Point.inject({
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	name: null,
	data: {},



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	http://gmc.yoyogames.com/index.php?showtopic=290349
	 *
	 *	@param {Size} spacing
	 *				scale.width  = x scale of the grid.
	 *				scale.height = y scale of the grid.
	 *	@param {Object} options
	 *				{ grid: true }
	 *				{ isometric: true }
	 *
	 *	@return {Point} snapped Point
	 *
	 */
	/**
	 *	snaps point to an isometric grid
	 *
	 *	@param {Number} scale
	 *				scale of the grid
	 *	@param {Object} options
	 *				{ grid: true }
	 *				{ isometric: true }
	 *
	 *	@return {Point} snapped Point
	 *
	 */
	snap: function(scale, options) {
		options = (options != undefined)
			? options
			: { grid: true, isometric: false };
		scale = (scale.type == 'Size')
			? scale
			: new Size(scale,scale);

		var ix, iy;
		if (optons.isometric === true) {
			ix = Math.round(this.y/(16*scale.height) - this.x/(32*scale.width));
			iy = Math.round(this.y/(16*scale.height) + this.x/(16*scale.width));
			this.x = (iy - ix)/2*(32*scale.width);
			this.y = (iy + ix)/2*(16*scale.height);
		}
		else {
			ix = Math.round(this.y/scale.height - this.x/scale.width);
			iy = Math.round(this.y/scale.height + this.x/scale.width);
			this.x = (iy - ix)/2*scale.width;
			this.y = (iy + ix)/2*scale.height;
		}

		return this;
	},

	/**
	 *
	 *  https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
	 *
	 *	@param {Point} toPoint
	 *			interpolates the point towards a given target point
	 *	@param {Number} amt
	 *			(0.0 - 1.0) interpolation factor
	 *	@return {Point} interpolated Point
	 *
	 *	@example
	 *	var point = new Point(0, 0);
	 *	var toPoint = new Point(100, 100);
	 *	point.interpolateTo(toPoint, 0.5); // {x: 50, y: 50}
	 *
	 */
	/**
	 *
	 *	@param {Point} arg0
	 *			starting Point
	 *	@param {Point} arg1
	 *			ending Point
	 *	@param {Number} arg2
	 *			(0.0 - 1.0) interpolate factor
	 *
	 *	@return {Point} new interpolated Point
	 *
	 *	@example
	 *	var start = new Point(0, 30);
	 *	var end = new Point(360, 90);
	 *	var interpolate = new Point.interpolateTo( start, end, 0.5 );
	 *	console.log( interpolate ); // { x: 180, y: 60 }
	 *
	 */
	interpolateTo: function(toPoint, amt) {
		this.x += ((toPoint.x - this.x) * amt);
		this.y += ((toPoint.y - this.y) * amt);
		return this;
	},

	/**
	 *	{@grouptitle Distance & Length}
	 *
	 *	Returns the distance between the point and the center of the canvas
	 *
	 *	@return {Number}
	 *
	 */
	getDistanceToCenter: function() {
		// var dx = this.x - view.bounds.center.x;
		// var dy = this.y - view.bounds.center.y;
		// return (dx * dx + dy * dy) + 1;
		return this.getDistance( view.bounds.center );
	},

	/**
	 *
	 *	Returns the heading angle (radians) of a point
	 *
	 *	@return {Number} vector heading of Point
	 *
	 *	@example
	 * 	var point = new Point(0, 90);
	 *	var result = point.getHeading();
	 *	console.log( paper.degrees(result) ); // 90
	 *
	 */
	getHeading: function() {
		return -1 * (Math.atan2(-this.y, this.x));
	},

	/**
	 *	Get the vector angle (radians) of two points
	 *
	 *	@param {Point} point1
	 *			first point
	 *	@param {Point} point2
	 *			second point
	 *
	 *	@return {Number} vector angle (radians)
	 *
	 *	@example
	 * 	var point1 = new Point(0, 90);
	 * 	var point2 = new Point(90, 180);
	 *	var result = point1.getAngle(point2);
	 *	console.log( paper.degrees(result) ); // XX
	 *
	 */
	getAngle: function(point) {
		return Math.atan2(point.y - this.y, point.x - this.x);
	},

	/**
	 *	Normalize a point between two other points (start and end).
	 *
	 *	@param {Point} start
	 *				start Point
	 *	@param {Point} stop
	 *				stop Point
	 *
	 *	@return {Point} normalized Point
	 *
	 *	@example
	 *	var point = new Point(30, 270);
	 *	var start = new Point(90, 180);
	 *	var stop = new Point(180, 360);
	 *	point.norm(start, stop); // { x: -0.66667, y: 0.5 }')
	 *
	 */
	norm: function(start, stop) {
		this.x = paper.normalize(this.x, start.x, stop.x);
		this.y = paper.normalize(this.y, start.y, stop.y);
		return this;
	},

		// /**
	//  *
	//  *	@return {Point} limit Point
	//  *
	//  */
	// limit: function(lim) {
	// 	if (this.magSq() > lim * lim) {
	// 		this.normalize();
	// 		this.mult * lim;
	// 		return this;
	// 	}
	// 	return this;
	// },

	/**
	 *	{@grouptitle Vector Math Functions}
	 *
	 *	@return {Number} vector mag squared
	 *
	 *	@example
	 *	var point = new Point(0, 90);
	 *	var result = point.magSq();
	 *	console.log(result); // 8100
	 *
	 */
	magSq: function() {
		return this.x * this.x + this.y * this.y;
	}


});


