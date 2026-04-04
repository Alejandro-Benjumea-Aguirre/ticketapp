const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const { connect } = require('../../config/database');
const sanitize = require('../middleware/sanitize');

class Server {
  #app
  #port

  constructor () {
    this.#app = express()
    this.#port = process.env.PORT || '8000'

    this.dbConecction()
    this.middlewares()
    this.routes()
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
    // Seguridad: headers HTTP
    this.#app.use(helmet())

    // CORS configurable via .env
    const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
      .split(',')
      .map(o => o.trim())

    this.#app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
        callback(new Error(`Origen no permitido por CORS: ${origin}`))
      },
      credentials: true
    }))

    // Rate limiting (antes de las rutas)
    this.#app.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: true, status: 429, body: 'Demasiadas solicitudes, intenta más tarde.' }
    }))

    // Comprensión gzip
    this.#app.use(compression())

    // Parseo del body
    this.#app.use(express.json({ limit: '10kb' }))
    this.#app.use(cookieParser())

    // Sanitización: NoSQL injection (MongoDB)
    this.#app.use(mongoSanitize())

    // Sanitización: XSS en body, query y params
    this.#app.use(sanitize)

    // Prevención HTTP Parameter Pollution
    this.#app.use(hpp())

    // Carpeta publica
    this.#app.use(express.static('public'))
  }

  routes () {
    this.#app.use('/api', require('../routes'))
    this.#app.use(require('../components/errorController'))
  }

  listen () {
    this.#app.listen(this.#port, () => {
      console.log('Servidor corriendo en puerto ' + this.#port)
    })
  }
}

module.exports = Server

