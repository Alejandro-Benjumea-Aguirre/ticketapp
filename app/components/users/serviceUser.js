const bcrypt = require('bcrypt')

const repositorieUser = require('./repositorieUser')
const serviceBitacora = require('../bitacora/serviceBitacora')

const listAllUsers = async () => {
  const resp = await repositorieUser.listAll()
  const users = []
  resp.forEach(user => {
    users.push({
      username: user.username,
      name: user.name,
      email: user.email,
      estado: user.estado,
      rol: user.rol,
      departamento: user.department,
      campus: user.campus,
      fecha_cracion: user.created_date,
      fecha_actualizacion: user.update_date
    })
  })
  return users
}

const listUser = async (id) => {
  const user = await repositorieUser.listById(id)
  if (user) {
    return {
      username: user.username,
      name: user.name,
      email: user.email,
      estado: user.estado,
      rol: user.rol,
      departamento: user.department,
      campus: user.campus,
      fecha_cracion: user.created_date,
      fecha_actualizacion: user.update_date
    }
  } else {
    return `No existe ningun usuario con el id ${id}`
  }
}

const listUserByUsername = async (username) => {
  const user = await repositorieUser.listByUsername(username)
  if (user) {
    return {
      username: user.username,
      name: user.name,
      email: user.email,
      estado: user.estado,
      rol: user.rol,
      departamento: user.department,
      campus: user.campus,
      fecha_cracion: user.created_date,
      fecha_actualizacion: user.update_date
    }
  } else {
    return `No existe ningun usuario con el username ${username}`
  }
}

const createUser = async (body) => {
  // Encriptacion de la contraseña
  const salt = bcrypt.genSaltSync()

  body.password = bcrypt.hashSync(body.password, salt)

  const resp = await repositorieUser.created(body)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'users', 
    fieldAffect: '', 
    dataPrev: '', 
    dataNew: 'Creacion', 
    username: ''
  }
  if(resp){
    const bitacora = await serviceBitacora.createBitacora(bodyBitacora)
    return {
      name: resp.getDataValue('name'),
      username: resp.getDataValue('username'),
      email: resp.getDataValue('email')
    }
  }else{
    return 'No se pudo crear el usuario intentalo de nuevo.'
  }
  
}

const updateUser = async (id, password, body) => {
  if (password) {
    const salt = bcrypt.genSaltSync()
    body.password = bcrypt.hashSync(password, salt)
  }

  const user = await repositorieUser.listById(id)

  if (!user) {
    return `No existe un usuario con el id ${id}`
  }

  const userUpdate = await repositorieUser.update(id, body)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'users', 
    fieldAffect: `${body}`,
    dataPrev: `${user}`, 
    dataNew: `${userUpdate}`, 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora)

  if (userUpdate > 0) {
    return {
      name: userUpdate.name,
      username: userUpdate.username,
      email: userUpdate.email
    }
  } else {
    return `No se pudo modificar el usuario con el id: ${id}`
  }
}

const inactiveUser = async (id) => {
  const user = await repositorieUser.listById(id)

  if (!user) {
    return `No existe un usuario con el id: ${id}`
  }

  const userInactive = await repositorieUser.remove(id)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'users', 
    fieldAffect: 'state_id',
    dataPrev: '1', 
    dataNew: '2', 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora);

  if (userInactive > 0) {
    return {
      name: userInactive.name,
      username: userInactive.username,
      email: userInactive.email
    }
  } else {
    return `No se pudo inactivar el usuario con el id: ${id}`
  }
}

const changePass = async (newpass, username) => {
  const user = await repositorieUser.listByUsername(username)

  if (!user) {
    return `No existe ningun usuario con el codigo ${username}`
  }

  const password = newpass
  const userUpdate = await repositorieUser.update(user.uid, password)

  if (userUpdate > 0) {
    return 'Se realizo la actualizacion de la contraseña correctamente.'
  } else {
    return 'No se pudo actualizar la contraseña intentalo de nuevo'
  }
}

module.exports = { 
  listAllUsers, 
  listUser, 
  listUserByUsername, 
  createUser, 
  updateUser, 
  inactiveUser, 
  changePass 
}
