/*
 * run: Takes an express server and runs it.
 */

var protocols = {
      http: require('http'),
      https: require('https'),
    },
    fs = require('fs'),
    path = require('path');

module.exports = function(app){
  var config = iora.config,
      files = config.https.options,
      base = config.base.https;

  // Things to be used.
  var port, host, listener, protocol, options;

  // Set defaults
  if (typeof base !== 'string') base = process.cwd();
  if (typeof files !== 'object') options = {};

  if (files) {
    // Path -> file data
    for (var opt in files) {
      files[opt] = fs.readFileSync(path.join(base, files[opt]));
    }
  }
  for (var name in protocols) {
    // Disabled checker
    if (typeof options.disabled === 'undefined' || !options.disabled) {
      // Set defaults
      options = config[name];
      if (typeof options !== 'object') options = {};

      port = options.port;
      if (typeof port !== 'number') port = (name === 'https' ? 443 : 80);

      host = config.host || options.host;
      if (typeof host !== 'string') host = '0.0.0.0';

      protocol = protocols[name];

      if (typeof config.listener !== 'undefined' || typeof options.listener !== 'undefined') {
        try {
          listener = require(config.listener || options.listener);
        } catch (e) {
          console.warn('Couldn\'t load listener ('+name+')');
          listener = function(){};
        }
      } else {
         listener = function(){};
      }


      // Create and listen to servers
      protocol.Server(
        (name === 'https' ? options : app),
        (name === 'https' ? app : undefined)
      ).listen(port, host, listener);
    }
  }
};
