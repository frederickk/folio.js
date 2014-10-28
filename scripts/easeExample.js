console.log( 'Ease Loaded' );
/**
 *  Ease Example 0.0
 *  Easing
 *
 *  Ken Frederick
 *  ken.frederick@gmx.de
 *
 *  http://kennethfrederick.de/
 *  http://blog.kennethfrederick.de/
 *
 *
 *  An example of the easing methods
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var ftime = f.FTime;
var ease = new ftime.Ease();

// the number of dots per spline
var length = 24;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    // set canvas background
    paper.view.element.style.backgroundColor = 'rgb(255, 68, 100)';
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

    // iterate through easing options
    var origin = new Point( 0,0 );
    for( var f in ease ) {
        if( f !== 'spline') {
            var group = new Group();
            var path = new Path;

            for( var i=0; i<length; i++ ) {
                var e = ease[f]( i/length );
                var center = new Point(
                    origin.x + e*195,
                    origin.y + (i/length)*e*195
                );

                // point marker
                var marker = new Path.Circle( center, 3 );
                marker.fillColor = new Color( 0.0, 0.0, 0.0 );
                marker.strokeColor = null;
                group.appendTop( marker );

                // path
                path.add( center );
            }
            path.strokeColor = 'white';
            path.strokeWidth = 9;
            path.fillColor = null;
            path.strokeCap = 'round';
            group.appendBottom( path );


            // text
            var text = new PointText( new Point(origin.x, origin.y-12) );
            text.content = f;
            text.characterStyle.fontSize = 12;
            group.appendTop( text );


            // adjust origin for placement
            if( origin.y < view.bounds.height-(195*2) ) { //activeDocument.activeArtboard.bounds.height ) {
                origin.y += 216;
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
