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


app.use('/artists', function (req, res) {
	request.post({
		url: 'http://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=fb9d42de15720bcb20e6ed6fc5016a4c&user=joanofarctan&format=json'
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


app.listen(3000);

