const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(payload, process.env.SECRETORPRIVATEDKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log('Error al generar el JWT:', err)
        reject(new Error('Error al generar el token de autenticación'))
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = generarJWT
