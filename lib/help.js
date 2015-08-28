(function(){
  'use strict';

  var help = [
    {
      'usage': 'iora help [command_name]',
      'desc': 'Prints information about the iora CLI.'
    },
    {
      'usage': 'iora run [config]',
      'desc': 'Creates and runs a server with the specified configuration.'
    },
    {
      'usage': 'iora init [name]',
      'desc': 'Enters a CLI form which creates a JSON configuration under [name] or iora.json if none provided.'
    },
    {
      'usage': 'iora background <name> [config]',
      'desc': 'Performs a {iora run} command in the background under a process name.'
    },
    {
      'usage': 'iora stop [name]',
      'desc': 'Stops a singular background process under [name], if none provided, it kills all the background processes.'
    }
  ],

  paddingNum = 2,
  padding = new Array(paddingNum + 1).join(' '),

  hr = function(points, breakit, name){
    var hr = '';
    if (typeof name === 'undefined') {
      hr += points[0] || '╞';
      hr += (new Array(process.stdout.columns - paddingNum - 2).join(points[2] || '═'));
      hr += points[1] || '╡';
    } else {
      hr += points[0] + points[2] + points[2] + points[1] + ' ' + name + ' ' + points[0];
      hr += (new Array(process.stdout.columns - paddingNum - (8 + name.length)).join(points[2] || '═'));
      hr += points[1];
    }
    return (typeof breakit === 'undefined' ? '\r\n' : (breakit ? '\r\n' : '')) + padding + hr;
  };

  module.exports = exports = function(argv){
    if (typeof argv[2] === 'undefined') {
      console.log(hr(['╒', '╕','═'], false, help[0].usage));
      help.forEach(function(item, index){
        var broken = item.desc.match(new RegExp('.{1,'+(process.stdout.columns - paddingNum - 3)+'}', 'g'));
        broken.forEach(function(piece, pieceNum){
          if (pieceNum+1 < broken.length) {
            console.log(padding + '│' + piece + '│');
          } else {
            console.log(padding + '│' + piece + (new Array(process.stdout.columns - paddingNum - piece.length - 2).join(' ')) + '│');
            console.log(padding + '│' + (new Array(process.stdout.columns - paddingNum - 2)).join(' ') + '│')
          }
        });
        console.log((item.usage === 'iora stop [name]' ? hr(['╘', '╛'], false) : hr(['╞','╡','═'], false, help[index + 1].usage)));
      });
    }
  };
})();
