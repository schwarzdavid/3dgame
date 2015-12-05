var express = require('express'),
	app = express(),
	http, io, tanks;

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

tanks = {};

io = require('socket.io')(http);
io.on('connection', function(socket){
	
});