console.log( 'FDrip Example Loaded' );
/**
 *  FDrip Example
 *
 *  Ken Frederick
 *  ken.frederick@gmx.de
 *
 *  http://kennethfrederick.de/
 *  http://blog.kennethfrederick.de/
 *
 *
 *  An example of FDrip
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var group;

var drop;
var scale = 0.001;
var lastScale = 1.0;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    // set canvas background
    paper.view.element.style.backgroundColor = 'rgb(0, 178, 255)';

    group = new Group();

    // create pipe
    var holeCenter = new Point( view.bounds.center.x,view.bounds.center.y-112 );
    var pipe = new Path.FChain(
        new Path.Circle(
            holeCenter,
            12
        ),
        new Path.Circle(
            new Point( holeCenter.x,holeCenter.y-27 ),
            6
        )
    );
    pipe.fillColor = new Color( 1.0, 1.0, 1.0 );
    pipe.strokeColor = new Color( 1.0, 1.0, 1.0 );
    pipe.strokeWidth = 6;
    group.appendTop( pipe );

    var hole = new Path.Circle(
        holeCenter,
        12
    );
    hole.fillColor = new Color( 0.0, 0.0, 0.0 );
    group.appendTop( hole );


    // create FDrip
    drop = new Path.FDrip(
        view.bounds.center,
        100
    );
    // drop.bounds.topCenter = holeCenter;
    drop.fillColor = new Color( 1.0, 1.0, 1.0 );
    group.appendTop( drop );

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
    animateDrip(event);
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
    group.position = view.bounds.center;
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function animateDrip(event) {
    if( scale < 1.0 ) {
        scale += 0.02;
    }
    else {
        scale = 1.0 + ((Math.sin(event.time * 2) + 1) / 30);
    }

    drop.scale(
        scale / lastScale,
        drop.bounds.topCenter
    );
    lastScale = scale;
};



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
