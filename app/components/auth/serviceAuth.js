const bcrypt = require('bcrypt')

const repositorieUser = require('../users/repositorieUser')
const generarJWT = require('../../helpers/generateJWT')
const sendEmail = require('../../helpers/sendEmail')
const { cadenaAleatoria } = require('../../helpers/helpers')
const htmlToken = require('../../../views/emails/enviotoken')

const login = async (username, password) => {
  // Verificacion si el usuario existe
  const user = await repositorieUser.listByUsername(username)
  if (!user) {
    return 'Usuario/password incorrectos.'
  }

  // Verificacion de password
  const validPassword = bcrypt.compareSync(password, user.password)
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

const sendToken = async (username) => {
  const user = await repositorieUser.listByUsername(username)

  if (!user) {
    return 'Usuario no existe'
  }

  const token = cadenaAleatoria(6)

  const to = user.email
  const subject = 'Recuepracion de contraseña'
  const text = `Para la recuepracion de su contraseña se ha creado el siguiente token el cual 
                debe de ser ingresado en el aplicativo y luego deben de cambiar la contraseña.
                Token = ${token}`
  const html = htmlToken

  let resp = ''
  const respEmail = await sendEmail(to, subject, text, html)

  if (respEmail) {
    resp = repositorieUser.sendToken(token, user.uidd)
  } else {
    throw new Error('No coincide el token o el tiempo ya expiro')
  }

  return resp
}

const compareToken = async (token, userId, time) => {
  const resp = repositorieUser.compareToken(token, userId, time)

  if (!resp) {
    throw new Error('No coincide el token o el tiempo ya expiro')
  } else {
    return 'Si coincide el token'
  }
}

module.exports = { login, newToken, sendToken, compareToken }
