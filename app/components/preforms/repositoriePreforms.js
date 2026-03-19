const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositoriePreforms.mongo')
  : require('./repositoriePreforms.pg')
