'use strict'

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    // 1. Estados base
    await queryInterface.bulkInsert('states', [
      {
        name: 'Activo',
        description: 'Registro activo en el sistema',
        created_date: new Date(),
        updated_date: new Date()
      },
      {
        name: 'Inactivo',
        description: 'Registro inactivo en el sistema',
        created_date: new Date(),
        updated_date: new Date()
      }
    ])

    // 2. Roles base
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Administrador',
        description: 'Acceso total al sistema',
        state_id: 1,
        created_date: new Date(),
        updated_date: new Date()
      },
      {
        name: 'Agente',
        description: 'Atiende tickets de soporte',
        state_id: 1,
        created_date: new Date(),
        updated_date: new Date()
      },
      {
        name: 'Cliente',
        description: 'Crea y consulta sus propios tickets',
        state_id: 1,
        created_date: new Date(),
        updated_date: new Date()
      }
    ])

    // 3. Usuario administrador
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync('Admin123!', salt)

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        name: 'Administrador',
        password: passwordHash,
        email: 'admin@ticketapp.com',
        rol_id: 1,
        state_id: 1,
        department_id: 1,
        campus_id: 1,
        created_date: new Date(),
        updated_date: new Date()
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', { username: 'admin' })
    await queryInterface.bulkDelete('roles', null)
    await queryInterface.bulkDelete('states', null)
  }
}
