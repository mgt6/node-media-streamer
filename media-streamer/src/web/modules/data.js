/**
 * @author Mark Taylor
 * @since 01/07/12
 * @version 0.6.12
 *
 * The base rest getting data about the information held by the service
 */


var restServer = null;
var database = require('./../../database/mongo');
var ENDPOINT = '/data/';


exports.setup = function(app){
    restServer = app;
    loadEndpoints();
};

function loadEndpoints(){
    restServer.get(ENDPOINT + 'albums', function(req, res){
        var publish = function(data){
            res.send(data);
        };
        database.listAlbums(null, publish)
    });

    restServer.get(ENDPOINT + 'artists', function(req, res){
        var publish = function(data){
            res.send(data);
        };
        database.listArtists(publish)
    });

    restServer.get(ENDPOINT + ':artist/albums', function(req, res){
        var publish = function(data){
            res.send(data);
        };
        var artist = req.params.artist;
        database.listAlbums(artist, publish);
    });

    restServer.get(ENDPOINT + ':artist/:album/tracks', function(req, res){
        var publish = function(data){
            res.send(data);
        };
        var album = req.params.album,
            artist = req.params.artist;
        database.listTracks(artist, album, publish);
    });

    restServer.get(ENDPOINT + 'stats', function(req, res){
        var publish = function(data){
            res.send(data);
        };
        database.total(publish);
    });

    restServer.get(ENDPOINT + ':artist/:album/:track', function(req, res){
        var publish = function(data){
            res.send(data)
        };
        var album = req.params.album,
            artist = req.params.artist,
            trackName = req.params.track;
        database.getTrack(artist, album,trackName, publish);
    });
}

