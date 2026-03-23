'use strict'

// NOTA: El modelo original referencia 'clients' en client_id, pero la tabla de
// clientes en este proyecto es 'customers'. Se corrige aquí para apuntar a 'customers'.
// Revisar también campusId que referencia 'customers' en lugar de 'headquarters'.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      client_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type_user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'type_users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
      campus_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'headquarters',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('contacts')
  }
}
