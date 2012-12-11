/**
 *	
 *	FSphere.js
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
 *	FSphere
 *
 *	Create simple sphere
 */

 /**
  *
  *	TODO: make this an extension of FPath3
  *
  */
frederickkPaper.FShape.FSphere = function(_scene) {
	//-----------------------------------------------------------------------------
	// properties
	//-----------------------------------------------------------------------------
	// public
	this.sides = [];

	// temporary until I figure out how
	// to extend paper.Item properly
	this.name = '';

	this.visible = true;
	this.selected = false;

	this.strokeCap;
	this.strokeJoin;


	// private
	var scene = _scene;

	var r = 10;
	var c = 0.5;

	var lats;
	var longs;

	var vertices = [];

	var facesOpacity = [];
	var facesBlendModes = [];

	var facesFillColor = [];
	var facesStrokeColor = [];
	var facesStrokeWidth = [];



	//-----------------------------------------------------------------------------
	// methods
	//-----------------------------------------------------------------------------
	/**
	 *  @param lats
	 *  			number of latitude segments
	 *  @param longs
	 *  			number of longitude segments
	 */
	var calculate = function(lats, longs) {
		// calculate vertices
		vertices = [];
		for(var i=0; i<=lats; i++) {
			var lat0 = (Math.PI * (-c + ( (i-1)/lats) ));
			var z0   = Math.sin(lat0);
			var zr0  = Math.cos(lat0);

			var lat1 = (Math.PI * (-c + ( i/lats) ));
			var z1   = Math.sin(lat1);
			var zr1  = Math.cos(lat1);

			for(var j=0; j<=longs; j++) {
				var lng = ((Math.PI*2) * ( (j-1)/longs ));
				var x = Math.cos(lng);
				var y = Math.sin(lng);

				vertices.push( new frederickkPaper.F3D.FPoint3( x*zr0, y*zr0, z0 ) );
				vertices.push( new frederickkPaper.F3D.FPoint3( x*zr1, y*zr1, z1 ) );
			} // longs
		} // lats


		// setup arrays
		this.sides = new Array(vertices.length-2);

		facesOpacity = new Array(vertices.length-2);
		facesBlendModes = new Array(vertices.length-2);
		facesFillColor = new Array(vertices.length-2);
		facesStrokeColor = new Array(vertices.length-2);
		facesStrokeWidth = new Array(vertices.length-2);

		var numVertices = vertices.length-2;
		for(var i=0; i<numVertices; i++) {
			var v = vertices[i];
			var col = new paper.HSLColor( 360*i/numVertices, 0.9, 0.7);

			var depth = (v.z()/scene.getFocalLength())*100;

			facesOpacity[i] = 1.0;
			facesBlendModes[i] = 'normal';

			facesFillColor[i] = col.darken( depth );
			facesStrokeColor[i] = col.darken( depth );
			facesStrokeWidth[i] = 1.0;
		}
	};


	/**
	 *  @param lats
	 *  			number of latitude segments
	 *  @param longs
	 *  			number of longitude segments
	 */
	this.init = function(_x, _y, _z) {
		if(lats == null) this.setLatsLongs(6,6);

		for(var i=0; i<vertices.length-2; i++) {
			this.sides[i] = new frederickkPaper.F3D.FPath3();
			this.sides[i].name = 'face'+i;

			this.sides[i].add( new frederickkPaper.F3D.FPoint3(
				vertices[i].x()*(r*0.5),
				vertices[i].y()*(r*0.5),
				vertices[i].z()*(r*0.5)
			));
			this.sides[i].add( new frederickkPaper.F3D.FPoint3(
				vertices[i+1].x()*(r*0.5),
				vertices[i+1].y()*(r*0.5),
				vertices[i+1].z()*(r*0.5)
			));
			this.sides[i].add( new frederickkPaper.F3D.FPoint3(
				vertices[i+2].x()*(r*0.5),
				vertices[i+2].y()*(r*0.5),
				vertices[i+2].z()*(r*0.5)
			));

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



	//-----------------------------------------------------------------------------
	// sets
	//-----------------------------------------------------------------------------
	/**
	 *  @param r
	 *  		radius of sphere
	 */
	this.setSize = function(_r) {
		r = _r;
	}

	/**
	 *  @param lats
	 *  			number of latitude segments
	 *  @param longs
	 *  			number of longitude segments
	 */
	this.setLatsLongs = function(_lats, _longs) {
		lats = (_lats < 4) ? 4 : _lats;
		longs = (_longs < 4) ? 4 : _longs;
		calculate(lats, longs);
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
		if( face.length === undefined ) facesOpacity[face] = o;
		else facesOpacity = face;
	};

	// ------------------------------------------------------------------------
	this.setFillColor = function(face, col) {
		if( face.length === undefined ) facesFillColor[face] = col;
		else {
			// facesFillColor = face;
			for(var i=0; i<face.length; i++) {
				var v = vertices[i];
				var depth = (v.z()/scene.getFocalLength())*100;
				facesFillColor[i] = face.darken( depth );
			}
		}
	};

	// ------------------------------------------------------------------------
	this.setStrokeColor = function(face, col) {
		if( face.length === undefined ) facesStrokeColor[face] = col;
		else {
			// facesStrokeColor = face;
			for(var i=0; i<face.length; i++) {
				var v = vertices[i];
				var depth = (v.z()/scene.getFocalLength())*100;
				facesStrokeColor[i] = face.darken( depth );
			}
		}
	};

	// ------------------------------------------------------------------------
	this.setStrokeWidth = function(face, w) {
		if( face.length === undefined ) facesStrokeWidth[face] = w;
		else facesStrokeWidth = face;
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
		facesFillColor = [];
	};
	this.noStroke = function() {
		facesStrokeColor = [];
	}

	

	//-----------------------------------------------------------------------------
	// gets
	//-----------------------------------------------------------------------------
	this.get = function() {
		return this.sides;
	};
	this.get = function(index) {
		return this.sides[index];
	};

	//-----------------------------------------------------------------------------
	this.getNumFaces = function() {
		return vertices.length-2;
	};

	//-----------------------------------------------------------------------------
	this.getVertices = function() {
		return vertices;
	};

	//-----------------------------------------------------------------------------
	this.getSize = function() {
		return r;
	};



};
