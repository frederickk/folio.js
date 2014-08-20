console.log( 'FNoise Example' );

/**
 *  FNoise Example
 *
 *  Ken Frederick
 *  ken.frederick@gmx.de
 *
 *  http://kennethfrederick.de/
 *  http://blog.kennethfrederick.de/
 *
 *
 *  An example of simple perlin noise
 *  inspired by: https://www.processing.org/examples/noisewave.html
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var noise = f.FNoise;

var yoff = 0.0;
var radius = (view.bounds.height > view.bounds.width)
    ? view.bounds.height/3
    : view.bounds.width/3;
var paths = {};

var mouse = 1.0;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

    // create our paths
    paths = {
        red:    new SparkCircle(view.bounds.center, radius, 12),
        blue:   new SparkCircle(view.bounds.center, radius, 3),
        yellow: new SparkCircle(view.bounds.center, radius, 9)
    }

    // set color of paths
    paths.red.fillColor    = new Color(1.0, 0.3, 0.4, 0.8);
    paths.blue.fillColor   = new Color(0.0, 0.0, 1.0, 0.85);
    paths.yellow.fillColor = new Color(1.0, 0.9, 0.0, 0.7);

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

    for (var p in paths) {
        var xoff = 0.0;
        var path = paths[p];

        for (var i=0; i<path.segments.length; ++i) {
            var angle = (i/path.segments.length)*360;
            var segment = path.segments[i];

            // 2D Noise
            segment.point.y = paper.map(
                noise.perlin(yoff, i),
                0, 1,
                view.bounds.center.y + (radius*mouse * Math.sin( paper.radians(angle) )),
                view.bounds.center.y + (radius * Math.sin( paper.radians(angle) ))
            );

            // 3D Noise
            segment.point.x = paper.map(
                noise.perlin(xoff, yoff, i),
                0, 1,
                view.bounds.center.x + (radius*mouse * Math.cos( paper.radians(angle) )),
                view.bounds.center.x + (radius * Math.cos( paper.radians(angle) ))
            );

            // Increment x dimension for noise
            xoff += 0.05;
        }

        path.smooth();
    }

    // increment y dimension for noise
    yoff += 0.01;

};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
var SparkCircle = function(center, radius, interval) {
    var path = new Path();
    for (var angle=0; angle<360+interval; angle+=interval) {
        path.add(
            center.x + (radius * Math.cos( paper.radians(angle) )),
            center.y + (radius * Math.sin( paper.radians(angle) ))
        );
    }
    path.strokeWidth = 6;
    path.strokeCap = 'round';
    path.blendMode = 'multiply';
    path.closed = true;

    return path;
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
    var xy = event.point.x*event.point.y;
    var wh = view.bounds.width*view.bounds.height;

    mouse = xy/wh;
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};





