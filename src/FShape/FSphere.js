/**
 *	
 *	FSphere.js
 *	v0.2a
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	FSphere
 *	Create simple sphere
 *
 */


 /**
  *
  *	TODO: make this an extension of FPath3
  *
  */
frederickkPaper.FShape.FSphere = function(scene) {
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	/*
	 *	public
	 */
	this.sides = [];
	this.vertices = [];

	// temporary until I figure out how
	// to extend paper.Item properly
	this.name = '';

	this.visible = true;
	this.selected = false;

	this.strokeCap;
	this.strokeJoin;

	/*
	 *	private
	 */
	var _scene = scene;

	var _radius3 = 10;
	var _c = 0.5;

	var _lats;
	var _longs;

	var _facesOpacity = [];
	var _facesBlendModes = [];

	var _facesFillColor = [];
	var _facesStrokeColor = [];
	var _facesStrokeWidth = [];



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *  @param lats
	 *  			number of latitude segments
	 *  @param longs
	 *  			number of longitude segments
	 */
	this._calculate = function(clats, clongs) {
		// this._calculate this.vertices
		this.vertices = [];
		for(var i=0; i<=clats; i++) {
			var lat0 = (Math.PI * (-_c + ( (i-1)/clats) ));
			var z0   = Math.sin(lat0);
			var zr0  = Math.cos(lat0);

			var lat1 = (Math.PI * (-_c + ( i/clats) ));
			var z1   = Math.sin(lat1);
			var zr1  = Math.cos(lat1);

			for(var j=0; j<=clongs; j++) {
				var lng = ((Math.PI*2) * ( (j-1)/clongs ));
				var x = Math.cos(lng);
				var y = Math.sin(lng);

				this.vertices.push( new frederickkPaper.F3D.FPoint3( x*zr0, y*zr0, z0 ) );
				this.vertices.push( new frederickkPaper.F3D.FPoint3( x*zr1, y*zr1, z1 ) );
			} // _longs
		} // _lats


		// Setup arrays
		this.sides = new Array(this.vertices.length-2);

		_facesOpacity = new Array(this.vertices.length-2);
		_facesBlendModes = new Array(this.vertices.length-2);
		_facesFillColor = new Array(this.vertices.length-2);
		_facesStrokeColor = new Array(this.vertices.length-2);
		_facesStrokeWidth = new Array(this.vertices.length-2);

		var numVertices = this.vertices.length-2;
		for(var i=0; i<numVertices; i++) {
			var v = this.vertices[i];
			var col = new HslColor( 360*i/numVertices, 0.9, 0.7);

			var depth = (v.z/scene.getFocalLength())*100;

			_facesOpacity[i] = 1.0;
			_facesBlendModes[i] = 'normal';

			_facesFillColor[i] = col.darken( depth );
			_facesStrokeColor[i] = col.darken( depth );
			_facesStrokeWidth[i] = 1.0;
		}
	};


	/**
	 *  @param arg0
	 *  			x translate value
	 *  @param arg1
	 *  			y translate value
	 *  @param arg2
	 *  			z translate value
	 */
	this.init = function(arg0, arg1, arg2) {
		if(_lats == null) this.setLatsLongs(6,6);

		for(var i=0; i<this.vertices.length-2; i++) {
			this.sides[i] = new frederickkPaper.F3D.FPath3();
			this.sides[i].name = 'face'+i;

			this.sides[i].add3( new frederickkPaper.F3D.FPoint3(
				this.vertices[i].x*(_radius3*0.5),
				this.vertices[i].y*(_radius3*0.5),
				this.vertices[i].z*(_radius3*0.5)
			));
			this.sides[i].add3( new frederickkPaper.F3D.FPoint3(
				this.vertices[i+1].x*(_radius3*0.5),
				this.vertices[i+1].y*(_radius3*0.5),
				this.vertices[i+1].z*(_radius3*0.5)
			));
			this.sides[i].add3( new frederickkPaper.F3D.FPoint3(
				this.vertices[i+2].x*(_radius3*0.5),
				this.vertices[i+2].y*(_radius3*0.5),
				this.vertices[i+2].z*(_radius3*0.5)
			));

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

			scene.addItem( this.sides[i] );
		}
	};



	//-----------------------------------------------------------------------------
	// Sets
	//-----------------------------------------------------------------------------
	/**
	 *  @param r
	 *  		radius of sphere
	 */
	this.setSize = function(radius) {
		_radius3 = radius;
	};

	/**
	 *  @param lats
	 *  			number of latitude segments
	 *  @param longs
	 *  			number of longitude segments
	 */
	this.setLatsLongs = function(lats, longs) {
		_lats = (lats < 4) ? 4 : lats;
		_longs = (longs < 4) ? 4 : longs;
		this._calculate(_lats, _longs);
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
		else {
			// _facesFillColor = face;
			for(var i=0; i<face.length; i++) {
				var v = this.vertices[i];
				var depth = (v.z/scene.getFocalLength())*100;
				_facesFillColor[i] = face.darken( depth );
			}
		}
	};

	// ------------------------------------------------------------------------
	this.setStrokeColor = function(face, col) {
		if( face.length === undefined ) _facesStrokeColor[face] = col;
		else {
			// _facesStrokeColor = face;
			for(var i=0; i<face.length; i++) {
				var v = this.vertices[i];
				var depth = (v.z/scene.getFocalLength())*100;
				_facesStrokeColor[i] = face.darken( depth );
			}
		}
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
	};

	// ------------------------------------------------------------------------
	this.setVertices = function(vertice, val) {
		if( vertice.length === undefined ) this.vertices[vertice] = val;
		else this.vertices = vertice;
	};

	

	//-----------------------------------------------------------------------------
	// Gets
	//-----------------------------------------------------------------------------
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

	//-----------------------------------------------------------------------------
	this.getVertices = function() {
		return this.vertices;
	};

	//-----------------------------------------------------------------------------
	this.getSize = function() {
		return _radius3;
	};



};
