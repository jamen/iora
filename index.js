#!/usr/bin/env node

(function(argv, lib){
  'use strict';

  if (process.stdin.isTTY) {
    // Run
    if (argv[0] === 'run') {
      lib.run(argv, lib.core(argv));
    }

    // Help
    else if (argv[0] === 'help') {
      lib.help(argv);
    }

    else if (argv[0] === 'init') {
      lib.init();
    }

    // Unknown command
    else {
      console.log('Error: Unknown option "'+argv[0]+'"');
    }
  }
})(process.argv.slice(2),
   require('./lib'),
   require('path'));
