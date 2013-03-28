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
 *	Modified/Simplified for PaperJS
 *  
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 */

// the core frederickkPaper namespace
var f = frederickkPaper;

// depreciating FShape namespace
// no longer necessary use paper.Path
//var fshape = f.FShape;

// depreciating FColor namespace
// var fcolor = new f.FColor();


var TSP = function() { 
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	this.items;
	this.nodeRoute = [];

	this.tangentGroup;
	this.linesPath;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.calculate = function(_items, _iterate) {
		// this.nodeRoute = [];
		this.tangentGroup = new Group();
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
		var angle;
		var nodesNum = this.nodeRoute.length - 1;

		this.tangentGroup.removeChildren();

		for (var j=0; j<nodesNum; ++j) {
			obj1 = this.items[ this.nodeRoute[j] ];
			obj2 = this.items[ this.nodeRoute[j+1] ];
			
			var chain = new Path.FChain( obj1, obj2 );
			chain.strokeColor = 'white';
			chain.strokeWidth = 2;
			chain.fillColor = obj1.fillColor;
			chain.fillColor.alpha = 0.2;
			chain.blendMode = 'normal';

			this.tangentGroup.appendTop( chain );
		}
		
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.getTangents = function() {
		return this.tangentGroup;
	};


};


