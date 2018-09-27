var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commands   = require('./routes/commands');
var queries   = require('./routes/queries');

var cors = require('cors');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cors({ origin: ['http://localhost:3001', ], credentials: true}));
app.use(cors());

app.use(cookieParser());
app.use(express.static(process.env.CLIENT_PATH || '../AutoViewerClient/build'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/commands', commands);
app.use('/api/queries', queries);

//Here the "routes" from IPC socket incoming messages are registered...
require('./routes/ipcReceiver')();

// //get the Position regularly
// var intervalID = setInterval(function(){
//     let connectedIPC = require('./ipc/ipc').getConnectedIPC();
//     if(connectedIPC){
//         connectedIPC.emit('GET_POSITION');
//         connectedIPC.emit('GET_POSITION_XY');
//     }
// }, 1000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;