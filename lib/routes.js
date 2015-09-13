/*
 * routes: Loads routes into the server.
 */

var path = require('path');

module.exports = function(app){
  var config = iora.config;

  // Check and set defaults
  if (typeof config.base !== 'object') config.base = {};

  // Set defaults
  var base = config.base.routes;
  if (typeof base !== 'string') base = path.join(process.cwd(), 'routes');

  // Loader:
  var load = function(path){
    try {
      return require.apply(require, arguments);
    } catch (e) {
      console.warn('Failed to load ' + path);
      return function(){};
    }
  };

  // Load routes
  var url;
  for (var file in config.routes) {
    url = config.routes[file];

    // Get path
    if (!path.isAbsolute(file)) file = path.join(base, file);

    app.all(url, load(file));
  }
};
