/**
 *  
 *	FPoint.js
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
 *	FPoint
 *	TODO: thinking about getting rid of FPoint
 *
 */



frederickkPaper.FPoint = paper.Point.extend({
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	norm : function(startPt, stopPt) {
		this.x = frederickkPaper.norm(this.x, start.x, stop.x);
		this.y = frederickkPaper.norm(this.y, start.y, stop.y);
		return this;
	},

	/**
	 *	
	 *	@return random point
	 *
	 */
	/**
	 *	@param minx
	 *				minmum x (default: 0)
	 *	@param maxx
	 *				maximum x (default: view.bounds.width)
	 *	@param miny
	 *				minmum y (default: 0)
	 *	@param maxy
	 *				maximum y (default: view.bounds.height)
	 *
	 *	@return random size
	 *
	 */
	random : function(minx, maxx, miny, maxy) {
		minx = (minx != undefined) ? minx : 0;
		maxx = (maxx != undefined) ? maxx : view.bounds.width;
		miny = (miny != undefined) ? miny : 0;
		maxy = (maxy != undefined) ? maxy : view.bounds.height;

		this.x = frederickkPaper.random(minx, maxx);
		this.y = frederickkPaper.random(miny, maxy);
		return this;
	},

	/**
	 *	
	 *	@return vector heading of point
	 *
	 */
	heading : function() {
		return -1 * (Math.atan2(-this.y, this.x));
	},

	/**
	 *
	 *  https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
	 *
	 */
	interpolateTo : function(p2, f) {
		this.x += ((p2.x - this.x) * f);
		this.y += ((p2.y - this.y) * f);
		return this;
	},

	lerp : function(p1,p2, amt) {
		var x = frederickkPaper.lerp(p1.x,	p2.x,	amt);
		var y = frederickkPaper.lerp(p1.y,	p2.y,	amt);
		
		return new Point(x,y);
	},


	// ------------------------------------------------------------------------
	limit : function(lim) {
		if (this.magSq() > lim * lim) {
			this.normalize();
			this.mult * lim;
			return this;
		}
		return this;
	},

	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return vector mag squared
	 *
	 */
	magSq : function() {
		return this.x * this.x + this.y * this.y;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	http://gmc.yoyogames.com/index.php?showtopic=290349
	 *
	 *	@param spacing
	 *				Size()
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid : function(spacing) {
		var ix, iy;
		ix = Math.round(this.y/spacing.height - this.x/spacing.width);
		iy = Math.round(this.y/spacing.height + this.x/spacing.width);

		this.x = (iy - ix)/2*spacing.width;
		this.y = (iy + ix)/2*spacing.height;
		return this;
	},

	/**
	 *	snaps point to an isometric grid
	 *	
	 *	@param scale
	 *				scale of the grid (1.0 = 32x16)
	 *
	 */
	snapIso : function(scale) {
		if(scale === null) scale = 1;
		return this.snapGrid( new Size(32*scale,16*scale) );
	},



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@return angle of point
	 *
	 */
	getAngle : function() {
		return Math.atan2(this.y - 0, this.x - 0);
	}


});


