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
 * @param  {Object} properties (optional)
 * {
 *     iterations : 1000 // {Number} tests per frame (higher = better)
 * }
 *
 * @return {Array}
 *
 */
folio.FRoute = function(items, properties) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var items = items;

    properties = properties || {};
    var iterations = properties.iterations || 1000;

    var routeStep = 0;
    var routeNodes = [];



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    (function calculate() {
        var temp;
        var p1;

        if (routeStep === 0) {
            var routeNodesLength = 0;
            var routeNodesTemp = [items.length];

            var px, py;
            for (var i = 0; i < items.length; ++i) {
                routeNodesTemp[i] = false;
                px = items[i].position.x;
                py = items[i].position.y;

                if ((px >= view.bounds.width) || (py >= view.bounds.height) ||
                    (px < 0) || (py < 0)) {
                    continue;
                }
                else {
                    routeNodesTemp[i] = true;
                    routeNodesLength++;
                }
            }

            routeNodes = [routeNodesLength];
            var tempCounter = 0;
            for (var i = 0; i < items.length; ++i) {
                if (routeNodesTemp[i]) {
                    routeNodes[tempCounter] = i;
                    tempCounter++;
                }
            }
        }

        var nodesNum = routeNodes.length - 1;
        if (routeStep < (routeNodes.length - 2))  {
            // console.log('Nearest neighbor ("Simple, Greedy") algorithm path optimization:');
            // 1000 steps per frame displayed; you can edit this number!
            var StopPoint = routeStep + 1000;

            if (StopPoint > nodesNum) {
                StopPoint = nodesNum;
            }

            var ClosestNode;
            var distMin;
            var p2, dx, dy;
            for (var i = routeStep; i < StopPoint; ++i) {
                p1 = items[routeNodes[routeStep]].position;
                ClosestNode = 0;
                distMin = Number.MAX_VALUE;

                for (var j = routeStep + 1; j<nodesNum; ++j) {
                    p2 = items[routeNodes[j]].position;

                    dx = p1.x - p2.x;
                    dy = p1.y - p2.y;
                    distance = (dx * dx + dy * dy);   // Only looking for closest; do not need sqrt factor!

                    if (distance < distMin) {
                        ClosestNode = j;
                        distMin = distance;
                    }
                }

                temp = routeNodes[routeStep + 1];
                //p1 = items[routeNodes[routeStep + 1]];
                routeNodes[routeStep + 1] = routeNodes[ClosestNode];
                routeNodes[ClosestNode] = temp;

                if (routeStep < (nodesNum)) {
                    routeStep++;
                }
                else {
                    console.log('Optimizing path');
                }
            }

        }
        //else {
            // Initial routing is complete
            // console.log('2-opt heuristic optimization');
            // Identify a pair of edges that would become shorter by reversing part of the tour.

            // var groupPath = new Group();
            var indexA, indexB;
            var a0, a1;
            var b0, b1;
            var dx, dy;
            var distance, distance2;
            var indexhigh, indexLow;
            for (var i = 0; i < iterations; ++i) {
                indexA = Math.floor(Math.random() * nodesNum);
                indexB = Math.floor(Math.random() * nodesNum);

                if (Math.abs(indexA - indexB) < 2) {
                    continue;
                }

                if (indexB < indexA) {
                    temp = indexB;
                    indexB = indexA;
                    indexA = temp;
                }

                a0 = items[routeNodes[indexA]].position;
                a1 = items[routeNodes[indexA + 1]].position;
                b0 = items[routeNodes[indexB]].position;
                b1 = items[routeNodes[indexB + 1]].position;

                // Original distance:
                dx = a0.x - a1.x;
                dy = a0.y - a1.y;
                distance = (dx * dx + dy * dy);   // Only a comparison; do not need sqrt factor!

                dx = b0.x - b1.x;
                dy = b0.y - b1.y;
                distance += (dx * dx + dy * dy);  // Only a comparison; do not need sqrt factor!

                // Possible shorter distance?
                dx = a0.x - b0.x;
                dy = a0.y - b0.y;

                distance2 = (dx * dx + dy * dy);  // Only a comparison; do not need sqrt factor!
                dx = a1.x - b1.x;
                dy = a1.y - b1.y;
                distance2 += (dx * dx + dy * dy); // Only a comparison; do not need sqrt factor!

                if (distance2 < distance) {
                    indexhigh = indexB;
                    indexlow = indexA + 1;

                    while (indexhigh > indexlow) {
                        temp = routeNodes[indexlow];
                        routeNodes[indexlow] = routeNodes[indexhigh];
                        routeNodes[indexhigh] = temp;

                        indexhigh--;
                        indexlow++;
                    }
                }

            }
        // }
        //
    })();


    return routeNodes;
};
