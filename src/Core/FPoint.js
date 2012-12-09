/**
 *  
 *	FPoint.js
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
 *	FPoint
 *
 */
frederickkPaper.FPoint = paper.Point.extend({
	norm : function(startPt, stopPt) {
		this.x = frederickkPaper.norm(this.x, start.x, stop.x);
		this.y = frederickkPaper.norm(this.y, start.y, stop.y);
		return this;
	},

	random : function() {
		this.x = frederickkPaper.random(0, view.bounds.width);
		this.y = frederickkPaper.random(0, view.bounds.height);
		return this;
	},

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
		
		return new paper.Point(x,y);
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
	magSq : function() {
		return this.x * this.x + this.y * this.y;
	},

	/**
	 *
	 *	http://gmc.yoyogames.com/index.php?showtopic=290349
	 *
	 *	@param spacing
	 *				paper.Size()
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
	snapIso : function(scale) {
		if(scale === null) scale = 1;
		return this.snapGrid( new Size(32*scale,16*scale) );
	},



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	getAngle : function() {
		return Math.atan2(this.y - 0, this.x - 0);
	}


});


