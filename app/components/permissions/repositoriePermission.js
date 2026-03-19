const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositoriePermission.mongo')
  : require('./repositoriePermission.pg')
