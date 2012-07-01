/**
 * @author Mark Taylor
 * @since 01/07/12
 * @version 0.6.12
 *
 * The base rest controller for the app
 */

var express = require('express');


exports.setup = function(){
    var app =  express.createServer();
    app.listen(8080);
    app.use(express.static(__dirname + '/static'));
    loadModules(app);
};

function loadModules(app){
    require('./modules/data').setup(app);
    require('./modules/admin').setup(app);
    require('./modules/stream').setup(app);
}