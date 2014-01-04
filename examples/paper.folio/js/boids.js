//
// https://raw.github.com/nuterian/Flocking/master/js/boids.js
// TODO: refactor
//
Boid = function(position)
{
  this.shape = new Group();

  this.accVector = new Path();
  this.body = new Path();

  this.position = position;
  this.velocity = new Point();
  this.acceleration = new Point(0,0);

  var pathRadius = 3;
  var maxSpeed = 4;
  var maxForce = 0.05;

  var orientation = 0;
  var lastOrientation = 0;
  var lastLocation;

  this.init = function()
  {
    this.velocity.x = Math.random() < 0.5 ? -1 : 1;;
    this.velocity.y = Math.random() < 0.5 ? -1 : 1;;

    //console.log(this.velocity.x + ' ' + this.velocity.y + ' ' + (this.velocity.angle + 90));

    // this.body.strokeColor = 'white';
    // this.body.strokeWidth = 2;

    this.body.add(new Point(0, -pathRadius*2));
    this.body.add(new Point(-pathRadius, pathRadius*2));
    this.body.add(new Point(pathRadius, pathRadius*2));

    this.body.position = this.position;
    this.body.fillColor = new Color.random({ hue:[45,225], saturation:[0.8,1.0], lightness:[0.8,0.9] }); //new RgbColor(255,255,255, 0.5);

    this.body.closed = true;
    this.body.visible = false;

    this.shape.addChild(this.body);
  }

  this.run = function(boids)
  {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  this.flock = function(boids)
  {
    var separation = this.separate(boids);
    var alignment = this.align(boids);
    var cohesion = this.cohesion(boids);

    separation.length *= 1.5;
    alignment.length *= 1.0;
    cohesion.length *= 1.0;

    this.acceleration = this.acceleration.add(separation);
    this.acceleration = this.acceleration.add(alignment);
    this.acceleration = this.acceleration.add(cohesion);

  }

  this.update = function()
  {
    lastLocation = this.position.clone();

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.velocity.length = Math.min( maxSpeed, this.velocity.length );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.acceleration.length = 0;
  }

  this.seek = function(target)
  {
    var steer = this.steer(target, false);
    this.acceleration.x += steer.x;
    this.acceleration.y += steer.y;
  }

  this.arrive = function(target)
  {
    var steer = this.steer(target, true);
    this.acceleration.x += steer.x;
    this.acceleration.y += steer.y;
  }

  this.steer = function(target, slowdown)
  {
    var steer = new Point(0,0);
    var desired = new Point( target.x - this.position.x, target.y - this.position.y );
    var distance = desired.length;

    if(distance > 0)
    {
      if((slowdown) && (distance < 100.0)) desired.length = maxSpeed * (distance/100);
      else desired.length = maxSpeed;

      steer = desired.subtract(this.velocity);

      // Limit Steer to maxForce
      steer.length = Math.min( maxForce, steer.length );
    }
    return steer;
  }

  var acc = 0;
  var oacc = 0;
  var ang = 0;

  this.render = function()
  {
    var locVector = new Point( this.position.x - lastLocation.x, this.position.y - lastLocation.y );
    orientation = (locVector.angle+90);
    this.shape.position = this.position.clone();
    this.shape.rotate(orientation - lastOrientation);
    lastOrientation = orientation;
  }

  this.borders = function()
  {
    if(this.position.x < -pathRadius) this.position.x = view.bounds.width + pathRadius;
    if(this.position.y < -pathRadius) this.position.y = view.bounds.height + pathRadius;
    if(this.position.x > view.bounds.width+pathRadius) this.position.x = -pathRadius;
    if(this.position.y > view.bounds.height+pathRadius) this.position.y = -pathRadius;

  }

  this.separate = function(boids)
  {
    var desiredSeparation = 20.0;
    var steer = new Point(0,0);

    var count = 0;

    for(var i=0; i<boids.length; i++)
    {
      var other = boids[i];
      var distance = this.position.getDistance(other.position);

      if((distance > 0) && (distance < desiredSeparation))
      {
        var diffVector = this.position.subtract(other.position);
        diffVector = diffVector.normalize();
        diffVector.divide(distance);

        steer.x += diffVector.x;
        steer.y += diffVector.y;
        count++;
      }
    }

    if(count > 0){
      steer.length /= count;
    }

    if(steer.length > 0){
      steer = steer.normalize();
      steer = steer.multiply(maxSpeed);
      steer.x -= this.velocity.x;
      steer.y -= this.velocity.y;

      steer.length = Math.min( maxForce, steer.length );
    }

    return steer;

  }

  this.align = function(boids)
  {
    var neighbDist = 25.0;
    var steer = new Point(0, 0);
    var count = 0;
    for(var i=0; i<boids.length; i++)
    {
      var other = boids[i];
      var distance = this.position.getDistance(other.position);
      if((distance.length > 0) && (distance.length < neighbDist))
      {
        steer.x += other.velocity.x;
        steer.y += other.velocity.y;
        count++;
      }
    }

    if(count > 0)
    {
      steer.length /= count;
    }

    if(steer.length > 0)
    {
      steer = steer.normalize();
      steer = steer.multiply(maxSpeed);
      steer.x -= this.velocity.x;
      steer.y -= this.velocity.y;

      steer.length = Math.min( maxForce, steer.length );
    }

    return steer;
  }

  this.cohesion = function(boids)
  {
    var neighbDist = 25.0;
    var sum = new Point(0,0);
    var count = 0;

    for(var i=0; i<boids.length; i++)
    {
      var other = boids[i];
      var distance = this.position.getDistance(other.position);

      if((distance > 0) && (distance < neighbDist))
      {
        sum.x += other.velocity.x;
        sum.y += other.velocity.y;
        count++;
      }
    }

    if(count > 0)
    {
      sum.length /= count;
      return this.steer(sum, false);
    }
    return sum;
  }


}
