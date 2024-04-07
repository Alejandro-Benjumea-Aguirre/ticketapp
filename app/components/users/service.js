const bcrypt = require('bcrypt')

const repositorieUser = require('./repositorie')

const listAllUsers = async () => {
  const resp = []
  const users = await repositorieUser.listAll()
  users.forEach(user => {
    resp.push({
      username: user.username,
      name: user.name,
      email: user.email,
      create_user: user.created_date,
      update_user: user.updated_date
    })
  })
  return resp
}

const listUser = async (id) => {
  const user = await repositorieUser.listById(id)
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

  const user = await repositorieUser.created(body)

  return {
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

  const user = await repositorieUser.listById(id)

  if (!user) {
    return `No existe un usuario con el id ${id}`
  }

  const resp = await repositorieUser.updated(id, body)

  return {
    name: resp.getDataValue('name'),
    username: resp.getDataValue('username'),
    email: resp.getDataValue('email')
  }
}

const inactiveUser = async (id) => {
  const user = await repositorieUser.listById(id)

  if (!user) {
    return `No existe un usuario con el id: ${id}`
  }

  const resp = await repositorieUser.updated(id, { state_id: 2 })

  return {
    name: resp.getDataValue('name'),
    username: resp.getDataValue('username'),
    email: resp.getDataValue('email')
  }
}

module.exports = { listAllUsers, listUser, createUser, updateUser, inactiveUser }
