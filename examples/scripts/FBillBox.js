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
frederickkPaper.FShape.FBillBox = function(_scene) {
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

	var BoundingBox = new frederickkPaper.FShape.FBox(_scene);

	var whd     = new frederickkPaper.F3D.FPoint3();
	var whdTemp = new frederickkPaper.F3D.FPoint3();
// 	rotation: new frederickkPaper.F3D.FPoint3();

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
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, -0.5, -0.5),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.0, -0.5),
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0,	0.5, -0.5),
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.0, -0.5)
	];
	
	var pointsTOP = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, -0.5,	0.5),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.0),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, -0.5, -0.5),
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.0)
	];

	var pointsBOTTOM = [
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, 0.5,	0.5),
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5,	0.0),
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, 0.5, -0.5),
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5,	0.0)
	];
	var pointsLEFT = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.0),
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.0,	0.5),
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.0),
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.0, -0.5)
	];
	var pointsRIGHT = [
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.0),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.0,	0.5),
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.0),
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.0, -0.5),
	];
	var pointsBACK = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, -0.5,	0.5),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.0,	0.5),
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0,	0.5,	0.5),
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.0,	0.5),
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
			var r = frederickkPaper.randomInt(0,3);
			if(r == 0) this.red();
			else if(r == 1) this.yellow();
			else this.blue();
		}

		// bill shape
		var path = new frederickkPaper.F3D.FPath3();
		path.name = this.name;
		for(i=0; i<verticesArr.length; i++) {
			path.add( 
				new frederickkPaper.F3D.FPoint3(
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
			BoundingBox.setFillColor( 
				[null,null,null,null,null,null]
			);
			BoundingBox.setStrokeColor(
				['black','black','black','black','black','black']
			);
			BoundingBox.setStrokeWidth(
				// [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
				[1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
			);
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

	// ------------------------------------------------------------------------
	this.getBoundingBox = function() {
		return BoundingBox;
	};


};