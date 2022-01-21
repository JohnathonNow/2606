function writeFile(fileEntry, dataObj, isAppend) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
        // If we are appending data to file, go to the end of the file.
        if (isAppend) {
            try {
                fileWriter.seek(fileWriter.length);
            }
            catch (e) {
                console.log("file doesn't exist!");
            }
        }
        fileWriter.write(dataObj);
    });
}

function createFile(dirEntry, fileName, isAppend, content) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

        console.log(fileEntry);
        console.log(content);
        writeFile(fileEntry, content, isAppend);

    }, onError);

}

function write(name, content) {
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
        console.log('file system open: ' + dirEntry.name);
        var isAppend = false;
        console.log(name);
        createFile(dirEntry, name, isAppend, content);
    }, onError);

}

function onError(e) {
    console.error(e);
}
