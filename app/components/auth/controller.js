const response = require('../../helpers/response')
const serviceAuth = require('./service')

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

module.exports = { login, newToken }
