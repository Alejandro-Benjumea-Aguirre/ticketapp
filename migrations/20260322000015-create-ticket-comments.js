'use strict'

// NOTA: El archivo modelTicketComment.js tiene un error de copy-paste —
// define db.define('survey', ...) en lugar de db.define('ticket_comments', ...).
// Esta migración crea la tabla correcta: ticket_comments.
// Se recomienda corregir el modelo para que use db.define('ticket_comments', ...).
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ticket_comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticket_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tickets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      coment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'states',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      public: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('ticket_comments')
  }
}
