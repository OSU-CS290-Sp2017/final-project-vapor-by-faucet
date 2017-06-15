var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');

var gameData = require('./gameData');



var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyparser.json());


app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname+'/public/mainPage.html'));
});

app.post('/:console/:game/newcomment', function(req, res, next){
	var cons = req.params.console;
	var game = req.params.game;
	var gameinfo = gameData[cons].games[game];
	if (gameinfo){
		if (req.body){
			var comment = {
				comment: req.body.comment,
				author: req.body.author,
				rating: req.body.rating
			};
			gameinfo.comments = gameinfo.comments || [];
			gameinfo.comments.push(comment);
			fs.writeFile('gameData.json', JSON.stringify(gameData), function(err){
				if (err)
					res.status(500).send("Unable to save comment to database");
				else
					res.status(200).send();
			});
		} else
					res.status(400).send("Request has no body");
	} else next();
});

app.get('/:console', function (req, res, next) {

	var gameConsole = req.params.console;
	var consoleGameData = gameData[gameConsole];
	if (consoleGameData){
		if (consoleGameData.name == "PlayStation 4"){
  	var templateArgs = {
    	name: consoleGameData.name,
			consoleGames: consoleGameData.games,
			console1: true,
			console2: false,
			console3: false,
			console4: false
			};
	}

	if (consoleGameData.name == "Xbox One"){
	var templateArgs = {
		name: consoleGameData.name,
		consoleGames: consoleGameData.games,
		console1: false,
		console2: true,
		console3: false,
		console4: false
		};
}

if (consoleGameData.name == "Nintendo Switch"){
var templateArgs = {
	name: consoleGameData.name,
	consoleGames: consoleGameData.games,
	console1: false,
	console2: false,
	console3: true,
	console4: false
	};
}

if (consoleGameData.name == "PC"){
var templateArgs = {
	name: consoleGameData.name,
	consoleGames: consoleGameData.games,
	console1: false,
	console2: false,
	console3: false,
	console4: true
	};
}

	res.render('consoleListGames', templateArgs);
	}
	else{
		next();
	}
});


app.get('/:console/:game', function(req, res, next){
  var cons = req.params.console;
  var game = req.params.game;
  var consoleinfo = gameData[cons];
  if (consoleinfo){
  var gameinfo = consoleinfo.games[game];
  if (gameinfo) {
    var templateargs = {
      title: gameinfo.title,
      rating: gameinfo.rating,
      url: gameinfo.cover,
      description: gameinfo.description,
			comments: gameinfo.comments
    };
    res.render('gamepage', templateargs);
  }
  else
	  next();
  }
  else {
    next();
  }
});



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'partials')));




app.get('*', function(req, res) {
	res.render('404Page');
});






app.listen(port, function(){
	console.log("== Server listening on port", port);
});
