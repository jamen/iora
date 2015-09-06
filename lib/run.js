(function(express, refig, path, protocols){
  'use strict';
  refig.set('async', false);

  module.exports = exports = function(argv, app){
    var configPath = (function(input){
      if (typeof input === 'undefined') return 'iora.json';
      if (path.extname(input) === '')
        return input + '.json';
      else
        return input;
    })(argv[1]),
    config = refig.read(path.resolve(configPath));

    var initServer = function(protocol){
      var server = config[protocol];
      if (typeof server === 'undefined') return;
      if (typeof server.disabled === 'undefined' || !server.disabled) {
        protocols[protocol].Server(
          (function(isHTTPS){
            if (isHTTPS) {
              return config.options;
            } else {
              return app;
            }
          })(protocol === 'https'),
          protocol === 'https' ? app : undefined
        ).listen(
          server.port || (protocol === 'https' ? 443 : 80),
          config.host || server.host || '0.0.0.0',
          (function(listener){
            if (typeof listener !== 'undefined') return require(path.resolve(listener));
          })(config.listener || server.listener)
        );
      }
    };

    initServer('http');
    initServer('https');

  };
})(require('express'),
   require('refig'),
   require('path'),
   {
     'http': require('http'),
     'https': require('https'),
   });
