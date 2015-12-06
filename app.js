var express = require('express'),
	CPlayer = require('./app/player.js'),
	app = express(),
	http, io, player;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname + '/web/public'));
app.use(express.static(__dirname + '/bower_components'));

app.get('*', function(req, res){
	res.render('template');
});

http = app.listen(process.argv[2] || 80, function(){
	console.log('Webserver running ...');
});

player = {};

io = require('socket.io')(http);
io.on('connection', function(socket){
	player[socket.uid] = new CPlayer(socket);
	
	socket.on('disconnect', function(){
		player[socket.uid] = null;
		delete player[socket.uid];
	});
});