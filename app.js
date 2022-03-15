var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const roleRouter = require('./routes/role');
const tb_roleRouter = require('./routes/tb_role_router');
const tb_pubRouter = require('./routes/publication');
const tb_sectionRouter = require('./routes/tb_section_router');
const tb_userRouter = require('./routes/tb_user.router');


var app = express();
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({
  limit:'1000mb'
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/role',roleRouter);
app.use('/api/role',tb_roleRouter);
app.use('/api/pub',tb_pubRouter);
app.use('/api/section',tb_sectionRouter);
app.use('/api/user',tb_userRouter);

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
