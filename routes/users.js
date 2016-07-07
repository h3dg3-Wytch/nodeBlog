var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/register', upload.single('profileimage'), function(req, res, next){

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	if(req.file){	
		console.log('Uploading File!')
		var profileimage = req.file.filename;

	}else{
		console.log('No file uploaded!');
		var profileimage = 'noimage.jpg';
	}

	req.checkBody('name','Please enter a name!').notEmpty();
	req.checkBody('email', 'Please enter a valid email!').isEmail();
	req.checkBody('email', 'Please enter a valid email!').notEmpty();
	req.checkBody('name', 'Please enter a valid name!').notEmpty();
	req.checkBody('username', 'Please enter a valid username').notEmpty();
	req.checkBody('password', 'Please enter a valid password').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


	var errors = req.validationErrors();

	if(errors){
		res.render('register', {errors: errors});
	}else{

		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
			profileimage: profileimage
		})

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		res.location('/');
		res.redirect('/');

	}


});

router.get('/logout', function(req, res, next) {
  res.render('logout', { title: 'Logout' });
});



module.exports = router;
