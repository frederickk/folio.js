/**
 *  
 *	FBox.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FBox
 *
 *	Create a box
 *
 */
Frederickk.FShape.FBox = paper.Path.extend({
	// Properties
	// public
	scene: null,
	whd: new Frederickk.F3D.FPoint3(),
	whdTemp: new Frederickk.F3D.FPoint3(),
	rotation: new Frederickk.F3D.FPoint3(),

	bContainer: true,
	bRotation: false,

	// face numbers
	face:	0,
	FRONT:	0,
	TOP:	1,
	BOTTOM: 2,
	LEFT:	3,
	RIGHT:	4,
	BACK:	5,
	

	// face colors
	cols: [
		new paper.RGBColor(1.0, 1.0, 0.0, 0.8), // FRONT
		new paper.RGBColor(1.0, 0.0, 1.0, 0.8), // TOP
		new paper.RGBColor(0.0, 0.0, 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0.0, 0.0, 0.8), // LEFT
		new paper.RGBColor(0.0, 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0.0, 1.0, 0.0, 0.8)  // BACK
	],

	// face points
	pointsFRONT: [
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, -0.5, -0.5),
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.0, -0.5),
		new Frederickk.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0,	0.5, -0.5),
		new Frederickk.F3D.FPoint3(-0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.0, -0.5)
	],
	
	pointsTOP: [
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, -0.5,	0.5),
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.0),
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, -0.5, -0.5),
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.0)
	],

	pointsBOTTOM: [
		new Frederickk.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, 0.5,	0.5),
		new Frederickk.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, 0.5,	0.0),
		new Frederickk.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, 0.5, -0.5),
		new Frederickk.F3D.FPoint3(-0.5, 0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, 0.5,	0.0)
	],
	pointsLEFT: [
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.0),
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.0,	0.5),
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.0),
		new Frederickk.F3D.FPoint3(-0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.0, -0.5)
	],
	pointsRIGHT: [
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.0),
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.0,	0.5),
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.0),
		new Frederickk.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.0, -0.5),
	],
	pointsBACK: [
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, -0.5,	0.5),
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.0,	0.5),
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0,	0.5,	0.5),
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.0,	0.5),
	],
	
	
	// consecutive points for shapes
	pointsMatrix: [
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
	],

	// private
	vertices: [],



	// Methods
	setup : function(_scene) {
		scene = _scene;

	},

	draw : function() {
		if( vertices == null) {
			drawMatrix();
		}
		else {
			draw(vertices);
		}
	},

	// ------------------------------------------------------------------------
	drawMatrix : function() {
// 		if( whd != null) {
// 			for(i=0; i<pointsMatrix.length; i++) {
// 				var color = HSVtoRGB( norm(i,0,pointsMatrix.length), 1.0, 1.0 );
// 				color.alpha = 0.5;
// 
// 				translate( pointsMatrix[i].x*whd.x, pointsMatrix[i].y*whd.y, pointsMatrix[i].z*whd.z );
// 				sphere(15);
// 			}
// 		}
	},


	// ------------------------------------------------------------------------
	draw : function(_vertices) {
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
// 		var path = new FPath3();
// 		for(i=0; i<vertices.length; i++) {
// 			path.add( new Frederickk.F3D.FPoint3(
// 				pointsMatrix[ vertices[i] ].x*whd.x,
// 				pointsMatrix[ vertices[i] ].y*whd.y,
// 				pointsMatrix[ vertices[i] ].z*whd.z
// 			) );
// 		}
// 		path.closed = true;
// 		path.translate( )
		
	},



	// Sets
	setWHD : function(w, h, d) {
		if(whdTemp.x == 0) whdTemp.set( w*2, parseInt(h*2), parseInt(d*2) );
		whd.set( parseInt(w*2), parseInt(h*2), parseInt(d*2) );
	},

	// ------------------------------------------------------------------------
	reset : function() {
		setFace(0);
		whd.x = whdTemp.x;
		whd.y = whdTemp.y;
		whd.z = whdTemp.z;
	},

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
	setFace : function(num) {
		face = num;
	},
	
	// ------------------------------------------------------------------------
	setVertices : function(_vertices) {
		vertices = _vertices;
	},

	// ------------------------------------------------------------------------
	showContainer : function(val) {
		bContainer = val;
	},

	// ------------------------------------------------------------------------
	Rotation : function(val, rads) {
		bRotation = val;
		rotation = rads;
	},



	// Gets
	getWHD : function() {
		return whdTemp;
	}


});


