const { DataTypes, Sequelize } = require('sequelize')
const db = require('../../../config/postgresql')

const Bitacora = db.define('bitacora', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  eventId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'event_id',
    references: {
      model: 'events',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  tableAffect: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'table_affect'
  },
  fieldAffect: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'field_affect'
  },
  dataPrev: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'data_prev'
  },
  dataNew: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'data_new'
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'cod_user'
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

module.exports = Bitacora
