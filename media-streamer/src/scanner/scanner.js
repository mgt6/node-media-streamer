/**
 * @author Mark Taylor
 * @since 01/07/12
 * @version 0.6.12
 *
 * The class used to run the scan command.
 */

var mediainfo = require('./mediainfo'),
    parser = require('./parser'),
    mongo = require('./../database/mongo'),
    config = require('./../config').config;


/**
 * Scans the media root as set in the config file.
 *
 * @param callback The method to call once the scan is complete
 */
exports.scan = function(callback){
    var saveResults = function(data){
        mongo.saveMediaData(data)
    };
    var parseMedia = function(xml){
        parser.parse(xml, saveResults);
    };
    mongo.clearDatabase();
    mediainfo.scanMedia(config.musicRoot, parseMedia);
};


