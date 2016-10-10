var express = require('express')

module.exports = function (app) {
  var route = express.Router()

  app.use('/', route)

  route.get('/', function (req, res) {
    // MessageFormat - messageformat.github.io
    // can replace too
    var msg1 = res.__mf('Hello {name}', { name: 'Marcus' }) // --> Hallo Marcus
    // and combines with sprintf
    var msg2 = res.__mf('Hello {name}, how was your %s?', 'test', { name: 'Marcus' }) // --> Hallo Marcus, wie war dein test?

    console.log(msg1)
    console.log(msg2)

    res.render('index', { title: 'Localisation example', message1: msg1, message2: msg2 })
  })
}
