/**
 * The base controller for connecting to a mongodb and performing CRUD operations on the music data.
 */
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    config = require('./../config.js').config,
    server = new Server(config.dbHost, config.dbPort, {auto_reconnect: true}),
    db = new Db('mediaDB', server),
    collection,
    DATABASE_NAME = 'music';

/**
 * Opens a connection to the database.
 */
db.open(function (err, db) {
    if (!err) {
        console.log("We are connected");
    }
});

/**
 * Saves a JSON object to the database.
 *
 * @param {String} jsonData the json object to save.
 */
exports.saveMediaData = function (jsonData) {
    collection = db.createCollection(DATABASE_NAME, function (err, collection) {
        if (err) {
            console.log(err);
        }
        if (jsonData) {
            collection.insert(jsonData);
        }
    });
};

/**
 * Clears all of the data from the
 */
exports.clearDatabase = function () {
    collection = db.collection(DATABASE_NAME, function (err, collection) {
        collection.remove({});
    });
};

exports.listTracks = function (artist, album, callback) {
    collection = db.collection(DATABASE_NAME, function (err, collection) {
        collection.distinct('Track_name', {Album: album, Performer: artist}, function (err, items) {
            callback(items);
        });
    });
};

exports.listArtists = function (callback) {
    collection = db.collection(DATABASE_NAME, function (err, collection) {
        collection.distinct('Performer', function (err, items) {
            callback(items);
        });
    });
};

exports.listAlbums = function (artist, callback) {
    collection = db.collection(DATABASE_NAME, function (err, collection) {
        if (artist === null) {
            collection.distinct('Album', function (err, items) {
                callback(items);
            });
        } else {
            collection.distinct('Album', {Performer: artist}, function(err, items){
                callback(items);
            });
        }

    });
};

exports.getTrack = function (artist, album, trackName, callback) {
    collection = db.collection(DATABASE_NAME, function (err, collection) {
        collection.find({Album: album, Performer: artist, Track_name: trackName}).toArray(function(err, results){
            callback(results[0]);
        });
    });
};

function _totalResults(callback) {
    collection = db.collection(DATABASE_NAME, function (err, collection) {
        collection.count(function (e, count) {
            callback(count);
        });
    });
}

function _fieldTotal(type, callback) {
    collection = db.collection(DATABASE_NAME, function (err, collection) {
        collection.distinct(type, function (err, items) {
            callback(items.length);
        });
    });
}


exports.total = function (callback) {
    var stats = {
        albums : '',
        artists: '',
        tracks : '',

        setAlbums: function (value) {
            this.albums = value;
        },

        setArtists: function (value) {
            this.artists = value;
        },

        setTracks: function (value) {
            this.tracks = value;
            callback({albums: this.albums, artists: this.artists, tracks: this.tracks})
        },

        loadData: function () {
            _fieldTotal('Album', this.setAlbums);
            _fieldTotal('Performer', this.setArtists);
            _totalResults(this.setTracks);
        }
    };
    stats.loadData();
};






