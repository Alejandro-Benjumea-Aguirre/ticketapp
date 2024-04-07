const express = require('express')
const cors = require('cors')

const db = require('../../config/postgresql')

class Server {
  _app
  _port

  constructor () {
    this._app = express()
    this._port = process.env.PORT || '8000'

    this.dbConecction()
    this.middlewares()

    // Definir mis rutas
    this.routes()
  }

  async dbConecction () {
    try {
      await db.authenticate()
      console.log('Database Online')
    } catch (error) {
      throw new Error(error)
    }
  }

  middlewares () {
    // cors
    this._app.use(cors())

    // Comprension de gzip
    // this._app.use(compression());

    //
    this._app.use(express.urlencoded({ extended: true }))

    // lectura y parseo del body
    this._app.use(express.json())

    // Carpeta publica
    this._app.use(express.static('public'))
    /* this.app.get('*', (req, res) => {
            res.sendFile( __dirname + '/public/404.html');
        }) */
  }

  routes () {
    this._app.use('/api', require('../routes'))
  }

  listen () {
    this._app.listen(this._port, () => {
      console.log('Servidor corriendo en puerto ' + this._port)
    })
  }
}

module.exports = Server
