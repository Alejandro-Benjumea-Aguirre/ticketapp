const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const { rateLimit } = require('express-rate-limit');

const { connect } = require('../../config/database');

class Server {
  #app
  #port
  #limiter

  constructor () {
    this.#app = express()
    this.#port = process.env.PORT || '8000'

    // Conexion a la base de datos
    this.dbConecction()

    // this.dbConecction()
    this.middlewares()

    // Definir mis rutas
    this.routes()

    // definir la configuracion de rate limit
    this.#limiter = rateLimit({
      windowMs: 15*60*1000,
      limit: 100,
      message: 'Demasiadas solicitudes desde esta IP, por favor intenta más tarde.'
    })

    this.#app.use(this.#limiter);
  }

  async dbConecction () {
    try {
      await connect()
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      process.exit(1);
    }
  }

  middlewares () {
    // cors
    this.#app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }))

    // Comprension de gzip
    this.#app.use(compression());

    // lectura y parseo del body
    this.#app.use(express.json())
    this.#app.use(cookieParser())

    // Carpeta publica
    this.#app.use(express.static('public'))
    /* this.app.get('*', (req, res) => {
            res.sendFile( __dirname + '/public/404.html');
        }) */

  }

  routes () {
    this.#app.use('/api', require('../routes'))
  }

  listen () {
    this.#app.listen(this.#port, () => {
      console.log('Servidor corriendo en puerto ' + this.#port)
    })
  }
}

module.exports = Server

