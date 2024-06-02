const { DataTypes, Sequelize } = require('sequelize')
const db = require('../../../config/postgresql')

const Survey = db.define('survey', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ticketId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'ticket_id',
    references: {
        model: 'tickets',
        key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  dateSend: {
    type: DataTypes.DATE,
    field: 'date_send'
  },
  dateReply: {
    type: DataTypes.DATE,
    field: 'date_reply'
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
  numNoti: {
    type: DataTypes.INTEGER,
    field: 'num_noti'
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

module.exports = Survey
