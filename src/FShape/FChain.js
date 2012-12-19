/**
 *	
 *	FChain.js
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
 *	FChain
 *
 *	Create simple chain (a line with different endpoint sizes)
 *
 */



frederickkPaper.FShape.FChain = this.FChain = Path.extend({
	 /**
	  *	
	  *	@param arg0
	  *				point1 The first point (endpoint1)
	  *	@param arg1
	  *				radius of endpoint1
	  *	@param arg2
	  *				point2 The second point (endpoint2)
	  *	@param arg3
	  *				radius of endpoint2
	  */
	 /**
	  *	
	  *	@param arg0
	  *				PathItem (endpoint1)
	  *	@param arg1
	  *				PathItem (endpoint2)
	  */
	initialize : function(arg0, arg1, arg2, arg3) {
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
			this.path = new Path();
			this.path.name = 'chain';

			this.path.add( tangents[0] );
			this.path.add( tangents[1] );

			// determine position of chain around endpoint2
			if( obj2.position.x > obj1.position.x ) angle = 0;
			else if( obj2.position.y < obj1.position.y ) angle = -90;
			else if( obj2.position.y > obj1.position.y ) angle = 90;
			else angle = 180;
			var tp2 = new Point(
				obj2.position.x + Math.cos( frederickkPaper.radians(angle) ) * (obj2.bounds.width/2),
				obj2.position.y + Math.sin( frederickkPaper.radians(angle) ) * (obj2.bounds.height/2)
			);
			this.path.arcTo(tp2, tangents[2]);

			this.path.add(tangents[2]);
			this.path.add(tangents[3]);

			// determine position of chain around endpoint1
			if( obj1.position.x > obj2.position.x ) angle = 0;
			else if( obj1.position.y < obj2.position.y ) angle = -90;
			else if( obj1.position.y > obj2.position.y ) angle = 90;
			else angle = 180;
			var tp1 = new Point(
				obj1.position.x + Math.cos( frederickkPaper.radians(angle) ) * (obj1.bounds.width/2),
				obj1.position.y + Math.sin( frederickkPaper.radians(angle) ) * (obj1.bounds.height/2)
			);
			this.path.arcTo(tp1, tangents[0]);
			this.path.closed;

			return this.path;
		}

	}


});


