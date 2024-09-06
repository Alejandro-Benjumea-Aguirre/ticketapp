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
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    /* define:{
            freezeTableName: true,
            timestamps: false
        }, */
   pool: {
      max: 10,
      min: 2,
      acquire: 60000,
      idle: 20000
    },
    // Habilitar si la BD esta en la nube
    /*dialectOptions: {
      ssl: true,
      native: true
       {
                require: true, // This will help you. But you will see nwe error
                rejectUnauthorized: false // This line will fix new error
       }
    }*/
  }
)

module.exports = db
