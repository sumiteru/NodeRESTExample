var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var models = require("./models/games");
mongoose.connect('localhost');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var gameRoutes = require("./routes/games");
app.use('/api/games', gameRoutes);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});