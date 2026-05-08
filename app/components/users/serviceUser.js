const bcrypt = require('bcrypt')

const repositorieUser = require('./repositorieUser')
const serviceBitacora = require('../bitacora/serviceBitacora')

const listAllUsers = async () => {
  const response = await repositorieUser.listAll()
  if (!response) {
    const error = new Error('No existen usuarios aun en la abase de datos')
    error.statusCode = 404
    throw error
  }
  let users = []
  response.forEach(user => {
    users.push({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      estado: user.estado,
      rol: user.rol,
      rol_id: user.rol_id,
      departamento: user.department,
      campus: user.campus,
      create_at: user.created_date,
      update_at: user.updated_date
    })
  })
  return users
}

const listUser = async (id) => {
  const user = await repositorieUser.listById(id)
  if (!user) {
    const error = new Error(`No existe ningún usuario con el id ${id}`)
    error.statusCode = 404
    throw error
  }

  return {
    username: user.username,
    name: user.name,
    email: user.email,
    estado: user.status,
    rol: user.rol,
    rol_id: user.rol_id,
    departamento: user.department,
    campus: user.campus,
    fecha_cracion: user.created_date,
    fecha_actualizacion: user.updated_date
  }
}

const listUserByUsername = async (username) => {
  const user = await repositorieUser.listByUsername(username)
  if (!user) {
    const error = new Error(`No existe ningún usuario con el username ${username}`)
    error.statusCode = 404
    throw error
  }

  return {
    username: user.username,
    name: user.name,
    email: user.email,
    estado: user.status,
    rol: user.rol,
    rol_id: user.rol_id,
    departamento: user.department,
    campus: user.campus,
    fecha_cracion: user.created_date,
    fecha_actualizacion: user.updated_date
  }
}

const createUser = async (body) => {
  // Encriptacion de la contraseña
  const salt = bcrypt.genSaltSync()

  body.password = bcrypt.hashSync(body.password, salt)

  const resp = await repositorieUser.created(body)
  const bodyBitacora = {
    eventId: null,
    tableAffect: 'users',
    fieldAffect: '',
    dataPrev: '',
    dataNew: 'Creacion',
    username: ''
  }
  if (!resp) {
    const error = new Error('No se pudo realizar la creación del usuario.')
    error.statusCode = 400
    throw error
  }

  await serviceBitacora.createBitacora(bodyBitacora)
  return {
    name: resp.getDataValue('name'),
    username: resp.getDataValue('username'),
    email: resp.getDataValue('email')
  }
}

const updateUser = async (id, password, body) => {
  if (password) {
    const salt = bcrypt.genSaltSync()
    body.password = bcrypt.hashSync(password, salt)
  }

  const user = await repositorieUser.listById(id)
  if (!user) {
    const error = new Error(`No existe un usuario con el id ${id}`)
    error.statusCode = 404
    throw error
  }

  const userUpdate = await repositorieUser.update(id, body)
  if (!userUpdate) {
    const error = new Error(`No se pudo modificar el usuario con el id: ${id}`)
    error.statusCode = 400
    throw error
  }

  const bodyBitacora = {
    eventId: null,
    tableAffect: 'users',
    fieldAffect: `${body}`,
    dataPrev: `${user}`,
    dataNew: `${userUpdate}`,
    username: ''
  }
  await serviceBitacora.createBitacora(bodyBitacora)
  return {
    name: userUpdate[1][0].getDataValue('name'),
    username: userUpdate[1][0].getDataValue('username'),
    email: userUpdate[1][0].getDataValue('email')
  }
}

const changeStatus = async (id, status) => {
  const user = await repositorieUser.listById(id)
  if (!user) {
    const error = new Error(`No existe un usuario con el id ${id}`)
    error.statusCode = 404
    throw error
  }

  const userUpdate = await repositorieUser.updateStatus(id, status)
  if (!userUpdate) {
    const error = new Error(`No se pudo cambiar el estado al usuario con id: ${id}`)
    error.statusCode = 400
    throw error
  }

  const bodyBitacora = {
    eventId: null,
    tableAffect: 'users',
    fieldAffect: `${id}`,
    dataPrev: `${user}`,
    dataNew: `${userUpdate}`,
    username: ''
  }

  await serviceBitacora.createBitacora(bodyBitacora)
  return {
    name: userUpdate[1][0].getDataValue('name'),
    username: userUpdate[1][0].getDataValue('username'),
    email: userUpdate[1][0].getDataValue('email'),
    status: userUpdate[1][0].getDataValue('status_id')
  }
}

const inactiveUser = async (id) => {
  const user = await repositorieUser.listById(id)
  if (!user) {
    const error = new Error(`No existe un usuario con el id ${id}`)
    error.statusCode = 404
    throw error
  }

  const userInactive = await repositorieUser.remove(id)
  if (!userInactive) {
    const error = new Error(`No se pudo inactivar el usuario con el id: ${id}`)
    error.statusCode = 400
    throw error
  }

  const bodyBitacora = {
    eventId: null,
    tableAffect: 'users',
    fieldAffect: 'state_id',
    dataPrev: '1',
    dataNew: '2',
    username: ''
  }

  await serviceBitacora.createBitacora(bodyBitacora)
  return {
    name: userInactive[1][0].getDataValue('name'),
    username: userInactive[1][0].getDataValue('username'),
    email: userInactive[1][0].getDataValue('email')
  }
}

const changePass = async (newpass, username) => {
  const user = await repositorieUser.listByUsername(username)
  if (!user) {
    const error = new Error(`No existe un usuario con el username ${username}`)
    error.statusCode = 404
    throw error
  }

  const salt = bcrypt.genSaltSync()
  const password = bcrypt.hashSync(newpass, salt)
  const userUpdate = await repositorieUser.update(user.uid, { password })
  if (!userUpdate) {
    const error = new Error(`No se pudo inactivar el usuario con el username: ${username}`)
    error.statusCode = 400
    throw error
  }

  return 'Se realizo la actualizacion de la contraseña correctamente.'
}

module.exports = {
  listAllUsers,
  listUser,
  listUserByUsername,
  createUser,
  updateUser,
  inactiveUser,
  changePass,
  changeStatus
}
