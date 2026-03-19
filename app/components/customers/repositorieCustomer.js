const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieCustomer.mongo')
  : require('./repositorieCustomer.pg')
