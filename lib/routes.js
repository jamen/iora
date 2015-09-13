/*
 * routes: Loads routes into the server.
 */

var path = require('path');

module.exports = function(app){
  var config = iora.config;

  // Set defaults
  var base = config.base.routes;
  if (typeof base !== 'string') base = path.join(process.cwd(), 'routes');

  // Load routes
  var url;
  for (var file in config.routes) {
    url = config.routes[file];

    // Get path
    if (!path.isAbsolute(file)) file = path.join(base, file);

    try {
      app.all(url, require(path));
    } catch (e) {
      console.warn('Failed to load routes ' + path);
    }
  }
};
