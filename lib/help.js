(function(){
  'use strict';

  var help = {
    'help': {
      'usage': 'iora help [command_name]',
      'desc': 'Prints information about the iora CLI.'
    },
    'run': {
      'usage': 'iora run [config]',
      'desc': 'Creates and runs a server with the specified configuration.'
    },
    'init': {
      'usage': 'iora init [name]',
      'desc': 'Enters a CLI form which creates a JSON configuration under [name] or iora.json if none provided.'
    }
  },

  paddingNum = 2,
  padding = new Array(paddingNum + 1).join(' '),

  hr = (function(width){
    var hr = '\r\n' + padding;
    for (var i=width-(paddingNum*2); i--;) {
      hr += '~';
    }
    return hr;
  })(process.stdout.columns);

  module.exports = exports = function(argv){
    if (typeof argv[1] !== 'undefined') {
      if (typeof help[argv[1]] !== 'undefined') {
        var command = help[argv[1]];
        console.log('Usage: ' + command.usage);
        console.log(command.desc);
      } else {
        console.log('Unknown command "'+argv[1]+'".\r\nTry "iora help" for a list of commands');
      }
    } else {
      console.log('Usage: iora <command> [options...]' + hr);
      var matcher = new RegExp('.{1,'+(process.stdout.columns - (paddingNum * 2)-paddingNum)+'}', 'g');
      for (var entry in help) {
        var info = help[entry],
        desc = info.desc.match(matcher).join('\r\n' + padding );

        console.log(
          '  ' + entry + ': ' + info.usage + '\r\n' +
          '    ' + desc + hr
        );
      }
    }
  };
})();
