const { Router } = require('express')

const controllerBitacora = require('../components/bitacora/controllerBitacora')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/:id', validateJWT, catchAsync(controllerBitacora.getBitacora))

router.post('/', validateJWT, catchAsync(controllerBitacora.postBitacora))

module.exports = router
