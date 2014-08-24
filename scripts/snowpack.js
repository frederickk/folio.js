console.log( 'Snow Pack Loaded' );
/**
 *  FCirclePack Example
 *  Snow Pack
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

var packer;

var flakes;
var s;
var t = 0;
var sProps = {};


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
    // set canvas background
    paper.view.element.style.backgroundColor = 'rgb(247, 247, 247)'; //class="black-light-gray"

    flakes = new Group();

    sProps = {
        point: view.center,
        spokes: paper.randomInt(5,15),
        radius: paper.random(30,180),
        strokeColor: new Color.random({hue:[180, 200], saturation:[0.8, 1.0], lightness:[0.8, 0.9]}),
        strokeWidth: 9
    };
    s = new SnowFlake(sProps.point, sProps.spokes, sProps.radius, 0.0);
    s.strokeColor = sProps.strokeColor;
    s.strokeWidth = 9;

    // circle packer
    packer = new f.FCirclePack(flakes, 7);
    // packer.setTarget( new Point(
    //  view.center.x,
    //  view.bounds.height
    // ));
    packer.setPadding(s.strokeWidth);
};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
    var add = true;

    // set a limit for the number of flakes
    if( flakes.children.length < 30 ) {
        if( t <= 1.0 ) {
            s.remove();
            s = new SnowFlake(sProps.point, sProps.spokes, sProps.radius, t);
            s.strokeColor = sProps.strokeColor;
            s.strokeWidth = paper.map(t, 0.0,1.0, 3.0,sProps.strokeWidth);
            add = false;
            t += 0.01;
        }

        if( t > 1.0 && add ) {
            // add s(nowflake) to flakes group
            flakes.appendTop(s.clone());
            console.log( flakes.children.length );
            // regenerate s(noflake) properties
            sProps.point = new Point(
                paper.random(view.bounds.width),
                paper.random(view.bounds.height)
            );
            sProps.spokes = paper.randomInt(4,12);
            sProps.radius = paper.random(20,120);
            strokeColor: new Color.random({hue:[180, 200], saturation:[0.8, 1.0], lightness:[0.8, 0.9]}),

            // add the latest group member to the packer
            packer.add( flakes.children[flakes.children.length-1] );

            t = 0.0;
        }
    }

    packer.update();
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
// var SnowFlake = function(center, spokes, radius, options) {
//     //
//     // Properties
//     //
//     center = center || new Point(0, 0);
//     spokes = spokes || 4
//     radius = radius || 100;

//     options = options || {};
//     options.doubleSpoke = options.doubleSpoke || false;
//     options.doubleOffset = options.doubleOffset || 4.5;
//     options.star = options.star || true;
//     options.interpolation = options.interpolation || 1.0;

//     var scalar = 0.4;
//     var flakeGroup = [];
//     var isShort = false;

//     var group;


//     //
//     // Methods
//     //
//     function Inside(sides, radius) {
//         var inside;
//         inside = (options.star)
//             ? new Path.Star(center, sides, radius, radius*0.75)
//             : new Path.RegularPolygon(center, sides, radius);
//         inside.strokeWidth = 1;
//         inside.strokeCap = 'round';
//         // rotate vertex to intersect with spoke
//         inside.rotate( (360/spokes)*1.5, center );

//         return inside;
//     };

//     function Spoke(deg) {
//         var mid = new Point(
//             center.x + 36 * Math.cos( paper.radians(deg) ),
//             center.y + 36 * Math.sin( paper.radians(deg) )
//         )

//         var end;
//         if (spokes > 6 && spokes % 2 === 0 && isShort) {
//             end = new Point(
//                 center.x + radius*0.75 * Math.cos( paper.radians(deg) ),
//                 center.y + radius*0.75 * Math.sin( paper.radians(deg) )
//             )
//         }
//         else {
//             end = new Point(
//                 center.x + radius * Math.cos( paper.radians(deg) ),
//                 center.y + radius * Math.sin( paper.radians(deg) )
//             )
//         }

//         var spoke = new Path.Line(
//             mid,
//             end
//         );
//         spoke.strokeWidth = 1;
//         spoke.strokeCap = 'round';

//         return spoke;
//     };

//     function Prong(deg, t) {
//         t = t || 0.618;

//         var prongs = new Group();

//         var start = new Point(
//             center.x + radius*t * Math.cos( paper.radians(deg) ),
//             center.y + radius*t * Math.sin( paper.radians(deg) )
//         );
//         deg += (360/spokes)*0.3;

//         var end;
//         var prong;
//         for (var i=0; i<2; i++) {
//             end = new Point(
//                 center.x + (radius*0.7) * Math.cos( paper.radians(deg) ),
//                 center.y + (radius*0.7) * Math.sin( paper.radians(deg) )
//             );
//             prong = new Path.Line(
//                 start,
//                 start.interpolateTo(end, t)
//             );
//             prong.strokeWidth = 1;
//             prong.strokeCap = 'round';
//             prongs.appendTop(prong);

//             deg -= ((360/spokes)*0.3)*2;
//         }

//         return prongs;
//     };


//     //
//     // Invocation
//     //
//     (function() {
//         var deg = 90;
//         var x, y;

//         var spokeA, spokeB;
//         var prongA, prongB;
//         var inside;

//         for (var j=0; j<spokes; j++) {
//             if (options.doubleSpoke) {
//                 spokeA = new Spoke(deg - options.doubleOffset);
//                 prongA = new Prong(deg - options.doubleOffset);

//                 spokeB = new Spoke(deg + options.doubleOffset);
//                 prongB = new Prong(deg + options.doubleOffset);

//                 flakeGroup.push( spokeB );
//                 flakeGroup.push( prongB );
//             }
//             else {
//                 spokeA = new Spoke(deg);
//                 prongA = new Prong(deg);
//             }
//             flakeGroup.push( spokeA );
//             flakeGroup.push( prongA );

//             var prongC = new Prong(deg, 0.5);
//             flakeGroup.push( prongC );

//             deg += 360/spokes;
//             isShort = !isShort;
//         }

//         do {
//             radius *= scalar;
//             scalar -= 0.1;

//             inside = new Inside(spokes, radius)
//             flakeGroup.push( inside );
//         }
//         while (radius > 72);

//         group = new Group(flakeGroup);
//         group.rotate(180, center);
//     })();


//     return group;
// };


var SnowFlake = function(center, spokes, radius, t) {
    var flake = [],
        spokes = (spokes < 4) ? 4 : spokes,
        t = t || 1.0,
        pt = 0.0,
        it = 0.0,
        iRadius = radius,
        iMult = 0.518;

    function initialize() {
        var deg = 90;
        var x, y;
        for( var i=0; i<spokes; i++ ) {
            // spokes
            var s = new spoke(deg);
            flake.push( s );

            // prongs
            if( t > 0.2 ) {
                pt = paper.map(t, 0.2,1.0, 0.0,1.0);
                var p = new prong(deg);
                flake.push( p );
            }

            deg += 360/spokes;
        }

        // inner structure
        do {
            it = t; //paper.map(t, 0.318,1.0, 0.2,1.0);
            iRadius *= iMult;
            iMult -= 0.1;
            var sides = ( parseInt(spokes*t) < 4 ) ? 4 : parseInt(spokes*t);

            var inside = new Path.RegularPolygon(center, sides+1, iRadius*it);
            inside.strokeWidth = 15;
            inside.strokeCap = 'round';
            inside.rotate( (360/spokes)*1.5, center );
            flake.push( inside );
        }
        while( iRadius > 24 );

        return new Group(flake);
    };

    var spoke = function(deg) {
        var mid = new Point(
            center.x + radius * Math.cos( paper.radians(deg) ) * 0.5,
            center.y + radius * Math.sin( paper.radians(deg) ) * 0.5
        )
        var end = new Point(
            center.x + radius * Math.cos( paper.radians(deg) ),
            center.y + radius * Math.sin( paper.radians(deg) )
        )
        var s = new Path.Line(
            mid.interpolateTo(center, t),
            mid.interpolateTo(end, t)
        );
        s.strokeWidth = 15;
        s.strokeCap = 'round';
        return s;
    };

    var prong = function(deg) {
        var prongs = new Group();
        var sta = new Point(
            center.x + radius*0.618 * Math.cos( paper.radians(deg) ),
            center.y + radius*0.618 * Math.sin( paper.radians(deg) )
        );

        deg += (360/spokes)*0.3;
        var end;
        for( var i=0; i<2; i++ ) {
            end = new Point(
                center.x + (radius*0.8) * Math.cos( paper.radians(deg) ),
                center.y + (radius*0.8) * Math.sin( paper.radians(deg) )
            );
            var p = new Path.Line(
                sta,
                sta.interpolateTo(end, pt)
            );
            p.strokeWidth = 15;
            p.strokeCap = 'round';
            prongs.appendTop(p);

            deg -= ((360/spokes)*0.3)*2;
        }

        return prongs;
    };

    return initialize().rotate( 180/spokes );
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
