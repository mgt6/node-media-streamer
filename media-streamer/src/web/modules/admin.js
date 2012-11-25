/**
 * The base rest for administration of the service
 */

var restServer = null,
    ENDPOINT = '/admin/',
    scanner = require('./../../scanner/scanner');


function _loadEndpoints() {
    restServer.get(ENDPOINT + 'scan', function (req, res) {
        scanner.scan();
        res.send({status: "started"});
    });
}

exports.setup = function (app) {
    restServer = app;
    _loadEndpoints();
};

