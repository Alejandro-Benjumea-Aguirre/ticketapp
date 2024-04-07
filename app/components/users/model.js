const { Model, DataTypes } = require('sequelize')
// const db = require('../../../config/postgresql')

// const State = require('../states/model')

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  rol_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  idStates: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'States',
      key: 'id'
    },
    field: 'status_id'
  },
  department_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  campus_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_date'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_date'
  }
}

class User extends Model {
  static associate () {
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User'
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }

// Model.belongsTo(State, {
//   foreignKey: 'id',
//   targetKey: 'state_id'
// })

// module.exports = User
