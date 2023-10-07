const { DataTypes } = require('sequelize');
const db = require('../../config/postgresql');

const User = db.define("user", {

    uid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
        type: DataTypes.INTEGER
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING
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
    state_id: {
        allowNull: false,
        type: DataTypes.INTEGER
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
        field: "created_date"
    },
    updated_date: {
        type: DataTypes.DATE,
        field: "updated_date"
    }

});

module.exports = User;