const { Router } = require('express')
// const { check } = require('express-validator')

const controllerBitacora = require('../components/bitacora/controllerBitacora')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/:id', validateJWT, controllerBitacora.getBitacora)

router.post('/', validateJWT, controllerBitacora.postBitacora)

module.exports = router
