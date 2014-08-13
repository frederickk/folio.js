console.log( 'FFlock Example Loaded' );
/**
 *  FFlock Example
 *
 *  Ken Frederick
 *  ken.frederick@gmx.de
 *
 *  http://kennethfrederick.de/
 *  http://blog.kennethfrederick.de/
 *
 *
 *  flock arrows
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;
var flock = f.FFlock;

// holder array for boids
var boids = [];
// holder array for boids
var predators = [];
// holder array for obstacles
var obstacles = [];

var mouse = null;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    // set canvas background
    paper.view.element.style.backgroundColor = 'rgb(247, 247, 247)';

    // create arrow
    var r = 30;
    var arrow = Path.FArrow(
        view.bounds.center,
        new Point(
            view.bounds.center.x - r,
            view.bounds.center.y
        ),
        new Size(r*0.3,r*0.3)
    );
    arrow.strokeWidth = 3;
    arrow.strokeCap = 'round';


    // create the boid agents
    for (var i=0; i<40; i++) {
        arrow.strokeColor = new Color.random({ hue:[0, 360], saturation:[0.3, 0.9], brightness:[0.8, 1.0] });

        // create boid agent
        var boid = new flock.boid([view.bounds.topCenter.x, view.bounds.topCenter.y], {
            radius:     r,
            maxSpeed:   r*0.5,
            maxForce:   0.1,
            path:       arrow.clone()
        });
        boids.push( boid );
    }


    // create the predators
    for (var i=0; i<3; i++) {
        arrow.strokeColor = 'white';

        // create predator agent
        var predator = new flock.predator([view.bounds.bottomCenter.x, view.bounds.bottomCenter.y], {
            radius:     r*4,
            maxSpeed:   r,
            maxForce:   0.1,
            path:       arrow.clone()
        });
        predators.push( predator );
    }


    // remove the arrow
    arrow.remove();


    // create obstacles
    for( var i=0; i<5; i++ ) {
        var x = i*view.bounds.width/4;
        var y = view.center.y

        // create obstacle
        var obstacle = new flock.obstacle([x, y], {
            radius:     r*2,
            path:       new Path.Circle({
                            position:   [x, y],
                            radius:     r,
                            fillColor:  'white'
                        })
        });
        boids.push( obstacle );
    }

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

    // update the boid agents
    for( var i=0, len=boids.length; i<len; i++ ) {
        var b = boids[i];

        if (mouse) {
            b.arrive(mouse);
        }
        b.run(boids);

        // update path
        // bp.position = b.position();
        // var angle = paper.degrees(
        //  Math.atan2(b.position()[1], b.position()[0])
        // );
        // bp.rotation(angle);
    }


    // update the predator agents
    for( var i=0; i<predators.length; i++ ) {
        var p = predators[i];
        var pp = b.path();

        p.run(predators, boids);

        // update path
        // pp.position = p.position();
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













