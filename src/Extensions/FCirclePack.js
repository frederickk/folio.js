/*
 * FCirclePack
 *
 * Original from onedayitwillmake
 * http://onedayitwillmake.com/CirclePackJS/
 *
 * MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * Rewritten from AS3 to Javascript
 * Jackson Rollins
 * http://jacksonkr.com/
 *
 *
 * Rewritten for Scriptographer/PaperJS
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */


/**
 * @param {Group} circleItems
 *				Group of Items
 * @param {Number} iterations
 *				(optional) number of iterations per cycle (default: 11)
 *				higher iterations == slower movement
 *
 * @return {Array}
 */
/**
 * @param {Array} circleItems
 *				Array of Items
 * @param {Number} iterations
 *				(optional) number of iterations per cycle (default: 11)
 *				higher iterations == slower movement
 *
 * @return {Array}
 *
 */
folio.FCirclePack = function(circleItems, iterations) {
	//
	// Properties
	//
	var circleItems = (circleItems instanceof Group)
		? circleItems.children
		: (circleItems == null)
			? []
			: circleItems;
	iterations = (iterations != undefined)
		? iterations
		: 11;

	var dampingAmt = 0.1; // the lower the slower
	var padding = 0;
	var target = view.center;

	//
	// Methods
	//
	var update = function() {
		circleItems = circleItems.sort( FSort.distanceToCenter );
		var pp = new Point();

		// Push items away from each other
		for (var i=circleItems.length-1; i>=0; --i) {
			var ci = circleItems[i];

			for (var j=i+1; j<circleItems.length; j++) {
				var cj = circleItems[j];

				if (i == j) continue;

				var dx = cj.position.x - ci.position.x;
				var dy = cj.position.y - ci.position.y;

				// this alogroithm is designed for circles, so we assume
				// every object is either a circle or a square.
				//
				// polygon packing is a much larger challenge
				// http://en.wikipedia.org/wiki/Packing_problem
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
						cj.position.x += pp.x;
						cj.position.y += pp.y;
						// }
						// if(ci != this.dragCircle) {
						ci.position.x -= pp.x;
						ci.position.y -= pp.y;
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
		var damping = dampingAmt / parseInt(iterations);

		for (var i = 0; i < circleItems.length; i++) {
			var c = circleItems[i];
			// if(c == this.dragCircle) continue;
			pp.x = c.position.x - target.x;
			pp.y = c.position.y - target.y;
			pp = pp.multiply(damping);
			// }
			c.position.x -= pp.x;
			c.position.y -= pp.y;
		}

		// if(this.dragCircle && this._mouseEvent) {
		//	this.dragCircle.x = this._mouseEvent.offsetX;//stage.mouseX;
		//	this.dragCircle.y = this._mouseEvent.offsetY;//stage.mouseY;
		// }
	};


	//
	// sets
	//
	/**
	 * @param {Array} item
	 * 		Array of Path.Items to add to circle packer
	 */
	/**
	 * @param {Item} item
	 * 		Path.Item to add to circle packer
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
	 * @param {Number} val
	 * 		damping value
	 */
	var setDamping = function(val) {
		dampingAmt = val;
	};

	/**
	 * @param {Number} val
	 * 		padding around elements
	 */
	var setPadding = function(val) {
		padding = val;
	};


	/**
	 * @param {Point} point
	 * 		the target location for the elements to pack around (default: view.center)
	 */
	var setTarget = function(point) {
		target = point;
	};

	//
	// gets
	//
	/**
	 *
	 * @return {Array} the items being packed
	 *
	 */
	var getItems = function() {
		return circleItems;
	};

	/**
	 * @param {Number} index
	 * 		index number of Item being packed
	 *
	 * @return {Item} Item from items being packed
	 */
	var getItem = function(index) {
		return circleItems[index];
	};



	//
	// gets
	//
	return {
		update:		update,

		add:		add,
		setDamping:	setDamping,
		setPadding:	setPadding,
		setTarget:  setTarget,

		getItems:	getItems,
		getItem:	getItem
	};

};

