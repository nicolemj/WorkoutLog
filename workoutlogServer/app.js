var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

User.sync({force: true});
  //User.sync({ force:true });   // Used to drop a table

app.use(bodyParser.json());


app.use(require('./middleware/headers'));


app.use('/api/test', function(req, res){
    res.send("Hello World");
});


app.listen(3000, function(){
    console.log('App is listening on 3000!')
});

app.use(bodyParser.json());


    //create the table in postgres
    //matches the model we defined
    //Doesn't drop the db

app.post('/api/user', function(req, res) {
//when we post to api user, it will want a user object in the body
    var username = req.body.user.username;
    var pass = req.body.user.password;
//Need to create a user object and use sequelize to put that user into 
 //our database.
    

User.create({
    username: username,
    passwordhash: ""
}).then(
 //Sequelize is going to return the object it created from db.

     function createSuccess(user){
        res.json({
            user: user,
            message: 'You did it!!'
        });
    },
        function createError(err){
            res.send(500, err.message);
            }
        );
           
    });

 