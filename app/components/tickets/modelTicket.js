const { DataTypes, Sequelize } = require('sequelize')
const db = require('../../../config/postgresql')

const Ticket = db.define('tickets', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id'
  },
  priorityId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'priority_id'
  },
  applicationId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'application_id'
  },
  stateId: {
    type: DataTypes.INTEGER,
    field: 'state_id'
  },
  browserId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'browser_id'
  },
  sisopeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'sisope_id'
  },
  userIdResp: {
    type: DataTypes.INTEGER,
    field: 'user_id_resp'
  },
  subject: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
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
  },
  closeAt: {
    type: DataTypes.DATE,
    field: 'close_date'
  },
  onHold: {
    type: DataTypes.BOOLEAN,
    field: 'on_hold'
  },
  reasonId: {
    type: DataTypes.INTEGER,
    field: 'reason_id'
  }, 
})

module.exports = Ticket
