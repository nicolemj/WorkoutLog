var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');

router.post('/', function(req, res) {
		var username = req.body.user.username;
		var pass = req.body.user.password;

		User.create({
			username: username,
			passwordhash: bcrypt.hashSync(pass, 10)
		}).then(
		//Sequelize is going to return the object it created from db.

			function createSuccess(user){
                var token = jwt.sign({id:user.id}, 'i_am_secret', {expireIn:60*60*24})
				res.json({
						user: user,
                        message: 'create',
                        sessionToken: token
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
	});

module.exports = router;