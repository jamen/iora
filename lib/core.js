(function(express, jc, fs, path){
  'use strict';

  module.exports = exports = function(argv){
    var config,
    configPath = (function(input){
      if (typeof input === 'undefined') return 'iora.json';
      if (path.extname(input) === '')
        return input + '.json';
      else
        return input;
    })(argv[1]);
    
    try {
      config = jc.read(path.resolve(configPath));
    } catch (e) {
      var type = 'read';
      if (e.type === 'parse') type = 'parse';
      throw new Error('Failed to ' + type + ' config "' + path.resolve(configPath) + '"');
    }
    var app = express();

    // Load controllers!
    if (config.controllersDir !== null) {
      var controllersDir = config.controllersDir || process.cwd() + '/controllers';
      fs.readdir(path.resolve(controllersDir), function(err, files){
        if (!err) {
          var controller = null;
          files.forEach(function(file){
            controller = require(path.resolve(controllersDir + path.sep + file));
            if (typeof controller === 'function') {
              controller(express, app);
            } else {
              return;
            }
          });
        } else {
          throw new Error(
            'Failed to find \'controllersDir\': ' + controllersDir + '\r\n' +
            '(If you want to disable controllers, set \'controllersDir\': null)'
          );
        }
      });
    }

    // Load npm middleware controllers!
    if (typeof config.controllers === 'object' && config.controllers !== null) {
      for (var middleware in config.controllers) {
        var version = config.controllers[middleware];
        require(middleware + '@' + version)(express, app);
      }
    }

    // Load routes.
    if (typeof config.routes !== 'undefined' && config.routes instanceof Object && !(config.routes instanceof Array)) {
      var creator = function(file){
        if (typeof file !== 'undefined') {
          if (typeof file === 'string') {
            return require(path.resolve(file));
          } else {
            throw new Error('Incorrect datatype "'+ typeof file +'" for file route "'+file+'", can only be String');
          }
        } else {
          throw new Error('Couldn\'t find routes file "' + path.resolve(file) + '"');
        }
      },

      sub = function(route, loaderFunction){
        if (route.subDomain instanceof Array) {
          var functionCluster = [];
          route.subDomain.forEach(function(sub){
            functionCluster.push(function(req){
              if (sub === req.headers.host.split('.')[0]) loaderFunction.apply(this, arguments);
            });
          });
          return functionCluster;
        } else if (typeof route.subDomain === 'string') {
          return function(req){
            if (route.subDomain === req.headers.host.split('.')[0]) loaderFunction.apply(this, arguments);
          };
        } else {
          throw new Error('"subDomain" in "'+file+'" doesn\'t have a datatype of an Array or String');
        }
      };

      if (config.routes instanceof Object && !(config.routes instanceof Array)) {
        for (var file in config.routes) {
          var route = config.routes[file];
          if (typeof route !== 'undefined' && route instanceof Object && !(route instanceof Array)) {
            var routeFile;
            try {
              routeFile = creator(config.routesDir + path.sep + file);
            } catch (e) {
              throw new Error('Failed to load "'+path.resolve(file)+'".');
            }
            if (route.url instanceof Array || typeof route.url === 'string') {
              if (typeof route.subDomain !== 'undefined') {
                app.all(route.url, sub(route, routeFile));
              } else {
                app.all(route.url, routeFile);
              }
            } else {
              throw new Error('"url" in "'+file+'" doesn\'t have a datatype of an Array or String');
            }
          } else {
            throw new Error('"'+file+'" has an incorrect datatype.  It must be an object');
          }
        }
      } else {
        throw new Error('"routes" has an incorrect datatype.  It must be an object');
      }
    }


    return app;
  };
})(require('express'),
   require('json-config-reader'),
   require('fs'),
   require('path'));
