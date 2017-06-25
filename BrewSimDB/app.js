var express             = require('express');
var path                = require('path');
var favicon             = require('serve-favicon');
var logger              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var expressValidator    = require('express-validator');

var databaseHandler = require('./modules/databaseHandler');
var users = require('./routes/users');
var app = express();

//  engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use('/users', users);

var dotenv = require('dotenv');
dotenv.load();


//DB setup, initialize FIRST then connect.
databaseHandler.initializeDatabase(path.join(__dirname, 'data'));
databaseHandler.connect('BrewSimDB', process.env.DB_USER, process.env.DB_PASSWORD);
var item_type = {};


app.get('/', function(req, res) {
    console.log("entered into main page.");
    res.render('QueryUI', {hops : {}})
	});

app.get('/about', function(req, res) {
    res.render('About');
	});

app.get('/results', function(req, res) {
    res.render('results');
    });


app.get('/query', function(req, res) {
  	res.render('QueryUI', {hops : {}})
	});

app.post('/query', function(req, res){
  	if(req.body.YeastName != "") {
        var  input = (req.body.YeastName == "all" ? "" : req.body.YeastName);
        databaseHandler.getYeastByName(input, function (result) {
            console.log('returned this: ' + result);
            item_type = {'print': result};
            res.render('results', item_type);
        });
    }
    else if(req.body.HopName != "") {
        var  input = (req.body.HopName == "all" ? "" : req.body.HopName);
        databaseHandler.getHopsByName(input,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.GrainName != "") {
        var  input = (req.body.GrainName == "all" ? "" : req.body.GrainName);
        databaseHandler.getGrainByName(input,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.AdditiveName != "") {
        var  input = (req.body.AdditiveName == "all" ? "" : req.body.AdditiveName);
        databaseHandler.getAdditiveByName(input,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.StyleName != "") {
        var  input = (req.body.StyleName == "all" ? "" : req.body.StyleName);
        databaseHandler.getStyleByName(input,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.RecipeName != "") {
        var  input = (req.body.RecipeName == "all" ? "" : req.body.RecipeName);
        databaseHandler.getRecipeByName(input,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.ABVbyRecipeName != "") {
        databaseHandler.getABVByRecipe(req.body.ABVbyRecipeName,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.IBUbyRecipeName != "") {
        databaseHandler.getIBUByRecipe(req.body.IBUbyRecipeName,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.HopsbyRecipeName != "") {
        databaseHandler.getHopsByRecipeName(req.body.HopsbyRecipeName,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.GrainbyRecipeName != "") {
        databaseHandler.getGrainByRecipeName(req.body.GrainbyRecipeName,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.YeastbyRecipeName != "") {
        databaseHandler.getYeastByRecipeName(req.body.YeastbyRecipeName,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else if(req.body.HopsNameInput != "" && req.body.HopsAAInput >0) {
  	    var purpose = (req.body.HopsAAInput > 9 ? "bitter" : "aroma");
        databaseHandler.addHops(req.body.HopsNameInput, req.body.HopsAAInput, purpose);
        res.render('QueryUI');
    }





    else if(req.body.HopRangeStart > 0 && req.body.HopRangeEnd > req.body.HopRangeStart){
        databaseHandler.getHopsByAA(req.body.HopRangeStart, req.body.HopRangeEnd,function (result) {
            console.log('returned this: ' + result);
            item_type = {'print' : result};
            res.render('results', item_type);
        });
    }
    else
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
