/**!
 * FDrop
 *
 * Ken Frederick
 * ken.frederick@gmx.de
 *
 * http://kennethfrederick.de/
 * http://blog.kennethfrederick.de/
 *
 */


/**
 * @param {Sring} element
 *              (optional) HTML elemment for drop-target
 *              by default the entire window is droppable
 * @param {Array} properties
 * {
 * }
 *
 */
folio.FDrop = function(element) {
    // -----------------------------------------------------------------------------
    //
    // Properties
    //
    // -----------------------------------------------------------------------------
    var fileTypes = {
        text        : /text.*/,
        image       : /image.*/,
        video       : /video.*/,
        application : /application.*/
    };
    var FDropEvent = {
        id          : '',

        isImage     : false,
        isVideo     : false,
        isFile      : false,
        isFileList  : false,
        isDirectory : false,

        filename    : '',
        type        : '',
        data        : '',
        size        : 0,
        text        : '',
        file        : '',
        files       : []
    };
    var output;

    // progress bar
    var totalSize = 0;
    var totalLoad = 0;
    var progressBar;

    var bError = false;



    // -----------------------------------------------------------------------------
    //
    // Methods
    //
    // -----------------------------------------------------------------------------
    (function() {
    // function init(element) {
        // Check for the various File API support.
        var onDragEnterEvent;
        var onDragOverEvent;
        var onDropEvent;
        var onDrop;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            onDragEnterEvent = function(event) {
                event.stopPropagation();
                event.preventDefault();
            }

            onDragOverEvent = function(event) {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';
            }

            onDropEvent = function(event) {
                event.stopPropagation();
                event.preventDefault();
                setFiles(event.dataTransfer.files);
            }

            onDrop = function() {
            }

            // by default the entire window is droppable
            element = element || document.body;
            element.addEventListener('dragenter', onDragEnterEvent, false);
            element.addEventListener('dragover',  onDragOverEvent, false);
            element.addEventListener('drop',      onDropEvent, false);
            element.addEventListener('ondrop',    onDrop, false);
        }
        else {
            alert('Drag and drop is not fully supported in this browser.');
        }
    // };
    }());

    // -----------------------------------------------------------------------------
    function handleFile(file, obj) {
        handleImage(file, obj);
        // handleVideo(file, obj);
        handleText(file, obj);
        handleGeneric(file, obj);

        if (bError) {
            // an error means most likely a directory
            obj.isDirectory = true;
        }
    }

    function handleFiles(files) {
        if (files.length > 1) {
            output = [];
            for (var i = 0; i < files.length; i++) {
                var f = files[i];
                output.push( Object.create(FDropEvent) );
                output[i].id = element.id;
                output[i].isFileList = true;
                output[i].filename = f.name;
                output[i].size = f.size;
                output[i].files.push( f.name );
                handleFile(f, output[i]);
            }
        }
        else {
            output = Object.create(FDropEvent);
            output.id = element.id;
            output.filename = files.name;
            output.size = files.size;
            handleFile(files, output);
        }

        return output;
    }

    function createProgressBar() {
        progressBar = document.createElement('div');
        progressBar.id = 'progressBar';
        progressBar.style.position = 'absolute';
        progressBar.style.top = '0px';
        progressBar.style.left = '0px';
        progressBar.style.width = '0px';
        progressBar.style.height = '18px';
        progressBar.style.background = 'rgba(0, 255, 170, 0.3)';
        progressBar.style.color = 'rgba(255, 255, 255, 0.9)';
        progressBar.style.paddingLeft = '6px';
        progressBar.style.paddingTop = '3px';
        progressBar.style.zIndex = '2000';

        document.body.appendChild(progressBar);
    }

    // -----------------------------------------------------------------------------
    function handleText(file, obj) {
        // if (file.type.match(fileTypes.text)) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                obj.text = fileReader.result;
                obj.type = file.type;

                obj.isFile = true;
            };
            // fileReader.onloadend = complete;
            fileReader.onprogress = progress;
            fileReader.onerror = error;
            fileReader.readAsText(file);
        // }
    }

    function handleImage(file, obj) {
        if (file.type.match(fileTypes.image)) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                var img = new Image();
                img.src = fileReader.result;

                obj.file = img;
                obj.type = file.type;

                obj.isImage = true;
            };
            // fileReader.onloadend = complete;
            fileReader.onprogress = progress;
            fileReader.onerror = error;
            fileReader.readAsDataURL(file);
        }
    }

    // function handleVideo(file, obj) {
    //     if (file.type.match(fileTypes.video)) {
    //         var fileReader = new FileReader();
    //         fileReader.onload = function() {
    //             obj.data = fileReader.result;
    //             obj.type = file.type;

    //             obj.isVideo = true;
    //         };
    //         // fileReader.onloadend = complete;
    //         fileReader.onprogress = progress;
    //         fileReader.onerror = error;
    //         fileReader.readAsDataURL(file);
    //     }
    // }

    function handleGeneric(file, obj) {
        var fileReader = new FileReader();
        fileReader.onload = function() {
            obj.data = fileReader.result;
            obj.type = file.type;
        };
        fileReader.onprogress = progress;
        fileReader.onloadend = complete;
        // fileReader.readAsDataURL(file);
        fileReader.readAsBinaryString(file);
    }

    // -----------------------------------------------------------------------------

    //
    // Sets
    //
    /**
     *
     * @param {window.File} files
     *              the dropped file/files to process
     *
     */
    function setFiles(files) {
        if (files != null) {
            createProgressBar();

            if (files.length === 1) {
                files = files[0];
                totalSize = files.size;
            }
            else {
                for (var i = 0; i < files.length; i++) {
                    totalSize += files[i].size;
                }
            }
            return handleFiles(files);
        }
    }



    // -----------------------------------------------------------------------------
    //
    // Events
    //
    // -----------------------------------------------------------------------------
    function progress(event) {
        totalLoad = Math.ceil((event.loaded / totalSize) * 100);

        progressBar.style.width = (totalLoad + '%').toString();
        progressBar.innerHTML = (totalLoad + '%').toString();
    }

    function complete() {
        if (totalLoad >= 98) {
            onDrop(output);
            document.body.removeChild(progressBar);
        }
    }

    function error() {
        bError = true;
    }



    // -----------------------------------------------------------------------------
    return {
        target : element,
        event  : output,

        read   : setFiles
    };

};
