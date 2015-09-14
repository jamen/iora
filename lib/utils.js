/*
 * utils: More advanced logging.
 */

// Setup logging:
var _console = new console.Console(process.stdout, process.stderr),
    forEach = Array.prototype.forEach;

console.options = {isSilent: false, addList:[]};
console.silence = function(){ console.options.isSilent = true; };

console.add = function(item){
  this.options.addList.push(item);
  return this;
};

console.addset = function(item){
  this.options.addList.push(this.encode(item));
  return this;
};

console.encode = function(input){
  var output = [];
  forEach.call(input, function(char){
    output.push(char.charCodeAt(0));
  });
  return new Buffer([0x1b].concat(output));
};

console.stdout =
console.write = function(){
  forEach.call(arguments.length ? arguments : this.options.addList, function(item){
    process.stdout.write(item);
  });
  if (!arguments.length) this.options.addList = [];
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
  if (arguments.length) {
    _console.log.apply(this, arguments);
  } else {
    _console.log.apply(this, this.options.addList);
    this.options.addList = [];
  }
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
