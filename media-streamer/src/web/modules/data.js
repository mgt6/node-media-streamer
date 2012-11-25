/**
 * The base rest getting data about the information held by the service
 */
var restServer = null;
var database = require('./../../database/mongo');
var ENDPOINT = '/data/';

function _loadEndpoints() {
    restServer.get(ENDPOINT + 'albums', function (req, res) {
        var publish = function (data) {
            res.send(data);
        };
        database.listAlbums(null, publish);
    });

    restServer.get(ENDPOINT + 'artists', function (req, res) {
        var publish = function (data) {
            res.send(data);
        };
        database.listArtists(publish);
    });

    restServer.get(ENDPOINT + ':artist/albums', function (req, res) {
        var publish = function (data) {
            res.send(data);
        },
            artist = req.params.artist;
        database.listAlbums(artist, publish);
    });

    restServer.get(ENDPOINT + ':artist/:album/tracks', function (req, res) {
        var publish = function (data) {
            res.send(data);
        },
            album = req.params.album,
            artist = req.params.artist;
        database.listTracks(artist, album, publish);
    });

    restServer.get(ENDPOINT + 'stats', function (req, res) {
        var publish = function (data) {
            res.send(data);
        };
        database.total(publish);
    });

    restServer.get(ENDPOINT + ':artist/:album/:track', function (req, res) {
        var publish = function (data) {
            res.send(data);
        },
            album = req.params.album,
            artist = req.params.artist,
            trackName = req.params.track;
        database.getTrack(artist, album, trackName, publish);
    });
}

exports.setup = function (app) {
    restServer = app;
    _loadEndpoints();
};

