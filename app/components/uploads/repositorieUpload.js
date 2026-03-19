const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieUpload.mongo')
  : require('./repositorieUpload.pg')
