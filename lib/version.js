/*
 * version: Fetches the version of iora and it's dependencies.
 */
var package = require('../package.json');

module.exports = function(){
  console.info(package.version);

  var dependency;
  for (var name in package.dependencies) {
    try {
      dependency = require(name + '/package.json');
    } catch (e) {
      console.error('Package "'+name+'" couldn\'t be found');
    }
    console.log(name + ': ' + dependency.version);
  }
};
