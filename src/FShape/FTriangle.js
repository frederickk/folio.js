/**
 *	
 *	FTriangle.js
 *	v0.3a
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
 *	FTriangle
 *
 *	Create a triangle
 *
 */


// TODO: push methods to it's own file?
paper.Path.inject({ 
	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/*
	 *
	 *	Additional Math Methods
	 *	TODO: fix bugs (downright false) math methods
	 *
	 */

	/**
	 *	@param b
	 *			array of barycentric coordinates
	 */		
	// TODO: currently implementation returns false point
	// toCartesian : function(bary) {
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		// var area = 0.5 * (p1.x * (p2.y - p3.y) +
	// 		// 				  p2.x * (p3.y - p1.y) +
	// 		// 				  p3.x * (p1.y - p2.y));

	// 		// var r = 2 * area / (a + b + c);
	// 		// var k = 2 * area / (a*bary[0] + b*bary[1] + c*bary[2]);

	// 		// var angleC = Math.acos((a*a + b*b - c*c) / (2*a*b));

	// 		// var cosC = Math.cos( angleC );
	// 		// var sinC = Math.sin( angleC );

	// 		// var x =	(k*bary[1] - r + (k*bary[0] - r)*cosC) / sinC;
	// 		// var y =	k*bary[0] - r;

	// 		// return new Point(
	// 		// 	x + this.getIncenter().x,
	// 		// 	y + this.getIncenter().y
	// 		// );

	// 		return new Point(
	// 			bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x,
	// 			bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x
	// 		);
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },

	/**
	 *	http://www.ssicom.org/js/x974780.htm
	 */
	sec : function(val) {
	   return 1/Math.cos(val);
	},



	//-----------------------------------------------------------------------------
	/*
	 *
	 *	FTriangle Center Methods
	 *	TODO: finish adding center methods
	 *
	 */

	/**
	 *	http://www.exaflop.org/docs/cgafaq/cga1.html
	 */
	getCircumCircle : function() {
		if( this.segments.length == 3 ) {
			var p1 = this.segments[0].point;
			var p2 = this.segments[1].point;
			var p3 = this.segments[2].point;

			var A = p2.x - p1.x; 
			var B = p2.y - p1.y; 
			var C = p3.x - p1.x; 
			var D = p3.y - p1.y; 

			var E = A*(p1.x + p2.x) + B*(p1.y + p2.y); 
			var F = C*(p1.x + p3.x) + D*(p1.y + p3.y); 

			var G = 2.0*(A*(p3.y - p2.y)-B*(p3.x - p2.x)); 
			
			var circumCenter;
			var dx, dy;
			if( Math.abs(G) < this.EPSILON ) {
				// Collinear - find extremes and use the midpoint

				function max3( a, b, c ) { return ( a >= b && a >= c ) ? a : ( b >= a && b >= c ) ? b : c; }
				function min3( a, b, c ) { return ( a <= b && a <= c ) ? a : ( b <= a && b <= c ) ? b : c; }

				var minx = min3( p1.x, p2.x, p3.x );
				var miny = min3( p1.y, p2.y, p3.y );
				var maxx = max3( p1.x, p2.x, p3.x );
				var maxy = max3( p1.y, p2.y, p3.y );

				circumCenter = new Point( ( minx + maxx ) / 2, ( miny + maxy ) / 2 );

				dx = circumCenter.x - minx;
				dy = circumCenter.y - miny;
			
			}
			else {
				var cx = (D*E - B*F) / G; 
				var cy = (A*F - C*E) / G;

				circumCenter = new Point( cx, cy );

				dx = circumCenter.x - p1.x;
				dy = circumCenter.y - p1.y;
			}

			this.radius = Math.sqrt( (dx * dx + dy * dy) );

			return circumCenter;
		}
		else {
			console.error( 'Not Path.FTriangle' );
			return null;
		}
	},

	// TODO: currently implementation returns false point
	// getInCircle : function() {
	// 	// vertices
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		var incenter = this.toCartesian( [1.0, 1.0, 1.0] );

	// 		var area = 0.5 * (p1.x * (p2.y - p3.y) +
	// 						  p2.x * (p3.y - p1.y) +
	// 						  p3.x * (p1.y - p2.y));

	// 		var semiperimeter = 0.5 * (a + b + c);

	// 		this.innerRadius = (area / semiperimeter);
	// 		return incenter;
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },

	getCentroid : function() {
		// vertices
		if( this.segments.length == 3 ) {
			var p1 = this.segments[0].point;
			var p2 = this.segments[1].point;
			var p3 = this.segments[2].point;

			return new Point(
				(p1.x + p2.x + p3.x)/3,
				(p1.y + p2.y + p3.y)/3
			);
		}
		else {
			console.error( 'Not Path.FTriangle' );
			return null;
		}
	},

	// TODO: currently implementation returns false point
	// getOrthocenter : function() {
	// 	// vertices
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		var bary = [
	// 			this.sec(a),
	// 			this.sec(b),
	// 			this.sec(c)
	// 		];
	// 		return this.toCartesian(bary);
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },

	// TODO: currently implementation returns false point
	// getIncenter : function() {
	// 	// vertices
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		var circum = a + b + c;

	// 		return new Point(
	// 			(a* p1.x + b * p2.x + c * p3.x) / circum,
	// 			(a * p1.y + b * p2.y + c * p3.y) / circum
	// 		);
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },

	// TODO: currently implementation returns false point
	// getSchifflerPoint : function() {
	// 	// vertices
	// 	if( this.segments.length == 3 ) {
	// 		var p1 = this.segments[0].point;
	// 		var p2 = this.segments[1].point;
	// 		var p3 = this.segments[2].point;

	// 		// side lengths
	// 		var a = p1.getDistance(p2);
	// 		var b = p2.getDistance(p3);
	// 		var c = p3.getDistance(p1);

	// 		var bary = [
	// 			1/(Math.cos(b) + Math.cos(c)),
	// 			1/(Math.cos(c) + Math.cos(a)),
	// 			1/(Math.cos(a) + Math.cos(b))
	// 		];
	// 		return this.toCartesian(bary, p1,p2,p3);
	// 	}
	// 	else {
	// 		console.error( 'Not Path.FTriangle' );
	// 		return null;
	// 	}
	// },



	//-----------------------------------------------------------------------------
	statics: new function() {
		return {
			/**
			 *	
			 *	@param p1
			 *				first paper.Point of triangle
			 *	@param p2
			 *				second paper.Point of triangle
			 *	@param p3
			 *				third paper.Point of triangle
			 */
			FTriangle: function( p1, p2, p3 ) {
				var path = new Path();
				path.add(p1);
				path.add(p2);
				path.add(p3);
				path.closed = true;
				path.name = 'triangle';
				return path;

			}
		}; // end return


	} // end statics:
});



/*
 * 
 *	TODO: reconsider overall structure
 *	either create own classes and Path.extend (current)
 *	
 *	usage:
 *	var t = new frederickkPaper.FShape.FTriangle( p1, p2, p3 );
 *
 *
 *	or inject directly into paper.Path
 *
 *	usage:
 *	var t = new paper.Path.FTriangle( p1, p2, p3 );
 *
 *	
 *	pros: cleaner and clear integration
 *	cons: not clear origin paperjs core feature or frederickkPaper
 *	(maybe F... naming is enough though)
 *
 */
frederickkPaper.FShape.FTriangle = this.FTriangle = Path.extend({
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	
	 *	@param p1
	 *				first paper.Point of triangle
	 *	@param p2
	 *				second paper.Point of triangle
	 *	@param p3
	 *				third paper.Point of triangle
	 */
	initialize : function( p1, p2, p3 ) {
		var path = new Path();
		path.add(p1);
		path.add(p2);
		path.add(p3);
		path.closed = true;
		path.name = 'triangle';
		return path;
	}

});
