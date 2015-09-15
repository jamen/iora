/*
 * help: Prints help.
 */

var info = {
  'iora run [directory]': 'Runs the specified directory (defaults to your cwd).',
  'iora version': 'Prints iora\'s version, and it\'s dependency\'s versions',
  'iora help': 'Prints a help page.',
},
fix = function(input){

};

module.exports = function(){
  console.log('Usage: iora <command> [directory] [options...]');
  var desc;
  for (var usage in info) {
    desc = info[usage];
    console.log('')
      .set('[32m')
      .log(usage).set('[0m')
      .log(desc);
  }
};
