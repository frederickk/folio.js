/**
 *	
 *	FCross.js
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
 *	FCross
 *	Create a cross
 *
 */


/**
 *
 *	depreciating FShape namespace
 *
 *	@example
 *	var centerPoint = new paper.Point( 45,45 );
 *	var size = new paper.Size( 45,45 );
 *	var strokeWidth = 18;
 *	var crossType = 'LINE';
 *	var fcross = new paper.Path.FCross( centerPoint, size, strokeWidth, crossType );
 *
 */
frederickkPaper.FShape.FCross = this.FCross = Path.extend({

	initialize : function( centerPoint, size, strokeWidth, crossType ) {
		return new paper.Path.FCross( centerPoint, size, strokeWidth, crossType );
	}

});


