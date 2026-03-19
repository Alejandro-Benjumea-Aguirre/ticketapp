const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieTicketComment.mongo')
  : require('./repositorieTicketComment.pg')
