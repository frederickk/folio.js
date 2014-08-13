// /*
//  * FASE
//  *
//  * Ken Frederick
//  * ken.frederick@gmx.de
//  *
//  * http://kennethfrederick.de/
//  * http://blog.kennethfrederick.de/
//  *
//  *
//  *  a class to load ASE files
//  *  code inspired and modified from the following
//  *
//  *  https://github.com/DanielWeber/kulerviewer/
//  *  http://www.generative-gestaltung.de/
//  *
//  */


// folio.FASE = function(filepath) {
//     // -----------------------------------------------------------------------------
//     // Properties
//     // -----------------------------------------------------------------------------
//     var filepath = filepath;

//     var palette = [];
//     var bVerbose = false;



//     // -----------------------------------------------------------------------------
//     // Methods
//     // -----------------------------------------------------------------------------
//     /**
//      * @param {} filepath
//      *          filepath of ASE file
//      */
//     function load(filepath) {
//         parseASEFile(filepath);
//     };

//     //
//     // load ASE
//     // https://github.com/DanielWeber/kulerviewer/
//     //
//     function parseASEFile(filepath) {
//         File ase = new File(filepath);
//         FileInputStream inStream;
//         ByteBuffer buf;

//         try {
//             inStream = new FileInputStream(ase);
//             buf = ByteBuffer.allocate((int)inStream.getChannel().size() * 2);
//             buf.order(ByteOrder.BIG_ENDIAN);
//             inStream.getChannel().read(buf);

//             buf.rewind();

//             byte[] signature = new byte[4];
//             byte[] expectedSignature = new byte[] { 'A', 'S', 'E', 'F' };
//             buf.get(signature);
//             if (!Arrays.equals(expectedSignature, signature)) {
//                 throw new IOException("'" + ase.getAbsolutePath() + "' is not an .ase file. Signature does not match!");
//             }
//             /* int major = */    buf.getShort();
//             /* int minor = */    buf.getShort();
//             int noBlocks = buf.getInt();
//             for( int i=0; i<noBlocks; ++i) {
//                 readBlock(buf);
//             }
//         }
//         catch(Exception e) {
//             if(bVerbose) System.out.println(e);
//         }
//     };


//     // -----------------------------------------------------------------------------
//     //
//     // Gets
//     //

//     /**
//      * Get a color at index.
//      * It does not matter if index is out of bounds, this function will just cycle.
//      *
//      * @param {Number} index
//      *
//      * @return {Number} Returns the color at the index position
//      */
//     /**
//      *
//      * @return {Array} Returns the colors as array
//      */
//     function get(index) {
//         var len = palette.length;
//         return (index != undefined)
//         	? palette.get( index < 0 ? index % len + len : index % len )
//         	: palette;
//     };

// };
