/*
 *
 * FStepper.js
 *
 */

 // TODO: this needs to be completely refactored
Folio.FTime.FStepper = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var stepMillis = 1000; // Set to default of 1s OR 1000ms

    var timeStart = 0.0;
    var timeEnd = 0.0;

    var isToggleStart = 0;
    var isBeginStepper = false;
    var isIn = false;
    var isOut = false;
    // var isDone = true;

    // var easing = 0.05;
    // var isEase = true;

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
        if (isToggleStart === 0) {
            isToggleStart = 1;
            stepOut();
        }
        else {
            isToggleStart = 0;
            stepIn();
        }
        return isToggleStart;
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
        if (isBeginStepper) {
            isBeginStepper = false;
            timeStart = currentSeconds;
            if (isIn) {
                timeEnd = paper.round((currentSeconds + ((1.0 - delta) * stepMillis)), 3);
            }
            else {
                timeEnd = paper.round((currentSeconds + (delta*stepMillis)), 3);
            }
            if (timeEnd <= currentSeconds) {
                if (isIn) {
                    isIn = false;
                    delta = 1.0;
                }
                else {
                    isOut = false;
                    delta = 0.0;
                }
            }
        }
        if (isIn) {
            delta = paper.round((1.0 - ((timeEnd - currentSeconds) / stepMillis)), 3);
            if (currentSeconds === timeEnd) {
                isIn = false;
                delta = 1.0;
                counter++;
                return;
            }
        }
        else if (isOut) {
            delta = paper.round(((timeEnd - currentSeconds) / stepMillis), 3);
            if (currentSeconds === timeEnd) {
                isIn = false;
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
        isBeginStepper = true;
        isIn = true;
        isOut = false;
        if (isIn) {
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
        isBeginStepper = true;
        isOut = true;
        isIn = false;
        if (isOut) {
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
    var getIsIn = function() {
        return isIn;
    };
    /**
     * @return {Boolean} if the object is stepping out (going up)
     */
    var getIsOut = function() {
        return isOut;
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
        isBeginStepper = isIn = isOut = false;
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

        isIn       : getIsIn,
        isOut      : getIsOut,
        isDone     : isDone,

        stop       : stop,

        setSeconds : setSeconds,
        setMillis  : setMillis,
        setDelta   : setDelta
    };


};
