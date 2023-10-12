const bcrypt = require('bcrypt')

const modelUser = require('../models/users')

const listAllUsers = async () => {
  return await modelUser.findAll()
}

const listUser = async (id) => {
  const user = await modelUser.findByPk(id)
  if (user) {
    return user
  } else {
    return `No existe ningun usuario con el id ${id}`
  }
}

const createUser = async (body) => {
  // Encriptacion de la contraseña
  const salt = bcrypt.genSaltSync()
  body.password = bcrypt.hashSync(body.password, salt)

  const user = modelUser.build(body)
  await user.save()

  return {
    id: user.getDataValue('uid'),
    name: user.getDataValue('name'),
    username: user.getDataValue('username'),
    email: user.getDataValue('email')
  }
}

const updateUser = async (id, password, body) => {
  if (password) {
    const salt = bcrypt.genSaltSync()
    body.password = bcrypt.hashSync(password, salt)
  }

  const user = await modelUser.findByPk(id)

  if (!user) {
    return `No existe un usuario con el id ${id}`
  }

  await user.update(body)

  return {
    name: user.getDataValue('name'),
    username: user.getDataValue('username'),
    email: user.getDataValue('email')
  }
}

const inactiveUser = async (id) => {
  const user = await modelUser.findByPk(id)

  if (!user) {
    return `No existe un usuario con el id: ${id}`
  }

  await user.update({ state_id: 2 })

  return {
    name: user.getDataValue('name'),
    username: user.getDataValue('username'),
    email: user.getDataValue('email')
  }
}

module.exports = { listAllUsers, listUser, createUser, updateUser, inactiveUser }
