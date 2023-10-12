require('dotenv').config()
const Server = require('./app/models/sevrver')

const server = new Server()

server.listen()
