var multiparty = require('multiparty');
var fs = require('fs');
var Video = require('../models/video');

module.exports = function(app, passport, io) {
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