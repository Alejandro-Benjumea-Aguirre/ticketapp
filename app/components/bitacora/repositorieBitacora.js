const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieBitacora.mongo')
  : require('./repositorieBitacora.pg')
