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

    // Init
    else if (argv[0] === 'init') {
      lib.init(argv);
    }

    // Version
    else if (argv[0] === 'version') {
      lib.version();
    }

    // test
    else if (argv[0] === 'test') {
      lib.test();
    }

    // Unknown command
    else {
      console.log('Error: Unknown option "'+argv[0]+'"');
    }
  }
})(process.argv.slice(2),
   require('./lib'),
   require('path'));
