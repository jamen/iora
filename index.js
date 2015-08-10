#!/usr/bin/env node

(function(argv, lib){
  'use strict';

  if (process.stdin.isTTY) {
    if (argv[0] === 'run') {
      lib.core(argv, lib);
      return;
    }
  }
})(process.argv.slice(2),
   require('./lib'),
   require('path'));
