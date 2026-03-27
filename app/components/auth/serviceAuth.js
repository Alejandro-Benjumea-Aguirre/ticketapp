const bcrypt = require('bcrypt')

const repositorieUser = require('../users/repositorieUser')
const generarJWT = require('../../helpers/generateJWT')
const sendEmail = require('../../helpers/sendEmail')
const { cadenaAleatoria } = require('../../helpers/helpers')
const htmlToken = require('../../../views/emails/enviotoken')

const login = async (username, password) => {
  const user = await repositorieUser.listByUsername(username)

  if (user.status_id === 2) {
    const error = new Error(`Usuario inactivo comuniquese con el administrador.`)
    error.statusCode = 404
    throw error
  }

  if (!user) {
    const error = new Error(`Usuario/contraseña incorrectos.`)
    error.statusCode = 404
    throw error
  }

  // Verificacion de password
  const isValidPassword = bcrypt.compareSync(password, user.password)
  if (!isValidPassword) {
    const error = new Error(`Usuario/contraseña incorrectos.`)
    error.statusCode = 404
    throw error
  }

  // Generar JWT
  const token = await generarJWT(user.uid)

  return {
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      rol_id: user.rol_id
    },
    token
  }
}

const newToken = async (id) => {

  const user = await repositorieUser.listById(id)
  if (!user) {
      const error = new Error(`No existe el usuario con el id.`)
      error.statusCode = 404
      throw error
  }

  const token = await generarJWT(String(id))

  return {
    user: {
      name: user.getDataValue('name'),
      username: user.getDataValue('username'),
      email: user.getDataValue('email'),
      rol: user.getDataValue('rol_id')
    },
    token
  }
}

const sendToken = async (username) => {

  const user = await repositorieUser.listByUsername(username)
  if (!user) {
    const error = new Error('No existe usuario con el username enviado.')
    error.statusCode = 404
    throw error
  }

  const token = cadenaAleatoria(6)
  if (!token) {
    const error = new Error('Error en la generación del token.')
    error.statusCode = 404
    throw error
  }

  const to = user.email
  const subject = 'Recuperación de contraseña'
  const text = `Para la recuperación de su contraseña se ha creado el siguiente token el cual 
                debe de ser ingresado en el aplicativo y luego deben de cambiar la contraseña.
                Token = ${token}`
  const html = htmlToken

  // Enviar el correo electrónico con el token
  const respEmail = await sendEmail(to, subject, text, html)

  if (!respEmail) {
    const error = new Error('No se pudo enviar el correo.')
    error.statusCode = 404
    throw error
  }

  // Guardar el token en la base de datos
  await repositorieUser.sendToken(token, user.uid)

  return { success: true, message: 'Token enviado exitosamente.' }
}

const compareToken = async (token, userId, time) => {
  const resp = await repositorieUser.compareToken(token, userId, time)
  if (!resp) {
    const error = new Error('No coincide el token o el tiempo ya expiro')
    error.statusCode = 404
    throw error
  }

  return {
    status: true,
    msg: 'El token coincide con el usuario.'
  }
}

module.exports = { login, newToken, sendToken, compareToken }
