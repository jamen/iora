#!/usr/bin/env node
var lib = require('./lib'),
    refig = require('refig'),
    path = require('path'),
    argv = process.argv.slice(2);

global.iora = {};

lib.utils(iora);

/*
 * Check flags
 */
// --silent, -s
var silent =  argv.indexOf('--silent');
if (silent !== -1) {
  argv.splice(silent, 1);
  iora.silence();
}

iora.argv = argv;

/*
 * Execution directory
 */

iora.dir = (function(){
 if (argv[1]) {
   return path.resolve(path.join(process.cwd(), argv[1]));
 } else {
   return path.resolve(process.cwd());
 }
})();

/*
 * Load configuration
 */
var load = function(){
  var configPath = path.join(iora.dir, 'iora.json');
  try {
    iora.config = refig
      .set('async', false)
      .read(configPath);

    refig.set('async', true);
  } catch (e) {
    if (e instanceof SyntaxError) {
      iora.error('Failed to parse ' + configPath + ' as JSON.', 1);
    } else {
      iora.error('Failed to read ' + configPath, 1);
    }
  }
};

/*
 * Argument routing:
 */
if (argv[0] === 'run') {
  load();
  lib.run(lib.server());
}

else if (argv[0] === 'init') {
  lib.init();
}

else if (argv[0] === 'version') {
  lib.version();
}

else if (argv[0] === 'help') {
  lib.help();
}
else {
  if (argv[0]) {
    iora.error('Unknown command "'+argv[0]+'"');
  } else {
    iora.info('Usage: iora <command> [directory] [options...]')
        .log('      Type "iora help" for more information.');
  }
}
