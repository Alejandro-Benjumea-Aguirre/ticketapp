const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieCampus.mongo')
  : require('./repositorieCampus.pg')
