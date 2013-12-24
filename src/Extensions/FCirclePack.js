/*
 *	Circle Packer
 *
 *	Original from onedayitwillmake
 *	http://onedayitwillmake.com/CirclePackJS/
 *
 *	MIT License
 *	http://www.opensource.org/licenses/mit-license.php
 *
 *
 *	Rewritten from AS3 to Javascript
 *	Jackson Rollins
 *	http://jacksonkr.com/
 *
 *
 *	Rewritten for Scriptographer/PaperJS
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 */

/**
 *
 *	@param {Array} circleItems
 *					Array of Items
 *	@param {Number} iterations
 *					(optional) number of iterations per cycle (default: 11)
 *
 *  @return {Array}
 *
 */
folio.FCirclePacker = function(circleItems, iterations) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	circleItems = circleItems;
	iterations = (iterations != undefined)
		? iterations
		: 11;

	var dampingAmt = 0.1; // the lower the slower
	var padding = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	var update = function() {
		circleItems = circleItems.sort( folio.distanceToCenter );
		var pp = new Point();

		// Push items away from each other
		for (var i = circleItems.length - 1; i >= 0; --i) {
			var ci = circleItems[i];
			var ciPt = ci.position;

			for (var j = i + 1; j < circleItems.length; j++) {
				var cj = circleItems[j];
				var cjPt = cj.position;

				if (i == j) continue;

				var dx = cjPt.x - ciPt.x;
				var dy = cjPt.y - ciPt.y;

				// this alogroithm is designed for circles,
				// so we assume every object is either a
				// circle or a square polygon packing is a much
				// larger challenge http://en.wikipedia.org/wiki/Packing_problem
				// hence why we just halve the "width" in
				// order to get the object's radius
				var r = (ci.bounds.size.width / 2) + (cj.bounds.size.width / 2) + padding;

				var d = (dx * dx) + (dy * dy);

				if (d < (r * r) - 0.01) {
					pp.x = dx;
					pp.y = dy;
					pp = pp.normalize(1.0);
					pp = pp.multiply( (r - Math.sqrt(d)) * 0.5 );

					try {
						// if(cj != this.dragCircle) {
						cjPt.x += pp.x;
						cjPt.y += pp.y;
						// }
						// if(ci != this.dragCircle) {
						ciPt.x -= pp.x;
						ciPt.y -= pp.y;
						// }
					}
					catch(err) {
						// not a valid item, get rid of it
						circleItems.slice(j, 1);
						break;
					}

				}
			}
		}

		// push items toward center
		var damping = dampingAmt / Number(iterations);

		for (var i = 0; i < circleItems.length; i++) {
			var c = circleItems[i];
			var cPt = c.position;
			// if(c == this.dragCircle) continue;
			pp.x = cPt.x - artboard.bounds.center.x;
			pp.y = cPt.y - artboard.bounds.center.y;
			pp = pp.multiply(damping);
			cPt.x -= pp.x;
			cPt.y -= pp.y;
		}

		// if(this.dragCircle && this._mouseEvent) {
		//	this.dragCircle.x = this._mouseEvent.offsetX;//stage.mouseX;
		//	this.dragCircle.y = this._mouseEvent.offsetY;//stage.mouseY;
		// }
	};

	// ------------------------------------------------------------------------
	/**
	 *	TODO: if to be made autonomous, these
	 *	methods will have to be built in
	 *
	 *	Extend Path with some additional Methods
	 *	Necessary for CirclePacker()
	 *
	 */
	// Item.prototype.distanceToCenter = function() {
	//	var dx = this.position.x - activeDocument.activeArtboard.bounds.center.x;
	//	var dy = this.position.y - activeDocument.activeArtboard.bounds.center.y;
	//	var distance = (dx * dx + dy * dy) + 1;

	//	return distance;
	// };
	// Item.sortOnDistanceToCenter = function(a, b) {
	//	var valueA = a.distanceToCenter();
	//	var valueB = b.distanceToCenter();
	//	var comparisonValue = 0;

	//	if (valueA > valueB) comparisonValue = -1;
	//	else if (valueA < valueB) comparisonValue = 1;

	//	return comparisonValue;
	// };



	// ------------------------------------------------------------------------
	// sets
	// ------------------------------------------------------------------------
	/**
	 *	@param {Array} item
	 *			Array of Path.Items to add to circle packer
	 */
	/**
	 *	@param {Item} item
	 *			Path.Item to add to circle packer
	 */
	var add = function(item) {
		if( typeof item === 'array' ) {
			circleItems = circleItems.concat( item );
		}
		else {
			circleItems.push( item );
		}
	};

	/**
	 *	@param {Number} val
	 *			damping value
	 */
	var setDamping = function(val) {
		dampingAmt = val;
	};

	/**
	 *	@param {Number} val
	 *			padding around elements
	 */
	var setPadding = function(val) {
		padding = val;
	};


	// ------------------------------------------------------------------------
	// gets
	// ------------------------------------------------------------------------
	/**
	 *	could be dangerous
	 *
	 *	@return {Array} the items being packed
	 */
	var getItems = function() {
		return circleItems;
	};

	/**
	 *	could be dangerous
	 *
	 * @param {Number} index
	 *			index number of Item being packed
	 *
	 *	@return {Item} Item from items being packed
	 */
	var getItem = function(index) {
		return circleItems[index];
	};



	// ------------------------------------------------------------------------
	// gets
	// ------------------------------------------------------------------------
	return {
		update:		update,

		add:		add,
		setDamping:	setDamping,
		setPadding:	setPadding,

		getItems:	getItems,
		getItem:	getItem
	};

};

