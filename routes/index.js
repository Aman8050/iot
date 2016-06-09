var multiparty = require('multiparty');
var mysql=require('mysql');
var fs = require('fs');
var Video = require('../models/video');


// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'maverick1', //change your password here.
//      database: 'nodejs',
//     port: 3306
// });

// connection.connect(function(err) {
//   if (err) {
//     console.log(err);
//   }
// });

module.exports = function(app, passport, io,connection) {
	// LOGIN
	app.get('/', function(req, res){
		if(req.user)
			res.redirect('/dashboard');
		else
			res.render('index', {user : req.user, message: req.flash('loginMessage') });
	});

	app.get('/register', function(req, res){
		if(req.user)
			res.redirect('/dashboard');
		else
			res.render('register', {user : req.user, message: req.flash('registerMessage') });
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/dashboard',
			failureRedirect : '/',
			failureFlash : true
	}));


	app.get('/update/:temperature/:humidity/:accx/:accy/:accz/:intensity/:motion',function(req,res){
		 
		 var post  = {temperature:req.params.temperature,humidity:req.params.humidity,accx:req.params.accx,accy:req.params.accy,accz:req.params.accz,intensity:req.params.intensity,motion:req.params.motion};
		 var query = connection.query('INSERT INTO sensors SET ?', post, function(err, result) {
		 });
		 console.log(query.sql);
		 res.write("Values saved in database");
	});


	app.post('/register', passport.authenticate('local-register', {
			successRedirect : '/dashboard',
			failureRedirect : '/register',
			failureFlash : true
	}));

	//dashboard
	app.get('/dashboard', isLoggedIn, function(req, res) {
		var user = req.user;
		Video.find({owner: user.id}, function(err, dashboard) {
			if(err) throw err;
			res.render('dashboard', {user: user, dashboard: dashboard, message: req.flash('uploadMessage')});
		});
	});
	
function isLoggedIn(req, res, next) {
	console.log("is logged in?");
	if(req.isAuthenticated()) {
		console.log("Yes!");
		return next();
	}
	console.log("No.");
	res.redirect('/');
}

 }
