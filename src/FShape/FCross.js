/**
 *	
 *	FCross.js
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
 *	FCross
 *
 *	Create a cross
 *
 */



frederickkPaper.FShape.FCross = this.FCross = Path.extend({
	 /**
	  *	
	  *	@param point
	  *				position of cross
	  *	@param size
	  *				size [width,height] of cross
	  *	@param _thickness
	  *				thickness of the cross
	  *	@param _type (optional)
	  *				'SHARP'		sharp edged cross (fill)
	  *				'LINE'		simple built of lines (stroke)
	  */
	initialize : function( point, size, _thickness, _type) {
		(_thickness != undefined) ? _thickness : 1.0;
		(_type != undefined) ? _type : 'LINE';

		// var point = new Point(_x,_y);
		// var size = new Size(_width,_height);
		var line1, line2;

		if( _type == 'LINE' ) {
			line1 = new paper.Path.Line(
				point.x + size.width, point.y - size.height, 
				point.x - size.width, point.y + size.height
			);
			line1.strokeWidth = _thickness;
			line2 = new paper.Path.Line(
				point.x + size.width, point.y + size.height, 
				point.x - size.width, point.y - size.height
			);
			line2.strokeWidth = _thickness;
		}
		else if( _type == 'SHARP' ) {
			line1 = new Path();
			line1.add( point.x + size.width, point.y - size.height );
			line1.add( point.x + size.width, (point.y - size.height) + (_thickness/2) );
			line1.add( (point.x - size.width) + (_thickness/2), point.y + size.height );
			line1.add( point.x - size.width, point.y + size.height );
			line1.add( point.x - size.width, (point.y + size.height) - (_thickness/2) );
			line1.add( (point.x + size.width) - (_thickness/2), point.y - size.height );
			line1.closed = true;

			line2 = new Path();
			line2.add( point.x - size.width, point.y - size.height );
			line2.add( (point.x - size.width) + (_thickness/2), point.y - size.height );
			line2.add( point.x + size.width, (point.y + size.height) - (_thickness/2) );
			line2.add( point.x + size.width, point.y + size.height );
			line2.add( (point.x + size.width) - (_thickness/2), point.y + size.height );
			line2.add( point.x - size.width, (point.y - size.height) + (_thickness/2) );
			line2.closed = true;
		}

		var group = new paper.Group( line1, line2 );
		group.name = 'cross';
		return group;
	}

});


