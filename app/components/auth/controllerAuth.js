const response = require('../../helpers/response')
const serviceAuth = require('./serviceAuth')

const login = async (req, res) => {

  try {
    const { username, password } = req.body
    if (!username || !password) {
      const error = new Error(`El nombre de usuario y la contraseña son obligatorios.`)
      error.statusCode = 404
      throw error
    }

    const { user, token } = await serviceAuth.login(username, password)

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    })

    response.success(req, res, user, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const newToken = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) {
      const error = new Error(`El id del usuario es obligatorio.`)
      error.statusCode = 404
      throw error
    }

    const { user, token } = await serviceAuth.newToken(id)
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    })
    response.success(req, res, user, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const sendToken = async (req, res) => {
  try {
    const { username } = req.body
    if (!username) {
      const error = new Error(`El username es obligatorio.`)
      error.statusCode = 404
      throw error
    }
    const resp = await serviceAuth.sendToken(username)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const compareToken = async (req, res) => {
  try {
    const { token, username } = req.body
    if (!token || !username) {
      const error = new Error(`El token y el username es obligatorio.`)
      error.statusCode = 404
      throw error
    }

    const resp = await serviceAuth.compareToken(token, username, 10)
    if (resp.status) {
      response.success(req, res, resp, 200)
    }
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

module.exports = { login, newToken, sendToken, compareToken }
