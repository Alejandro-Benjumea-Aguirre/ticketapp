const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieRol.mongo')
  : require('./repositorieRol.pg')
