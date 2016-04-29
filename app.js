var express = require('express');

var jade	= require('jade');
var app		= express();

var config		= require('nconf');
	config.file('./config.json');

	config.defaults({
		'http': {
			'port': 8080
		},
		'path': {
			'upload': 'upload'
		}
	});
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.set('views', __dirname + '/tpl')
app.set('view engine', 'jade')
app.use('/css', express.static(__dirname+'/public/css'));
app.use('/js', express.static(__dirname+'/public/js'));
app.use('/img', express.static(__dirname+'/public/img'));
app.use('/fonts', express.static(__dirname+'/public/fonts'));
app.use('/vendors', express.static(__dirname+'/public/vendors'));
app.use('/html', express.static(__dirname+'/public/html'));



app.get('/', function(request, response) {
	var section	= "home";
	response.render('index', { section : section });
});
app.get('/new', function(request, response){
	response.render('new.jade', { title: 'new' });
});
app.get('/mycards', function(request, response){
	response.render('mycards.jade', { title: 'mycards' });
});

module.exports	= app;
