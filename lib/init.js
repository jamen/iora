(function(fs, path, stdin, stdout, cwd){
  'use strict';

  module.exports = exports = function(argv){
    stdin.resume();
    var currentPrompt = 'routesDir',
        generatedConfig = {},
        endFile = path.resolve(process.cwd() + ('/' + (argv[1] || '/iora.json')));

    stdout.write('Routes directory? ('+cwd+'/routes): ');
    stdin.on('data', function(rawData){
      var data = rawData.toString().slice(0, rawData.length - 1);

      if (currentPrompt === 'routesDir') {
        generatedConfig.routesDir = (data ? data : cwd+'/routes');

        stdout.write('Controllers directory? ('+cwd+'/controllers): ');
        currentPrompt = 'controllersDir';
      }

      else if (currentPrompt === 'controllersDir') {
        generatedConfig.controllersDir = (data ? data : cwd+'/controllers');

        stdout.write('Host? (false): ');
        currentPrompt = 'host';
      }

      else if (currentPrompt === 'host') {
        if (data) {
          generatedConfig.host = data;
        } else {
          generatedConfig.host = '0.0.0.0';
        }

        stdout.write('HTTP disabled? (false): ');
        currentPrompt = 'http.disabled';
      }

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

      else if (currentPrompt === 'http.port') {
        if (/^\d+$/.test(data)) {
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
        }

        stdout.write('HTTPS disabled? (false): ');
        currentPrompt = 'https.disabled';
      }

      else if (currentPrompt === 'https.disabled') {
        generatedConfig.https = {};
        if (data === 'true') {
          generatedConfig.https.disabled = true;
          stdout.write('Done? (press enter) ');
          currentPrompt = 'done';
        } else {
          stdout.write('HTTP port? (443): ');
          currentPrompt = 'https.port';
        }
      }

      else if (currentPrompt === 'https.port') {
        if (/^\d+$/.test(data)) {
          generatedConfig.https.port = parseInt(data);
        } else {
          generatedConfig.https.port = 443;
        }
        stdout.write('HTTPS host? ');
        currentPrompt = 'https.host';
      }

      else if (currentPrompt === 'https.host') {
        if (data) {
          generatedConfig.https.host = data;
        }
        stdout.write('Done? (press enter) ');
        currentPrompt = 'done';
      }

      else if (currentPrompt === 'done') {
        fs.exists(endFile, function(exists){
          if (exists) {
            stdout.write('Overwrite existing file "' + endFile + '"? ');
            currentPrompt = 'exists';
          } else {
            stdin.pause();
            console.log(endFile);
            fs.writeFile(endFile, JSON.stringify(generatedConfig, null, 2), function(err){
              if (err) console.log(err);
              stdin.pause();
              stdout.write('Done! ');
              process.exit();
            });
          }
        });
      }

      else if (currentPrompt === 'exists') {
        if ((data === 'true') || (data === 'yes')) {
          fs.writeFile(endFile, JSON.stringify(generatedConfig, null, 2), function(err){
            if (err) console.log(err);
            stdin.pause();
            console.log('Done! ');
            process.exit();
          });
        } else {
          console.log('Aborting.');
          process.exit();
        }
      }

    });
  };
})(require('fs'),
   require('path'),
   process.stdin,
   process.stdout,
   process.cwd());
