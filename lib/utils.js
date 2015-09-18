/*
 * utils: More advanced logging.
 */

module.exports = function(iora){
  var iora = typeof global.iora === 'undefined' ? iora : global.iora,
      isSilent = false;

  if (typeof iora === 'undefined') {
    iora = {};
  }

  iora.silence = function(){
    isSilent = true;
  };

  iora.encode = function(input){
    var output = Array.prototype.map.call(input, function(char){
      return char.charCodeAt(0);
    });
    return new Buffer([0x1b].concat(output));
  };

  iora.write = function(input){
    process.stdout.write(input);
    return iora;
  };

  iora.set = function(input){
    iora.write(iora.encode(input));
    return iora;
  };

  iora.warn = function(message){
    if (isSilent) return iora;
    iora.set('[33m').write('warning: ').set('[0m').write(message + '\r\n');
    return iora;
  };

  iora.error = function(message, code){
    iora.set('[31m').write('error: ').set('[0m').write(message + '\r\n');
    if (typeof code === 'number') process.exit(code);
    return iora;
  };

  iora.info = function(message){
    if (isSilent) return iora;
    iora.set('[43;30m').write('iora:').set('[0m').write(' ' + message + '\r\n');
    return iora;
  };

  iora.log = function(){
    if (isSilent) return iora;
    console.log.apply(console, arguments);
    return iora;
  };

  return iora;
};
