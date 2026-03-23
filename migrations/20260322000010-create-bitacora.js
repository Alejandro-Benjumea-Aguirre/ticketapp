'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('bitacora', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      table_affect: {
        allowNull: false,
        type: Sequelize.STRING
      },
      field_affect: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_prev: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_new: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cod_user: {
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
    await queryInterface.dropTable('bitacora')
  }
}
