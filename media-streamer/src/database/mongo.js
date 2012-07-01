/**
 * @author Mark Taylor
 * @since 01/07/12
 * @version 0.6.12
 *
 * The base controller for connecting to a mongodb
 */
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    config = require('./../config.js').config;


var server = new Server(config.dbHost, config.dbPort, {auto_reconnect: true});
var db = new Db('mediaDB', server),
    collection;

db.open(function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
});


exports.saveMediaData = function(jsonData){
    collection = db.createCollection('music', function(err, collection) {
        if(err){
            console.log(err);
        }
        if(jsonData){
           collection.insert(jsonData);
        }
    });
};

exports.clearDatabase = function(){
    collection = db.collection('music', function(err, collection){
            collection.remove({});
    });
};

exports.listTracks = function(artist, album, callback) {
    collection = db.collection('music', function(err, collection){
        collection.distinct('Track_name', {Album: album, Performer: artist}, function(err, items){
            callback(items);
        });
    });
};

exports.listArtists = function(callback){
    collection = db.collection('music', function(err, collection) {
        collection.distinct('Performer', function(err, items){
            callback(items);
        });
    });
};

exports.listAlbums = function(artist, callback){
    collection = db.collection('music', function(err, collection) {
        if(artist === null) {
            collection.distinct('Album', function(err, items){
                callback(items);
            });
        } else {
            collection.distinct('Album', {Performer: artist}, function(err, items){
                callback(items);
            });
        }

    });
};

exports.getTrack = function(artist, album, trackName, callback) {
    collection = db.collection('music', function(err, collection){
        collection.find({Album: album, Performer: artist, Track_name: trackName}).toArray(function(err, results){
            callback(results[0]);
        });
    });
};


exports.total = function(callback){
   var stats = {
       albums : '',
       artists: '',
       tracks : '',

       setAlbums: function(value){
           this.albums = value;
       },

       setArtists: function (value){
           this.artists = value;
       },

       setTracks: function(value){
            this.tracks = value;
           callback({albums: this.albums, artists: this.artists, tracks: this.tracks})
       },

       loadData: function(){
           fieldTotal('Album', this.setAlbums);
           fieldTotal('Performer', this.setArtists);
           totalResults(this.setTracks);
       }
   };
   stats.loadData();
};

function totalResults(callback){
    collection = db.collection('music', function(err, collection) {
        collection.count(function(e, count){
            callback(count);
        });
    });
}

function fieldTotal(type, callback){
    collection = db.collection('music', function(err, collection) {
        collection.distinct(type, function(err, items){
            callback(items.length);
        });
    });
}




