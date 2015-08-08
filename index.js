#!/usr/bin/env node

(function(argv, lib, path){
  // Rewrite info
  global.console.info = function(){
    if (path.basename(process.argv[1]) === "ioradev") {
      global.console.info.apply(null, arguments);
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
