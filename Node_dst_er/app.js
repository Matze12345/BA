var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var home = require('./routes/home')
var geld = require('./routes/geld')
var auto = require('./routes/auto')
var lager = require('./routes/lager')
var therm = require('./routes/therm')
var help = require('./routes/help')
var helptrain = require('./routes/helptrain')

var neuronal = require('./logic/neuronal')
var db = require('./database/dbNeuronal')
var auswerten = require('./logic/auswerten')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/home', home);
app.use('/geld', geld);
app.use('/auto', auto);
app.use('/lager', lager);
app.use('/therm', therm);
app.use('/help', help);
app.use('/helptrain', helptrain);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});
//
//app.listen(8080);

app.listen(80)

auswerten.auswerten(function () {
    console.log("ausgewertet")
})

//Trainingsdaten laden
//db.selectNeuronal(function (data) {
  //  neuronal.train(data)
//})

module.exports = app;
