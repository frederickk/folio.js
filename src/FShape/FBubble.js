/**
 *	
 *	FBubble.js
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
 *	FBubble
 *
 *	Create a simple speech bubble
 *
 */



frederickkPaper.FShape.FBubble = this.FBubble = Path.extend({
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	defaultTagSize: new Size(20,20),



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	 /**
	  *	
	  *	@param bubblePoint
	  *				the position of the bubble
	  *	@param bubbleSize
	  *				the size of the bubble
	  *	@param _tagSize
	  *				the size of the tag
	  *	@param _tagPointCenter 
	  *				(optional)
	  *				'RANDOM'	randomly x-position the point (default)
	  *				'LEFT'		left align the x-position of the point
	  *				'CENTER'	center align the x-position of the point
	  *				'RIGHT'		right align the x-position of the point
	  */
	initialize : function(bubblePoint, bubbleSize, _tagSize, _tagPointCenter) {
		_tagSize = (_tagSize != undefined) ? _tagSize : defaultTagSize;
		if(bubbleSize.width < 10) {
			bubbleSize.width = 10;
			_tagSize = new Size(10,10);
		}
		_tagPointCenter = (_tagPointCenter != undefined) ? _tagPointCenter : 'RANDOM';


		this.path = new Path();
		this.path.name = 'bubble';

		// left side of bubble
		this.path.add( new Point(0,0) );
		var angle = 180;
		var through = new Point(
			bubbleSize.height/2 + Math.cos( f.radians(angle) ) * (bubbleSize.height),
			bubbleSize.height/2 + Math.sin( f.radians(angle) ) * (bubbleSize.height)
		);
		this.path.arcTo(through, new Point(0,bubbleSize.height));

		// middle bottom
		// create tag space somewhere along the bottom of the bubble
		var tagStart = frederickkPaper.randomInt(0,bubbleSize.width-_tagSize.width);

		// create tag
		this.path.add( new Point(tagStart,bubbleSize.height) );

		var tx, ty;
		if(_tagPointCenter == 'LEFT') {
			tx = tagStart;
		}
		else if(_tagPointCenter == 'CENTER') {
			tx = tagStart + (_tagSize.width/2);
		}
		else if(_tagPointCenter == 'RIGHT') {
			tx = tagStart+_tagSize.width;
		}
		else { // if(_tagPointCenter == 'RANDOM') { 
			tx = frederickkPaper.randomInt(tagStart,tagStart+_tagSize.width);
		}

		// the length of the tag
		ty = bubbleSize.height + _tagSize.height;
		this.path.add( new Point(tx,ty) ); 

		// continue bottom
		this.path.add( new Point(tagStart+_tagSize.width,bubbleSize.height) );
		this.path.add( new Point(bubbleSize.width,bubbleSize.height) );


		// right side of bubble
		angle = 0;
		through = new Point(
			bubbleSize.height/2 + Math.cos( f.radians(angle) ) * (bubbleSize.height/2),
			bubbleSize.height/2 + Math.sin( f.radians(angle) ) * (bubbleSize.height/2)
		);
		this.path.arcTo( new Point(bubbleSize.width,0), false );

		// middle top
		this.path.closed = true;

		// center the bubble
		// compensated for the tag's length
		this.path.position = new Point(bubblePoint.x,bubblePoint.y+(_tagSize.height/2));
		
		return this.path;
	}


});


