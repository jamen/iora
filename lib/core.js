(function(express, jc, fs, path){
  var Core = function(argv){
    var configPath = (typeof argv[1] === "undefined" ?
                      "iora.json" :
                      (path.extname(argv[1]) !== "") ?
                       argv[1] :
                       argv[1] + ".json"
                     );

    console.info("Loading config " + configPath);
    jc.read(path.resolve(configPath), function(err, config){
      if (err) {
        if (err.type === "parse") {
          console.log("Failed to parse \""+configPath+"\" as JSON!");
        } else {
          console.log("Failed to read \""+configPath+"\"!");
        }
        console.info(err);
        return;
      };
      console.info("Config loaded.");
      var app = express();

      // Load controllers!
      if (config.controllers_dir !== null) {
        console.info("Loading controllers");
        var controllers_dir = config.controllers_dir || process.cwd() + "/controllers";
        fs.readdir(path.resolve(controllers_dir), function(err, files){
          if (!err) {
            var controller = null;
            files.forEach(function(file){
              controller = require(path.resolve(controllers_dir + "/" + file));
              if (typeof controller === "function") {
                controller(express, app);
              } else {
                console.log("Controller \""+controllers_dir + path.sep + file + "\" is not a function!");
                console.info("Controller typeof " + typeof controller);
                return;
              }
            });
          } else {
            console.log("Failed to find \"controllers_dir\": " + controllers_dir);
            console.log("(If you want to disable controllers, set \"controllers_dir\": null)");
            console.info(err);
          }
        });

      } else {
        console.info("Controllers skipped");
      };

      // Load middleware controllers!
      if (typeof config.controllers === "object" && config.controllers !== null) {
        for (var middleware in config.controllers) {
          var version = config.controllers[middleware];
          app.use("/", require(middleware + "@" + version));
        };
      } else {
        console.info("Middleware controllers skipped");
      };
      
    });
  };

  module.exports = exports = Core;
})(require("express"),
   require("json-config-reader"),
   require("fs"),
   require("path"));
