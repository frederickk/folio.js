/**!
 *
 * FSort.js
 *
 * Sorting methods
 *
 */


Folio.FSort = {
    /**
     *
     * sort Array in alphabetical order
     * TODO: make scalable for all non-latin languages
     *
     * http://www.brain4.de/programmierecke/js/arraySort.php
     *
     */
    alphabetical: function(a, b) {
        // var A = a.toLowerCase();
        // var B = b.toLowerCase();

        // if (A < B) {
        //     return -1;
        // }
        // else if (A > B) {
        //     return  1;
        // }
        // else {
        //     return 0;
        // }

        a = a.toLowerCase();
        a = a.replace(/ä/g,'a');
        a = a.replace(/ö/g,'o');
        a = a.replace(/ü/g,'u');
        a = a.replace(/ß/g,'s');

        b = b.toLowerCase();
        b = b.replace(/ä/g,'a');
        b = b.replace(/ö/g,'o');
        b = b.replace(/ü/g,'u');
        b = b.replace(/ß/g,'s');

        return (a === b)
            ? 0
            : (a > b)
                ? 1
                : -1;
    },

    /**
     *
     * sort array by distance of object from center of canvas
     *
     */
    distanceToCenter: function(a, b) {
        a = a.getDistanceToCenter();
        // console.log(a);
        b = b.getDistanceToCenter();
        // console.log(b);

        return (a === b)
            ? 0
            : (a > b)
                ? 1
                : -1;
    }

};
