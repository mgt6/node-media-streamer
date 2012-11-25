/**
 * The base rest controller for streaming music from the service
 */

var restServer = null,
    ENDPOINT = '/stream/',
    util = require('util'),
    ffmpeg = require('fluent-ffmpeg'),
    playlist = require('playlist.js');

/**
 * Makes a call to the playlist controller to get the next track that the player with the given ID should play.
 *
 * @param {String} pid The id of the player requesting the track so that
 * the players playlist can be looked up.
 * @return {Object} The track to play in the format:
 *  {
 *      file:'/home/foo/music/foo fighters/foo.mp3',
 *      id: '123' //The database ID of the track so a lookup can be done for the data if required.
 *  }
 * @private
 */
function _getTrack(pid) {
    return playlist.getNextTrack(pid);
}

/**
 * Loads the rest endpoints responsible for streaming media to a client.
 */
function loadEndpoints() {

    /**
     *  Gets a stream for a given player with a given ID. All tracks, no matter what format they are stored in will be
     *  converted to an mp3 stream before they are streamed to allow for a consistent exposed interface.
     *
     *  Usage:
     *
     */
    restServer.get(ENDPOINT + '/:pid/stream.mp3', function (req, res) {
        res.contentType('mp3');
        var pathToMovie = _getTrack().file,
            proc = new ffmpeg({ source: pathToMovie, nolog: false })
                .toFormat('mp3')
                .writeToStream(res, function (retcode, error) {
                    if (error) {
                        console.error(error);
                    }
                });
    });
}

exports.setup = function (app) {
    restServer = app;
    loadEndpoints();
};

