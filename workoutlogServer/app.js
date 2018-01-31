require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');

sequelize.sync(); // sync( {force: true}), to drop then create each time the app starts!

app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

app.use('/api/user', require('./routes/user'));

app.use('/api/login', require('./routes/session'));

app.use('/api/log', require('./routes/log'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});



app.listen(3001, function(){
	console.log('App is listening on 3001.')
});









