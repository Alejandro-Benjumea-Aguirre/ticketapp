const jwt = require('jsonwebtoken')
const modelUser = require('../components/users/model')
const response = require('../helpers/response')

const validarJWT = async (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return response.error(req, res, 'No existe token en la petición.', 401)
  }

  try {
    const { uid } = await jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    const user = await modelUser.findByPk(uid)

    if (!user) {
      return response.error(req, res, 'Token no valido - usuario no existe.', 401)
    }

    // Verificar si el uid tiene estado true
    if (!user.active) {
      return response.error(req, res, 'Token no valido - usuario inactivo', 401)
    }

    req.usuario = user

    return next()
  } catch (error) {
    console.log(error)
    return response.error(req, res, 'Token no valido.', 401)
  }
}

module.exports = validarJWT
