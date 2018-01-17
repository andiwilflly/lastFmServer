const fs = require('fs');
const path = require('path');
const Express = require('express');


// API KEY: fb9d42de15720bcb20e6ed6fc5016a4c
const app = Express();

// Serve built files with express static files middleware
app.use('/built', Express.static(path.join(__dirname, './built')));
// Serve normal requests with our handleRender function
app.use('/static', Express.static(path.join(__dirname, './static')));



app.use('/interface_players', (req, res)=> interfacePlayersRoute(DB, req, res) );


app.get('*', (req, res)=> {
	fs.readFile('./index.html', 'utf8', function (err, file) {
		if (err) {
			return console.log(err);
		}
		res.send(file);
	});
});

app.listen(3000);
