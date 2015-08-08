#!/usr/bin/env node

(function(argv, lib, path){
  // Rewrite info for dev logging
  global.console.old_info = global.console.info;
  global.console.info = function(){
    if (path.basename(process.argv[1]) === "ioradev") {
      process.stdout.write("[ioradev] ");
      global.console.old_info.apply(this, arguments);
    }
  }

  if (process.stdin.isTTY) {
    if (argv[0] === "run") {
      lib.core(argv, lib);
      return;
    }
  };
})(process.argv.slice(2),
   require("./lib"),
   require("path"));
