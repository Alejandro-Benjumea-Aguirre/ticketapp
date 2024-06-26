const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(payload, process.env.SECRETORPRIVATEDKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(new Error('No se pudo generar el JWT'))
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = generarJWT
