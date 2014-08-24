console.log( 'Ring Flock' );
/**
 *  Ring Flock
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
var flock = f.FFlock;

var pieces;

var boids = [];
var predators = [];
var mouse = null;


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    // set canvas background
    paper.view.element.style.backgroundColor = 'rgb(247, 247, 247)';

    // radius to match SVG
    var radius = 373.059/2;

    // import svg
    svg = project.importSVG( document.getElementById('svg'), true );
    for( var i=0, len=svg.children.length; i<len; i++ ) {
        // remove any pieces outside of the browser window
        try {
            if(svg.children[i].position.x > view.bounds.width) {
                svg.children[i].remove();
            }
            else if(svg.children[i].position.x < 0) {
                svg.children[i].remove();
            }
            else if(svg.children[i].position.y > view.bounds.height) {
                svg.children[i].remove();
            }
            else if(svg.children[i].position.y < 0) {
                svg.children[i].remove();
            }
        }
        catch(err) {}
    }

    // // handle the pattern
    pieces = new Group( svg.children );
    for( var i=0, len=pieces.children.length; i<len; i++ ) {
        var piece = pieces.children[i];
        piece.opacity = 0.7;
    //  piece.fillColor = new Color(0.97);
        piece.data.fader = new ColorStepper(
            2.0,
            new Color({ hue: 0, saturation:0, brightness:0.97 }),
            new Color({ hue: 0, saturation:0, brightness:0.97 })
        );
    }

    // get rid of svg
    svg.remove();


    // create the boids
    for (var i=0; i<20; i++) {
        var color = new Color.random({ hue:[45, 180], saturation:[0.2, 0.6], brightness:[0.9, 1.0] });
        var boid = new flock.boid(view.center, {
            radius:     24,
            maxSpeed:   10,
            maxForce:   0.05,
            data:       color,
            path:       new Path.Rectangle({
                            position:   [0, 0],
                            size:       [24, 6],
                            fillColor:  color
                        })
        });
        boids.push( boid );
    }


    // create a predator
    for (var i=0; i<3; i++) {
        var predator = new flock.predator(view.center, {
            radius:     36,
            maxSpeed:   36,
            maxForce:   0.01,
            data:       new Color({ hue: 0, saturation:0, brightness:0.97 })
        });
        predators.push( predator );
    }

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

    for( var i=0, len=boids.length; i<len; i++ ) {
        var b = boids[i];
        b.path().visible = false;

        if (mouse) {
            b.arrive(mouse);
        }
        b.run(boids);

        var hit = pieces.hitTest(b.position(), {
            fill:       true,
            stroke:     true
        });
        if( hit ) {
            var item = hit.item;
            item.data.fader.setEnd(b.data());
            item.data.fader.toggle();
        }
    }

    for( var i=0, len=predators.length; i<len; i++ ) {
        var p = predators[i];
        p.run(predators, boids);
    }


    for( var i=0; i<pieces.children.length; i++ ) {
        var fc = pieces.children[i].data.fader;
        fc.update(event.time);
        pieces.children[i].fillColor = fc.color();
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
/**
 * @param {Item} item
 *       Item or Group
 * @param {Group} toGroup
 *       target Group for items
 *
 * @return {Group} the target Group
 */
function breakGroup(item, toGroup) {
    if( item.hasChildren() ) {
        for( var i=0; i<item.children.length; i++ ) {
            var kid = item.children[i];
            if( kid.hasChildren() ) {
                breakGroup(kid, toGroup);
            }
            else {
                toGroup.addChild(kid);
            }
        }
    }
    else {
        toGroup.addChild(item);
    }
    return toGroup;
};


// ------------------------------------------------------------------------
/**
 * Fader
 *
 * @param {Number} fadeSec  length of fade in seconds
 * @param {Color} endCol     target color
 */
var ColorStepper = function(fadeSec, staCol, endCol) {
    var fadeSec = fadeSec || 0.250;
    var fader;

    var staCol = staCol || new Color('white');
    var endCol = endCol || new Color('black');
    var color = staCol;

    function initialize() {
        fader = new folio.FTime.FStepper();
        fader.setSeconds( fadeSec );
        fader.setDelta(0.001);
    };

    function toggle() {
        fader.toggle();
    };

    function update(event) {
        fader.update(event);

        // if( fader.delta() <= 0.0) {
        //  fader.stop();
        // }
        // else if( fader.delta() >= 1.0) {
        //  fader.stepOut();
        // };
        if( fader.isDone() ) {
            toggle();
        }

        var components = {
            hue:        paper.map(fader.delta(), 0.0,1.0, staCol.hue,        endCol.hue),
            saturation: paper.map(fader.delta(), 0.0,1.0, staCol.saturation, endCol.saturation),
            brightness: paper.map(fader.delta(), 0.0,1.0, staCol.brightness, endCol.brightness)
        };
        color = new Color(components);
    };

    function setStartColor(color) {
        col = color;
    };
    function setEndColor(endColor) {
        endCol = endColor;
    };

    function getColor() {
        return color;
    };


    initialize();
    return {
        toggle:     toggle,
        update:     update,

        setStart:   setStartColor,
        setEnd:     setEndColor,

        color:      getColor
    };

};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
    view.size = event.size;
};

// ------------------------------------------------------------------------
function onMouseUp(event) {
    mouse = null;
};

function onMouseDown(event) {
    mouse = event.point;
};

function onMouseMove(event) {
};

function onMouseDrag(event) {
    mouse = event.point;
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};





