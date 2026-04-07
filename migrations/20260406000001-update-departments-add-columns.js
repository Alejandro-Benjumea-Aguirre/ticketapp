'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('departments', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('departments', 'state_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'states',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('departments', 'description')
    await queryInterface.removeColumn('departments', 'state_id')
  }
}
