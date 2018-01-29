var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./middleware/headers'));

app.use('/api/test', function(req, res){
    res.send("Hello World");
});

app.listen(3000, function(){
    console.log('App is listening on 3000!')
});



var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'Jonj0815!', {
    host: 'localhost',
    dialect: 'postgres'
});


sequelize.authenticate().then(
    function() {
        console.log('connected to workoutlog postgres db');
    },
    function(err){
        console.log(err);
    }
);


//Data Model
// build a user model in sqllize
    var User = sequelize.define('user', {
        username: Sequelize.STRING,
        passwordhash: Sequelize.STRING,
    });


    //create the table in postgres
    //matches the model we defined
    //Doesn't drop the db
    User.sync();
    //User.sync({ force:true });//drops the table compeletly (line 27ish)

    app.use(bodyParser.json());

    app.post('/api/user', function(req, res) {
        //when we post to api user, it will want a user object in the body
        var user = req.body.user.username;
        var pass = req.body.user.password;
        //Need to create a user object and use sequelize to put that user into 
        //our database.
    

    User.create({
        username: user,
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

 