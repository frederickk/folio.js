/*
 *
 * FDate.js
 *
 */


folio.FTime.FDate = function() {
    // ------------------------------------------------------------------------
    //
    // Properties
    //
    // ------------------------------------------------------------------------
    var dateObj = new Date();
    var monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var shortMonthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



    // ------------------------------------------------------------------------
    //
    // Methods
    //
    // ------------------------------------------------------------------------
    var addZero = function(val) {
        if (val.length === 1) {
            val = '0' + val;
        }
        return val;
    };

    /**
     * @return {String} return the current year as 'YYYY'
     */
    var year = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        var year = String(dateObj.getFullYear());
        return year;
    };

    /**
     * @return {String} return the current month as 'MM'
     */
    var month = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        return String(dateObj.getMonth());
    };

    /**
     * @return {String} return the current day as 'DD'
     */
    var day = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        return String(dateObj.getDate());
    };

    /**
     * @return {String} return the current week day
     */
    var weekday = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        return String(daysArr[dateObj.getDay()]);
    };
    /**
     * @return {String} return the current hour as 'HH'
     */
    var hour = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        var hour = String(dateObj.getHours());
        return addZero(hour);
    };

    /**
     * @return {String} return the current minute as 'mm'
     */
    var minute = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        var minute = String(dateObj.getMinutes());
        return addZero(minute);
    };

    /**
     * @return {String} return the current second as 'ss'
     */
    var second = function() {
        if (dateObj === undefined) {
            dateObj = new Date();
        }
        var second = String(dateObj.getSeconds());
        return addZero(second);
    };

    /**
     * @return {String} return the current date as "yyyyMMdd"
     */
    var date = function() {
        return year() + month() + day();
    };

    /**
     * @param {Array} format
     *      boolean array = [hours, minutes, seconds]
     *
     * @return {String} the current time
     */
    var now = function(format) {
        var disp = format || [true, true, true];
        var str = '';
        if (disp[0]) {
            str += hour();
        }
        if (disp[0] && disp[1]) {
            str += ':';
        }
        if (disp[1]) {
            str += minute();
        }
        if (disp[1] && disp[2]) {
            str += ':';
        }
        if (disp[2]) {
            str += second();
        }
        return str;
    };

    /**
     * @return {Number} the current time in milliseconds
     */
    var nowMilliseconds = function() {
        return toMillsecond(hour(), minute(), second());
    };

    /**
     * add to time
     *
     * @param {Number} d
     *      days
     * @param {Number} h
     *      hours
     * @param {Number} m
     *      minutes
     * @param {Number} s
     *      seconds
     *
     * @return {Object} new time
     */
    var add = function(d, h, m, s) {
        return dateObj + (24 * d + 60 * h + 60 * m + 1000 * s);
    };

    /**
     * subtract from time
     *
     * @param {Number} d
     *      days
     * @param {Number} h
     *      hours
     * @param {Number} m
     *      minutes
     * @param {Number} s
     *      seconds
     *
     * @return {Object} new time
     */
    var sub = function(d, h, m, s) {
        return dateObj - (24 * d + 60 * h + 60 * m + 1000 * s);
    };


    // ------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     * set to a specific time
     *
     * @param {Number} d
     *      days
     * @param {Number} h
     *      hours
     * @param {Number} m
     *      minutes
     * @param {Number} s
     *      seconds
     *
     * @return {Object} time
     */
    var set = function(d, h, m, s) {
        time = new Date();
        time.setTime((24 * d + 60 * h + 60 * m + 1000 * s));
        return time;
    };


    //
    // Gets
    //
    /**
     * @param {Number} ms
     *      as milliseconds
     * @param {Array} format
     *      boolean array = [hours, minutes, seconds]
     *
     * @return {String} human readable default is hh:mm:ss
     */
    var get = function(ms, format) {
        var disp = format || [true, true, true];
        var seconds = parseInt((ms / 1000) % 60);
        var minutes = parseInt(((ms / 1000) / 60) % 60);
        var hours   = parseInt((((ms / 1000) / 60) / 60) % 24);

        var hh, mm, ss;
        if (hours < 10) hh = '0' + hours;
        else hh =  '' + hours;
        if (minutes < 10) mm = '0' + minutes;
        else mm =  '' + minutes;
        if (seconds < 10) ss = '0' + seconds;
        else ss =  '' + seconds;

        var str = '';
        if (disp[0]) {
            str += hh;
        }
        if (disp[0] && disp[1]) {
            str += ':';
        }
        if (disp[1]) {
            str += mm;
        }
        if (disp[1] && disp[2]) {
            str += ':';
        }
        if (disp[2]) {
            str += ss;
        }
        return str;
    };

    /**
     * @param {String} h
     *      as hh:mm:ss OR mm:ss
     *
     * @return {Number} time in milliseconds
     */
    /**
     * @param {Number} h
     *      hours
     * @param {Number} m
     *      minutes
     * @param {Number} s
     *      seconds
     *
     * @return {Number} time in milliseconds
     */
    var toMillsecond = function(h, m, s) {
        if (m === undefined && s === undefined) {
            h = toArray(h)[0];
            m = toArray(h)[1];
            s = toArray(h)[2];
        }
        return parseInt(3600000 * h + 60000 * m + 1000 * s);
    };

    /**
     * @param {String} str
     *      string as hh:mm:ss
     *
     * @return {Array} array of time [0] hours [1] minutes [2] seconds
     */
    var toArray = function(str) {
        var hms = str.split(':');
        return [hms[0], hms[1], hms[2]];
    };



    // -----------------------------------------------------------------------------
    return {
        year            : year,
        month           : month,
        day             : day,
        hour            : hour,
        minute          : minute,
        second          : second,
        date            : date,
        now             : now,
        nowMilliseconds : nowMilliseconds,

        add             : add,
        sub             : sub,

        set             : set,
        get             : get,

        toMillsecond    : toMillsecond,
        toArray         : toArray
    };

};


