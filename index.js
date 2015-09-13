#!/usr/bin/env node
var lib = require('./lib'),
    argv = process.argv.slice(2),
    console = lib.utils;


/*
 * Check flags
 */
// --silent, -s
var silent =  argv.indexOf('--silent');
if (silent !== -1) {
  argv.splice(silent, 1);
  console.silence();
}
