const { DataTypes } = require('sequelize')
const db = require('../../../config/postgresql')

const State = db.define('states', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_date'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_date'
  }
})

module.exports = State
