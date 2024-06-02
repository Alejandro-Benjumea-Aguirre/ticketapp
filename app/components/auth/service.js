const bcrypt = require('bcrypt')

const repositorieUser = require('../users/repositorieUser')
const generarJWT = require('../../helpers/generateJWT')

const login = async (username, password) => {
  // Verificacion si el usuario existe
  const user = await repositorieUser.listByUsername(username)
  if (!user) {
    return 'Usuario/password incorrectos.'
  }

  // Verificacion de password
  const validPassword = bcrypt.compareSync(password,user.password)
  if (!validPassword) {
    return 'Usuario/password incorrectos'
  }

  // Generar JWT
  const token = await generarJWT(user.uid)

  return {
    name: user.name,
    username: user.username,
    email: user.geemail,
    token
  }
}

const newToken = async (id) => {
  const user = await repositorieUser.listById(id)

  if (!user) {
    return 'Usuario no existe.'
  }

  const token = await generarJWT(String(id))

  return {
    ame: user.getDataValue('name'),
    username: user.getDataValue('username'),
    email: user.getDataValue('email'),
    token
  }
}

module.exports = { login, newToken }
