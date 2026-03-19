require('dotenv').config()

const DB_TYPE = (process.env.DB_TYPE || 'postgres').toLowerCase()

const connect = async () => {
  if (DB_TYPE === 'mongodb') {
    const connectMongoDB = require('./mongodb')
    await connectMongoDB()
  } else {
    const db = require('./postgresql')
    await db.authenticate()
    console.log('PostgreSQL Online')
  }
}

module.exports = { connect, DB_TYPE }
