var path = require('path')

module.exports = function (app) {
  app.use('/users', require('../server/api/users'));
  app.use('/orders', require('../server/api/orders'));
}
