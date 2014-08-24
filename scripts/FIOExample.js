console.log( 'FIO Example Loaded' );
/**
 *  FIO Example
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
var fio = f.FIO;

var paths;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    paths = new Group();
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

    if (event.count % 30 === 0 && paths.children.length > 0) {
        paths.children[0].remove();
    }
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
var saveSVG = function(item) {
    var id = paper.randomInt(1000, 9999);
    var filename = 'folio_output_' + id + '.svg';

    var url = 'data:image/svg+xml;utf8,';
    if (item != undefined) {
        url += encodeURIComponent(
            item.exportSVG({
                asString: true
            })
        );
    }
    else {
        url += encodeURIComponent(
            paper.project.exportSVG({
                asString: true
            })
        );
    }

    return fio.saveFile(url, filename);
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
    var distance = event.lastPoint.getDistance(event.point);

    if (distance > 0) {
        var radius = 30;
        var color = new Color.random({
            hue:        [180, 360],
            saturation: [0.8, 0.9],
            brightness: [0.7, 1.0]
        });
        var path;
        if (distance > 4) {
            path = new Path.Line(
                event.lastPoint,
                event.point
            );
            path.strokeColor = color;
            path.strokeWidth = radius*2;
            path.strokeCap = 'round';
        }
        else {
            path = new Path.Circle(event.point, radius);
            path.fillColor = color;
        }

        paths.appendTop( path );
    }

};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};













