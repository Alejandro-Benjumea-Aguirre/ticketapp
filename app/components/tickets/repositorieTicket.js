const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieTicket.mongo')
  : require('./repositorieTicket.pg')
