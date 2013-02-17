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
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5),	// corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5)	// corner
	];

	this.faceTOP = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5)	// corner
	];

	this.faceBOTTOM = [
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5, 0.5, -0.5),	// corner
		new frederickkPaper.F3D.FPoint3(-0.5, 0.5, -0.5)	// corner
	];

	this.faceLEFT = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5, -0.5),	// corner
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5, -0.5)	// corner
	];

	this.faceRIGHT = [
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5, -0.5)	// corner
	];

	this.faceBACK = [
		new frederickkPaper.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
		new frederickkPaper.F3D.FPoint3(-0.5,	0.5,	0.5)	// corner
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
		new RgbColor(1.0, 1.0, 0.0, 0.8), // FRONT
		new RgbColor(1.0, 0.0, 1.0, 0.8), // TOP
		new RgbColor(0.0, 0.0, 1.0, 0.8), // BOTTOM
		new RgbColor(1.0, 0.0, 0.0, 0.8), // LEFT
		new RgbColor(0.0, 1.0, 1.0, 0.8), // RIGHT
		new RgbColor(0.0, 1.0, 0.0, 0.8)	// BACK
	];
	var _facesStrokeColor = [
		new RgbColor(1.0, 1.0, 0.0, 0.8), // FRONT
		new RgbColor(1.0, 0.0, 1.0, 0.8), // TOP
		new RgbColor(0.0, 0.0, 1.0, 0.8), // BOTTOM
		new RgbColor(1.0, 0.0, 0.0, 0.8), // LEFT
		new RgbColor(0.0, 1.0, 1.0, 0.8), // RIGHT
		new RgbColor(0.0, 1.0, 0.0, 0.8)	// BACK
	];
	var _facesStrokeWidth = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

	var _size = new frederickkPaper.F3D.FSize3(10,10,10);



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param arg0
	 *				translate x coordinate
	 *	@param arg1
	 *				translate y coordinate
	 *	@param arg2
	 *				translate z coordinate
	 *
	 */
	this.init = function(arg0, arg1, arg2) {
		for(var i=0; i<_faces.length; i++) {

			this.sides[i] = new frederickkPaper.F3D.FPath3();
			this.sides[i].name = _faces[i][0];

			this.vertices = _faces[i][1];
			for(var j=0; j<this.vertices.length; j++) {
				this.sides[i].add3( new frederickkPaper.F3D.FPoint3(
					this.vertices[j].x * _size.width,
					this.vertices[j].y * _size.height,
					this.vertices[j].z * _size.depth
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
	/**
	 *
	 *	all sets need to be called before .init()
	 *
	 */

	/**
	 *	@param name
	 *			name of the box (affects all faces)
	 */
	this.setName = function(name) {
		for(var i=0; i<_faces.length; i++) {
			_faces[i][0] = name;
		}
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param width
	 *			width of box
	 *	@param height
	 *			height of box
	 *	@param depth
	 *			depth of box
	 */
	this.setSize = function(width, height, depth) {
		_size.set(width, height, depth);
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param bVal
	 *			visibility of box (affects all faces)
	 */
	this.setVisible = function(bVal) {
		this.visible = bVal;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param bVal
	 *			selected of box (affects all faces)
	 */
	this.setSelected = function(bVal) {
		this.selected = bVal;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param face
	 *			opacity of box (affects all faces)
	 */
	/**
	 *	@param face
	 *			specific face
	 *	@param o
	 *			opacity value of face
	 */
	this.setOpacity = function(face, o) {
		if( face.length === undefined ) _facesOpacity[face] = o;
		else _facesOpacity = face;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param face
	 *			fill color of box (affects all faces)
	 */
	/**
	 *	@param face
	 *			specific face
	 *	@param col
	 *			fill color value of face (RgbColor())
	 */
	 this.setFillColor = function(face, col) {
		if( face.length === undefined ) _facesFillColor[face] = col;
		else _facesFillColor = face;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param face
	 *			stroke color of box (affects all faces)
	 */
	/**
	 *	@param face
	 *			specific face
	 *	@param col
	 *			stroke color value of face (RgbColor())
	 */
	this.setStrokeColor = function(face, col) {
		if( face.length === undefined ) _facesStrokeColor[face] = col;
		else _facesStrokeColor = face;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param face
	 *			stroke width of box (affects all faces)
	 */
	/**
	 *	@param face
	 *			specific face
	 *	@param w
	 *			stroke width
	 */
	this.setStrokeWidth = function(face, w) {
		if( face.length === undefined ) _facesStrokeWidth[face] = w;
		else _facesStrokeWidth = face;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param cap
	 *			stroke cap of box (affects all faces)
	 */
	this.setStrokeCap = function(cap) {
		this.strokeCap = cap;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param join
	 *			stroke join of box (affects all faces)
	 */
	this.setStrokeJoin = function(join) {
		this.strokeJoin = join;
	};

	// ------------------------------------------------------------------------
	/**
	 *
	 *	clear fill of box
	 *
	 */
	this.noFill = function() {
		_facesFillColor = [];
	};

	/**
	 *
	 *	clear stroke of box
	 *
	 */
	this.noStroke = function() {
		_facesStrokeColor = [];
	}



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return array of FPath3 (faces)
	 *
	 */
	this.get = function() {
		return this.sides;
	};

	/**
	 *	@param index
	 *			face index number
	 *
	 *	@return FPath3
	 *
	 */
	this.get = function(index) {
		return this.sides[index];
	};

	//-----------------------------------------------------------------------------
	/**
	 *
	 *	@return number of faces
	 *
	 */
	this.getNumFaces = function() {
		return this.vertices.length-2;
	};

	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return FSize3 dimensions of box
	 *
	 */
	this.getSize = function() {
		return _size;
	};

};





