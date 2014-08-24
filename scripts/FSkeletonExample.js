console.log( 'FSkeleton Example Loaded' );
/**
 *  FSkeleton Example
 *
 *  Ken Frederick
 *  ken.frederick@gmx.de
 *
 *  http://kennethfrederick.de/
 *  http://blog.kennethfrederick.de/
 *
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;
var skeleton = f.FSkeleton;

// whole letter
var group;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

    path = new Path();

    // import svg
    svg = project.importSVG( document.getElementById('svg'), true );

    group = new Group( svg.children );
    group.scale(2.0);
    group.position = view.center;

    // the path(s) to skeletonize
    for( var p=0; p<group.children.length; p++ ) {
        var path = group.children[p];  //2 //3
        path.fillColor = 'white'; //#00FFAB';
        path.selected = true;

        // remove original svg
        svg.remove();

        var centerline = new skeleton(path).get();
        centerline.strokeColor = 'red';
        console.log( centerline );

        for( var i=0; i<path.segments.length; i++ ) {
            var text = new PointText( path.segments[i].point );
            text.justification = 'center';
            text.fillColor = 'black';
            text.content = i;
        }
    }
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

function onMouseDown(event) {
};

function onMouseMove(event) {
};

function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};













