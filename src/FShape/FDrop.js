/**
 *	
 *	FDrop.js
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
 *	FDrop
 *	Create a (tear)drop
 *
 */


/**
 *
 *	depreciating FShape namespace
 *
 *	@example
 *	var centerPoint = new paper.Point( 45,45 );
 *	var scale = 45;
 *	var fdrop = new paper.Path.FDrop( centerPoint, scale );
 *
 *
 *	@example
 *	var centerPoint = new paper.Point( 45,45 );
 *	var scale = new paper.Size( 30,61.8 );
 *	var fdrop = new paper.Path.FDrop( centerPoint, scale );
 *
 */
frederickkPaper.FShape.FDrop = this.FDrop = Path.extend({

	initialize : function( centerPoint, arg1 ) {
 		return new paper.Path.FDrop( centerPoint, arg1 );
	}

});
