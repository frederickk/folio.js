/**!
 * FTileEngine
 *
 * A simple tile engine
 * (requires FArray.js)
 *
 * Reads a collection of SVG tiles (square) and generatively piece them
 * together based on where the tiles have connection points.
 * Only supports connections on the top, right, bottom, left
 *
 * Each SVG must have a 'data-sides' attribute that is expressed in 1's and 0's
 * <svg id="tile-00" data-sides="0101"...
 *
 * @example
 *
 *   ----------- ----------- -----------
 *   |    |    | |         | |         |
 *   |    +----| |---------| |----+    |
 *   |    |    | |         | |    |    |
 *   ----------- ----------- -----------
 *     trbl         trbl        trbl
 *     1110         0101        0011
 *
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */

/**
 * FTileEngine
 *
 * @param {Array} ids an array of SVG id attributes
 *
 * @return {Object}
 *
 * @example
 * var tileEngine = new FTileEngine([
 *     'tile-00',
 *     'tile-01',
 *     'tile-02',
 *     'tile-03'
 * ]);
 *
 * // draw tiles on screen
 * var row, svg, path;
 * for (var i = 0; i < tileEngine.getMap().length; i++) {
 *      row = tileEngin.getMap()[i];
 *      for (var j = 0; j < row.length; j++) {
 *          svg = project.importSVG(document.getElementById(row[j].id), true);
 *          path = new Group(svg.children);
 *          path.bounds.x = j * path.bounds.width;
 *          path.bounds.y = i * path.bounds.height;
 *          svg.remove();
 *      }
 *  }
 *
 */

folio.FTileEngine = function(ids) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var tiles = {};
    var tileMap = [];



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    // /**
    //  * Compare two arrays and create a new array
    //  * with only the objects that are the same
    //  *
    //  * @param {Array} arr
    //  *          Array object
    //  *
    //  * @return {Array} new Array object
    //  *
    //  */
    // Array.prototype.same = function(arr) {
    //     var a = this.concat();
    //     var c = [];
    //     for (var i = 0; i < a.length; ++i) {
    //         for (var j = 0; j < arr.length; ++j) {
    //             if (a[i] === arr[j]) {
    //                 c.push(a[i]);
    //             }
    //         }
    //     }
    //     return c;
    // };

    // -----------------------------------------------------------------------------
    (function init() {
        if (ids !== undefined) {
            setIds(ids);
        }
    })();

    // -----------------------------------------------------------------------------
    // TODO: make this an FTile class
    function createTileObject(element) {
        var data = element.getAttribute('data-sides');
        var obj = {
            id     : element.id,

            width  : element.getBBox().width,
            height : element.getBBox().height,

            data   : data,
            top    : [],
            right  : [],
            bottom : [],
            left   : []
        };
        return obj;
    }

    function createNeighbors() {
        for (var i in tiles) {
            for (var j in tiles) {
                if (tiles[i].data[0] === '1' && tiles[j].data[2] === '1' ||
                    tiles[i].data[0] === '0' && tiles[j].data[2] === '0') {
                    tiles[i].top.push(j);
                }
                if (tiles[i].data[1] === '1' && tiles[j].data[3] === '1' ||
                    tiles[i].data[1] === '0' && tiles[j].data[3] === '0') {
                    tiles[i].right.push(j);
                }
                if (tiles[i].data[2] === '1' && tiles[j].data[0] === '1' ||
                    tiles[i].data[2] === '0' && tiles[j].data[0] === '0') {
                    tiles[i].bottom.push(j);
                }
                if (tiles[i].data[3] === '1' && tiles[j].data[1] === '1' ||
                    tiles[i].data[3] === '0' && tiles[j].data[1] === '0') {
                    tiles[i].left.push(j);
                }
            }
        }


        return tiles;
    }

    function createTileMap(cols, rows) {
        var tile = getRandom();
        cols = cols || Math.ceil(view.bounds.width / tile.width);
        rows = rows || Math.ceil(view.bounds.height / tile.height);

        tileMap = [];
        var tileRow = [];
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (i === 0) {
                    tile = getRandomNeighbor(tile, 'right');
                }
                else if (i > 0 && j > 0) {
                    tile = getRandomNeighborMultipleSides([{
                        tile : tile,
                        side : 'right'
                    }, {
                        tile : tileMap[i - 1][j],
                        side : 'bottom'
                    }]);
                }
                tileRow.push(tile);
            }
            tileMap.push(tileRow);
            tileRow = [];
            tile = getRandomNeighbor(tileMap[i][j - cols], 'bottom');
        }
        return tileMap;
    }

    // -----------------------------------------------------------------------------
    //
    // Sets
    //
    /**
     * Take an array of SVG id's and create tile objects from them
     *
     * @param {Array} arr an array of SVG tile id's
     */
    function setIds(arr) {
        var key;
        for (var i = 0; i < arr.length; i++) {
            key = arr[i];
            tiles[key] = createTileObject(document.getElementById(arr[i]));
        }

        createNeighbors();
        createTileMap();
    }


    // -----------------------------------------------------------------------------
    //
    // Gets
    //
    /**
     * Get a tile
     *
     * @param {String} id an id of a specific tile
     *
     * @return {Object} a valid tile object
     */
    function get(id) {
        if(typeof id === 'string') {
            return tiles[id];
        }
        return null;
    }

    /**
     * Get a random tile
     *
     * @return {Object} a valid tile object
     */
    function getRandom() {
        var keys = Object.keys(tiles);
        var sel = keys[Math.floor(keys.length * Math.random())];
        return tiles[sel];
    }

    /**
     * Get an array of valid neighbors, as determined from one tile
     *
     * @param  {Object} obj  a valid tile object
     * @param  {String} side which side should the neighbor match
     *                       'top', 'right', 'bottom', 'left'
     *
     * @return {Array}       an array of valid tile objects
     */
    function getNeighbor(obj, side) {
        return obj[side];
    }

    /**
     * Get a random valid neighbor, as determined from one tile
     *
     * @param  {Object} obj  a valid tile object
     * @param  {String} side which side should the neighbor match
     *                       'top', 'right', 'bottom', 'left'
     *
     * @return {Object}      a valid tile object
     */
    function getRandomNeighbor(obj, side) {
        var arr = getNeighbor(obj, side);
        // var sel = arr[paper.randomInt(arr.length)];
        var sel = arr[parseInt(Math.random() * arr.length)];
        return tiles[sel];
    }

    /**
     * Get an array of valid neighbors, as determined from two tiles
     *
     * @param  {Array} arr an array of objects
     *  [{
     *     tile : tile,
     *     side : 'right'
     *  }, {
     *     tile : tileMap[i - 1][j],
     *     side : 'bottom'
     *  }]
     *
     * @return {Array} an array of valid tile objects
     */
    function getNeighborMultipleSides(arr) {
        if (arr.length >= 2) {
            var neighbors = arr[0].tile[arr[0].side].same(arr[1].tile[arr[1].side]);
            return neighbors;
        }
        return false;
    }

    /**
     * Get a random valid neighbor, as determined from two tiles
     *
     * @param  {Array} arr an array of objects
     *  [{
     *     tile : tile,
     *     side : 'right'
     *  }, {
     *     tile : tileMap[i - 1][j],
     *     side : 'bottom'
     *  }]
     *
     * @return {Object} a tile object
     */
    function getRandomNeighborMultipleSides(arr) {
        if (arr.length >= 2) {
            var neighbors = getNeighborMultipleSides(arr);
            // var sel = paper.randomInt(neighbors.length);
            var sel = neighbors[parseInt(Math.random() * neighbors.length)];
            return get(neighbors[sel]);
        }
        return false;
    }

    /**
     * @return {Array} tile map array
     */
    function getTileMap() {
        return tileMap;
    }


    // -----------------------------------------------------------------------------
    return {
        tiles                          : tiles,

        createMap                      : createTileMap,

        set                            : setIds,

        get                            : get,
        getRandom                      : getRandom,
        getNeighbor                    : getNeighbor,
        getRandomNeighbor              : getRandomNeighbor,
        getNeighborMultipleSides       : getNeighborMultipleSides,
        getRandomNeighborMultipleSides : getRandomNeighborMultipleSides,
        getMap                         : getTileMap
    };
}
