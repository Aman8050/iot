//requiring modules
var express = require('express');
var http = require('http');
var hbs = require('hbs');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var fs = require('fs'),
  path=require('path'),
  mysql = require('mysql'),
  connectionsArray = [],
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'maverick1', //change your password here.
     database: 'nodejs',
    port: 3306
  }),
  POLLING_INTERVAL = 4000,
  pollingTimer;

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);


// If there is an error connecting to the database
connection.connect(function(err) {
  // connected! (unless `err` is set)
  if (err) {
    console.log(err);
  }
});


//Database
mongoose.connect('mongodb://localhost/VideoCloud');

//Passport config
require('./config/passport')(passport);

//Configuration
app.configure(function() {
	app.set('view engine', 'html');
	app.engine('html', hbs.__express);
	
	app.use(express.static('public'));
	app.use('/uploads',express.static('uploads'));
	
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());

	app.use(express.session({secret:'thisismysecretstring'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
});


var pollingLoop = function() {

  // Doing the database query
var query = connection.query('SELECT * FROM sensors order by id desc limit 1'),
    users = []; // this array will contain the result of our db query

  // setting the query listeners
  query
    .on('error', function(err) {
      // Handle error, and 'end' event will be emitted after this as well
      console.log(err);
      updateSockets(err);
    })
    .on('result', function(user) {
      // it fills our array looping on each user row inside the db
      users.push(user);
console.log(users);
    })
    .on('end', function() {
      // loop on itself only if there are sockets still connected
      if (connectionsArray.length) {

        pollingTimer = setTimeout(pollingLoop, POLLING_INTERVAL);

        updateSockets({
          users: users
        });
      } else {
        console.log('The server timer was stopped because there are no more socket connections on the app')

      }
    });
};

/*                                                              */
//Routes
require('./routes')(app, passport, io);

//Sockets
io.set('log level', 1);
io.sockets.on('connection', function(client) {
	client.emit('socketId', client.id);
	console.log('Number of connections:' + connectionsArray.length);
	console.log("Client connected...");
	
	 if (!connectionsArray.length) {
    pollingLoop();
  }

  client.on('disconnect', function() {
    var socketIndex = connectionsArray.indexOf(client);
    console.log('socketID = %s got disconnected', socketIndex);
    if (~socketIndex) {
      connectionsArray.splice(socketIndex, 1);
    }
  });

  console.log('A new socket is connected!');
  connectionsArray.push(client);
});

var updateSockets = function(data) {
  // adding the time of the last update
  data.time = new Date().toLocaleTimeString();
  console.log('Pushing new data to the clients connected ( connections amount = %s ) - %s', connectionsArray.length , data.time);
  // sending new data to all the sockets connected
  connectionsArray.forEach(function(tmpSocket) {
    tmpSocket.volatile.emit('notification', data);
  });
};

//Server
server.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});