var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Twitter = require('twitter');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next){
  res.io = io;
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
io.on('connection',function(socket){
  console.log('start connection');
  socket.on('start tweets',function(){
	  console.log('start tweets');
	  var client = new Twitter({
		  consumer_key: 'ax33Nwa0VDmxsEsuugeCkjREJ',
		  consumer_secret: 'TXlOuqt2xuyna9vkRUav5V2ZtHeZkHXHJsyfauF9Ul3Kfzm9FA',
		  access_token_key: '845579042254286848-7UzWDvVQHVqzj2GDJpH19x3trQ8EQe6',
		  access_token_secret: 's1YEEdEBJ1rzKwbPE6t3iqR3SEJfVvlxHP33mSlwFSsZm',
	  });

	  var params = {
		  user_id: 845579042254286848,
		  screen_name: 'ecrosslink_au',
		  count: 10
	  };

	  console.log('start call twitter api');
	  console.log(client);
	  client.get('statuses/user_timeline', params, function(error, tweets, response) {
	    console.log(error);
		  if(error) throw error;
		  console.log(tweets);
	  });
  });

  socket.emit('connected');
});

module.exports = {app: app, server: server};
