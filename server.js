var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');

// configuration ===============================================================
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); 

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/assets', express.static(__dirname + "/assets"));
app.use('/public', express.static(__dirname + "/public"));


// routes ======================================================================
require('./app/routes.js')(app, passport);
//require('./pubilc/js/index.js');

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

// The end