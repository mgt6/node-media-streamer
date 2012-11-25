/**
 * The base class for getting the media data on each of the files in a folder
 */

var exec = require('child_process').exec;


/**
 * Runs the mediainfo command from the command line and passes the results into the callback method
 * @param folder
 * @param callback
 */
exports.scanMedia = function scanMedia(folder, callback) {

    var walk    = require('walk'),
        walker  = walk.walk(folder, { followLinks: false });

    walker.on('file', function (root, stat, next) {
        //TODO filter by file type
        // Add this file to the list of files
        exec("mediainfo --Output=XML \'" +  root + "/" + stat.name + "\'", function(err, stdout, stderr){
            if (err || stderr) {
                console.error("Error running command mediainfo: " + err + " " + stderr);
            } else {
                callback(stdout);
            }
        });
        next();
    });
};
























  /*  fs.readdir(folder, function (err, files) {
        if (err) {
            throw err;
        }
        files.forEach( function (file) {
            console.log(file);
        });
        *//*console.log(myfiles);*//*
    });*/

    /*console.log("running command: " + "mediainfo --Output=XML " + folder);
    exec("mediainfo --Output=XML " + folder, function(err, stdout, stderr){
        if(err || stderr) {
            console.error("Error running command mediainfo: " + err + " " + stderr);
        } else {
           callback(stdout);
        }
    });*/


