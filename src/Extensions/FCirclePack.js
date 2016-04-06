/**!
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
 *              Group of Items
 * @param {Object} properties (optional)
 * {
 *     iterations : 11,         // {Number} iterations per cycle, higher = slower
 *     damping    : 0.1,        // {Number} movement damping, the lower the slower
 *     padding    : 0,          // {Number} spacing between packed elements
 *     target     : view.center // {Point}  the packing center target
 * }
 *
 * @return {Object}
 */
/**
 * @param {Array} circleItems
 *              Array of Items
 * @param {Object} properties (optional)
 * {
 *     iterations : 11,         // {Number} iterations per cycle, higher = slower
 *     damping    : 0.1,        // {Number} movement damping, the lower the slower
 *     padding    : 0,          // {Number} spacing between packed elements
 *     target     : view.center // {Point}  the packing center target
 * }
 *
 *
 * @return {Object}
 *
 */
folio.FCirclePack = function(circleItems, properties) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var circleItems = (circleItems instanceof Group)
        ? circleItems.children
        : (circleItems == null)
            ? []
            : circleItems;

    properties = properties || {};
    var iterations = properties.iterations || 11;
    var dampingAmt = properties.damping || 0.1; //
    var padding = properties.padding || 0;
    var target = properties.target || view.center;

    var hitOptions = {
        stroke    : true,
        fill      : true,
        tolerance : 5
    };
    var isMousedown = false;
    var dragCircle;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    function update() {
        circleItems = circleItems.sort(FSort.distanceToCenter);

        var pp = new Point();
        var ci, cj;
        var dx, dy;
        var radius, dist;
        for (var i = circleItems.length - 1; i >= 0; --i) {
            ci = circleItems[i];

            for (var j = i + 1; j < circleItems.length; j++) {
                cj = circleItems[j];

                if (i == j) {
                    continue;
                }

                dx = cj.position.x - ci.position.x;
                dy = cj.position.y - ci.position.y;

                // this alogroithm is designed for circles, so we assume
                // every object is either a circle or a square.
                //
                // polygon packing is a much larger challenge
                // http://en.wikipedia.org/wiki/Packing_problem
                // hence why we just halve the "width" in
                // order to get the object's radius
                radius = (ci.bounds.size.width / 2) + (cj.bounds.size.width / 2) + padding;
                dist = (dx * dx) + (dy * dy);

                if (dist < (radius * radius) - 0.01) {
                    pp.x = dx;
                    pp.y = dy;
                    pp = pp.normalize(1.0);
                    pp = pp.multiply((radius - Math.sqrt(dist)) * 0.5);

                    try {
                        // if (cj != dragCircle) {
                            cj.position.x += pp.x;
                            cj.position.y += pp.y;
                        // }
                        // if (ci != dragCircle) {
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

        var damping = dampingAmt / parseInt(iterations);
        var c;
        for (var i = 0; i < circleItems.length; i++) {
            c = circleItems[i];
            if (c == dragCircle) {
                continue;
            }
            else {
                pp.x = c.position.x - target.x;
                pp.y = c.position.y - target.y;
                pp = pp.multiply(damping);
            }
            c.position.x -= pp.x;
            c.position.y -= pp.y;
        }
    }


    // ------------------------------------------------------------------------
    //
    // sets
    //
    /**
     * @param {Array} item
     *      Array of Path.Items to add to circle packer
     */
    /**
     * @param {Item} item
     *      Path.Item to add to circle packer
     */
    function add(item) {
        if (typeof item === 'array') {
            circleItems = circleItems.concat(item);
        }
        else {
            circleItems.push(item);
        }
    }

    /**
     * @param {Number} val
     *      damping value
     */
    function setDamping(val) {
        dampingAmt = val;
    }

    /**
     * @param {Number} val
     *      padding around elements
     */
    function setPadding(val) {
        padding = val;
    }


    /**
     * @param {Point} point
     *      the target location for the elements to pack around (default: view.center)
     */
    function setTarget(point) {
        target = point;
    }

    // ------------------------------------------------------------------------
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
     *      index number of Item being packed
     *
     * @return {Item} Item from items being packed
     */
    var getItem = function(index) {
        return circleItems[index];
    };


    // ------------------------------------------------------------------------
    //
    // Events
    //
    // ------------------------------------------------------------------------
    function resetEvents() {
        isMousedown = false;
        dragCircle = null;
    }
    window.addEventListener('onblur', resetEvents);
    window.addEventListener('mouseup', resetEvents);
    window.addEventListener('mouseout', resetEvents);

    window.addEventListener('mousedown', function(event) {
        isMousedown = true;
        var hitResult = project.hitTest([event.clientX, event.clientY], hitOptions);
        if (hitResult && hitResult.item) {
            dragCircle = hitResult.item;
        }
    });

    window.addEventListener('mousemove', function(event) {
        if (isMousedown && dragCircle) {
            dragCircle.position = [event.clientX, event.clientY];
        }
    });



    // ------------------------------------------------------------------------
    return {
        update     : update,

        add        : add,
        setDamping : setDamping,
        setPadding : setPadding,
        setTarget  : setTarget,

        getItems   : getItems,
        getItem    : getItem
    };

};
