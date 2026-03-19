const { DB_TYPE } = require('../../../config/database')
module.exports = DB_TYPE === 'mongodb'
  ? require('./repositorieSurvey.mongo')
  : require('./repositorieSurvey.pg')
