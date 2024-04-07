require('dotenv').config()

const { Sequelize } = require('sequelize')

const db = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    /* define:{
            freezeTableName: true,
            timestamps: false
        }, */
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

module.exports = db
