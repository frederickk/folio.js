console.log( 'Ease Loaded' );
/**
 *	Ease Example 0.0
 *	Easing
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 * 
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *	
 *	An example of the easing methods
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

var ftime = f.FTime;
var ease = new ftime.Ease();



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {

	var EasingTests = new Group();

	var origin = new Point( 0,0 );

	for( var f in ease ) {
		if( f !== 'spline') {
			var group = new Group();
			var path = new Path;

			for( var i=0; i<10; i++ ) {
				var e = ease[f]( i/10 );
				var center = new Point(
					origin.x + e*195,
					origin.y + (i/10)*e*45
				);

				// point marker
				var marker = new Path.Circle( center, 3 );
				marker.fillColor = new Color( 1.0, 0.2, 0.0 );
				marker.strokeColor = null;
				group.appendTop( marker );

				// path
				path.add( center );
			}

			path.strokeColor = new Color( 0.0, 0.0, 0.0 );
			path.strokeWidth = 1.5;
			path.fillColor = null;
			group.appendBottom( path );

			// text
			var text = new PointText( new Point(origin.x, origin.y-12) );
			text.content = f;
			text.characterStyle.fontSize = 12;
			group.appendTop( text );


			// adjust origin for placement
			if( origin.y < view.bounds.height-195 ) { //activeDocument.activeArtboard.bounds.height ) {
				origin.y += 72;
			}
			else {
				origin.y = 0;
				origin.x += 216;
			}

			EasingTests.appendTop( group );
		}
	}


	// place test in center of document
	EasingTests.position = view.bounds.center;

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------




// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
};

// ------------------------------------------------------------------------
function onMouseDown(event) {
};

// ------------------------------------------------------------------------
function onMouseMove(event) {
};

// ------------------------------------------------------------------------
function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
