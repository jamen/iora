(function(express, jc, path){
  var Core = function(argv){
    var configPath = (typeof argv[1] === "undefined" ?
                      "iora.json" :
                      (path.extname(argv[1]) !== "") ?
                       argv[1] :
                       argv[1] + ".json"
                     );

    console.dlog("Loading config " + configPath);
    jc.read(path.resolve(configPath), function(err, config){
      if (err) {
        console.log("Cannot read config \""+configPath+"\"!");
        console.dlog(err);
        return;
      };
      console.dlog("Config loaded.")
    });
  };

  module.exports = exports = Core;
})(require("express"),
   require("json-config-reader"),
   require("path"));
