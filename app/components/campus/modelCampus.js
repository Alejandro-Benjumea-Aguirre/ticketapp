const { DataTypes, Sequelize } = require('sequelize')
const db = require('../../../config/postgresql')

const Campus = db.define('headquarters', {

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
  urlAlternative: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'url_alternative'
  },
  clientId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'client_id',
    references: {
      model: 'customers',
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

module.exports = Campus
