/**!
 * FASE
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 *
 * javascript class to load ASE files
 * requires jDataView - https://github.com/vjeux/jDataView
 *
 *
 * code inspired and modified from the following:
 *
 * Copyright (c) 2012, Ger Hobbelt (ger@hobbelt.com)
 * All rights reserved.
 *
 * https://gist.github.com/GerHobbelt/3173233
 *
 * LICENSE
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * The name Ger Hobbelt may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * Load Adobe Swatch Exchange (ASE) files
 *
 * @param  {String} input URL or file
 *
 * @return {Object}
 *
 * @example
 * var ase = new folio.FASE(url);
 *
 */
folio.FASE = function(input) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var colors = {};



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    (function init() {
        if (input) {
            return (typeof input === 'string')
                ? load(input)
                : (typeof input === 'object')
                    ? loadData(input)
                    : null;
        }
    })();



    // -----------------------------------------------------------------------------
    /**
     * load ASE file from a data buffer object
     *
     * @param  {Object} buffer data buffer object
     *
     * @return {Object}
     */
    function loadData(buffer) {
        var versionMajor;
        var versionMinor;
        var count;
        var view;

        var palette = {};
        var flattened = [];

        try {
            // big-endian format
            view = new jDataView(buffer, 0, undefined, false);
        }
        catch (e) {
            view = null;
        }

        if (!view ||
            'ASEF' !== view.getString(4) ||
            (versionMajor = view.getInt16()) < 1 ||
            (versionMinor = view.getInt16()) < 0 ||
            (count = view.getInt32()) < 1) {
                console.error('illegal file format, not a ASE color palette file');
        }

        if (!parse_block(view, palette)) {
            setColors({
                palette : palette,
                values  : flattened
            });
            return colors;
        }
    }


    /**
     * load ASE file from URL/file location
     *
     * @param  {String} url data as URL/file location
     *
     * @return {Object}
     */
    function load(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            if (xhr.response) {
                return loadData(xhr.response);
            }
            else {
                console.error('could not load ASE file');
                return colors;
            }
        }
        xhr.send(null);
    }


    // -----------------------------------------------------------------------------
    //
    // Gets
    //
    function rgb2str(rgb) {
        var r, g, b;

        r = rgb[0].toString(16);
        if (r.length < 2) {
            r = '0' + r;
        }
        g = rgb[1].toString(16);
        if (g.length < 2) {
            g = '0' + g;
        }
        b = rgb[2].toString(16);
        if (b.length < 2) {
            b = '0' + b;
        }
        return '#' + r + g + b;
    }

    function parse_utf16_Cstring(view) {
        var slen = view.getUint16();
        var c;
        var name = '';
        var i = slen;
        // ignore NUL sentinel at the end of the string
        while (--i > 0) {
            c = view.getUint16();
            name += String.fromCharCode(c);
        }
        view.getUint16();
        return name;
    }

    function parse_block(view, palette) {
        // parse block:
        var count, id, len, model, type, c, m, k, l, a, r, g, b, x, y, z, name, p;

        while (--count >= 0) {
            id = view.getUint16();

            switch (id) {
                default:
                    // illegal block; damaged ASE file?
                    console.error('unknown block type ' + id.toString(16) + ': corrupt ASE file');
                    return;
                return -1;

                // group start
                case 0xc001:
                    len = view.getUint32();
                    name = parse_utf16_Cstring(view);

                    if (!palette.groups) {
                        palette.groups = [];
                    }

                    palette.groups.push(p = {
                        name : name
                    });

                    if (parse_block(view, p)) {
                        return -1;
                    }
                    continue;

                // group end
                case 0xc002:
                    view.getUint32(); // skip 0 length
                    return 0;

                // color
                case 0x0001:
                    len = view.getUint32();
                    name = parse_utf16_Cstring(view);
                    model = view.getString(4);

                    if (!palette.colors) {
                        palette.colors = [];
                    }

                    palette.colors.push(p = {
                        name  : name,
                        model : model
                    });

                    switch (model) {
                        case 'CMYK':
                            c = view.getFloat32();
                            m = view.getFloat32();
                            y = view.getFloat32();
                            k = view.getFloat32();
                            p.cmyk = [c, m, y, k];

                            if (k >= 1) {
                                // Black
                                r = g = b = 0;
                            }
                            else {
                                // CMYK and CMY values from 0 to 1
                                c = c * (1 - k) + k;
                                m = m * (1 - k) + k;
                                y = y * (1 - k) + k;

                                // CMY values from 0 to 1
                                // RGB results from 0 to 255
                                r = (1 - c);
                                g = (1 - m);
                                b = (1 - y);

                                r = Math.min(255, Math.max(0, Math.round(r * 255)));
                                g = Math.min(255, Math.max(0, Math.round(g * 255)));
                                b = Math.min(255, Math.max(0, Math.round(b * 255)));
                            }
                            flattened.push(rgb2str(p.html_rgb = [r, g, b]));
                            break;

                        case 'RGB ':
                            r = view.getFloat32();
                            g = view.getFloat32();
                            b = view.getFloat32();
                            p.rgb = [r, g, b]; // also keep the raw RGB

                            r = Math.min(255, Math.max(0, Math.round(r * 255)));
                            g = Math.min(255, Math.max(0, Math.round(g * 255)));
                            b = Math.min(255, Math.max(0, Math.round(b * 255)));
                            flattened.push(rgb2str(p.html_rgb = [r, g, b]));
                            break;

                        case 'LAB ':
                            l = view.getFloat32();
                            a = view.getFloat32();
                            b = view.getFloat32();
                            p.lab = [l, a, b];

                            // Photoshop CS5.5 saves these as perunage (0..1), value, value. So we need to adjust L before commencing:
                            l *= 100;

                            // CIE-L*ab -> XYZ
                            y = (l + 16) / 116;
                            x = a / 500 + y;
                            z = y - b / 200;

                            if (Math.pow(y, 3) > 0.008856) {
                                y = Math.pow(y, 3);
                            }
                            else {
                                y = (y - 16 / 116) / 7.787;
                            }
                            if (Math.pow(x, 3) > 0.008856) {
                                x = Math.pow(x, 3);
                            }
                            else {
                                x = (x - 16 / 116) / 7.787;
                            }
                            if (Math.pow(z, 3) > 0.008856) {
                                z = Math.pow(z, 3);
                            }
                            else {
                                z = (z - 16 / 116) / 7.787;
                            }

                            x = 95.047 * x; // ref_X =  95.047     Observer= 2°, Illuminant= D65
                            y = 100.000 * y; // ref_Y = 100.000
                            z = 108.883 * z; // ref_Z = 108.883

                            // XYZ -> RGB
                            x = x / 100; // X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
                            y = y / 100; // Y from 0 to 100.000
                            z = z / 100; // Z from 0 to 108.883

                            r = x * 3.2406 + y * -1.5372 + z * -0.4986;
                            g = x * -0.9689 + y * 1.8758 + z * 0.0415;
                            b = x * 0.0557 + y * -0.2040 + z * 1.0570;

                            if (r > 0.0031308) {
                                r = 1.055 * Math.pow(r, 1 / 2.4) - 0.055;
                            }
                            else {
                                r = 12.92 * r;
                            }
                            if (g > 0.0031308) {
                                g = 1.055 * Math.pow(g, 1 / 2.4) - 0.055;
                            }
                            else {
                                g = 12.92 * g;
                            }
                            if (b > 0.0031308) {
                                b = 1.055 * Math.pow(b, 1 / 2.4) - 0.055;
                            }
                            else {
                                b = 12.92 * b;
                            }

                            r = Math.min(255, Math.max(0, Math.round(r * 255)));
                            g = Math.min(255, Math.max(0, Math.round(g * 255)));
                            b = Math.min(255, Math.max(0, Math.round(b * 255)));
                            flattened.push(rgb2str(p.html_rgb = [r, g, b]));
                            break;

                        case 'GRAY':
                            g = view.getFloat32();
                            p.gray = g;

                            g = Math.min(255, Math.max(0, Math.round(g * 255)));
                            flattened.push(rgb2str(p.html_rgb = [g, g, g]));
                            break;

                        default:
                            console.error('unknown color model ' + model + ': corrupt ASE file');
                            return -1;
                    }

                    type = view.getUint16();
                    // (0 => Global, 1 => Spot, 2 => Normal)
                    p.color_type = type;
                    continue;
            }
        }
        return 0;
    }

    // -----------------------------------------------------------------------------
    /**
     * return colors object
     *
     * @return {Object}
     */
    function getColors() {
        return colors;
    }



    // -----------------------------------------------------------------------------
    //
    // Sets
    //
    function setColors(obj) {
        colors = obj;
    }



    return {
        colors   : getColors,

        load     : load,
        loadData : loadData
    };
};
