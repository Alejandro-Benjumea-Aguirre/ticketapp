const jwt = require('jsonwebtoken')
const repositorieUser = require('../components/users/repositorieUser')
const response = require('../helpers/response')

const validarJWT = async (req, res, next) => {
  //const token = req.header('x-token')
  const token = req.cookies.access_token;

  if (!token) {
    return response.error(req, res, 'No existe token en la petición.', 401)
  }

  try {
    const { uid } = await jwt.verify(token, process.env.SECRETORPRIVATEDKEY)

    const user = await repositorieUser.listById(uid)

    if (!user) {
      return response.error(req, res, 'Token no valido - usuario no existe.', 401)
    }

    // Verificar si el user tiene estado true
    if (user.state_id != 1 ) {
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
