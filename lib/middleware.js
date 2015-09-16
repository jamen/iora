/*
 * middleware: Loads custom and npm middleware.
 */

var path = require('path'),
    fs = require('fs'),
    console = require('./utils');

module.exports = function(app, express){
  var config = iora.config;

  // Check and set defaults
  if (typeof config.base !== 'object') config.base = {};

  var base = config.base.middleware;
  if (typeof base !== 'string') {
    base = path.join(iora.dir, 'middleware');
  } else {
    base = path.resolve(iora.dir, base);
  }

  var middleware = config.middleware;
  if (!Array.isArray(middleware)) middleware = null;

  // Loader:
  var load = function(path){
    try {
      return require.apply(require, arguments);
    } catch (e) {
      console.warn('Failed to load ' + path);
      return function(){};
    }
  };

  // Load npm middleware
  if (middleware) {
    middleware.forEach(function(name){
      load(name.replace(/^@/, 'iora-'))(app, config, iora, express);
    });
  }

  // Load base folder middleware
  if (base) {
    fs.readdir(base, function(err, files){
      if (!err) {
        files.forEach(function(file){
          load(path.resolve(path.join(base, file)))(app, config, iora, express);
        });
      } else {
        console.warn('Couldn\'t find middleware directory ' + base);
      }
    });
  }
};
