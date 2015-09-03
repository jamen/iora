'use strict';

module.exports = function(){
  var lib = require('../lib');

  for (var m in lib) {
    try {
      m([], [], []);
    } catch (e) {
      throw e;
    }
  }
};
