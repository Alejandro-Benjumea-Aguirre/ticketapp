const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieContact.mongo')
  : require('./repositorieContact.pg')
