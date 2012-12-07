/**
 *	
 *	FBubble.js
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
 *	FBubble
 *
 *	Create simple speech bubble forms
 *
 */

 /**
  *	
  *	@param _width
  *				the entire width of the bubble
  *	@param _height
  *				the height of the body of the bubble
  *				OR as an array [ height of the body, length of the tag ]	
  *	@param _tagCenter
  *				'RANDOM'	randomly x-position the point
  *				'LEFT'		left align the x-position of the point
  *				'CENTER'	center align the x-position of the point
  *				'RIGHT'		right align the x-position of the point
  */
frederickkPaper.FShape.FBubble = function(_width, _height, _tagCenter) {
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	var bubble;
	var r_unit = 20;

	var width;
	var height;

	var tagCenter = (_tagCenter != undefined) ? _tagCenter : 'RANDOM';
	var tagLength = null;
	var tagPoints = [];



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	// private
	var init = function() {
		if(width < 10) {
			width = 10;
			r_unit = 10;
		}


		bubble = new paper.Path();
		bubble.name = 'bubble';

		// left
		bubble.add( new paper.Point(0,0) );
		var angle = 180;
		var through = new paper.Point(
			height/2 + Math.cos( f.radians(angle) ) * (height),
			height/2 + Math.sin( f.radians(angle) ) * (height)
		);
		bubble.arcTo(through, new paper.Point(0,height));

		// middle bottom
		// create tag space
		var bw = frederickkPaper.randomInt(0,width-r_unit);
		tagPoints[0] = new paper.Point(bw,height);
		bubble.add( new paper.Point(bw,height) );

		// create tag
		var tx, ty;
		if(tagCenter == 'LEFT') {
			tx = bw;
		}
		else if(tagCenter == 'CENTER') {
			tx = bw + (r_unit/2);
		}
		else if(tagCenter == 'RIGHT') {
			tx = bw+r_unit;
		}
		else {
			tx = frederickkPaper.randomInt(bw,bw+r_unit);
		}

		// TODO: eventually make it possible to determine the length of the tag
		if(tagLength != null) {
			ty = height + tagLength;
		}
		else {
			ty = height + (r_unit*4 + frederickkPaper.random(-r_unit*0.5, r_unit*0.5));
		}

		// this allows us to know bubble's tag point
		tagPoints[2] = new paper.Point(tx,ty);
		bubble.add( new paper.Point(tx,ty) ); 


		// continue bottom
		tagPoints[1] = new paper.Point(bw+r_unit,height);
		bubble.add( new paper.Point(bw+r_unit,height) );
		bubble.add( new paper.Point(width,height) );


		// right
		angle = 0;
		through = new paper.Point(
			height/2 + Math.cos( f.radians(angle) ) * (height/2),
			height/2 + Math.sin( f.radians(angle) ) * (height/2)
		);
		bubble.arcTo( new paper.Point(width,0), false );
		// bubble.arcTo(through, new paper.Point(width,0) );


		// middle top
		// bubble.add( new paper.Point(0,0) ); // OR 
		bubble.closed = true;

	};
	

	//-----------------------------------------------------------------------------
	// Sets
	//-----------------------------------------------------------------------------
	this.set = function(_width, _height) {
		width = (_width != undefined) ? _width : frederickkPaper.random(r_unit,200);
		if(_height.length == 2) {
			height = _height[0];
			tagLength = (_height[1] < r_unit) ? r_unit : _height[1];
		}
		else {
			height = (_height != undefined) ? _height : frederickkPaper.random(r_unit*4,200);
		}
		width -= height;
	};




	//-----------------------------------------------------------------------------
	// Gets
	//-----------------------------------------------------------------------------
	this.get = function() {
		return bubble;
	};

	//-----------------------------------------------------------------------------
	this.getTag = function() {
		return tagPoints;
	};



	//-----------------------------------------------------------------------------
	// Invocation
	//-----------------------------------------------------------------------------
	this.set(_width, _height);
	init();
	return bubble;
};


