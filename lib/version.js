/*
 * version: Fetches the version of iora and it's dependencies.
 */

var package = require('../package.json');

module.exports = function(){
  var dependency, min;

  console.info(package.version);

  for (var name in package.dependencies) {
    min = package.dependencies[name];
    try {
      dependency = require(name + '/package.json');
    } catch (e) {
      console.error('Package "'+name+'" couldn\'t be found');
    }
    console
      .add(name + ': ' + dependency.version + ' ')
      .addset('[34m').add('('+min+' listed)').addset('[0m')
      .add('\r\n')
      .write();
  }
};
