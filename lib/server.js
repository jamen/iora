/*
 * server: Builds an express server.
 */

var express = require('express'),

load = {
  middleware: require('./middleware'),
  routes: require('./routes')
};

module.exports = function(){
  var app = express();

  load.middleware(app);
  load.routes(app);

  return app;
};
