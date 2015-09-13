#!/usr/bin/env node
var lib = require('./lib'),
    refig = require('refig'),
    path = require('path'),
    argv = process.argv.slice(2),
    console = lib.utils;

global.iora = {};

/*
 * Load configuration
 */
var load = function(){
  var configPath = path.join(process.cwd(), 'iora.json');
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
 * Argument routing:
 */
if (argv[0] === 'run') {
  load();
  lib.run(lib.server());
}
