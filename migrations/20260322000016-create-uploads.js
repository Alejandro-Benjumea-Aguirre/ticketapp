'use strict'

// NOTA: El modelo original define id_ticket con tipo DataTypes.STRING,
// pero debe ser INTEGER ya que es una FK a tickets.id. Se corrige aquí.
// También id_coment referencia 'coments' en el modelo, que probablemente
// corresponde a 'ticket_comments'. Se actualiza la referencia.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('uploads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ticket: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tickets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      id_coment: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ticket_comments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nom_archivo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      real_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('uploads')
  }
}
