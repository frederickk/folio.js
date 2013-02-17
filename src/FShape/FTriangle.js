/**
 *	
 *	FTriangle.js
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
 *	FTriangle
 *	Create a triangle
 *
 */



/**
 *
 *	depreciating FShape namespace
 *
 *	@example
 *	var p1 = new paper.Point( 9,9 );
 *	var p2 = new paper.Point( 90,45 );
 *	var p3 = new paper.Point( 45,90 ); 
 *	var ftriangle = new paper.Path.FTriangle( p1, p2, p3 );
 *
 */
frederickkPaper.FShape.FTriangle = this.FTriangle = Path.extend({

	initialize : function( p1, p2, p3 ) {
 		return new paper.Path.FTriangle( p1, p2, p3 );
	}

});
