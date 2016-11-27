/*
 *
 * FStopwatch.js
 *
 * A simple stopwatch
 *
 */


folio.FTime.FStopwatch = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var now;
    var then;
    var timeInMs = 0;
    var bStart = 0;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     *
     * toggle (start/stop) the stopwatch
     *
     */
    var toggle = function() {
        if (bStart == 0) {
            start();
        }
        else {
            pause();
        }
    };

    /**
     *
     * start the stopwatch
     *
     */
    var start = function() {
        // start
        bStart = 1;
        then = new Date();
        then.setTime(then.getTime() - timeInMs);
    };

    /**
     *
     * pause the stopwatch
     *
     */
    var pause = function() {
        // pause
        bStart = 0;
        now = new Date();
        timeInMs = now.getTime() - then.getTime();
    };

    /**
     *
     * reset the stopwatch
     *
     */
    var reset = function() {
        bStart = 0;
        timeInMs = 0;
    };



    // ------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     *
     * set the stopwatch
     *
     * @param {Number} ms
     *      milliseconds to start the stopwatch with
     * @param {Boolean} run
     *      whether the stopwatch should start or not
     *
     */
    var set = function(ms, run) {
        timeInMs = ms;
        bStart = (run) ? 0 : 1;
        // (run == true) ? bStart = 0 : bStart = 1;

        then = new Date();
        then.setTime(then.getTime() - timeInMs);
        toggle();
    };


    //
    // Gets
    //
    /**
     *
     * @return {Number} the time elapsed in milliseconds
     *
     */
    var get = function() {
        if (bStart == 1)  {
            now = new Date();
            timeInMs = now.getTime() - then.getTime();
        }
        return timeInMs;
    };

    /**
     *
     * @return {Boolean} whether the stopwatch is running
     *
     */
    var isRunning = function() {
        return (bStart === 0) ? true : false;
    };


    // ------------------------------------------------------------------------
    return {
        toggle: toggle,
        start: start,
        pause: pause,
        reset: reset,

        set: set,

        get: get,
        isRunning: isRunning
    };

};
