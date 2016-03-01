/*
 *
 * FStepper.js
 *
 */


folio.FTime.FStepper = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var stepMillis = 1000; // Set to default of 1s OR 1000ms

    var timeStart = 0.0;
    var timeEnd = 0.0;

    var bToggleStart = 0;
    var bBeginStepper = false;
    var bIn = false;
    var bOut = false;
    var bDone = true;

    var easing = 0.05;
    var bEase = true;

    var delta = 1.0;
    var counter = 0;



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    /**
     *
     * toggle (start/stop) the stepper
     *
     * @return {Number} start status
     *
     */
    var toggle = function() {
        if (bToggleStart === 0) {
            bToggleStart = 1;
            stepOut();
        }
        else {
            bToggleStart = 0;
            stepIn();
        }
        return bToggleStart;
    };

    // ------------------------------------------------------------------------
    /**
     * required function to keep the timing in sync
     * with the application
     *
     * @param {Number} currentSeconds
     *      the elapsed time of the application in seconds
     */
    function update(currentSeconds) {
        if (bBeginStepper) {
            bBeginStepper = false;
            timeStart = currentSeconds;
            if (bIn) {
                timeEnd = paper.round((currentSeconds + ((1.0 - delta) * stepMillis)), 3);
            }
            else {
                timeEnd = paper.round((currentSeconds + (delta*stepMillis)), 3);
            }
            if (timeEnd <= currentSeconds) {
                if (bIn) {
                    bIn = false;
                    delta = 1.0;
                }
                else {
                    bOut = false;
                    delta = 0.0;
                }
            }
        }
        if (bIn) {
            delta = paper.round((1.0 - ((timeEnd - currentSeconds) / stepMillis)), 3);
            if (currentSeconds == timeEnd) {
                bIn = false;
                delta = 1.0;
                counter++;
                return;
            }
        }
        else if (bOut) {
            delta = paper.round(((timeEnd - currentSeconds) / stepMillis), 3);
            if (currentSeconds == timeEnd) {
                bIn = false;
                delta = 0.0;
                counter++;
                return;
            }
        }
    }

    // ------------------------------------------------------------------------
    /**
     *
     * toggle stepping in (++)
     *
     */
    var stepIn = function() {
        bBeginStepper = true;
        bIn = true;
        bOut = false;
        if (bIn) {
            return;
        }
        if (delta === 1.0) {
            return;
        }
    };

    /**
     *
     * toggle stepping out (--)
     *
     */
    var stepOut = function() {
        bBeginStepper = true;
        bOut = true;
        bIn = false;
        if (bOut) {
            return;
        }
        if (delta === 0.0) {
            return;
        }
    };

    // ------------------------------------------------------------------------
    /**
     * @return {Boolean} if the object is stepping in (going down)
     */
    var isIn = function() {
        return bIn;
    };
    /**
     * @return {Boolean} if the object is stepping out (going up)
     */
    var isOut = function() {
        return bOut;
    };

    /**
     * @return {Boolean} if the object has finished it's stepping
     */
    var isDone = function() {
        if (delta < 1.0 && delta > 0.0) {
            return false;
        }
        else if (delta > 1.0) {
            delta = 1.0;
            return true;
        }
        else if (delta < 0.0) {
            delta = 0.0;
            return true;
        }
    };

    // ------------------------------------------------------------------------
    /**
     *
     * stop stepping
     *
     */
    function stop() {
        bBeginStepper = bIn = bOut = false;
    }

    /**
     * @return {Number}
     */
    var getDelta = function() {
        return delta;
    };

    /**
     * @return {Number}
     */
    var getCounter = function() {
        return counter;
    };


    // ------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     * @param {Number} seconds
     *      length of fade in seconds
     */
    function setSeconds(seconds) {
        setMillis(parseInt(seconds * 1000.0));
    }

    /**
     * @param {Number} millis
     *      length of fade in milliseconds
     */
    function setMillis(millis) {
        stepMillis = millis;
        stepMillis /= 1000;
    }

    /**
     * @param {Number} val
     *      set a value for the delta 0.0 - 1.0
     */
    function setDelta(val) {
        delta = val;
    }


    // ------------------------------------------------------------------------
    return {
        delta      : getDelta,
        counter    : getCounter,

        toggle     : toggle,
        update     : update,
        stepIn     : stepIn,
        stepOut    : stepOut,

        isIn       : isIn,
        isOut      : isOut,
        isDone     : isDone,

        stop       : stop,

        setSeconds : setSeconds,
        setMillis  : setMillis,
        setDelta   : setDelta
    };


};
