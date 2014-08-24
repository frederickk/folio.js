console.log( 'FColor Example Loaded' );
/**
 *  FColor Wheel Example
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

var colors = [];
var radius = 45;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    var method = document.getElementById('method').value;
    var bRandom = document.getElementById('bRandom').checked;

    if( bRandom ) {
        // generate random colors
        colors = [
            new Color.random(),               // random
            new Color.random(0.3),            // random gray
            new Color.random(0.0, 1.0, 0.0),  // random rgb
            new Color.random([120, 180], [0.5, 0.7], [0.5, 0.7]),                 // random hsb
            new Color.random({hue: [180, 240], saturation: 1.0, lightness: 1.0}), // random hsl (object literal)
            new Color.random('hex')           // random hex
        ];
    }
    else {
        // generate chromatic colors
        for( var i=0; i<6; i++ ) {
            colors.push( new Color({hue: i*60, saturation: 1.0, brightness: 1.0}) );
        }
    }


    var j = colors.length-1;
    for( var i=0, len = colors.length; i<len; i++ ) {
        // outermost
        var outerm = new Point(
            view.center.x + 400 * Math.cos( paper.radians(i*60) ),
            view.center.y + 400 * Math.sin( paper.radians(i*60) )
        )
        var om = new Path.Circle( outerm, radius );
        om.strokeColor = null;
        om.fillColor = colors[i];

        // outer ring
        var outer = new Point(
            view.center.x + 300 * Math.cos( paper.radians(i*60) ),
            view.center.y + 300 * Math.sin( paper.radians(i*60) )
        )
        var o = new Path.Circle( outer, radius );
        o.strokeColor = null;
        if( method === 'Saturate' ) {
            o.fillColor = colors[i].saturate(0.25);
        }
        else if( method === 'Desaturate' ) {
            o.fillColor = colors[i].desaturate(0.25);
        }
        else if( method === 'Dim' ) {
            o.fillColor = colors[i].dim(0.25);
        }
        else if( method === 'Darken' ) {
            o.fillColor = colors[i].darken(0.25);
        }
        else if( method === 'Lighten' ) {
            o.fillColor = colors[i].lighten(0.25);
        }
        else if( method === 'Brighten' ) {
            o.fillColor = colors[i].brighten(0.25);
        }
        else if( method === 'Contrast' ) {
            o.fillColor = colors[i].contrast(0.25);
        }
        else if( method === 'Invert' ) {
            o.fillColor = colors[i].invert();
        }
        else if( method === 'Rotate' ) {
            o.fillColor = colors[i].rotate(45);
        }
        else if( method === 'Interpolate' ) {
            o.fillColor = new Color().interpolate( colors[i], colors[j], 0.25 );
        }
        else {
            o.fillColor = colors[i]; //.interpolate( colors[j], 1.0 );
        }

        // center ring
        var center = new Point(
            view.center.x + 200 * Math.cos( paper.radians(i*60) ),
            view.center.y + 200 * Math.sin( paper.radians(i*60) )
        )
        var c = new Path.Circle( center, radius );
        c.strokeColor = null;
        if( method === 'Saturate' ) {
            c.fillColor = colors[i].saturate(0.5);
        }
        else if( method === 'Desaturate' ) {
            c.fillColor = colors[i].desaturate(0.5);
        }
        else if( method === 'Dim' ) {
            c.fillColor = colors[i].dim(0.5);
        }
        else if( method === 'Darken' ) {
            c.fillColor = colors[i].darken(0.5);
        }
        else if( method === 'Lighten' ) {
            c.fillColor = colors[i].lighten(0.5);
        }
        else if( method === 'Brighten' ) {
            c.fillColor = colors[i].brighten(0.5);
        }
        else if( method === 'Contrast' ) {
            c.fillColor = colors[i].contrast(0.5);
        }
        else if( method === 'Invert' ) {
            c.fillColor = colors[i].invert();
        }
        else if( method === 'Rotate' ) {
            c.fillColor = colors[i].rotate(90);
        }
        else if( method === 'Interpolate' ) {
            c.fillColor = new Color().interpolate( colors[i], colors[j], 0.5 );
        }
        else {
            c.fillColor = colors[i];
        }

        // center ring
        var inner = new Point(
            view.center.x + 100 * Math.cos( paper.radians(i*60) ),
            view.center.y + 100 * Math.sin( paper.radians(i*60) )
        )
        var n = new Path.Circle( inner, radius );
        n.strokeColor = null;
        if( method === 'Saturate' ) {
            n.fillColor = colors[i].saturate(0.75);
        }
        else if( method === 'Desaturate' ) {
            n.fillColor = colors[i].desaturate(0.75);
        }
        else if( method === 'Dim' ) {
            n.fillColor = colors[i].dim(0.75);
        }
        else if( method === 'Darken' ) {
            n.fillColor = colors[i].darken(0.75);
        }
        else if( method === 'Lighten' ) {
            n.fillColor = colors[i].lighten(0.75);
        }
        else if( method === 'Brighten' ) {
            n.fillColor = colors[i].brighten(0.75);
        }
        else if( method === 'Contrast' ) {
            n.fillColor = colors[i].contrast(0.75);
        }
        else if( method === 'Invert' ) {
            n.fillColor = colors[i].invert();
        }
        else if( method === 'Rotate' ) {
            n.fillColor = colors[i].rotate(180);
        }
        else if( method === 'Interpolate' ) {
            n.fillColor = new Color().interpolate( colors[i], colors[j], 0.75 );
        }
        else {
            n.fillColor = colors[i];
        }


        j--;
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





