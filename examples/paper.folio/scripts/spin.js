console.log( 'Spin' );
/**
 *  Example
 *  Spin
 *
 *  Ken Frederick
 *  ken.frederick@gmx.de
 *
 *  http://kennethfrederick.de/
 *  http://blog.kennethfrederick.de/
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var spun;
var raster;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    // setup raster image
    raster = new Raster('mr_eastwood');
    raster.position = view.center;

    var num = ( parseInt(document.getElementById('rings').value) <= 60 )
        ? parseInt(document.getElementById('rings').value)
        : 60;
    document.getElementById('rings').value = num;

    spun = Spin( raster, {
        rings:   num,
        rotations: [parseInt(document.getElementById('angleSta').value), parseInt(document.getElementById('angleEnd').value)],
        scale:   document.getElementById('bScale').checked,
        opacity:   document.getElementById('bTrans').checked,
        callback:  function(){}
    });

    raster.remove();
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
    if( document.getElementById('bAnimate').checked ) {
        for( var i=0; i<spun.children.length; i++ ) {
            var ring = spun.children[i];
            ring.rotate(i/10);
        }
    }
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
    if( spun ) spun.remove();

    Setup();
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
/**
 * Spin
 *
 * @param {Item} obj
 * @param {Array} properties
 *
 * @example
 * var s = new Spin( raster, {
 *      rings:   9,
 *      rotations: [1,90], // degrees
 *      scale:   true,
 *      opacity:   true,
 *      callback:  function(){}
 * });
 *
 */
var Spin = function(obj, properties) {
    var properties = properties || {};
    var rings = properties.rings || 9,
        rotations = properties.rotations || [1,90],
        scale = properties.scale || false,
        opacity = properties.opacity || false,
        callback = properties.callback || function(obj,i){};


    function base() {
        var group = new Group();
        var r;

        for(var i=0; i<rings+1; i++) {
            var size = i/(rings+1);
            r = (typeof obj === 'Array')
                ? ring( obj[i%obj.length].clone(), size )
                : ring( obj.clone(), size );

            r.rotate( paper.interpolate(rotations[0], rotations[1], size) )
            if(scale === true) r.scale( size*2 ); //factor*2 );
            if(opacity === true) r.opacity = size;
            callback(r, i);

            group.appendBottom(r);
        }


        return group;
    };

    var ring = function(obj, size) {
        var circle = new Path.Circle(
            obj.position,
            (obj.bounds.width*size)/2
        );
        var factor = circle.bounds.width / obj.bounds.width;

        var container = new Group(
            circle,
            obj
        );
        container.clipped = true;
        return container;
    };

    return base();
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






