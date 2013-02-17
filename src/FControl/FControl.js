/**
 *  
 *	FControl.js
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
 *	FControl
 *	A collection of methods for adding HTML form elements
 *	for use as a GUI
 *
 */



/*
 *
 *	TODO: finish
 *
 */
frederickkPaper.FControl = function(divId) { // #divId
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/*
	 *	public
	 */
	this.divId = divId;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param name
	 *			name of element
	 *	@param value
	 *			true or false
	 */
	this.addCheck = function(name, value) {
		var input = document.createElement('input');
		input.setAttribute('type', 'chackbox');
		input.setAttribute('value', value);
		input.setAttribute('name', name);

		// here is where x and y coords could be added
		var newdiv = document.createElement('div');
		newdiv.appendChild(input);

		var div = document.getElementById( this.divId );
		div.appendChild(newdiv);
	};

	/**
	 *	@param name
	 *			name of element
	 *	@param value
	 *			?
	 */
	this.addInput = function(name, value) {
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('className', 'txt');
		input.setAttribute('value', value);
		input.setAttribute('name', name);

		// here is where x and y coords could be added
		var newdiv = document.createElement('div');
		newdiv.appendChild(input);

		var div = document.getElementById( this.divId );
		div.appendChild(newdiv);
	};


};






