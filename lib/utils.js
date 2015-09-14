/*
 * utils: More advanced logging.
 */

// Setup logging:
var _console = new console.Console(process.stdout, process.stderr),
    forEach = Array.prototype.forEach;

console.options = {isSilent: false};
console.silence = function(){ console.options.isSilent = true; };

console.encode = function(input){
  var output = [];
  forEach.call(input, function(char){
    output.push(char.charCodeAt(0));
  });
  return new Buffer([0x1b].concat(output));
};

console.stdout =
console.write = function(){
  forEach.call(arguments, function(item){
    process.stdout.write(item);
  });
  return this;
};

console.stderr = function(){
  forEach.call(arguments, function(item){
    process.stderr.write(item);
  });
  return this;
};

console.set = function(){
  console.write(console.encode.apply(this, arguments));
  return this;
};

console.log = function(){
  _console.log.apply(this, arguments);
  return this;
};

console.error = function(message, code){
  console.set('[31m').stderr('Error: ').set('[0m').log(message);
  process.exit(code || 1);
  return this;
};

console.warn = function(){
  if (console.options.isSilent) return this;
  forEach.call(arguments, function(item){
    console.set('[33m').stderr('Warning: ').set('[0m').log(item);
  });
  return this;
};

console.info = function(){
  if (console.options.isSilent) return this;
  forEach.call(arguments, function(item){
    console.set('[43;30m').write('iora:').set('[0m').log(' ' + item);
  });
  return this;
};

module.exports = console;
