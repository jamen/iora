(function(express, refig, path, fs, protocols){
  'use strict';
  module.exports = exports = function(argv, app, filepath){
    refig.use('async', true).read(filepath, function(err, config){
      if (err) throw err;

      for (var name in protocols) {
        var protocol = protocols[name],
            options = config[name] || {};

        if (typeof options.disabled === 'undefined' || !options.disabled) {

          var data = {};
          if (name === 'https' && typeof options.options === 'object') {
            for (var type in options.options) {
              var path = options.options[type];
              data[type] = fs.readFileSync(path).toString();
            }
          }

          protocol.Server((name === 'https' ? data : app), (name === 'https' ? app : undefined)).listen(
            options.port || (name === 'https' ? 433 : 80),
            options.host || config.host || '0.0.0.0'
          );

        }
      }
    });
  };
})(require('express'),
   require('refig'),
   require('path'),
   require('fs'),
   {
     'http': require('http'),
     'https': require('https'),
   });
