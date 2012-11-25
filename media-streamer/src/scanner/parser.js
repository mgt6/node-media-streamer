/**
 * The class parsing the xml document produced by the media info command into json
 */

var xml2js = require('xml2js'),
    callback,
    parser = new xml2js.Parser();

exports.parse = function parse(data, cb) {
    callback = cb;
    parser.parseString(data);
};

parser.on('end', function (result) {
    callback(result.File.track[0]);
});





