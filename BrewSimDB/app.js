var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var databaseHandler = require('./modules/databaseHandler');
var users = require('./routes/users');
var app = express();

//  engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', users);

var dotenv = require('dotenv');
dotenv.load();

//DB setup, initialize FIRST then connect.
databaseHandler.initializeDatabase(path.join(__dirname, 'data'));

var hops_type = {};
app.get('/', function(req, res) {
    // for whatever reason (probably async) if I put the connect line directly below the initializeDatabase line it can't connect because the database doesn't exist yet. Putting it here gives the database initialization time to complete first.
    databaseHandler.connect('BrewSimDB', process.env.DB_USER, process.env.DB_PASSWORD);
    console.log("entered into main page.");
    // pass null to get all hops.
    databaseHandler.getHopsByRecipeName('Hoppiness is an IPA', function (result) {
        console.log('returned this: ' + result);
        hops_type = {'print' : result};
        res.render('index', hops_type);
    })
});

app.get('/query', function(req, res) {
  res.render('QueryUI');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(3000, function() {
    console.log(process.env.DB_USER)
});

module.exports = app;
