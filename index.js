#!/usr/bin/env node

(function(argv, lib){
  'use strict';
  
  if (process.stdin.isTTY) {
    if (argv[0] === 'run') {
      lib.run(argv, lib.core(argv));
      return;
    }
  }
})(process.argv.slice(2),
   require('./lib'),
   require('path'));
