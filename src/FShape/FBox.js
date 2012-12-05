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

 /**
  *
  *	TODO: make this an extension of FPath3
  *
  */
FrederickkPaper.FShape.FBox = function(_scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	this.sides = new Array(6);

	// temporary until I figure out how
	// to extend paper.Item properly
	this.name = '';

	this.visible = true;
	this.selected = false;

	this.strokeCap;
	this.strokeJoin;


	// private
	var scene = _scene;


	this.faceFRONT = [
		new FrederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new FrederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceTOP = [
		new FrederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new FrederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5) //corner
	];

	this.faceBOTTOM = [
		new FrederickkPaper.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new FrederickkPaper.F3D.FPoint3(-0.5, 0.5, -0.5) //corner
	];
	
	this.faceLEFT = [
		new FrederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new FrederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceRIGHT = [
		new FrederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5) //corner
	];
	
	this.faceBACK = [
		new FrederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new FrederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5) //corner
	];


	var faces = [
		['front',	this.faceFRONT],
		['top',		this.faceTOP],
		['bottom',	this.faceBOTTOM],
		['left',	this.faceLEFT],
		['right',	this.faceRIGHT],
		['back',	this.faceBACK]
	];


	var facesOpacity = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
	var facesBlendModes = [
		'normal',	// FRONT
		'normal',	// TOP
		'normal',	// BOTTOM
		'normal',	// LEFT
		'normal',	// RIGHT
		'normal'	// BACK
	];

	var facesFillColor = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];
	var facesStrokeColor = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];
	var facesStrokeWidth = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];



	var whd = new FrederickkPaper.F3D.FPoint3(10,10,10);



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.init = function(_x, _y, _z) {
		for(var i=0; i<faces.length; i++) {

			this.sides[i] = new f3d.FPath3();
			this.sides[i].name = faces[i][0];

			var vertices = faces[i][1];
			for(var j=0; j<vertices.length; j++) {
				this.sides[i].add( new f3d.FPoint3(
					vertices[j].x()*whd.x(),
					vertices[j].y()*whd.y(),
					vertices[j].z()*whd.z()
				));
			}

			// ! temporary see above !
			this.sides[i].opacity = facesOpacity[i];
			this.sides[i].blendMode = facesBlendModes[i];
			this.sides[i].visible = this.visible;
			this.sides[i].selected = this.selected;

			this.sides[i].fillColor = facesFillColor[i];

			this.sides[i].strokeColor = facesStrokeColor[i];
			this.sides[i].strokeWidth = facesStrokeWidth[i];
			this.sides[i].strokeCap = this.strokeCap;
			this.sides[i].strokeJoin = this.strokeJoin;

			this.sides[i].closed = true;
			this.sides[i].translate(_x,_y,_z);

			scene.addItem( this.sides[i] );
		}
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setWHD = function(_width, _height, _depth) {
		whd.set(_width, _height, _depth);
	};


	// ------------------------------------------------------------------------
	this.setVisible = function(val) {
		this.visible = val;
	};

	// ------------------------------------------------------------------------
	this.setSelected = function(val) {
		this.selected = val;
	};

	// ------------------------------------------------------------------------
	this.setOpacity = function(face, o) {
		facesOpacity[face] = o;
	};
	this.setOpacity = function(oArr) {
		facesOpacity = oArr;
	};

	// ------------------------------------------------------------------------
	this.setFillColor = function(face, col) {
		facesFillColor[face] = col;
	};
	this.setFillColor = function(colArr) {
		facesFillColor = colArr;
	};

	// ------------------------------------------------------------------------
	this.setStrokeColor = function(face, col) {
		facesStrokeColor[face] = col;
	};
	this.setStrokeColor = function(colArr) {
		facesStrokeColor = colArr;
	};

	// ------------------------------------------------------------------------
	this.setStrokeWidth = function(face, w) {
		facesStrokeWidth[face] = w;
	};
	this.setStrokeWidth = function(wArr) {
		facesStrokeWidth = wArr;
	};

	// ------------------------------------------------------------------------
	this.setStrokeCap = function(cap) {
		this.strokeCap = cap;
	};

	// ------------------------------------------------------------------------
	this.setStrokeJoin = function(join) {
		this.strokeJoin = join;
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.get = function() {
		return this.sides;
	};
	this.get = function(index) {
		return this.sides[index];
	};

	// ------------------------------------------------------------------------
	this.getWHD = function() {
		return whd;
	};

};





