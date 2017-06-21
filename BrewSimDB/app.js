var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var execSQL = require('exec-sql');
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
databaseHandler.initializeDatabase(__dirname + '\\data');

var hops_type = {};
app.get('/', function(req, res) {
    databaseHandler.connect('BrewSimDB', process.env.DB_USER, process.env.DB_PASSWORD);
    console.log("entered into main page.");
    var hopInfo = databaseHandler.getHops('*');
    console.log('returned this: ' + hopInfo);
    hops_type = {'print' : hopInfo};
    res.render('index', hops_type);
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
