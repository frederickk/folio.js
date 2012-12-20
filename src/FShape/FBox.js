/**
 *	
 *	FBox.js
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
frederickkPaper.FShape.FBox = function(scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	public
	 */
	this.sides = new Array(6);

	this.vertices = [];

	// temporary until I figure out how
	// to extend paper.Item properly
	this.name = '';

	this.visible = true;
	this.selected = false;

	this.strokeCap;
	this.strokeJoin;

	this.faceFRONT = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceTOP = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5) //corner
	];

	this.faceBOTTOM = [
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5, -0.5) //corner
	];
	
	this.faceLEFT = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceRIGHT = [
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5) //corner
	];
	
	this.faceBACK = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5) //corner
	];


	/*
	 *	private
	 */
	var _scene = scene;

	var _faces = [
		['front',	this.faceFRONT],
		['top',		this.faceTOP],
		['bottom',	this.faceBOTTOM],
		['left',	this.faceLEFT],
		['right',	this.faceRIGHT],
		['back',	this.faceBACK]
	];

	var _facesOpacity = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
	var _facesBlendModes = [
		'normal',	// FRONT
		'normal',	// TOP
		'normal',	// BOTTOM
		'normal',	// LEFT
		'normal',	// RIGHT
		'normal'	// BACK
	];

	var _facesFillColor = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];
	var _facesStrokeColor = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];
	var _facesStrokeWidth = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

	var _size = new frederickkPaper.F3D.FSize3(10,10,10);



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.init = function(arg0, arg1, arg2) {
		for(var i=0; i<_faces.length; i++) {

			this.sides[i] = new frederickkPaper.F3D.FPath3();
			this.sides[i].name = _faces[i][0];

			this.vertices = _faces[i][1];
			for(var j=0; j<this.vertices.length; j++) {
				this.sides[i].add3( new frederickkPaper.F3D.FPoint3(
					this.vertices[j].x*_size.width,
					this.vertices[j].y*_size.height,
					this.vertices[j].z*_size.depth
				));
			}

			// ! temporary see above !
			this.sides[i].opacity = _facesOpacity[i];
			this.sides[i].blendMode = _facesBlendModes[i];
			this.sides[i].visible = this.visible;
			this.sides[i].selected = this.selected;

			this.sides[i].fillColor = _facesFillColor[i];

			this.sides[i].strokeColor = _facesStrokeColor[i];
			this.sides[i].strokeWidth = _facesStrokeWidth[i];
			this.sides[i].strokeCap = this.strokeCap;
			this.sides[i].strokeJoin = this.strokeJoin;

			this.sides[i].closed = true;
			this.sides[i].translate(arg0, arg1, arg2);

			_scene.addItem( this.sides[i] );
		}
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setSize = function(width, height, depth) {
		_size.set(width, height, depth);
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
		if( face.length === undefined ) _facesOpacity[face] = o;
		else _facesOpacity = face;
	};

	// ------------------------------------------------------------------------
	this.setFillColor = function(face, col) {
		if( face.length === undefined ) _facesFillColor[face] = col;
		else _facesFillColor = face;
	};

	// ------------------------------------------------------------------------
	this.setStrokeColor = function(face, col) {
		if( face.length === undefined ) _facesStrokeColor[face] = col;
		else _facesStrokeColor = face;
	};

	// ------------------------------------------------------------------------
	this.setStrokeWidth = function(face, w) {
		if( face.length === undefined ) _facesStrokeWidth[face] = w;
		else _facesStrokeWidth = face;
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
	this.noFill = function() {
		_facesFillColor = [];
	};
	this.noStroke = function() {
		_facesStrokeColor = [];
	}



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.get = function() {
		return this.sides;
	};
	this.get = function(index) {
		return this.sides[index];
	};

	//-----------------------------------------------------------------------------
	this.getNumFaces = function() {
		return this.vertices.length-2;
	};

	// ------------------------------------------------------------------------
	this.getSize = function() {
		return _size;
	};

};





