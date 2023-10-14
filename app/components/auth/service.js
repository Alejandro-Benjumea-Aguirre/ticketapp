const bcrypt = require('bcrypt')

const modelUser = require('../users/model')
const generarJWT = require('../../helpers/generateJWT')

const login = async (username, password) => {
  // Verificacion si el usuario existe
  const user = await modelUser.findOne({
    where: {
      username
    }
  })
  if (!user) {
    return 'Usuario/password incorrectos.'
  }

  // Verificacion de password
  const validPassword = bcrypt.compareSync(password,
    user.getDataValue('password'))
  if (!validPassword) {
    return 'Usuario/password incorrectos'
  }

  // Generar JWT
  const token = await generarJWT(user.getDataValue('uid'))

  return {
    name: user.getDataValue('name'),
    username: user.getDataValue('username'),
    email: user.getDataValue('email'),
    token
  }
}

const newToken = async (id) => {
  const user = await modelUser.findByPk(id)

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