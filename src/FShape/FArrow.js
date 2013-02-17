/**
 *	
 *	FArrow.js
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
 *	FArrow
 *	Create simple arrow
 */


/**
 *
 *	depreciating FShape namespace
 *
 *	@example
 *	var headPoint = new paper.Point( 9,9 );
 *	var tailPoint = new paper.Point( 90,90 );
 *	var arrowHeadSize = new paper.Size( 18,18 );
 *	var farrow = new paper.Path.FArrow( headPoint, tailPoint, arrowHeadSize );
 *
 */
frederickkPaper.FShape.FArrow = this.FArrow = Path.extend({

	initialize : function( headPoint, tailPoint, arrowHeadSize ) {
		return new paper.Path.FArrow( headPoint, tailPoint, arrowHeadSize );
	}

});


