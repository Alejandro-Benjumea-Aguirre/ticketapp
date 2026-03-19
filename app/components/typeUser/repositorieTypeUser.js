const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieTypeUser.mongo')
  : require('./repositorieTypeUser.pg')
