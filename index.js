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
var configPath = path.join(process.cwd(), 'iora.json');
try {
  iora.config = refig
    .set('async', false)
    .read(configPath)
    .set('async', true);
} catch (e) {
  console.error('Failed to read ' + configPath);
}

/*
 * Check flags
 */
// --silent, -s
var silent =  argv.indexOf('--silent');
if (silent !== -1) {
  argv.splice(silent, 1);
  console.silence();
}

/*
 * Argument routing:
 */
if (argv[0] === 'run') {
  // ...
  console.log('Working!');
  process.exit();
}
