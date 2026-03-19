const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieUser.mongo')
  : require('./repositorieUser.pg')
