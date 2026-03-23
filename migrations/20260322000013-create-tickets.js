'use strict'

// NOTA: Los campos priority_id, application_id, browser_id, sisope_id y reason_id
// no tienen referencias FK definidas en el modelo. Se crean sin FK constraint.
// Si existen tablas para estos catálogos, agregar las referencias correspondientes.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      priority_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      application_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      state_id: {
        type: Sequelize.INTEGER
      },
      browser_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sisope_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_id_resp: {
        type: Sequelize.INTEGER
      },
      subject: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
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
      },
      close_date: {
        type: Sequelize.DATE
      },
      on_hold: {
        type: Sequelize.BOOLEAN
      },
      reason_id: {
        type: Sequelize.INTEGER
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('tickets')
  }
}
