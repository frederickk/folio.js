/**!
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
 *
 * TODO: fix repelling for predators & obstacles, fixed? NOPE
 * TODO: performance is shit!
 *
 */


folio.FFlock = {
    /**
     * @param  {Point} position
     *          intial position of Boid
     * @param  {Object} properties (optional)
     *          radius   : 30    // distance from other Boids
     *          maxSpeed : 10    // the maximum speed of the Boid
     *          maxForce : 0.05  // the maximum force of the Boid
     *          strength : Math.random() * 0.5  // strength of the Boid's force
     *          path     : new Path() // Item to apply behavior to
     *
     * @example
     * var flock = [];
     * for (var i = 0; i < 30; i++) {
     *  var boid = new folio.FFlock.boid(view.center, {
     *      radius   : 30,
     *      maxSpeed : 10,
     *      maxForce : 0.05,
     *      path     : new Path.Rectangle({
     *                     position  : [0, 0],
     *                     size      : [10, 10],
     *                     fillColor : new Color.random()
     *                 })
     *  });
     *  flock.push(boid);
     * }
     *
     */
    boid: function(position, properties) {
        // ------------------------------------------------------------------------
        //
        // Properties
        //
        // ------------------------------------------------------------------------
        var radius = properties.radius || 30;
        var strength = properties.strength || Math.random() * 0.5;
        var maxSpeed = properties.maxSpeed + strength || 10 + strength;
        var maxForce = properties.maxForce + strength || 0.05 + strength;
        var path = properties.path || null;
        var data = properties.data || null;
        var groupTogether = properties.groupTogether || true;
        var bounce = properties.bounce || false;
        var container = properties.container || view;
        var contained = false;

        var mass = 1.0;
        var acceleration = new Point();
        var vector = new Point.random(-maxSpeed * maxForce, maxSpeed * maxForce);
        var position = new Point(position); //.clone();

        var count = 0;
        var lastAngle = 0;
        var distances = [];

        // this is my bootleg way to fix a stuck boid
        var stuckCounter = 0;
        // if a boid increments the stuckCounter beyond
        // stuckMax it's movement is more drastic
        var stuckMax = 100;



        // ------------------------------------------------------------------------
        //
        // Methods
        //
        // ------------------------------------------------------------------------
        function run(boids) {
            if (groupTogether) {
                flock(boids);
            }
            else {
                align(boids);
            }
            borders(bounce);
            update();
            updateItems();
        }

        // We accumulate a new acceleration each time based on three rules
        function flock(boids) {
            calculateDistances(boids);
            var separation = separate(boids);
            separation.x *= 3;
            separation.y *= 3;

            var alignment = align(boids);
            var coherence = cohesion(boids);
            acceleration.x += separation.x + alignment.x + coherence.x;
            acceleration.y += separation.y + alignment.y + coherence.y;
        }

        // ------------------------------------------------------------------------
        function calculateDistances(boids) {
            for (var i = 0, l = boids.length; i < l; i++) {
                var other = boids[i];
                distances[i] = other.position().getDistance(position, true);
            }
        }

        // ------------------------------------------------------------------------
        function update() {
            // Update velocity
            vector.x += acceleration.x;
            vector.y += acceleration.y;

            // Limit speed (vector#limit?)
            vector.length = Math.min(maxSpeed, vector.length);
            position.x += vector.x;
            position.y += vector.y;

            // Reset acceleration to 0 each cycle
            acceleration = new Point();
        }

        function updateItems() {
            if (path) {
                path.position = position;
                var angle = vector.angle;
                path.rotate(angle - lastAngle);
                lastAngle = angle;
            }
        }

        // ------------------------------------------------------------------------
        function seek(target) {
            var s = steer(target, false);
            acceleration.x += s.x;
            acceleration.y += s.y;
        }

        function arrive(target) {
            var s = steer(target, true);
            acceleration.x += s.x;
            acceleration.y += s.y;
        }

        // ------------------------------------------------------------------------
        function borders(isBounce) {
            isBounce = isBounce || false;
            var size = container.bounds.size;

            if (isBounce) {
                if (stuckCounter > stuckMax) {
                    stuckCounter = 0;
                    position = new Point.random(size.width, size.height);
                }

                if (position.x < radius || position.x > size.width - radius) {
                    vector.x *= -1;
                    stuckCounter++;
                }
                if (position.y < radius || position.y > size.height - radius) {
                    vector.y *= -1;
                    stuckCounter++;
                }
            }
            else {
                // the -2 is intended to keep items from getting stuck
                if (position.x < -radius) {
                    position.x = size.width + (radius - 2);
                }
                if (position.y < -radius) {
                    position.y = size.height + (radius - 2);
                }
                if (position.x > size.width + radius) {
                    position.x = -(radius + 2);
                }
                if (position.y >= size.height + radius) {
                    position.y = -(radius + 2);
                }
            }

            if (!vector.isZero()) {
                position.x += vector.x;
                position.y += vector.y;
            }
        }

        // ------------------------------------------------------------------------
        // A method that causes the boid to be contained within an item
        function contain(item, properties) {
            properties = properties || {};
            properties.hitOptions = properties.hitOptions || {
                fill:      true,
                stroke:    true,
                segment:   true,
                tolerance: radius// / 2
            };

            var target = new Point(
                position.x + vector.x + radius,
                position.y + vector.y + radius
            );

            var distance = item.position.getDistance(target);
            if (distance <= radius * 10) {
                contained = true;
            }

            // attract boid to the center of object
            if (contained) {
                // path.fillColor = path.strokeColor = new Color(1.0, 0.0, 0.0);
                var hitResult = item.hitTest(target, properties.hitOptions);
                if (!hitResult) {
                    // vector = new Point();
                    vector = new Point(
                        -vector.x,
                        -vector.y
                    );
                }
            }
            else if (!contained) {
                // path.fillColor = 'white';
                arrive(item.position);
            }
        }

        // A method that causes the boid to be repelled/avoid an item
        function repel(obstacleItem, properties) {
            properties.hitOptions = properties.hitOptions || {
                fill      : true,
                stroke    : true,
                segment   : true,
                tolerance : radius// / 2
            };

            var target = new Point(
                position.x + vector.x,
                position.y + vector.y
            );

            if (obstacleItem.path()) {
                var hitResult = obstacleItem.path().hitTest(target, properties.hitOptions);
                var repel = new Point();
                if (hitResult) {
                    if (hitResult.type == 'segment' ||
                        hitResult.type == 'handle-in' ||
                        hitResult.type == 'handle-out') {
                        repel = new Point(
                            position.x - hitResult.location.point.x,
                            position.y - hitResult.location.point.y
                        );
                        repel = repel.normalize();
                    }
                    else if (hitResult.type == 'stroke' ||
                             hitResult.type == 'fill') {
                        // repel = new Point(
                        //     position.x * -vector.x,
                        //     position.y * -vector.y
                        // );
                        repel = repel.normalize();
                        repel = new Point(
                            target.x - vector.x,
                            target.y - vector.y
                        );
                    }

                    repel.x *= maxForce * 7; // 7 is a magic number
                    repel.y *= maxForce * 7;

                    if (Math.sqrt(repel.x * repel.x + repel.y * repel.y) < 0) {
                        repel.y = 0;
                    }

                    // apply
                    // repel.x /= mass;
                    // repel.y /= mass;
                    acceleration.x += repel.x;
                    acceleration.y += repel.y;

                }
            }
        }

        // ------------------------------------------------------------------------
        // A method that calculates a steering vector towards a target
        // Takes a second argument, if true, it slows down as it approaches
        // the target
        function steer(target, slowdown) {
            var steer = new Point();
            var desired = new Point(
                    target.x - position.x,
                    target.y - position.y
                );
            var distance = desired.length;

            // Two options for desired vector magnitude
            // (1 -- based on distance, 2 -- maxSpeed)
            if (slowdown && distance < 100) {
                // This damping is somewhat arbitrary:
                desired.length = maxSpeed * (distance * 0.001);
            }
            else {
                desired.length = maxSpeed;
            }
            steer.x = desired.x - vector.x;
            steer.y = desired.y - vector.y;
            steer.length = Math.min(maxForce, steer.length);
            return steer;
        }

        function separate(boids) {
            var desiredSeperation = radius * 100; //3600;
            var steer = new Point();
            var count = 0;
            // For every boid in the system, check if it's too close
            for (var i = 0, l = boids.length; i < l; i++) {
                var distance = distances[i];
                if (distance > 0 && distance < desiredSeperation) {
                    // Calculate vector pointing away from neighbor
                    var delta = new Point(
                        position.x - boids[i].position().x,
                        position.y - boids[i].position().y
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
                steer.length = maxSpeed;
                steer.x -= vector.x;
                steer.y -= vector.y;
                steer.length = Math.min(steer.length, maxForce);
            }
            return steer;
        }

        // Alignment
        // For every nearby boid in the system, calculate the average velocity
        function align(boids) {
            var neighborDist = 25;
            var steer = new Point();
            var count = 0;
            for (var i = 0, l = boids.length; i < l; i++) {
                var distance = distances[i];
                if (distance > 0 && distance < neighborDist) {
                    steer.x += boids[i].vector().x;
                    steer.y += boids[i].vector().y;
                    count++;
                }
            }

            if (count > 0) {
                steer.x /= count;
                steer.y /= count;
            }
            if (!steer.isZero()) {
                // Implement Reynolds: Steering = Desired - Velocity
                steer.length = maxSpeed;
                steer.x -= vector.x;
                steer.y -= vector.y;
                steer.length = Math.min(steer.length, maxForce);
            }
            return steer;
        }

        // Cohesion
        // For the average location (i.e. center) of all nearby boids,
        // calculate steering vector towards that location
        function cohesion(boids) {
            var neighborDist = 10000;
            var sum = new Point();
            var count = 0;
            for (var i = 0, l = boids.length; i < l; i++) {
                var distance = distances[i];
                if (distance > 0 && distance < neighborDist) {
                    sum.x += boids[i].position().x;
                    sum.y += boids[i].position().y;
                    count++;
                }
            }
            if (count > 0) {
                sum.x /= count;
                sum.y /= count;
                // Steer towards the location
                return steer(sum, false);
            }

            return sum;
        }



        // ------------------------------------------------------------------------
        //
        // Sets
        //
        function setGroupTogether(val) {
            groupTogether = val || groupTogether;
            return groupTogether;
        }

        function setBounce(val) {
            bounce = val;
        }



        // ------------------------------------------------------------------------
        //
        // Gets
        //
        function getAcceleration() {
            return acceleration;
        }

        function getVector() {
            return vector;
        }

        function getPosition(val) {
            if (val != undefined) {
                position = new Point(val);
            }
            return position;
        }

        function getRadius() {
            return radius;
        }

        function getPath() {
            return path;
        }

        function getData() {
            return data;
        }

        function getMaxSpeed() {
            return maxSpeed;
        }

        function getMaxForce() {
            return maxForce;
        }

        function getBounce() {
            return bounce;
        }



        // ------------------------------------------------------------------------
        return {
            run           : run,
            flock         : flock,

            update        : update,
            updateItems   : updateItems,

            seek          : seek,
            arrive        : arrive,

            borders       : borders,

            contain       : contain,
            repel         : repel,
            steer         : steer,
            separate      : separate,
            align         : align,
            cohesion      : cohesion,

            groupTogether : setGroupTogether,

            acceleration  : getAcceleration,
            vector        : getVector,
            position      : getPosition,
            radius        : getRadius,
            path          : getPath,
            data          : getData,
            maxSpeed      : getMaxSpeed,
            maxForce      : getMaxForce,
            bounce        : getBounce
        };

    },



    /**
     * @param  {Point} position
     *          intial position of Predator
     * @param  {Object} properties (optional)
     *          radius   : 30    // distance from other Boids
     *          maxSpeed : 10    // the maximum speed of the Predator
     *          maxForce : 0.05  // the maximum force of the Predator
     *          strength : Math.random() * 0.5  // strength of the Predator's force
     *          path     : new Path() // Item to apply behavior to
     *
     * @example
     * var predators = [];
     * for (var i = 0; i < 30; i++) {
     *  var predator = new folio.FFlock.predator(view.center, {
     *      radius   : 40,
     *      maxSpeed : 20,
     *      maxForce : 0.01,
     *      path     : new Path.Rectangle({
     *                     position  : [0, 0],
     *                     size      : [10, 10],
     *                     fillColor : new Color.random()
     *                 })
     *  });
     *  predators.push(predator);
     * }
     *
     */
    predator: function(position, properties) {
        // ------------------------------------------------------------------------
        //
        // Properties
        //
        // ------------------------------------------------------------------------
        var boidPredator = new folio.FFlock.boid(position, properties);



        // ------------------------------------------------------------------------
        //
        // Methods
        //
        // ------------------------------------------------------------------------
        boidPredator.run = function(predators, boids) {
            if (boidPredator.groupTogether()) {
                boidPredator.flock(predators);
            }
            else {
                boidPredator.align(predators);
            }
            boidPredator.borders(boidPredator.bounce());
            boidPredator.update();
            boidPredator.updateItems();
            boidPredator.repel(boids);
        };

        boidPredator.repel = function(boids) {
            var boid;
            for (var i = 0, l = boids.length; i < l; i++) {
                boid = boids[i];

                boidPredator.seek(boid.position());
                boid.repel(boidPredator, properties);
            }
        };


        // ------------------------------------------------------------------------
        return boidPredator;
    },



    /**
     * @param  {Point} position
     *          intial position of Obstacle
     * @param  {Object} properties (optional)
     *          radius : 30    // repel distance from Boids
     *          path   : new Path() // Item to apply behavior to
     *
     * @example
     * var obstacles = [];
     * var obstacle = new folio.FFlock.obstacle(new Point(100, 100), {
     *  radius : 35,
     *  path   : new Path.Circle({
     *               position  : [0, 0],
     *               radius    : 30,
     *               fillColor : 'black'
     *           })
     * });
     * obstacles.push(obstacle);
     *
     */
    obstacle: function(position, properties) {
        // ------------------------------------------------------------------------
        //
        // Properties
        //
        // ------------------------------------------------------------------------
        var boidObstacle = new folio.FFlock.boid(position, properties);



        // ------------------------------------------------------------------------
        //
        // Methods
        //
        // ------------------------------------------------------------------------
        boidObstacle.run = function(boids) {
            boidObstacle.repel(boids);
        };

        boidObstacle.repel = function(boids) {
            for (var i = 0, l = boids.length; i < l; i++) {
                boids[i].repel(boidObstacle, properties);
            }
        };


        // ------------------------------------------------------------------------
        return boidObstacle;
    }

};
