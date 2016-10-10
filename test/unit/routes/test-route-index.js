/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var supertest = require('supertest')
var expect = require('chai').expect
var express = require('express')
var bodyParser = require('body-parser')
var nunjucks = require('express-nunjucks')
var i18n = require('i18n')

describe('index', function () {
  var request

  beforeEach(function () {
    // Setting up the app this way means all dependencies from app.js are explicitly defined per route file
    var app = express()

    app.set('views', './app/views')
    nunjucks(app, {
      watch: true,
      noCache: true
    })

    app.use(bodyParser.urlencoded({ extended: false }))

    i18n.configure({
      locales: ['en', 'cy'],
      directory: '.app/locales',
      updateFiles: false
    })
    app.use(i18n.init)

    var route = proxyquire('../../../app/routes/index', {})

    route(app)

    request = supertest(app)
  })

  describe('GET /', function () {
    it('should respond with a 200 and render items', function (done) {
      request
        .get('/')
        .expect(200, function (error, response) {
          expect(error).to.be.null
          done()
        })
    })
  })
})
