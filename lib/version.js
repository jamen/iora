/*
 * version: Fetches the version of iora and it's dependencies.
 */

var package = require('../package.json');

module.exports = function(){
  var dependency, min;

  iora.info(package.version);

  for (var name in package.dependencies) {
    min = package.dependencies[name];
    try {
      dependency = require(name + '/package.json');
    } catch (e) {
      iora.error('Package "'+name+'" couldn\'t be found');
    }
    iora
      .write(name + ': ' + dependency.version + ' ').set('[35m')
      .write('('+min+' listed)').set('[0m')
      .write('\r\n');
  }
};
