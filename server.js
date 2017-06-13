var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var consolesData = require('./ConsoleData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'partials')));

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname+'/public/mainPage.html'));
});

app.listen(port, function(){
	console.log("== Server listening on port", port);
});