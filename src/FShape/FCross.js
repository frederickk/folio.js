/**
 *	
 *	FCross.js
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
 *	FCross
 *
 *	Create simple speech bubble forms
 *
 */

 /**
  *	
  *	@param _x
  *				center x position of cross
  *	@param _y
  *				center y position of cross
  *	@param _width
  *				the width of the cross
  *	@param _height
  *				the height of the cross
  *	@param _thickness
  *				thickness of the cross
  *	@param _style (optional)
  *				'SHARP'		sharp edged cross (fill)
  *				'LINE'		simple built of lines (stroke)
  */
frederickkPaper.FShape.FCross = function(_x, _y, _width, _height, _thickness, _style) {
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	var cross;

	var x = _x;
	var y = _y;
	var width = _width;
	var height = _height;

	var thickness = (_thickness != undefined) ? _thickness : 1.0;

	var style = (_style != undefined) ? _style : 'LINE';



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	// private
	var init = function() {
		cross = new paper.Group();
		var point = new paper.Point(x,y);
		var size = new paper.Size(width,height);
		var line1, line2;

		if( style == 'LINE' ) {
			line1 = new paper.Path.Line(
				point.x + size.width, point.y - size.height, 
				point.x - size.width, point.y + size.height
			);
			line1.strokeWidth = thickness;
			line2 = new paper.Path.Line(
				point.x + size.width, point.y + size.height, 
				point.x - size.width, point.y - size.height
			);
			line2.strokeWidth = thickness;
		}
		else if( style == 'SHARP' ) {
			line1 = new paper.Path();
			line1.add( point.x + size.width, point.y - size.height );
			line1.add( point.x + size.width, (point.y - size.height) + (thickness/2) );
			line1.add( (point.x - size.width) + (thickness/2), point.y + size.height );
			line1.add( point.x - size.width, point.y + size.height );
			line1.add( point.x - size.width, (point.y + size.height) - (thickness/2) );
			line1.add( (point.x + size.width) - (thickness/2), point.y - size.height );
			line1.closed = true;

			line2 = new paper.Path();
			line2.add( point.x - size.width, point.y - size.height );
			line2.add( (point.x - size.width) + (thickness/2), point.y - size.height );
			line2.add( point.x + size.width, (point.y + size.height) - (thickness/2) );
			line2.add( point.x + size.width, point.y + size.height );
			line2.add( (point.x + size.width) - (thickness/2), point.y + size.height );
			line2.add( point.x - size.width, (point.y - size.height) + (thickness/2) );
			line2.closed = true;
		}

		cross.appendTop( line1 );
		cross.appendTop( line2 );
		return cross;
	};


	//-----------------------------------------------------------------------------
	// Sets
	//-----------------------------------------------------------------------------




	//-----------------------------------------------------------------------------
	// Gets
	//-----------------------------------------------------------------------------
	this.get = function() {
		return cross;
	};



	//-----------------------------------------------------------------------------
	// Invocation
	//-----------------------------------------------------------------------------
	return init();
};


