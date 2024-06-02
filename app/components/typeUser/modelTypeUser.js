const { DataTypes, Sequelize } = require('sequelize')
const db = require('../../../config/postgresql')

const TypeUser = db.define('type_users', {

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
  stateId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'state_id',
    references: {
      model: 'states',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_date',
    defaultValue: Sequelize.NOW()
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_date',
    defaultValue: Sequelize.NOW()
  }

})

module.exports = TypeUser
