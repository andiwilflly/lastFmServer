'use strict';

var fs = require('fs');
var path = require('path');
var Express = require('express');
var request = require('request');
request = request.defaults({ jar: true });

// API KEY: fb9d42de15720bcb20e6ed6fc5016a4c
var app = Express();

// Serve built files with express static files middleware
app.use('/', Express.static(path.join(__dirname, './')));
// Serve normal requests with our handleRender function
app.use('/static', Express.static(path.join(__dirname, './static')));


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.use('/user/artists/:username*?', function (req, res) {
	request.get({
		url: 'http://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=fb9d42de15720bcb20e6ed6fc5016a4c&user=' + (req.params.username || 'vasya') + '&format=json'
	}, function (error, response, body) {
		res.send(body);
	});
});

app.use('/artist/:name*?', function (req, res) {
	request.get({
		url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + (req.params.name || 'vasya') + "&api_key=fb9d42de15720bcb20e6ed6fc5016a4c&format=json"
	}, function (error, response, body) {
		res.send(body);
	});
});


app.get('*', function (req, res) {
	fs.readFile('./index.html', 'utf8', function (err, file) {
		if (err) {
			return console.log(err);
		}
		res.send(file);
	});
});


app.listen(process.env.PORT || 3000);

