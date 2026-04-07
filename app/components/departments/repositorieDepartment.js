const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieDepartment.mongo')
  : require('./repositorieDepartment.pg')
