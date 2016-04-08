/**!
 * FSkeleton
 *
 * Calculate center points
 * https://lh3.googleusercontent.com/-PJzKtYeme3Q/UvjvCrxVXvI/AAAAAAAACf8/tg5UiY5US7g/w1624-h1666-no/pen_control.png
 *
 * http://metapolator.com/about
 * https://github.com/metapolator/metapolator/blob/17190aa0705912b8244961bca755a12ee042d0a3/static/demo/centerline.html
 *
 *
 * Modified/Expanded
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

/**
 * @param  {PathItem} item
 *      a PathItem
 *
 * @return {Array}
 *
 */
folio.FSkeleton = function(item) {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var item = item;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     * extract lines from PathItem into lines Array
     *
     * @param  {Point} point     [description]
     * @param  {Point} coords    [description]
     * @param  {Point} handleIn  [description]
     * @param  {Point} handleOut [description]
     *
     * @return {Object}           [description]
     */
    function getLines(point, coords, handleIn, handleOut) {
        var regex = /(z\d+)([lr])/;
        var match = point.match(regex);
        if (match) {
            var pointname = match[1];

            if (!lines[pointname]) {
                lines[pointname] = [undefined, undefined, undefined, undefined];
            }

            if (match[2] == 'r') {
                lines[pointname][1] = coords;
            }
            else if (match[2] == 'l') {
                lines[pointname][0] = coords;
                lines[pointname][2] = handleIn;
                lines[pointname][3] = handleOut;
            }
        }
    }

    /**
     * @param  {PathItem} item
     *      a PathItem
     *
     * @return {PathItem}
     *
     */
    function getCenterLines() {
        centerlinepath = new Path();
        centerlinepath.closed = false;

        for (var i=0, j=item.segments.length; i!=j; i++) {
            // step j down
            --j;

            // point 1
            var x1 = item.segments[i].point.x;
            var y1 = item.segments[i].point.y;
            // point 2
            var x2 = item.segments[j].point.x;
            var y2 = item.segments[j].point.y;

            var k, b, Xc, Yc;

            if (x2 == x1) {
                Xc = x1;
                Yc = y2 - (y2 - y1) / 2;
            }
            else if (y1 == y2) {
                Xc = x2 - (x2 - x1) / 2;
                Yc = y1;
            }
            else {
                Xc = x2 - (x2 - x1) / 2;
                Yc = y2 - (y2 - y1) / 2;
            }

            var centerpoint = new Point(Xc, Yc);
            new Path.Circle({
                center: centerpoint,
                radius: 6,
                strokeColor: new Color({
                    hue: (360/item.segments.length)*i,
                    saturation: 0.9,
                    brightness: 0.9
                }),
                strokeWidth: 3
            });
            var segment = new Segment(
                centerpoint,
                item.curves[i].segment2.handleIn,
                item.curves[i].segment1.handleOut
            );
            centerlinepath.add(segment);
        }

        return centerlinepath;
    }


    // ------------------------------------------------------------------------
    return {
        get : getCenterLines
    };

};
