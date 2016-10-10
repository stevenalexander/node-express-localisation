var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var nunjucks = require('express-nunjucks')
var i18n = require('i18n')

var indexRoute = require('./routes/index')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
nunjucks(app, {
  watch: true,
  noCache: true
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Set locale for translations
i18n.configure({
  locales: ['en', 'cy'],
  directory: path.join(__dirname, '/locales'),
  updateFiles: process.env.I18N_UPDATEFILES || true
})
app.use(i18n.init)

// index route will mount itself with any required dependencies
indexRoute(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
