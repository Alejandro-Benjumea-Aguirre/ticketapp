const response = require('../../helpers/response')
const serviceAuth = require('./serviceAuth')

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const resp = await serviceAuth.login(username, password)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const newToken = async (req, res) => {
  const id = req.body

  const resp = await serviceAuth.newToken(id)
  response.success(req, res, resp, 200)
}

const sendToken = async (req, res) => {
  const username = req.body

  const resp = await serviceAuth.recPass(username)
  response.success(req, res, resp, 200)
}

const compareToken = async (req, res) => {
  const { token, username } = req.body

  const resp = await serviceAuth.compareToken(token, username, 10)
  response.success(req, res, resp, 200)
}

module.exports = { login, newToken, sendToken, compareToken }
