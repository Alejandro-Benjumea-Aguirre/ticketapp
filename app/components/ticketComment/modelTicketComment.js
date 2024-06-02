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
	coment: {
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
	public: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		defaultValue: false
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
  