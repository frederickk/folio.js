/**
 *	
 *	FArrow.js
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
 *	FArrow
 *
 *	Create simple sphere
 */



frederickkPaper.FShape.FArrow = this.FArrow = Path.extend({
	 /**
	  *	
	  *	@param headPoint
	  *				the head of the arrow
	  *	@param tailPoint
	  *				the tail of the arrow
	  *	@param arrowHeadSize
	  *				(optional) length of the arrow head
	  */
	initialize : function(headPoint, tailPoint, arrowHeadSize) {
		// the line part
		this.path = new Path( headPoint, tailPoint );

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

		var group = new Group( this.path, arrowHead[0], arrowHead[1] );
		group.name = 'arrow';
		return group;
	}

});


