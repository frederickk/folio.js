/**
 *	
 *	FBubble.js
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
 *	FBubble
 *	Create a simple speech bubble
 *
 */


/**
 *
 *	depreciating FShape namespace
 *
 *	@example
 *	var bubblePoint = new paper.Point( 45,45 );
 *	var bubbleSize = new paper.Size( 90,60 );
 *	var bubbleTagSize = new paper.Size( 9,9 );
 *	var bubbleTagCenter = 'CENTER';
 *	var b = new paper.Path.FBubble( bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter );
 *
 */
frederickkPaper.FShape.FBubble = this.FBubble = Path.extend({

	initialize : function(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter) {
		return new paper.Path.FBubble(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter);
	}

});


