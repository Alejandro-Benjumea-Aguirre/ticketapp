const express = require('express');
const cors = require('cors');

const db = require('../../config/postgresql');
//const userRouter = require('../models/users');

class Server {

    app;
    port;
    /* apiPath = {
        usuarios: '/api/usuarios',
    } */

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConecction();
        this.middlewares();

        // Definir mis rutas
        this.routes();
    }

    async dbConecction() {
        try {

            await db.authenticate();
            console.log('Database Online');

        } catch (error) {
            throw new Error( error );
        }
    }

    middlewares(){
        // cors
        this.app.use( cors());

        // lectura y parseo del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );
        /* this.app.get('*', (req, res) => {
            res.sendFile( __dirname + '/public/404.html');
        }) */

    }

    routes() {
        /* this.app.use( this.apiPath.usuarios, userRouter) */
        this.app.use('/api', require('../routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        });
    }
}

module.exports = Server;