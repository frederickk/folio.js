/**
 *	
 *	FShape.js
 *	v0.3a
 *	
 *	16. February 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FShape
 *	A collection of shapes for paper.Path
 *	and methods for paper.Item
 *
 *	I'm assuming that injecting all of the shapes into
 *	paper.Path is not only cleaner but more efficient
 *	and therefore faster
 *
 *	FArrow
 *	FBubble
 *	FChain
 *	FCross
 *	FDrop
 *	FTriangle
 *
 */


/*
 *
 *	paper.Item
 *
 */
paper.Item.inject({
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	radius: 0,
	innerRadius: 0,



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	
	 *	@return {Number} distance of object from center of canvas
	 *
	 */
	distanceToCenter: function() {
		var dx = this.position.x - view.bounds.center.x;
		var dy = this.position.y - view.bounds.center.y;
		return (dx * dx + dy * dy) + 1;
	},

	/*
	 *	
	 *	@return {Number} radius
	 *
	 */
	// getRadius: function() {
	// 	// return this.size.radius();
	// },

	/**
	 *	@param {Size} spacing
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid: function(spacing) {
		var pt = new frederickkPaper.FPoint().snapGrid(spacing);
		this.position = pt;
	},

	/**
	 *	snaps point to an isometric grid
	 *	
	 *	@param {Number} scale
	 *				scale of the grid (1.0 = 32x16)
	 *
	 */
	snapIso: function(scale) {
		var pt = new frederickkPaper.FPoint().snapIso(scale);
		this.position = pt;
	}
});



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

			if( Math.abs(G) < paper.EPSILON ) {
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
			 *	FArrow
			 *	Create simple arrow
			 *
			 *	@param {Point} headPoint
			 *				the head of the arrow
			 *	@param {Point} tailPoint
			 *				the tail of the arrow
			 *	@param {Size} arrowHeadSize
			 *				(optional) length of the arrow head
			 *
			 *	@example
			 *	var headPoint = new paper.Point( 9,9 );
			 *	var tailPoint = new paper.Point( 90,90 );
			 *	var arrowHeadSize = new paper.Size( 18,18 );
			 *	var farrow = new paper.Path.FArrow( headPoint, tailPoint, arrowHeadSize );
			 *
			 */
			FArrow: function( headPoint, tailPoint, arrowHeadSize ) {
				// the line part
				var path = new Path( headPoint, tailPoint );

				// the arrow head
				arrowHeadSize = (arrowHeadSize != undefined) ? arrowHeadSize : new Size(headPoint.getDistance(tailPoint)*0.381924,headPoint.getDistance(tailPoint)*0.381924);

				// rotate arrow head around to correct position
				var a = Math.atan2( headPoint.x-tailPoint.x, tailPoint.y-headPoint.y );

				// slight "hack" to get strokCap correct
				var arrowHead = [];
				arrowHead[0] = new Path( new Point(0,0), new Point(-arrowHeadSize.width,-arrowHeadSize.height) );
				arrowHead[1] = new Path( new Point(0,0), new Point( arrowHeadSize.width,-arrowHeadSize.height) );
				for( var i=0; i<arrowHead.length; i++ ) {
					arrowHead[i].rotate( 180+frederickkPaper.degrees(a), new Point(0,0) );
					arrowHead[i].translate( headPoint );
				}

				var group = new Group( path, arrowHead[0], arrowHead[1] );
				group.name = 'arrow';
				return group;
			},


			/**
			 *	
			 *	FBubble
			 *	Create a simple speech bubble
			 *
			 *	@param {Point} bubblePoint
			 *				the position of the bubble
			 *	@param {Size} bubbleSize
			 *				the size of the bubble
			 *	@param {Size} bubbleTagSize
			 *				the size of the tag
			 *	@param {String} bubbleTagCenter 
			 *				(optional)
			 *				'RANDOM'	randomly x-position the point (default)
			 *				'LEFT'		left align the x-position of the point
			 *				'CENTER'	center align the x-position of the point
			 *				'RIGHT'		right align the x-position of the point
			 *
			 *	@example
			 *	var bubblePoint = new paper.Point( 45,45 );
			 *	var bubbleSize = new paper.Size( 90,60 );
			 *	var bubbleTagSize = new paper.Size( 9,9 );
			 *	var bubbleTagCenter = 'CENTER';
			 *	var b = new paper.Path.FBubble( bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter );
			 *
			 */
			FBubble: function(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter) {
				var path = new Path();
				path.name = 'bubble';

				bubbleTagSize = (bubbleTagSize != undefined) ? bubbleTagSize : defaultFBubbleTagSize;
				if(bubbleSize.width < 10) {
					bubbleSize.width = 10;
					bubbleTagSize = new Size(10,10);
				}
				bubbleTagCenter = (bubbleTagCenter != undefined) ? bubbleTagCenter : 'RANDOM';

				// left side of bubble
				path.add( new Point(0,0) );
				var angle = 180;
				var through = new Point(
					bubbleSize.height/2 + Math.cos( f.radians(angle) ) * (bubbleSize.height),
					bubbleSize.height/2 + Math.sin( f.radians(angle) ) * (bubbleSize.height)
				);
				path.arcTo(through, new Point(0,bubbleSize.height));

				// middle bottom
				// create tag space somewhere along the bottom of the bubble
				var tagStart = frederickkPaper.randomInt(0,bubbleSize.width-bubbleTagSize.width);

				// create tag
				path.add( new Point(tagStart,bubbleSize.height) );

				var tx, ty;
				if(bubbleTagCenter == 'LEFT') {
					tx = tagStart;
				}
				else if(bubbleTagCenter == 'CENTER') {
					tx = tagStart + (bubbleTagSize.width/2);
				}
				else if(bubbleTagCenter == 'RIGHT') {
					tx = tagStart+bubbleTagSize.width;
				}
				else { // if(bubbleTagCenter == 'RANDOM') { 
					tx = frederickkPaper.randomInt(tagStart,tagStart+bubbleTagSize.width);
				}

				// the length of the tag
				ty = bubbleSize.height + bubbleTagSize.height;
				path.add( new Point(tx,ty) ); 

				// continue bottom
				path.add( new Point(tagStart+bubbleTagSize.width,bubbleSize.height) );
				path.add( new Point(bubbleSize.width,bubbleSize.height) );


				// right side of bubble
				angle = 0;
				through = new Point(
					bubbleSize.height/2 + Math.cos( f.radians(angle) ) * (bubbleSize.height/2),
					bubbleSize.height/2 + Math.sin( f.radians(angle) ) * (bubbleSize.height/2)
				);
				path.arcTo( new Point(bubbleSize.width,0), false );

				// middle top
				path.closed = true;

				// center the bubble
				// compensated for the tag's length
				path.position = new Point(bubblePoint.x,bubblePoint.y+(bubbleTagSize.height/2));
				
				return path;
			},


			/**
			 *	FChain
			 *	Create simple chain (a line with different endpoint sizes)
			 *	
			 *	@param {Point} arg0
			 *				point1 The first point (endpoint1)
			 *	@param {Number} arg1
			 *				radius of endpoint1
			 *	@param {Point} arg2
			 *				point2 The second point (endpoint2)
			 *	@param {Number} arg3
			 *				radius of endpoint2
			 *
			 *	@example
			 *	var point1 = new paper.Point( 9,9 );
			 *	var radius1 = 9;
			 *	var point2 = new paper.Point( 90,90 );
			 *	var radius2 = 90;
			 *	var fchain = new paper.Path.FChain( point1, radius1, point2, radius2 );
			 *
			 */
			/**
			 *	
			 *	@param {Path} arg0
			 *				PathItem (endpoint1)
			 *	@param {Path} arg1
			 *				PathItem (endpoint2)
			 *
			 *	@example
			 *	var path1 = new paper.Path.Circle( new Point(9,9), 9 );
			 *	var path2 = new paper.Path.Circle( new Point(90,90), 90 );
			 *	var fchain = new paper.Path.FChain( path1, path2 );
			 *
			 */
			FChain: function(arg0, arg1, arg2, arg3) {
				var obj1, obj2;

				// check for the type of arguments being passed
				var type = f.getType(arg0);
				if( type == 'Point' ) {
					obj1 = new Path.Circle( arg0, arg1 );
					obj2 = new Path.Circle( arg2, arg3 );
				}
				else if( type == 'Path' ) {
					obj1 = arg0;
					obj2 = arg1;
				}
				else {
					return;
				}

				var tangents = frederickkPaper.getCommonTangents(obj1, obj2);
				if( tangents != null ) {
					// path for chain
					var path = new Path();
					path.name = 'chain';

					path.add( tangents[0] );
					path.add( tangents[1] );

					// determine position of chain around endpoint2
					if( obj2.position.x > obj1.position.x ) angle = 0;
					else if( obj2.position.y < obj1.position.y ) angle = -90;
					else if( obj2.position.y > obj1.position.y ) angle = 90;
					else angle = 180;
					var tp2 = new Point(
						obj2.position.x + Math.cos( frederickkPaper.radians(angle) ) * (obj2.bounds.width/2),
						obj2.position.y + Math.sin( frederickkPaper.radians(angle) ) * (obj2.bounds.height/2)
					);
					path.arcTo(tp2, tangents[2]);

					path.add(tangents[2]);
					path.add(tangents[3]);

					// determine position of chain around endpoint1
					if( obj1.position.x > obj2.position.x ) angle = 0;
					else if( obj1.position.y < obj2.position.y ) angle = -90;
					else if( obj1.position.y > obj2.position.y ) angle = 90;
					else angle = 180;
					var tp1 = new Point(
						obj1.position.x + Math.cos( frederickkPaper.radians(angle) ) * (obj1.bounds.width/2),
						obj1.position.y + Math.sin( frederickkPaper.radians(angle) ) * (obj1.bounds.height/2)
					);
					path.arcTo(tp1, tangents[0]);
					path.closed;

					return path;
				}

			},


			/**
			 *
			 *	FCross
			 *	Create a cross
			 *	
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Size} size
			 *				size [width,height] of cross
			 *	@param {Number} strokeWidth
			 *				thickness of the cross
			 *	@param {String} crossType (optional)
			 *				'SHARP'		sharp edged cross (fill)
			 *				'LINE'		simple built of lines (stroke)
			 *
			 *	@example
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var size = new paper.Size( 45,45 );
			 *	var strokeWidth = 18;
			 *	var crossType = 'LINE';
			 *	var fcross = new paper.Path.FCross( centerPoint, size, strokeWidth, crossType );
			 *
			 */
			FCross: function( centerPoint, size, strokeWidth, crossType ) {
				(strokeWidth != undefined) ? strokeWidth : 1.0;
				(crossType != undefined) ? crossType : 'LINE';

				// var centerPoint = new Point(_x,_y);
				// var size = new Size(_width,_height);
				var line1, line2;

				if( crossType == 'LINE' ) {
					line1 = new Path.Line(
						centerPoint.x + size.width, centerPoint.y - size.height, 
						centerPoint.x - size.width, centerPoint.y + size.height
					);
					line1.strokeWidth = strokeWidth;
					line2 = new Path.Line(
						centerPoint.x + size.width, centerPoint.y + size.height, 
						centerPoint.x - size.width, centerPoint.y - size.height
					);
					line2.strokeWidth = strokeWidth;
				}
				else if( crossType == 'SHARP' ) {
					line1 = new Path();
					line1.add( centerPoint.x + size.width, centerPoint.y - size.height );
					line1.add( centerPoint.x + size.width, (centerPoint.y - size.height) + (strokeWidth/2) );
					line1.add( (centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y + size.height );
					line1.add( centerPoint.x - size.width, centerPoint.y + size.height );
					line1.add( centerPoint.x - size.width, (centerPoint.y + size.height) - (strokeWidth/2) );
					line1.add( (centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y - size.height );
					line1.closed = true;

					line2 = new Path();
					line2.add( centerPoint.x - size.width, centerPoint.y - size.height );
					line2.add( (centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y - size.height );
					line2.add( centerPoint.x + size.width, (centerPoint.y + size.height) - (strokeWidth/2) );
					line2.add( centerPoint.x + size.width, centerPoint.y + size.height );
					line2.add( (centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y + size.height );
					line2.add( centerPoint.x - size.width, (centerPoint.y - size.height) + (strokeWidth/2) );
					line2.closed = true;
				}

				var group = new Group( line1, line2 );
				group.name = 'cross';
				return group;
			},


			/**
			 *	FDrop
			 *	Create a (tear)drop
			 *
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Number} arg1
			 *				scale drop, maintains intended proportion
			 *
			 *	@example
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var scale = 45;
			 *	var fdrop = new paper.Path.FDrop( centerPoint, scale );
			 *
			 */
			/**
			 *	
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Size} arg1
			 *				scale drop, custom proportion
			 *
			 *	@example
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var scale = new paper.Size( 30,61.8 );
			 *	var fdrop = new paper.Path.FDrop( centerPoint, scale );
			 *
			 */
			FDrop: function( centerPoint, arg1 ) {
				var path = new Path();
				path.name = 'drop';

				// segments added from top counter-clockwise
				path.add( new Segment(
					new Point( -0.01, 0.01 ),
					new Point( 0, -0.0055078 ),
					new Point( 0, 0.643042 )
				) );
				path.add( new Segment(
					new Point( -0.65, 1.6381104 ),
					new Point( 0, -0.6109619 ),
					new Point( 0, 0.3694434 )
				) );
				path.add( new Segment(
					new Point( 0, 2.31 ),
					new Point( -0.3578369, 0 ),
					new Point( 0.3578369, 0 )
				) );
				path.add( new Segment(
					new Point( 0.65, 1.6381104 ),
					new Point( 0, 0.3694434 ),
					new Point( 0, -0.6109619 )
				) );
				path.add( new Segment(
					new Point( 0.01, 0.01 ),
					new Point( 0, 0.643042 ),
					new Point( 0, -0.0055078 )
				) );
				path.add( new Segment(
					new Point( 0, -0 ),
					new Point( 0.0055078, 0 ),
					new Point( -0.0055078, 0 )
				) );
				path.closed = true;
				path.position = centerPoint;

				// check for the type of arguments being passed
				// default scale is from center (position)
				var type = f.getType(arg1);
				if( type == 'Size' ) {
					path.scale( arg1.width, arg1.height );
				}
				else {
					path.scale( arg1 );
				}

				return path;
			},


			/**
			 *	FTriangle
			 *	Create a triangle
			 *
			 *	@param {Point} p1
			 *				first point of triangle
			 *	@param {Point} p2
			 *				second point of triangle
			 *	@param {Point} p3
			 *				third point of triangle
			 *
			 *	@example
			 *	var p1 = new paper.Point( 9,9 );
			 *	var p2 = new paper.Point( 90,45 );
			 *	var p3 = new paper.Point( 45,90 ); 
			 *	var ftriangle = new paper.Path.FTriangle( p1, p2, p3 );
			 *
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

