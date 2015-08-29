(function(root){
  'use strict';

  module.exports = exports = function(){
    var mroot = root + '/node_modules',
        iora = require(root + '/package.json');
    // iora version
    console.log('iora: ' + iora.version);

    // Dependencies:
    var curp;
    for (var name in iora.dependencies) {
      try {
        curp = require(mroot + '/' + name + '/package.json');
      } catch (e) {
        curp = {version: 'Unknown'};
      }
      console.log(name + ': ' + curp.version);
    }
  };
})(__dirname + '/..');
