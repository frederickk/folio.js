/**
 *	
 *	FChain.js
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
 *	FChain
 *	Create simple chain (a line with different endpoint sizes)
 *
 */


/**
 *
 *	depreciating FShape namespace
 *
 *	@example
 *	var point1 = new paper.Point( 9,9 );
 *	var radius1 = 9;
 *	var point2 = new paper.Point( 90,90 );
 *	var radius2 = 90;
 *	var fchain = new paper.Path.FChain( point1, radius1, point2, radius2 );
 *
 *
 *	@example
 *	var path1 = new paper.Path.Circle( new Point(9,9), 9 );
 *	var path2 = new paper.Path.Circle( new Point(90,90), 90 );
 *	var fchain = new paper.Path.FChain( path1, path2 );
 *
 */
frederickkPaper.FShape.FChain = this.FChain = Path.extend({

	initialize : function( arg0, arg1, arg2, arg3 ) {
		return new paper.Path.FChain( arg0, arg1, arg2, arg3 );
	}

});


