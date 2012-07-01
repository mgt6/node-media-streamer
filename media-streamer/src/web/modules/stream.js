/**
 * @author Mark Taylor
 * @since 01/07/12
 * @version 0.6.12
 *
 * The base rest controller for streaming music from the service
 */

var restServer = null,
    ENDPOINT = '/stream/',
    database = require('./../../database/mongo');

exports.setup = function(app){
    restServer = app;
    loadEndpoints();
};

function loadEndpoints(){
    restServer.get(ENDPOINT + ':artist/:album/:track/stream.mp3', function(req, res){
        var sendFile = function(data){
            var filePath = data.Complete_name;
            res.sendfile(filePath,  { bufferSize: 1024 });
        };
        var album = req.params.album,
        artist = req.params.artist,
        trackName = req.params.track;
        database.getTrack(artist, album,trackName, sendFile);

    });
}
