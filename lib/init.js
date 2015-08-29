(function(fs, stdin, stdout, cwd){
  'use strict';

  module.exports = exports = function(){
    stdin.resume();
    var currentPrompt = 'routesDir',
        generatedConfig = {};

    // First prompt:
    stdout.write('Routes directory? ('+cwd+'/routes): ');
    stdin.on('data', function(rawData){
      var data = rawData.toString().slice(0, rawData.length - 1);

      // routesDir
      if (currentPrompt === 'routesDir') {
        if (data) {
        generatedConfig.routesDir = (data ? data : cwd+'/routes');
      }

        // Second prompt:
        stdout.write('Controllers directory? ('+cwd+'/controllers): ');
        currentPrompt = 'controllersDir';
      }

      // controllersDir
      else if (currentPrompt === 'controllersDir') {
        generatedConfig.controllersDir = (data ? data : cwd+'/controllers');

        stdout.write('HTTP disabled? (false): ');
        currentPrompt = 'http.disabled';
      }

      // http.disabled
      else if (currentPrompt === 'http.disabled') {
        generatedConfig.http = {};
        if (data === 'true') {
          generatedConfig.http.disabled = true;
          stdout.write('HTTPS disabled? (false): ');
          currentPrompt = 'https.disabled';
        } else {
          stdout.write('HTTP port? (80): ');
          currentPrompt = 'http.port';
        }
      }

      // http.port
      else if (currentPrompt === 'http.port') {
        if (!data.match(/.[^0-9]/)) {
          generatedConfig.http.port = parseInt(data);
        } else {
          generatedConfig.http.port = 80;
        }
        stdout.write('HTTP host? ');
        currentPrompt = 'http.host';
      }

      else if (currentPrompt === 'http.host') {
        if (data) {
          generatedConfig.http.host = data;
          console.log(generatedConfig)
        }
      }
    });
  };
})(require('fs'),
   process.stdin,
   process.stdout,
   process.cwd());
