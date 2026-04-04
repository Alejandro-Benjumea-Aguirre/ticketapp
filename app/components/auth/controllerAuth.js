const response = require('../../helpers/response')
const serviceAuth = require('./serviceAuth')
const AppError = require('../../utils/appError')

const login = async (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return next(new AppError('El nombre de usuario y la contraseña son obligatorios.', 400))
  }

  const { user, token } = await serviceAuth.login(username, password)

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  })

  response.success(req, res, user, 200)
}

const newToken = async (req, res, next) => {
  const { id } = req.body
  if (!id) {
    return next(new AppError('El id del usuario es obligatorio.', 400))
  }

  const { user, token } = await serviceAuth.newToken(id)
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  })
  response.success(req, res, user, 200)
}

const sendToken = async (req, res, next) => {
  const { username } = req.body
  if (!username) {
    return next(new AppError('El username es obligatorio.', 400))
  }
  const resp = await serviceAuth.sendToken(username)
  response.success(req, res, resp, 200)
}

const compareToken = async (req, res, next) => {
  const { token, username } = req.body
  if (!token || !username) {
    return next(new AppError('El token y el username es obligatorio.', 400))
  }

  const resp = await serviceAuth.compareToken(token, username, 10)
  if (resp.status) {
    response.success(req, res, resp, 200)
  }
}

const logout = (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  })
  response.success(req, res, { message: 'Sesión cerrada correctamente.' }, 200)
}

module.exports = { login, newToken, sendToken, compareToken, logout }
