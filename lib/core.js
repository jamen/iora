(function(express, refig, fs, path){
  'use strict';
  module.exports = exports = function(filepath, async){
    filepath = (function(){
      if (!path.isAbsolute(filepath)) {
        filepath = path.resolve(process.cwd() + '/' + filepath);
        if (path.extname(filepath) === '') {
          return filepath + '.json';
        } else {
          return filepath;
        }
      } else {
        return filepath;
      }
    })();

    refig.set('async', true).read(filepath, function(err, config){
      if (err) throw err;
      var started = 0,
          finished = 0,
          done = function(app){
            finished++;
            if (started === finished) async(app, filepath);
          };

      // Required
      if (typeof config.routesDir !== 'string') throw Error('routesDir must be a string!');
      if (typeof config.controllersDir !== 'string') throw Error('controllersDir must be a string!');
      if (typeof config.routes !== 'object') throw Error('routes must be an object!');

      var app = express();

      // controllers
      started++;
      fs.readdir(config.controllersDir, function(err, files){
        if (!err) {
          files.forEach(function(file){
            require(path.resolve(config.controllersDir + '/' + file))(app, express, config);
          });
          done(app);
        } else {
          throw err;
        }
      });

      // npm controllers
      if (typeof config.controllers !== 'undefined') {
        started++;
        if (config.controllers instanceof Array) {
          config.controllers.forEach(function(name){
            require(name)(app, express, config);
          });
          done(app);
        } else {
          throw Error('controllers must be an array!');
        }
      }

      // Routes
      started++;
      for (var file in config.routes) {
        var route = config.routes[file];
        if (typeof route !== 'object') throw Error(file + ' must be an object!');
        var routeFunction = require(path.resolve(config.routesDir + '/' + file));
        if (typeof route.subDomain !== 'undefined') {
          app.all(route.url, function(req, res){
            var reqSub = req.headers.host.match(/^(.+)\.(?:.+)\.(?:.+)$/);
            if (reqSub) {
              reqSub = reqSub[1];
              if (route.subDomain instanceof Array) {
                if (reqSub.indexOf(route.subDomain) !== -1) routeFunction(req, res);
              } else {
                if (reqSub === route.subDomain) routeFunction(req, res);
              }
            }
          });
        } else {
          app.all(route.url, routeFunction);
        }
        done(app);
      }


    });
  };
})(
  require('express'),
  require('refig'),
  require('fs'),
  require('path')
);
