(function(express, jc, path, http, https, fs){
  'use strict';

  var Run = function(argv, app){
    var configPath = (typeof argv[1] === 'undefined' ?
                      'iora.json' :
                      (path.extname(argv[1]) !== '') ?
                       argv[1] :
                       argv[1] + '.json'
                     );

    var config = jc.read(path.resolve(configPath));

    if (typeof config.http !== 'undefined' && !config.http.disabled) {
      http.Server(app).listen(
        config.http.port || 80,
        config.host || config.http.host || '0.0.0.0',
        function(){ console.log('test'); }
      );
    }

    if (typeof config.https !== 'undefined' && !config.https.disabled) {
      var fetchedData = {};
      for (var key in config.https.options) {
        if (typeof config.https.options[key] === 'string') {
          fs.readFile(config.https.options[key], function(err, data){
            if (!err) {
              fetchedData[key] = data;
            } else {
              fetchedData[key] = config.https.options[key];
            }
          });
        }
      }
      https.Server(fetchedData, app).listen(
        config.https.port || 80,
        config.host || config.https.host || '0.0.0.0'
      );
    }
  };

  module.exports = exports = Run;
})(require('express'),
   require('json-config-reader'),
   require('path'),
   require('http'),
   require('https'),
   require('fs'));
