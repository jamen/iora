module.exports = function(app, express, config){
  app.all('/testing', function(req, res){
    res.send('Lol');
  });
};
