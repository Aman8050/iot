var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');

var configAuth = require('./auth');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	var localFields = {
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true
	};

	var facebookFields = {
		clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        passReqToCallback : true
	};

	var localLogin = new LocalStrategy( localFields, function(req, email, password, done) {

		console.log("I'm here for login!");

		User.findOne({'local.email': email}, function(err, user) {
			if(err)
				return done(err);

			if(!user)
				return done(null, false, req.flash('loginMessage', 'Incorrect email.'));
			
			if(!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Incorrect password.'));

			console.log("success!!");
			return done(null, user);
		});
	});

	var localRegister = new LocalStrategy( localFields, function(req, email, password, done) {

		User.findOne({'local.email' : email}, function(err, user) {
			if(err)
				return done(err);

			if(user)
				return done(null, false, req.flash('registerMessage', 'That email is already registered.'));
			
			//TODO: mode this to a user.saveLocal function in user model

			var newUser = new User();
			
			newUser.local.email = email;
			newUser.local.password = newUser.generateHash(password);
			newUser.name = req.body.name;

			newUser.save(function(err) {
				if(err) throw err;
				return done(null, newUser);
			});

		});
	});

	var facebookLogin = new FacebookStrategy ( facebookFields, function(req, token, refreshToken, profile, done) {

		User.findOne({'facebook.id': profile.id}, function(err, user) {

			if(err)
				return done(err);

			if(user)
				return done(null, user);

			var newUser = new User();

			newUser.facebook.id = profile.id;
			newUser.facebook.token = token;
			newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
			newUser.facebook.email = profile.emails[0].value;
			newUser.name = newUser.facebook.name;
		
			newUser.save(function(err) {
				if(err) throw err;
				return done(null, newUser);
			});

		});

	});

	passport.use('local-login', localLogin);
	passport.use('local-register', localRegister);
	passport.use('facebook', facebookLogin);

};