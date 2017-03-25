var express = require('express');
var Twitter = require('twitter');

var router = express.Router();

var client = new Twitter({
  consumer_key: 'xEhKHy3tUXe1eEwWSCbIOfvl9',
  consumer_secret: '95GDXvhXqYxqhpMPAIC5VBUsBw3IxlL43j0x9Wum6gyuOJBLTw',
  access_token_key: '845579042254286848-mOCTgBR0wM8Pu3bYfCADEt4IxNPf6A7',
  access_token_secret: 'KeVZYhCyMb98TicyevAQuIJQKdvzBztf3x3UnaGA1qqCo'
});

var params = {screen_name: 'ecrosslink_au'};

/* GET home page. */
router.get('/', function(req, res, next) {

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var data = tweets;
    }
  });

  res.render('index', { title: 'Express', body: JSON.stringify(data)});

});

module.exports = router;
