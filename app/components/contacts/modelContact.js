const { DataTypes, Sequelize } = require('sequelize')
const db = require('../../../config/postgresql')

const Contact = db.define('contacts', {

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
  clientId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'client_id',
    references: {
      model: 'clients',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  typeUserId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'type_user_id',
    references: {
      model: 'type_users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
  campusId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'campus_id',
    references: {
      model: 'customers',
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

module.exports = Contact
