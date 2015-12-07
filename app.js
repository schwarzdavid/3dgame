var express = require('express'),
	app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname + '/web'));

app.get('*', function(req, res){
	res.render('template');
});

app.listen(process.argv[2] || 80, function(){
	console.log('Webserver running ...');
});