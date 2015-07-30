var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var config = require('./config/app.config');

//Getting instance for database
var db = require('./config/database.config')();
//Loading Mongoose models
require('./DatabaseSchema/models')();

var publicRoutes = require('./routes/public');
var apiRoutes = require('./routes/private');
var htmls = require('./routes/static');
 
var app = express();
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.static(__dirname + '/Client/app'));
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/Client/app/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bower_components', express.static(__dirname + '/Client/bower_components'));
app.use('/styles', express.static(__dirname + '/Client/app/styles'));
app.use('/scripts', express.static(__dirname + '/Client/app/scripts'));
app.use('/views', express.static(__dirname + '/Client/app/views'));
app.use('/images', express.static(__dirname + '/Client/app/images'));

app.use('/', htmls);
app.use('/api/', apiRoutes);
app.use('/public/', publicRoutes);

apiRoutes.use(function (req, res, next) {
    
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.__auth;
    
    // decode token
    if (token) {
        
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({ IsSuccess: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                res.cookie('__auth', token, { maxAge: 1200000, httpOnly: true });
                next();
            }
        });

    } else {
        
        // if there is no token
        // return an error
        return res.status(403).send({
            IsSuccess: false, 
            Message: 'No token provided.'
        });
    
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
