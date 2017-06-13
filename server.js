
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var gameData = require('./gameData');
var consoleData = require('./ConsoleData');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.render ('404Page')
});


app.listen(port, function () {
  console.log("== Server listening on port", port);
});
