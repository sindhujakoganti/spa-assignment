var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();
var cors = require('cors')
var swaggerUi = require('swagger-ui-express');
var yaml = require('yamljs');
var swaggerDocument = yaml.load('./api-docs/taskDoc.yaml')

var indexRouter = require('./routes/index');
var taskRouter = require('./routes/tasks');
var userRouter = require('./routes/users');
var loginRouter = require('./routes/auth')

var app = express();
var port = 9000

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

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

var db = new sqlite3.Database('./db/users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
