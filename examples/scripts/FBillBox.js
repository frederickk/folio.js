/**
 *	
 *	FBillBox.js
 *	v0.2a
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



frederickkPaper.FShape.FBillBox = function(scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	private
	 */
	var _scene = scene;

	var _boundingBox = new frederickkPaper.FShape.FBox(scene);

	var _size     = new frederickkPaper.F3D.FPoint3();
	var _sizeTemp = new frederickkPaper.F3D.FPoint3();
// 	rotation: new frederickkPaper.F3D.FPoint3();

	var _bContainer = true;
	var _bRotation = false;

	// face number
	var _face = 0;

	// face numbers
	var _FRONT	= 0;
	var _TOP 	= 1;
	var _BOTTOM	= 2;
	var _LEFT	= 3;
	var _RIGHT	= 4;
	var _BACK	= 5;

	// face points
	var _pointsFRONT = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, -0.5, -0.5),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.0, -0.5),
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0,	0.5, -0.5),
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.0, -0.5)
	];
	
	var _pointsTOP = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, -0.5,	0.5),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.0),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, -0.5, -0.5),
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.0)
	];

	var _pointsBOTTOM = [
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, 0.5,	0.5),
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5,	0.0),
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.0, 0.5, -0.5),
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5,	0.0)
	];
	var _pointsLEFT = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.0),
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.0,	0.5),
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.0),
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.0, -0.5)
	];
	var _pointsRIGHT = [
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.0),
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.0,	0.5),
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.0),
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.0, -0.5),
	];
	var _pointsBACK = [
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
	var _pointsMatrix = [
		_pointsTOP[0],
		_pointsTOP[1],
		_pointsTOP[2],
		_pointsTOP[3],
		_pointsTOP[4],
		_pointsTOP[5],
		_pointsTOP[6],
		_pointsTOP[7],
		
		_pointsLEFT[3],

		_pointsRIGHT[3],

		_pointsFRONT[3],
		_pointsFRONT[7],

		_pointsBOTTOM[0],
		_pointsBOTTOM[1],
		_pointsBOTTOM[2],
		_pointsBOTTOM[3],
		_pointsBOTTOM[4],
		_pointsBOTTOM[5],
		_pointsBOTTOM[6],
		_pointsBOTTOM[7]
	];	
	var _verticesArr = [];


	/*
	 *	public
	 */
	this.name = '';
	this.closed = false;

	this.fillColor = null;
	this.strokeColor = null;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	TODO: add a way to translate shapes in 3D
	 *
	 */
	this.init = function(_x, _y, _z) {
		if(_verticesArr === undefined || _verticesArr == null) {
			// choose random standard bill shape
			var r = frederickkPaper.randomInt(0,3);
			if(r == 0) this.red();
			else if(r == 1) this.yellow();
			else this.blue();
		}

		// bill shape
		var path = new frederickkPaper.F3D.FPath3();
		path.name = this.name;
		for(i=0; i<_verticesArr.length; i++) {
			path.add3( 
				new frederickkPaper.F3D.FPoint3(
					_pointsMatrix[ _verticesArr[i] ].x*_size.x,
					_pointsMatrix[ _verticesArr[i] ].y*_size.y,
					_pointsMatrix[ _verticesArr[i] ].z*_size.z
				)
			);
		}
		path.fillColor = this.fillColor;

		path.strokeColor = this.strokeColor;
		path.translate(_x,_y,_z);
		path.closed = true;

		_scene.addItem( path );

		// Bounding Box
		if(_bContainer) {
			_boundingBox.name = '_boundingBox';
			_boundingBox.setFillColor( 
				[null,null,null,null,null,null]
			);
			_boundingBox.setStrokeColor(
				['black','black','black','black','black','black']
			);
			_boundingBox.setStrokeWidth(
				// [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
				[1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
			);
			_boundingBox.init(_x, _y, _z);
		}
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setSize = function(w, h, d) {
		if(_sizeTemp.x == 0) {
			_sizeTemp.set( w, h, d );
		}
		_size.set( w, h, d );

		_boundingBox.setSize(w,h,d);
	};

	// ------------------------------------------------------------------------
	this.reset = function() {
		this.setFace(0);
		_size.x = _sizeTemp.x;
		_size.y = _sizeTemp.y;
		_size.z = _sizeTemp.z;
	};

	// ------------------------------------------------------------------------
	this.setVertices = function(__verticesArr) {
		_verticesArr = __verticesArr;
	};

	// ------------------------------------------------------------------------
	this.showContainer = function(val) {
		_bContainer = val;
	};

	// ------------------------------------------------------------------------
	this.red = function() {
		this.fillColor = new paper.RGBColor(0.9, 0.26, 0.14),
		_verticesArr = [2,14,18,6];
	};
	this.yellow = function() {
		this.fillColor = new paper.RGBColor(0.99, 0.84, 0)
		_verticesArr = [8,9,10,11];
	};
	this.blue = function() {
		this.fillColor = new paper.RGBColor(0.04, 0.5, 0.74),
		_verticesArr = [1,9,15,17,11,7];
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.getSize = function() {
		return _sizeTemp;
	};

	// ------------------------------------------------------------------------
	this.get_boundingBox = function() {
		return _boundingBox;
	};


};