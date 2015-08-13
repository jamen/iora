#!/usr/bin/env node

(function(argv, lib){
  'use strict';
  global.console.close = function(){
    console.log.call(this, arguments);
    process.exit();
    return;
  };

  if (process.stdin.isTTY) {
    if (argv[0] === 'run') {
      lib.run(argv, lib.core(argv));
      return;
    }
  }
})(process.argv.slice(2),
   require('./lib'),
   require('path'));
