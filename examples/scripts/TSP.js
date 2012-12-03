/**
 *	Travelling Salesman Problem Algorithm
 *
 *	Taken from "SVG Stipple Generator, v 1.0"
 *	Copyright (C) 2012 by Windell H. Oskay
 *	
 *	http://www.evilmadscientist.com
 *	http://www.evilmadscientist.com/go/stipple
 *  
 *  
 *	Modified for Scriptographer/PaperJS
 *  
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 */

var f = Frederickk;
var fcolor = new f.FColor();


var TSP = function() { 
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	this.items;
	this.nodeRoute = []; // create an empty array to hold the routing info

	this.tangentGroup;
	this.linesPath;


	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.calculate = function(_items, _iterate) {
		this.tangentGroup = new paper.Group();
		this.items = _items;

		var temp;
		var p1;

		if(RouteStep == 0) {
			//	Begin process of optimizing plotting route, 
			//	by flagging nodes that will be shown.
			//	console.log("Optimizing plotting path");
			var nodeRouteLength = 0;
			var nodeRouteTemp = new Array(this.items.length);

			for(var i=0; i<this.items.length; ++i) {

				nodeRouteTemp[i] = false;
				var px = this.items[i].position.x;
				var py = this.items[i].position.y;

				if( (px >= view.bounds.width) || (py >= view.bounds.height) || 
					(px < 0) || (py < 0)) {
					continue;
				}
				else {
					nodeRouteTemp[i] = true;
					nodeRouteLength++;
				}
			}

			// These are the ONLY points to be drawn in the tour.
			this.nodeRoute = new Array(nodeRouteLength);
			var tempCounter = 0;
			for(var i=0; i<this.items.length; ++i) { 
				if(nodeRouteTemp[i]) {
					this.nodeRoute[tempCounter] = i;
					tempCounter++;
				}
			}
		}

		var nodesNum = this.nodeRoute.length - 1;
		if(RouteStep < (this.nodeRoute.length - 2))  { 
			//	console.log('Nearest neighbor ("Simple, Greedy") algorithm path optimization:');
			//	1000 steps per frame displayed; you can edit this number!
			var StopPoint = RouteStep + 1000;

			if(StopPoint > nodesNum)
				StopPoint = nodesNum;

			for(var i=RouteStep; i<StopPoint; ++i) { 
				p1 = this.items[this.nodeRoute[RouteStep]].position;
				var ClosestNode = 0; 
				var distMin = Number.MAX_VALUE;

				for(var j=RouteStep+1; j<nodesNum; ++j) { 
					var p2 = this.items[ this.nodeRoute[j] ].position;

					var dx = p1.x - p2.x;
					var dy = p1.y - p2.y;
					var distance = (dx*dx+dy*dy);	// Only looking for closest; do not need sqrt factor!

					if(distance < distMin) {
						ClosestNode = j; 
						distMin = distance;
					}
				}	

				temp = this.nodeRoute[RouteStep + 1];
				//p1 = this.items[this.nodeRoute[RouteStep + 1]];
				this.nodeRoute[RouteStep + 1] = this.nodeRoute[ClosestNode];
				this.nodeRoute[ClosestNode] = temp;

				if(RouteStep < (nodesNum)) {
					RouteStep++;
				} else {
					console.log("Now optimizing plot path" );
				}
			}
	
		} //else {
			// Initial routing is complete
			// console.log('2-opt heuristic optimization');
			// Identify a pair of edges that would become shorter by reversing part of the tour.

			// var groupPath = new Group();
			// 1000 tests per frame; you can edit this number.
			for(var i=0; i<_iterate; ++i) {
			
				var indexA = Math.floor( f.random(0, nodesNum) );
				var indexB = Math.floor( f.random(0, nodesNum) );

				// console.log('indexA', indexA);
				// console.log('indexB', indexB);

				if(Math.abs(indexA - indexB) < 2)
					continue;
		
				if(indexB < indexA) {
					// swap A, B.
					temp = indexB;
					indexB = indexA;
					indexA = temp;
				}
		
				var a0 = this.items[ this.nodeRoute[indexA] ].position;
				var a1 = this.items[ this.nodeRoute[indexA + 1] ].position;
				var b0 = this.items[ this.nodeRoute[indexB] ].position;
				var b1 = this.items[ this.nodeRoute[indexB + 1] ].position;
		
				// Original distance:
				var dx = a0.x - a1.x;
				var dy = a0.y - a1.y;
				var distance = (dx*dx+dy*dy);	// Only a comparison; do not need sqrt factor! 
				dx = b0.x - b1.x;
				dy = b0.y - b1.y;
				distance += (dx*dx+dy*dy);	//	Only a comparison; do not need sqrt factor! 
		
				// Possible shorter distance?
				dx = a0.x - b0.x;
				dy = a0.y - b0.y;
				var distance2 = (dx*dx+dy*dy);	//	Only a comparison; do not need sqrt factor! 
				dx = a1.x - b1.x;
				dy = a1.y - b1.y;
				distance2 += (dx*dx+dy*dy);	// Only a comparison; do not need sqrt factor! 
		
				if(distance2 < distance) {
					// Reverse tour between a1 and b0.	 
		
					var indexhigh = indexB;
					var indexlow = indexA + 1;
		
					while (indexhigh > indexlow) {
						temp = this.nodeRoute[indexlow];
						this.nodeRoute[indexlow] = this.nodeRoute[indexhigh];
						this.nodeRoute[indexhigh] = temp;
		
						indexhigh--;
						indexlow++;
					}
				}

			}
		// }
	};


	// ------------------------------------------------------------------------
	this.draw = function() { 
		var obj1, obj2;
		var nodesNum = this.nodeRoute.length - 1;

		this.tangentGroup.removeChildren();
		for (var j=0; j<nodesNum; ++j) {
			obj1 = this.items[ this.nodeRoute[j] ];
			obj2 = this.items[ this.nodeRoute[j+1] ];
			
			var pts = CommonTangents(obj1, obj2);

			var lines = new paper.Path();
			lines.add(pts[0]);	lines.add(pts[1]);
			lines.add(pts[2]);	lines.add(pts[3]);
			lines.fillColor = obj1.fillColor;
			// lines.blendMode = 'multiply';
			lines.closed = true;

			this.tangentGroup.appendTop( lines );
		}
		
	};

	// ------------------------------------------------------------------------
	// this.lines = function() { 
	// 	this.linesPath = new paper.Path();
	// 	var nodesNum = this.nodeRoute.length - 1;
	// 	for (var j=0; j<nodesNum; ++j) {
	// 		var obj1 = this.items[ this.nodeRoute[j] ];
	// 		var obj2 = this.items[ this.nodeRoute[j+1] ];
	// 		this.linesPath.add( obj1.position );
	// 		this.linesPath.add( obj2.position );
	// 	}
	// 	this.lines.PathfillColor = null;
	// };



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.getLines = function() {
		return this.linesPath;
	};

	this.getTangents = function() {
		return this.tangentGroup;	
	};


};



// ------------------------------------------------------------------------
var CommonTangents = function(c1, c2) {
	var dx = c2.position.x - c1.position.x;
	var dy = c2.position.y - c1.position.y;

	var r1 = Math.sqrt( c1.bounds.size.area() );
	var r2 = Math.sqrt( c2.bounds.size.area() );

	r1 /= 2;
	r2 /= 2;

	var dist = c1.position.getDistance( c2.position );

	if (dist <= Math.abs(r2 - r1)) {
		//	The circles are coinciding
		//	There are no valid tangents.
		return;
	}

	var angle1 = Math.atan2(dy, dx);
	var angle2 = Math.acos((r1 - r2)/dist);

	var pt1 = new paper.Point(
		c1.position.x + r1 * Math.cos(angle1 + angle2),
		c1.position.y + r1 * Math.sin(angle1 + angle2)
	);
	var pt2 = new paper.Point(
		c2.position.x + r2 * Math.cos(angle1 + angle2),
		c2.position.y + r2 * Math.sin(angle1 + angle2)
	);
	var pt4 = new paper.Point(
		c1.position.x + r1 * Math.cos(angle1 - angle2),
		c1.position.y + r1 * Math.sin(angle1 - angle2)
	);
	var pt3 = new paper.Point(
		c2.position.x + r2 * Math.cos(angle1 - angle2),
		c2.position.y + r2 * Math.sin(angle1 - angle2)
	);

	return [pt1, pt2, pt3, pt4]
};


