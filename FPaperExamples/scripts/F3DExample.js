/**
*	3D Example
*
*	Ken Frederick
*	ken.frederick@gmx.de
*
*	http://cargocollective.com/kenfrederick/
*	http://kenfrederick.blogspot.com/
*
*/


// ------------------------------------------------------------------------
// libraries
// -------------------------------------------------------------v-----------
include('../libraries/frederickk/frederickk.js');
include('../libraries/3D/S3D.js');
include('3DpointData.js');



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------

/**
 *	Note from the Scriptographer.org Team
 *
 *	In Scriptographer 2.9, we switched to a top-down coordinate system and
 *	degrees for angle units as an easier alternative to radians.
 *
 *	For backward compatibility we offer the possibility to still use the old
 *	bottom-up coordinate system and radians for angle units, by setting the two
 *	values bellow. Read more about this transition on our website:
 *	http://scriptographer.org/news/version-2.9.064-arrived/
 */

// script.coordinateSystem = 'bottom-up';
script.coordinateSystem = 'top-down';
script.angleUnits = 'radians';

var scene = new Scene3D();


// values
var values = {
	rotx:				45,
	roty:				30,
	rotz:				0
};


// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	var path = new Path3D();
	var numLinesSegments = pointData.length/4;
	for(var i=0; i<numLinesSegments; i++) {
		var i4 = i*4;
		path.add( new Point3D(pointData[i4], pointData[i4+1], pointData[i4+2]) );
	}
	scene.addItem( path );


	//right side
	path = new Path3D();
	path.add( new Point3D(100,0,0) );
	path.add( new Point3D(100,100,0) );
	path.add( new Point3D(0,100,100) );
	path.add( new Point3D(0,0,100) );
	scene.addItem( path );
	
	
	//left side
	path = new Path3D();
	path.add( new Point3D(-100,0,0) );
	path.add( new Point3D(-100,100,0) );
	path.add( new Point3D(0,100,100) );
	path.add( new Point3D(0,0,100) );
	scene.addItem( path );

}



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update() {
}



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {
	// clear out for update
	scene.draw().removeChildren();

	// draw to screen
	scene.rotateX( values.rotx );
	scene.rotateY( values.roty );
	scene.draw().scale(4);
}



// ------------------------------------------------------------------------
// methods
// ------------------------------------------------------------------------
function getAngle(event) {
	var angle = Math.atan2(event.point.y - 0, event.point.x - 0);
	return angle;
}



// ------------------------------------------------------------------------
// events
// ------------------------------------------------------------------------
function onMouseDrag(event) {
	values.rotx = event.point.y;
	values.roty = event.point.x;

	Draw();
}



// ------------------------------------------------------------------------
// Execution
// ------------------------------------------------------------------------
Setup();
// Update();
Draw();




// // ------------------------------------------------------------------------
// // Class
// // ------------------------------------------------------------------------
function BillBox(scene) {
	// Properties
	this.scene = scene;
	this.whd = new Point3D();
	this.whdTemp = new Point3D();
	this.rotation = new Point3D();

	this.bContainer = true;
	this.bRotation = false;

	// face numbers
	this.face	= 0;
	this.FRONT	= 0;
	this.TOP	= 1;
	this.BOTTOM = 2;
	this.LEFT	= 3;
	this.RIGHT	= 4;
	this.BACK	= 5;
	

	// face colors
	this.cols = [
		new RGBColor(1.0, 1.0, 0.0, 0.8), // FRONT
		new RGBColor(1.0, 0.0, 1.0, 0.8), // TOP
		new RGBColor(0.0, 0.0, 1.0, 0.8), // BOTTOM
		new RGBColor(1.0, 0.0, 0.0, 0.8), // LEFT
		new RGBColor(0.0, 1.0, 1.0, 0.8), // RIGHT
		new RGBColor(0.0, 1.0, 0.0, 0.8)  // BACK
	];

	// face points
	this.pointsFRONT = [
		new Point3D(-0.5, -0.5, -0.5), //corner
		new Point3D( 0.0, -0.5, -0.5),
		new Point3D( 0.5, -0.5, -0.5), //corner
		new Point3D( 0.5,	0.0, -0.5),
		new Point3D( 0.5,	0.5, -0.5), //corner
		new Point3D( 0.0,	0.5, -0.5),
		new Point3D(-0.5,	0.5, -0.5), //corner
		new Point3D(-0.5,	0.0, -0.5)
	];
	
	this.pointsTOP = [
		new Point3D(-0.5, -0.5,	0.5), //corner
		new Point3D( 0.0, -0.5,	0.5),
		new Point3D( 0.5, -0.5,	0.5), //corner
		new Point3D( 0.5, -0.5,	0.0),
		new Point3D( 0.5, -0.5, -0.5), //corner
		new Point3D( 0.0, -0.5, -0.5),
		new Point3D(-0.5, -0.5, -0.5), //corner
		new Point3D(-0.5, -0.5,	0.0)
	];

	this.pointsBOTTOM = [
		new Point3D(-0.5, 0.5,	0.5), //corner
		new Point3D( 0.0, 0.5,	0.5),
		new Point3D( 0.5, 0.5,	0.5), //corner
		new Point3D( 0.5, 0.5,	0.0),
		new Point3D( 0.5, 0.5, -0.5), //corner
		new Point3D( 0.0, 0.5, -0.5),
		new Point3D(-0.5, 0.5, -0.5), //corner
		new Point3D(-0.5, 0.5,	0.0)
	];
	this.pointsLEFT = [
		new Point3D(-0.5, -0.5, -0.5), //corner
		new Point3D(-0.5, -0.5,	0.0),
		new Point3D(-0.5, -0.5,	0.5), //corner
		new Point3D(-0.5,	0.0,	0.5),
		new Point3D(-0.5,	0.5,	0.5), //corner
		new Point3D(-0.5,	0.5,	0.0),
		new Point3D(-0.5,	0.5, -0.5), //corner
		new Point3D(-0.5,	0.0, -0.5)
	];
	this.pointsRIGHT = [
		new Point3D( 0.5, -0.5, -0.5), //corner
		new Point3D( 0.5, -0.5,	0.0),
		new Point3D( 0.5, -0.5,	0.5), //corner
		new Point3D( 0.5,	0.0,	0.5),
		new Point3D( 0.5,	0.5,	0.5), //corner
		new Point3D( 0.5,	0.5,	0.0),
		new Point3D( 0.5,	0.5, -0.5), //corner
		new Point3D( 0.5,	0.0, -0.5),
	];
	this.pointsBACK = [
		new Point3D(-0.5, -0.5,	0.5), //corner
		new Point3D( 0.0, -0.5,	0.5),
		new Point3D( 0.5, -0.5,	0.5), //corner
		new Point3D( 0.5,	0.0,	0.5),
		new Point3D( 0.5,	0.5,	0.5), //corner
		new Point3D( 0.0,	0.5,	0.5),
		new Point3D(-0.5,	0.5,	0.5), //corner
		new Point3D(-0.5,	0.0,	0.5),
	];
	
	
	// consecutive points for shapes
	this.pointsMatrix = [
		pointsTOP[0],
		pointsTOP[1],
		pointsTOP[2],
		pointsTOP[3],
		pointsTOP[4],
		pointsTOP[5],
		pointsTOP[6],
		pointsTOP[7],
		
		pointsLEFT[3],
		pointsRIGHT[3],
		pointsFRONT[3],
		pointsFRONT[7],

		pointsBOTTOM[0],
		pointsBOTTOM[1],
		pointsBOTTOM[2],
		pointsBOTTOM[3],
		pointsBOTTOM[4],
		pointsBOTTOM[5],
		pointsBOTTOM[6],
		pointsBOTTOM[7]
	];
	var vertices = [];



	// Methods
	this.draw = function() {
		if( vertices == null) {
			this.drawMatrix();
		}
		else {
			this.draw(vertices);
		}
	}

	// ------------------------------------------------------------------------
	this.drawMatrix = function() {
// 		if( whd != null) {
// 			for(i=0; i<pointsMatrix.length; i++) {
// 				var color = HSVtoRGB( norm(i,0,pointsMatrix.length), 1.0, 1.0 );
// 				color.alpha = 0.5;
// 
// 				translate( pointsMatrix[i].x*whd.x, pointsMatrix[i].y*whd.y, pointsMatrix[i].z*whd.z );
// 				sphere(15);
// 			}
// 		}
	}


	// ------------------------------------------------------------------------
	this.draw = function(_vertices) {
// 		setVertices(_vertices);
// 		
// 		pushMatrix();
// 		translate(sz*2, sz*2, sz*2);
// 		if(bRotation) {
// 			rotateX(rotation.x);
// 			rotateY(rotation.y);
// 			rotateZ(rotation.z);
// 		}
// 		
// 		translate(-sz*2, -sz*2, -sz*2);
// 		var path = new Path3D();
// 		for(i=0; i<vertices.length; i++) {
// 			path.add( new Point3D(
// 				pointsMatrix[ vertices[i] ].x*whd.x,
// 				pointsMatrix[ vertices[i] ].y*whd.y,
// 				pointsMatrix[ vertices[i] ].z*whd.z
// 			) );
// 		}
// 		path.closed = true;
// 		path.translate( )
		
	}



	// Sets
	this.setWHD = function(w, h, d) {
		if(whdTemp.x == 0) whdTemp.set( w*2, parseInt(h*2), parseInt(d*2) );
		whd.set( parseInt(w*2), parseInt(h*2), parseInt(d*2) );
	}	

	// ------------------------------------------------------------------------
	this.reset = function() {
		setFace(0);
		whd.x = whdTemp.x;
		whd.y = whdTemp.y;
		whd.z = whdTemp.z;
	}

	// ------------------------------------------------------------------------
	/**
	 *	@param num
	 *				0 = front
	 *				1 = top
	 *				2 = bottom
	 *				3 = left
	 *				4 = right
	 *				5 = back (same as front really...)
	 */
	this.setFace = function(num) {
		face = num;
	}
	
	// ------------------------------------------------------------------------
	this.setVertices = function(_vertices) {
		vertices = _vertices;
	}

	// ------------------------------------------------------------------------
	this.showContainer = function(val) {
		bContainer = val;
	}

	// ------------------------------------------------------------------------
	this.Rotation = function(val, rads) {
		bRotation = val;
		rotation = rads;
	}



	// Gets
	this.getWHD = function() {
		return whdTemp;
	}

}



