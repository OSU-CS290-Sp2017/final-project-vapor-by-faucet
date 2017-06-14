var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var gameData = require('./gameData');


var consolesData = require('./ConsoleData');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




app.get('/:console/:game', function(req, res, next){
  var cons = req.params.console;
  var game = req.params.game;
  console.log("Console: ", cons, " Game: ", game);
  var consoleinfo = gameData[cons];
  var gameinfo = consoleinfo.games[game];
  console.log(consoleinfo);
  console.log('\n');
  console.log(gameinfo);
  if (gameinfo) {
    var templateargs = {
      title: gameinfo.title,
      rating: gameinfo.rating,
      url: gameinfo.cover,
      description: gameinfo.description
    };
    res.render('gamepage', templateargs);
  }
  else {
    next();
  }
})


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'partials')));

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname+'/public/mainPage.html'));
});

app.get('*', function(req, res) {
	res.render('404Page');
});

app.listen(port, function(){
	console.log("== Server listening on port", port);
});