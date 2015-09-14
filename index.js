#!/usr/bin/env node
var lib = require('./lib'),
    refig = require('refig'),
    path = require('path'),
    argv = process.argv.slice(2),
    console = lib.utils;

global.iora = {};

/*
 * Check flags
 */
// --silent, -s
var silent =  argv.indexOf('--silent');
if (silent !== -1) {
  argv.splice(silent, 1);
  console.silence();
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
      console.error('Failed to parse ' + configPath + ' as JSON.');
    } else {
      console.error('Failed to read ' + configPath);
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

if (argv[0] === 'init') {
  lib.init();
}

if (argv[0] === 'version') {
  lib.version();
}
