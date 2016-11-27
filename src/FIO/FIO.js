/*
*
* FIO.js
*
* A collection of I/O methods
*
*/


folio.FIO = {
    // ------------------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------------------
    /*
     * Local Storage
     */

    /**
     * save a value using HTML5 Local Storage
     * http://www.w3schools.com/html/html5_webstorage.asp
     *
     * @param {String} name
     *          the name (key) of what we want to save
     * @param {Object} value
     *          what we want to save
     */
    saveLocal: function(name, value) {
        if (window.localStorage) {
            localStorage.setItem(name, String(value));
        }
        else {
            console.error('localStorage not supported');
        }
    },

    /**
     * retrieve saved value (default: as string)
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {String} float value
     */
    getLocal: function(name) {
        return localStorage.getItem(name);
    },

    /**
     * retrieve saved value as an int
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {Number} int value
     */
    getLocalInt: function(name) {
        return parseInt( getLocal(name) );
    },

    /**
     * retrieve saved value as a float
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {Number} float value
     */
    getLocalFloat: function(name) {
        return parseFloat( getLocal(name) );
    },

    /**
     * @return {Array} a list of all items saved in local storage
     *
     */
    getAllLocal: function() {
        return sessionStorage;

    },

    /**
     * delete a saved value from local storage
     *
     * @param {String} name
     *          the name (key) of what we want to delete
     */
    deleteLocal: function(name) {
        localStorage.removeItem(name);
    },



    // ------------------------------------------------------------------------
    /*
     * Session Storage
     */

    /**
     * save a value using HTML5 Session Storage
     * http://www.w3schools.com/html/html5_webstorage.asp
     *
     * @param {String} name
     *          the name (key) of what we want to save
     * @param {Object} value
     *          what we want to save
     */
    saveSession: function(name, value) {
        if (window.sessionStorage) {
            sessionStorage.setItem(name, String(value));
        }
        else {
            console.error('sessionStorage not supported');
        }
    },

    /**
     * retrieve saved value (default: as string)
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {String} string value
     */
    getSession: function(name) {
        return sessionStorage.getItem(name);
    },

    /**
     * retrieve saved value as an int
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {Number} int value
     */
    getSessionInt: function(name) {
        return parseInt( getSession(name) );
    },

    /**
     * retrieve saved value as a float
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     *
     * @return {Number} float value
     */
    getSessionFloat: function(name) {
        return parseFloat( getSession(name) );
    },

    /**
     * @return {Arrat} a list of all items saved in session storage
     *
     */
    getAllSession: function() {
        return sessionStorage;

    },

    /**
     * delete a saved value from session storage
     *
     * @param {String} name
     *          the name (key) of what we want to delete
     *
     */
    deleteSession: function(name) {
        sessionStorage.removeItem(name);
    },


    // ------------------------------------------------------------------------
    /*
     * Cookies
     * http://www.quirksmode.org/js/cookies.html
     */

    /**
     * save a value as a cookie
     *
     * @param {String} name
     *          the name (key) of what we want to save
     * @param {Object} value
     *          what we want to save
     * @param {Number} days
     *          how many days do we want to save it for
     */
    saveCookie: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            var expires = '; expires=' + date.toGMTString();
        }
        else var expires = '';
        document.cookie = name + '=' + value + expires + '; path=/';
    },

    /**
     * retrieve a value from a cookie
     *
     * @param {String} name
     *          the name (key) of what we want to retrieve
     */
    openCookie: function(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        // return null;
    },

    /**
     * delete a cookie
     *
     * @param {String} name
     *          the name (key) of what we want to delete
     */
    deleteCookie: function(name) {
        saveCookie(name, '', -1);
    },



    // ------------------------------------------------------------------------
    /*
     * paper.js specific
     */

    /**
     * download current view as
     *
     * @param  {String} filename [description]
     * @param  {Number} width    [description]
     * @param  {Number} height   [description]
     *
     * @return {Boolean} true if successful, false otherwise
     */
    downloadSVG: function(filename, width, height) {
        var w = width || view.bounds.width;
        var h = height || view.bounds.height;

        var svg = '<svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' + w + ' ' + h + '" enable-background="new 0 0 ' + w + ' ' + h + '" xml:space="preserve">';
        svg += pathGroup.exportSVG({asString: true});
        svg += '</svg>';
        var b64 = btoa(svg);

        var img = document.createElement('svg');
        img.src = 'data:image/svg+xml;base64,\n' + b64;
        img.alt = filename;

        try {
            // FIX: don't judge... it works :)
            var link = document.createElement('a');
            link.download = filename;
            link.href = img.src;
            link.click();

            return true;
        }
        catch(err) {
            return false;
        }
    },

    // ------------------------------------------------------------------------
    /*
    * TODO: deprecate... :(
    * Scriptographer specific
    *
    * modified from Jürg Lehni
    * http://scriptographer.org/forum/help/save-array-data-to-external-file/
    *
    */

    /**
    * @param {String} str
    *          the String of information to save (JSON encoded)
    * @param {String} fname
    *          the name of the file to save to
    */
    saveFile: function(str, filename) {
        filename = filename || 'foliojs_fio_file.file';

        try {
            // scriptographer
            var file = new File(script.file.parent, fname);
            if (file.exists()) file.remove();
            file.open();
            file.write( Json.encode(str) );
            file.close();

            return true;
        }
        catch(err) {
        }

        try {
            // paper.js

            // a bit shaky...
            var link = document.createElement('a');
            link.download = filename;
            link.href = str;
            link.click();

            return true;
        }
        catch(err) {
        }

        return false;
    },

    // TODO:
    // ------------------------------------------------------------------------
    // window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
    //  fs.root.getFile(
    //      'SnowFlake.svg',
    //      {
    //          create: true
    //      },
    //      function(fileEntry) {
    //          fileEntry.createWriter(function(fileWriter) {
    //              var blob = new Blob(flake.exportSVG());

    //              fileWriter.addEventListener('writeend', function() {
    //                  location.href = fileEntry.toURL();
    //              },
    //              false);
    //              fileWriter.write(blob);
    //          });
    //      }
    //  );

    // });

    // window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
    //     fs.root.getFile('test.bin', {create: true}, function(fileEntry) {
    //         fileEntry.createWriter(function(fileWriter) {
    //             var blob = new Blob(flake.exportSVG());

    //             fileWriter.addEventListener("writeend", function() {
    //                 // navigate to file, will download
    //                 location.href = fileEntry.toURL();
    //             }, false);

    //             fileWriter.write(blob);
    //         },
    //         function() {});
    //     },
    //     function() {});
    // },
    // function() {});


    /**
    * @param {String} fname
    *          the name of the file to open
    *
    * @return {Object} JSon output
    */
    openFile: function(fname) {
        var file = new File(script.file.parent, fname);
        file.open();
        var data = Json.decode( file.readAll() );
        file.close();

        return data;
    },

    /**
    * @param {String} fname
    *          the name of the file to delete
    */
    deleteFile: function(fname) {
        var file = new File(script.file.parent, fname);
        // If file exists, we need to remove it first in order to overwrite its content.
        if (file.exists()) file.remove();
    },

    /**
    * @param {String} fname
    *          the name of the file to verify exists
    *
    * @return {Boolean} true if exists, false otherwise
    */
    checkFile: function(fname) {
        var file = new File(script.file.parent, fname);
        if (file.exists()) return true;
        else return false;
    }


};
