console.log( 'Shape Physics' );
/**
 *  Shape Physics
 *
 *  Ken Frederick
 *  ken.frederick@gmx.de
 *
 *  http://kennethfrederick.de/
 *  http://blog.kennethfrederick.de/
 *
 *
 *  Rigid body physics using Chipmunk.js
 *  https://github.com/josephg/Chipmunk-js/
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core folio namespace
var f = folio;

var grid;

//
// cp.js
//
var space;
var GRABABLE_MASK_BIT = 1<<31;
var NOT_GRABABLE_MASK = ~GRABABLE_MASK_BIT;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    // set canvas background
    paper.view.element.style.backgroundColor = 'rgb(247, 247, 247)';

    //
    // cp.js
    // Create environment
    //
    space = new cp.Space();
    space.iterations = 10;
    space.gravity = cp.v(10, -500);
    space.sleepTimeThreshold = 0.5;
    space.collisionSlop = 0.5;

    // Bounding box
    createBounds(cp, 6);


    //
    // Load image
    //
    var raster = new Raster('image') ; //document.getElementById('image').value);
    raster.position = view.center;

    raster.onLoad = function() {
        //
        // Create shapes
        //
        if( grid ) grid.remove();
        grid = new GridPhysics(cp, raster, {
            shapes:     ['circle'], //shapes,
            resolution: 45 //res,
            // rotation:    parseFloat(document.getElementById('rotation').value),
            // scale:       document.getElementById('bScale').checked
        });

        raster.remove();
    };

    // var total = 18;
    // for( var i=0; i<total; i++ ) {
    //  // //
    //  // // Blocks
    //  // //
    //  // var blockBody = space.addBody(new cp.Body(
    //  //  mass,
    //  //  cp.momentForBox(mass/2, radius, radius)
    //  // ));
    //  // blockBody.setPos(cp.v(
    //  //  paper.normalize(i+1, 0,total+1)*view.bounds.width,
    //  //  view.bounds.height/2
    //  // ));

    //  // var blockShape = space.addShape(new cp.BoxShape(
    //  //  blockBody,
    //  //  radius,
    //  //  radius
    //  // ));
    //  // blockShape.setElasticity( paper.normalize(mass, 30,0) );
    //  // blockShape.setFriction(1);
    //  // // custom properties
    //  // blockShape.index = i;
    //  // blockShape.width = radius;
    //  // blockShape.height = radius;
    //  // // attach paper.js Path to cp.js shape
    //  // blockShape.path = new Path.Rectangle(
    //  //  new Point(
    //  //      blockBody.p.x,
    //  //      blockBody.p.y
    //  //  ),
    //  //  new Size(
    //  //      blockShape.width,
    //  //      blockShape.height
    //  //      // Math.abs(blockShape.verts[0] - blockShape.verts[4]),
    //  //      // Math.abs(blockShape.verts[1] - blockShape.verts[5])
    //  //  )
    //  // );
    //  // blockShape.path.fillColor = new Color.random(0.0, 1.0, 0.7);
    //  // console.log( blockShape );


    //  console.log( '---------' );
    // }

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
    space.step(event.time/60);

    Draw();
};


// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
    space.eachShape(function(shape) {
        var angle = new Point(shape.body.rot).getHeading();

        if( shape.type === 'circle' ) {
            var ball = shape.path;
            ball.position = new Point.invertY(shape.tc);
            ball.rotation( paper.degrees(angle) );
        }
        else if( shape.type === 'poly' ) {
            var block = shape.path;
            block.position = new Point.invertY(new Point(
                shape.tVerts[0] + shape.width/2,
                shape.tVerts[3] - shape.height/2
            ));
            block.rotation( paper.degrees(angle) );
        }

    });
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
/*
 * TODO: should this be a box, and all elements are inside?
 */
function createBounds(cp, thickness) {
    var thickness = thickness || 6;

    // ground
    var ground = space.addShape(new cp.SegmentShape(
        space.staticBody,
        cp.v(0, thickness),
        cp.v(view.bounds.width, thickness),
        thickness
    ));
    ground.setElasticity(1);
    ground.setFriction(1);
    ground.setLayers(NOT_GRABABLE_MASK);
    ground.path = new Path.Rectangle(
        new Point(0, thickness).invertY(),
        new Size(view.bounds.width, thickness)
    );
    ground.path.fillColor = new Color('white');

    // ceiling
    var ceiling = space.addShape(new cp.SegmentShape(
        space.staticBody,
        cp.v(0, view.bounds.height-thickness),
        cp.v(view.bounds.width, view.bounds.height),
        thickness
    ));
    ceiling.setElasticity(1);
    ceiling.setFriction(1);
    ceiling.setLayers(NOT_GRABABLE_MASK);
    ceiling.path = new Path.Rectangle(
        new Point(0, view.bounds.height).invertY(),
        new Size(view.bounds.width, thickness)
    );
    ceiling.path.fillColor = new Color('white');

    // walls
    var wallLeft = space.addShape(new cp.SegmentShape(
        space.staticBody,
        cp.v(thickness, 0),
        cp.v(thickness, view.bounds.height),
        thickness
    ));
    wallLeft.setElasticity(1);
    wallLeft.setFriction(1);
    wallLeft.setLayers(NOT_GRABABLE_MASK);
    wallLeft.path = new Path.Rectangle(
        new Point(0, 0),
        new Size(thickness, view.bounds.height)
    );
    wallLeft.path.fillColor = new Color('white');

    var wallRight = space.addShape(new cp.SegmentShape(
        space.staticBody,
        cp.v(view.bounds.width-thickness, 0),
        cp.v(view.bounds.width, view.bounds.height),
        thickness
    ));
    wallRight.setElasticity(1);
    wallRight.setFriction(1);
    wallRight.setLayers(NOT_GRABABLE_MASK);
    wallRight.path = new Path.Rectangle(
        new Point(view.bounds.width-thickness, 0),
        new Size(thickness, view.bounds.height)
    );
    wallRight.path.fillColor = new Color('white');
};

// ------------------------------------------------------------------------
/**
 * A grid of shapes, which maps to a given Raster
 *
 * @param {Object} cp         Chipmunk.js
 * @param {Raster} img        the Raster
 * @param {Object} properties additional properties
 *
 * @return {Group}
 *
 * @example
 * var grid = new GridPhysics(cp, raster, {
 *  shapes:        ['circle', 'square', 'triangle', 'cross'], // types of shapes
 *  resolution:    60,   // radius of shapes
 *  rotation:      0.0,  // initial rotation of shapes (degrees)
 *  scale:         1.0,  // initial scale of shapes
 *  darkenPercent: 0.3   // percentage of darker color in gradient (0.0 - 1.0)
 * });
 */
var GridPhysics = function(cp, img, properties) {
    var group = new Group();

    var properties = properties || {};
    var resolution = properties.resolution || 45,
        rotation = properties.rotation || false,
        scale = properties.scale || false,
        darkenPercent = properties.darkenPercent || 0.3,
        shapes = properties.shapes || ['rectangle'];
    var size = new Size(resolution,resolution);


    //
    // Methods
    //
    function initialize() {
        var form;
        for(var y=resolution; y<img.height; y+=resolution) {
            for(var x=resolution; x<img.width; x+=resolution) {
                form = getShape( getType(), {
                    position:   [x, y]
                    // scale:       (scale) ? 1-col.gray : 1.0,
                    // rotate:  (rotation) ? col.gray*360 : 0.0,
                });
                setColor(form.path, img.getPixel(x,y));

                group.appendTop(form.path);
            }
        }
        return group;
    };

    //
    // Sets
    //
    function setColor(item, clr) {
        var clrDark       = clr.darken(darkenPercent),
            pixelGray     = clr.gray,

            origin        = new Point(item.position.x, item.position.y - item.bounds.height/2),
            destination   = new Point(item.position.x, item.position.y + item.bounds.height/2),

            gradient      = new Gradient([clr, clrDark]),
            gradientColor = new GradientColor(gradient, origin, destination);

        if(item.name === 'cross') {
            item.children[0].strokeColor = clr;
            item.children[1].strokeColor = clrDark;
            item.children[0].strokeCap = 'round';
            item.children[1].strokeCap = 'round';
        }
        else {
            item.fillColor = gradientColor;
        }

    };


    //
    // Gets
    //
    var getType = function() {
        var rand = paper.randomInt(0,shapes.length);
        // if(shapes[rand] === 0) {
        //  while(shapeArray[rand] === 0) {
        //      rand = paper.randomInt(0,shapes.length);
        //  }
        // }
        return shapes[rand];
    };

    var getShape = function(type, properties) {
        var properties = properties || {};
        properties.position = properties.position || new Point(0,0);
        properties.scale = properties.scale || 1.0;
        properties.rotate = properties.rotate || 0.0;
        properties.weight = properties.weight || size.width/2;
        properties.fit = properties.fit || true;

        var form;
        if(type === 'triangle') {
            form = new Path.RegularPolygon(
                new Point(0,0), 3, (size.height/2)*1.33
            );
        }
        else if(type === 'circle') {
            var mass = size.width/2;
            var radius = mass;

            var ballBody = space.addBody(new cp.Body(
                mass,
                cp.momentForCircle(mass, 0, radius, cp.v(0, 0))
            ));
            ballBody.setPos(cp.v(
                properties.position[0],
                properties.position[1]
            ));

            var form = space.addShape(new cp.CircleShape(
                ballBody,
                radius,
                cp.v(0, 0)
            ));
            form.setElasticity(0);
            form.setFriction(1);
            // console.log( form.body.rot );
            // attach paper.js Path to cp.js Shape
            form.path = new Path.Circle( new Point(0,0), radius );
        }
        else if(type === 'cross') {
            form = new Path.FCross(
                new Point(0,0),
                new Size(
                    (properties.fit) ? size.width/2 - properties.weight/2 : size.width/2,
                    (properties.fit) ? size.width/2 - properties.weight/2 : size.height/2
                ),
                properties.weight
            );
        }
        else {
            // type === 'rectangle'
            form = new Path.Rectangle( new Point(0,0), size );
        }

        form.name = type;
        return form;
    };


    //
    // Invocation
    //
    return initialize();


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



