const { DataTypes, Sequelize } = require('sequelize')
const db = require('../../../config/postgresql')

const Upload = db.define('uploads', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  idTicket: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_ticket',
    references: {
        model: 'tickets',
        key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  idComent: {
    type: DataTypes.INTEGER,
    field: 'id_coment',
    references: {
      model: 'coments',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  nomArchivo: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nom_archivo',
  },
  size: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  realName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'real_name'
  },
  path: {
    allowNull: false,
    type: DataTypes.STRING,
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

module.exports = Upload
