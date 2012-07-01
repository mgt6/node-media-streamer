/**
 * @author Mark Taylor
 * @since 01/07/12
 * @version 0.6.12
 *
 * The base rest for administration of the service
 */

var restServer = null,
    ENDPOINT = '/admin/',
    scanner = require('./../../scanner/scanner');

exports.setup = function(app){
    restServer = app;
    loadEndpoints();
};

function loadEndpoints(){
    restServer.get(ENDPOINT + 'scan', function(req, res){
        scanner.scan();
        res.send({status: "started"});
    });
}
