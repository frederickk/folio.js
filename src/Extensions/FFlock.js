/*
 * FFlock
 *
 * Adapted from Flocking Processing example by Daniel Schiffman:
 * http://processing.org/learning/topics/flocking.html
 *
 * Copyright (c) 2011 - 2013, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 *
 * Modified/Simplified for generic use
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

/**
 * @param  {Point} position
 *          intial position of Boid
 * @param  {Object} properties (optional)
 *          radius:    30    // distance from other Boids
 *          maxSpeed:  10    // the maximum speed of the Boid
 *          maxForce:  0.05  // the maximum force of the Boid
 *          strength:  Math.random() * 0.5  // strength of the Boid's force
 *          path:      new Path() // Item to apply behavior to
 *
 * @example
 * var flock = [];
 * for (var i=0; i<30; i++) {
 * 	var boid = new f.FFlock(view.center, {
 * 		radius:		30,
 * 		maxSpeed:	10,
 * 		maxForce:	0.05,
 * 		path:		new Path.Rectangle({
 * 						position:	[0, 0],
 * 						size:		[10, 10],
 * 						fillColor:	new Color.random()
 * 					})
 * 	});
 * 	flock.push( boid );
 * }
 *
 */
folio.FFlock = Base.extend({
	initialize: function(position, properties) {
		this._initialize(position, properties);
	},

	_initialize: function(position, properties) {
		this.acceleration = new Point();
		this.vector = new Point.random(-1, 1);
		this.position = position.clone();

		// properties
		var strength = properties.strength || Math.random() * 0.5;
		this.radius = properties.radius || 30;
		this.maxSpeed = properties.maxSpeed + strength || 10 + strength;
		this.maxForce = properties.maxForce + strength || 0.05 + strength;
		this.path = properties.path || null;
		this.data = properties.data || null;

		this.points = [];
		for (var i = 0, l = strength * 10 + 10; i < l; i++) {
			this.points.push(new Point());
		}
		this.count = 0;
		this.lastAngle = 0;
		this.distances = [];
		this.groupTogether = false;
	},

	run: function(boids) {
		this.lastLoc = this.position.clone();
		if (!this.groupTogether) {
			this.flock(boids);
		} else {
			this.align(boids);
		}
		this.borders();
		this.update();
		this.updateItems();
	},

	updateItems: function() {
		if( this.path ) {
			this.path.position = this.position;
			var angle = this.vector.angle;
			this.path.rotate(angle - this.lastAngle);
			this.lastAngle = angle;
		}
	},

	// We accumulate a new acceleration each time based on three rules
	flock: function(boids) {
		this.calculateDistances(boids);
		var separation = this.separate(boids)
		separation.x *= 3;
		separation.y *= 3;
		var alignment = this.align(boids);
		var cohesion = this.cohesion(boids);
		this.acceleration.x += separation.x + alignment.x + cohesion.x;
		this.acceleration.y += separation.y + alignment.y + cohesion.y;
	},

	calculateDistances: function(boids) {
		for (var i = 0, l = boids.length; i < l; i++) {
			var other = boids[i];
			this.distances[i] = other.position.getDistance(this.position, true);
		}
	},

	update: function() {
		// Update velocity
		this.vector.x += this.acceleration.x;
		this.vector.y += this.acceleration.y;
		// Limit speed (vector#limit?)
		this.vector.length = Math.min(this.maxSpeed, this.vector.length);
		this.position.x += this.vector.x;
		this.position.y += this.vector.y;
		// Reset acceleration to 0 each cycle
		this.acceleration = new Point();
	},

	seek: function(target) {
		var s = this.steer(target, false);
		this.acceleration.x += s.x;
		this.acceleration.y += s.y;
	},

	arrive: function(target) {
		var s = this.steer(target, true);
		this.acceleration.x += s.x;
		this.acceleration.y += s.y;
	},

 	repel: function(obstacle, radius) {
 		var target = new Point(
 			this.position.x + this.vector.x,
 			this.position.y + this.vector.y
 		);
		var distance = obstacle.position.getDistance(target);

		if (distance <= radius) {
			var repel = new Point(
				this.position.x - obstacle.position.x,
				this.position.y - obstacle.position.y
			);
			repel = repel.normalize();
			repel.x *= this.maxForce*7;
			repel.y *= this.maxForce*7;

			if( Math.sqrt(repel.x * repel.x + repel.y * repel.y) < 0 ) {
				repel.y = 0;
			}

			// apply
			// repel.x /= 1.0;
			// repel.y /= 1.0;
			this.acceleration.x += repel.x;
			this.acceleration.y += repel.y;
		}
	},

	borders: function() {
		var vector = new Point();
		var position = this.position;
		var radius = this.radius;
		var size = view.size;
		if (position.x < -radius) vector.x = size.width + radius;
		if (position.y < -radius) vector.y = size.height + radius;
		if (position.x > size.width + radius) vector.x = -size.width -radius;
		if (position.y > size.height + radius) vector.y = -size.height -radius;
		if (!vector.isZero()) {
			this.position.x += vector.x;
			this.position.y += vector.y;
			var points = this.points;
			for (var i = 0, l = points.length; i < l; i++) {
				points[i].x += vector.x;
				points[i].y += vector.y;
			}
		}
	},

	// A method that calculates a steering vector towards a target
	// Takes a second argument, if true, it slows down as it approaches
	// the target
	steer: function(target, slowdown) {
		var steer = new Point(0, 0),
			desired = new Point(
				target.x - this.position.x,
				target.y - this.position.y
			);
		var distance = desired.length;
		// Two options for desired vector magnitude
		// (1 -- based on distance, 2 -- maxSpeed)
		if (slowdown && distance < 100) {
			// This damping is somewhat arbitrary:
			desired.length = this.maxSpeed * (distance * 0.001);
		} else {
			desired.length = this.maxSpeed;
		}
		steer.x = desired.x - this.vector.x;
		steer.y = desired.y - this.vector.y;
		steer.length = Math.min(this.maxForce, steer.length);
		return steer;
	},

	separate: function(boids) {
		var desiredSeperation = this.radius*100; //3600;
		var steer = new Point();
		var count = 0;
		// For every boid in the system, check if it's too close
		for (var i = 0, l = boids.length; i < l; i++) {
			var distance = this.distances[i];
			if (distance > 0 && distance < desiredSeperation) {
				// Calculate vector pointing away from neighbor
				var delta = new Point(
					this.position.x - boids[i].position.x,
					this.position.y - boids[i].position.y
				);
				delta.length = 1 / distance;
				steer.x += delta.x;
				steer.y += delta.y;
				count++;
			}
		}
		// Average -- divide by how many
		if (count > 0) {
			steer.x /= count;
			steer.y /= count;
		}
		if (!steer.isZero()) {
			// Implement Reynolds: Steering = Desired - Velocity
			steer.length = this.maxSpeed;
			steer.x -= this.vector.x;
			steer.y -= this.vector.y;
			steer.length = Math.min(steer.length, this.maxForce);
		}
		return steer;
	},

	// Alignment
	// For every nearby boid in the system, calculate the average velocity
	align: function(boids) {
		var neighborDist = 25;
		var steer = new Point();
		var count = 0;
		for (var i = 0, l = boids.length; i < l; i++) {
			var distance = this.distances[i];
			if (distance > 0 && distance < neighborDist) {
				steer.x += boids[i].vector.x;
				steer.y += boids[i].vector.y;
				count++;
			}
		}

		if (count > 0) {
			steer.x /= count;
			steer.y /= count;
		}
		if (!steer.isZero()) {
			// Implement Reynolds: Steering = Desired - Velocity
			steer.length = this.maxSpeed;
			steer.x -= this.vector.x;
			steer.y -= this.vector.y;
			steer.length = Math.min(steer.length, this.maxForce);
		}
		return steer;
	},

	// Cohesion
	// For the average location (i.e. center) of all nearby boids,
	// calculate steering vector towards that location
	cohesion: function(boids) {
		var neighborDist = 10000;
		var sum = new Point(0, 0);
		var count = 0;
		for (var i = 0, l = boids.length; i < l; i++) {
			var distance = this.distances[i];
			if (distance > 0 && distance < neighborDist) {
				sum.x += boids[i].position.x;
				sum.y += boids[i].position.y;
				count++;
			}
		}
		if (count > 0) {
			sum.x /= count;
			sum.y /= count;
			// Steer towards the location
			return this.steer(sum, false);
		}
		return sum;
	}
});



/*
 * FPredator
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

/**
 * @param  {Point} position
 *          intial position of Boid
 * @param  {Object} properties (optional)
 *          radius:    30    // distance from other Boids
 *          maxSpeed:  10    // the maximum speed of the Boid
 *          maxForce:  0.05  // the maximum force of the Boid
 *          strength:  Math.random() * 0.5  // strength of the Boid's force
 *          path:      new Path() // Item to apply behavior to
 *
 * @example
 * var predators = [];
 * for (var i=0; i<30; i++) {
 * 	var predator = new f.FPredator(view.center, {
 * 		radius:		40,
 * 		maxSpeed:	20,
 * 		maxForce:	0.01,
 * 		path:		new Path.Rectangle({
 * 						position:	[0, 0],
 * 						size:		[10, 10],
 * 						fillColor:	new Color.random()
 * 					})
 * 	});
 * 	predators.push( predator );
 * }
 *
 */
folio.FPredator = folio.FFlock.extend({
	initialize: function FFlock(position, properties) {
		// higher for a predator
		properties.maxSpeed = properties.maxSpeed*2 || 20;
		properties.radius = properties.radius*2 || 60;

		this._initialize(position, properties);
	},

	run: function(predators, boids) {
		this.lastLoc = this.position.clone();
		if (!this.groupTogether) {
			this.flock(predators);
		} else {
			this.align(predators);
		}
		this.borders();
		this.update();
		this.updateItems();
		this.repel(boids);
	},

	repel: function(boids) {
		for (var i = 0, l = boids.length; i < l; i++) {
			boids[i].repel(this, this.radius);
		}
	}

});

