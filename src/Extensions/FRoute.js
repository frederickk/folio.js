/**!
 * FRoute
 *
 * Travelling Salesman Problem Algorithm
 * Taken from "SVG Stipple Generator, v 1.0"
 * Copyright (C) 2012 by Windell H. Oskay
 *
 * http://www.evilmadscientist.com
 * http://www.evilmadscientist.com/go/stipple
 *
 *
 * Modified/Simplified for Paper.js
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

/**
 * @param  {PathItem} items
 *      an array of PathItems
 * @param  {Number} iterations (optional)
 *      tests per frame (higher = better) default: 1000
 *
 * @return {Array}
 *
 */
folio.FRoute = function(items, iterations) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var items = items;
    var iterations = (iterations != undefined)
        ? iterations
        : 1000;

    var RouteStep = 0;
    var RouteNodes = [];



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    (function calculate() {
        var temp;
        var p1;

        if (RouteStep === 0) {
            //  Begin process of optimizing plotting route,
            //  by flagging nodes that will be shown.
            //  console.log("Optimizing plotting path");
            var RouteNodesLength = 0;
            var RouteNodesTemp = [items.length];

            for (var i = 0; i < items.length; ++i) {

                RouteNodesTemp[i] = false;
                var px = items[i].position.x;
                var py = items[i].position.y;

                if ((px >= view.bounds.width) || (py >= view.bounds.height) ||
                    (px < 0) || (py < 0)) {
                    continue;
                }
                else {
                    RouteNodesTemp[i] = true;
                    RouteNodesLength++;
                }
            }

            // These are the ONLY points to be drawn in the tour.
            RouteNodes = [RouteNodesLength];
            var tempCounter = 0;
            for (var i = 0; i < items.length; ++i) {
                if (RouteNodesTemp[i]) {
                    RouteNodes[tempCounter] = i;
                    tempCounter++;
                }
            }
        }

        var nodesNum = RouteNodes.length - 1;
        if (RouteStep < (RouteNodes.length - 2))  {
            //  console.log('Nearest neighbor ("Simple, Greedy") algorithm path optimization:');
            //  1000 steps per frame displayed; you can edit this number!
            var StopPoint = RouteStep + 1000;

            if (StopPoint > nodesNum) {
                StopPoint = nodesNum;
            }

            for (var i = RouteStep; i < StopPoint; ++i) {
                p1 = items[RouteNodes[RouteStep]].position;
                var ClosestNode = 0;
                var distMin = Number.MAX_VALUE;

                for (var j=RouteStep+1; j<nodesNum; ++j) {
                    var p2 = items[ RouteNodes[j] ].position;

                    var dx = p1.x - p2.x;
                    var dy = p1.y - p2.y;
                    var distance = (dx * dx + dy * dy);   // Only looking for closest; do not need sqrt factor!

                    if (distance < distMin) {
                        ClosestNode = j;
                        distMin = distance;
                    }
                }

                temp = RouteNodes[RouteStep + 1];
                //p1 = items[RouteNodes[RouteStep + 1]];
                RouteNodes[RouteStep + 1] = RouteNodes[ClosestNode];
                RouteNodes[ClosestNode] = temp;

                if (RouteStep < (nodesNum)) {
                    RouteStep++;
                }
                else {
                    console.log('Now optimizing plot path');
                }
            }

        }
        //else {
            // Initial routing is complete
            // console.log('2-opt heuristic optimization');
            // Identify a pair of edges that would become shorter by reversing part of the tour.

            // var groupPath = new Group();
            for (var i = 0; i < iterations; ++i) {

                var indexA = Math.floor( Math.random()*nodesNum );
                var indexB = Math.floor( Math.random()*nodesNum );

                // console.log('indexA', indexA);
                // console.log('indexB', indexB);

                if (Math.abs(indexA - indexB) < 2) {
                    continue;
                }

                if (indexB < indexA) {
                    // swap A, B.
                    temp = indexB;
                    indexB = indexA;
                    indexA = temp;
                }

                var a0 = items[ RouteNodes[indexA] ].position;
                var a1 = items[ RouteNodes[indexA + 1] ].position;
                var b0 = items[ RouteNodes[indexB] ].position;
                var b1 = items[ RouteNodes[indexB + 1] ].position;

                // Original distance:
                var dx = a0.x - a1.x;
                var dy = a0.y - a1.y;
                var distance = (dx * dx + dy * dy);   // Only a comparison; do not need sqrt factor!
                dx = b0.x - b1.x;
                dy = b0.y - b1.y;
                distance += (dx * dx + dy * dy);  //  Only a comparison; do not need sqrt factor!

                // Possible shorter distance?
                dx = a0.x - b0.x;
                dy = a0.y - b0.y;
                var distance2 = (dx * dx + dy * dy);  //  Only a comparison; do not need sqrt factor!
                dx = a1.x - b1.x;
                dy = a1.y - b1.y;
                distance2 += (dx * dx + dy * dy); // Only a comparison; do not need sqrt factor!

                if (distance2 < distance) {
                    // Reverse tour between a1 and b0.

                    var indexhigh = indexB;
                    var indexlow = indexA + 1;

                    while (indexhigh > indexlow) {
                        temp = RouteNodes[indexlow];
                        RouteNodes[indexlow] = RouteNodes[indexhigh];
                        RouteNodes[indexhigh] = temp;

                        indexhigh--;
                        indexlow++;
                    }
                }

            }
        // }
        //
    })();






    // ------------------------------------------------------------------------
    //
    // Gets
    //
    // ------------------------------------------------------------------------
    return {
        route : RouteNodes
    };


};
