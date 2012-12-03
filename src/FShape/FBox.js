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
 *	Create simple box
 *
 */
Frederickk.FShape.FBox = function(_scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	this.name = '';
	this.closed = false;

	this.fillColor = null;
	this.strokeColor = null;


	// private
	var scene = _scene;


	this.faceFRONT = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceTOP = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5) //corner
	];

	this.faceBOTTOM = [
		new Frederickk.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, 0.5, -0.5) //corner
	];
	
	this.faceLEFT = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceRIGHT = [
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5, -0.5) //corner
	];
	
	this.faceBACK = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.5) //corner
	];


	var faces = [
		['front',	this.faceFRONT],
		['top',		this.faceTOP],
		['bottom',	this.faceBOTTOM],
		['left',	this.faceLEFT],
		['right',	this.faceRIGHT],
		['back',	this.faceBACK]
	];

	var facesFillColors = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];

	var facesStrokeColors = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];


	var whd = new Frederickk.F3D.FPoint3(10,10,10);



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.init = function(_x, _y, _z) {
		for(var i=0; i<faces.length; i++) {
			var side = new f3d.FPath3();
			side.name = faces[i][0];
			var vertices = faces[i][1];
			for(var j=0; j<vertices.length; j++) {
				side.add( new f3d.FPoint3(
					vertices[j].x()*whd.x(),
					vertices[j].y()*whd.y(),
					vertices[j].z()*whd.z()
				));
			}
			side.fillColor = facesFillColors[i];
			side.strokeColor = facesStrokeColors[i];
			side.closed = true;
			side.translate(_x,_y,_z);
			scene.addItem( side );
		}
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setWHD = function(_width, _height, _depth) {
		whd.set(_width, _height, _depth);
	};


	// ------------------------------------------------------------------------
	this.setFillColors = function(face, col) {
		facesFillColors[face] = col;
	};
	this.setFillColors = function(colArr) {
		facesFillColors = colArr;
	};

	// ------------------------------------------------------------------------
	this.setStrokeColors = function(face, col) {
		facesStrokeColors[face] = col;
	};
	this.setStrokeColors = function(colArr) {
		facesStrokeColors = colArr;
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.getWHD = function() {
		return whd;
	};

};







/**
 *	
 *	FBillBox.js
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
 *	FBillBox
 *
 *	Create Max Bill shapes
 *	http://www.kettererkunst.de/kunst/kd/details.php?obnr=100039513&anummer=1
 *
 */
Frederickk.FShape.FBillBox = function(_scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	this.name = '';
	this.closed = false;

	this.fillColor = null;
	this.strokeColor = null;


	// private
	var scene = _scene;

	var BoundingBox = new Frederickk.FShape.FBox(_scene);

	var whd     = new Frederickk.F3D.FPoint3();
	var whdTemp = new Frederickk.F3D.FPoint3();
// 	rotation: new Frederickk.F3D.FPoint3();

	var bContainer = true;
	var bRotation = false;

	// face number
	var face = 0;

	// face numbers
	var FRONT	= 0;
	var TOP 	= 1;
	var BOTTOM	= 2;
	var LEFT	= 3;
	var RIGHT	= 4;
	var BACK	= 5;


	 // face points
	var pointsFRONT = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, -0.5, -0.5),
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.0, -0.5),
		new Frederickk.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0,	0.5, -0.5),
		new Frederickk.F3D.FPoint3(-0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.0, -0.5)
	];
	
	var pointsTOP = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, -0.5,	0.5),
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.0),
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, -0.5, -0.5),
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.0)
	];

	var pointsBOTTOM = [
		new Frederickk.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, 0.5,	0.5),
		new Frederickk.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, 0.5,	0.0),
		new Frederickk.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, 0.5, -0.5),
		new Frederickk.F3D.FPoint3(-0.5, 0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, 0.5,	0.0)
	];
	var pointsLEFT = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.0),
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.0,	0.5),
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.0),
		new Frederickk.F3D.FPoint3(-0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.0, -0.5)
	];
	var pointsRIGHT = [
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.0),
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.0,	0.5),
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.0),
		new Frederickk.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.0, -0.5),
	];
	var pointsBACK = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0, -0.5,	0.5),
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.0,	0.5),
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.0,	0.5,	0.5),
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.0,	0.5),
	];	

	// consecutive points for shapes
	var pointsMatrix = [
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
	var verticesArr = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	TODO: add a way to translate shapes in 3D
	 *
	 */
	this.init = function(_x, _y, _z) {
		if(verticesArr === undefined || verticesArr == null) {
			// choose random standard bill shape
			var r = Frederickk.randomInt(0,3);
			if(r == 0) this.red();
			else if(r == 1) this.yellow();
			else this.blue();
		}

		// bill shape
		var path = new Frederickk.F3D.FPath3();
		path.name = this.name;
		for(i=0; i<verticesArr.length; i++) {
			path.add( 
				new Frederickk.F3D.FPoint3(
					pointsMatrix[ verticesArr[i] ].x()*whd.x(),
					pointsMatrix[ verticesArr[i] ].y()*whd.y(),
					pointsMatrix[ verticesArr[i] ].z()*whd.z()
				)
			);
		}
		path.fillColor = this.fillColor;
		path.strokeColor = this.strokeColor;
		path.translate(_x,_y,_z);
		path.closed = true;

		scene.addItem( path );

		// Bounding Box
		if(bContainer) {
			BoundingBox.name = 'BoundingBox';
			BoundingBox.setFillColors( 
				[null,null,null,null,null,null]
			);
			BoundingBox.setStrokeColors(
				['black','black','black','black','black','black',]
			)
			BoundingBox.init(_x, _y, _z);
		}
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setWHD = function(w, h, d) {
		if(whdTemp.x() == 0) {
			whdTemp.set( w, h, d );
		}
		whd.set( w, h, d );

		BoundingBox.setWHD(w,h,d);
	};

	// ------------------------------------------------------------------------
	this.reset = function() {
		this.setFace(0);
		whd.x = whdTemp.x;
		whd.y = whdTemp.y;
		whd.z = whdTemp.z;
	};

	// ------------------------------------------------------------------------
	this.setVertices = function(_verticesArr) {
		verticesArr = _verticesArr;
	};

	// ------------------------------------------------------------------------
	this.showContainer = function(val) {
		bContainer = val;
	};

	// ------------------------------------------------------------------------
	this.red = function() {
		this.fillColor = new paper.RGBColor(0.9, 0.26, 0.14),
		verticesArr = [2,14,18,6];
	};
	this.yellow = function() {
		this.fillColor = new paper.RGBColor(0.99, 0.84, 0)
		verticesArr = [8,9,10,11];
	};
	this.blue = function() {
		this.fillColor = new paper.RGBColor(0.04, 0.5, 0.74),
		verticesArr = [1,9,15,17,11,7];
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.getWHD = function() {
		return whdTemp;
	};

};





