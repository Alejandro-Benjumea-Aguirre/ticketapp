const { Router } = require('express')

const controllerRol = require('../components/roles/controllerRol')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerRol.getRoles))

router.get('/:id', validateJWT, catchAsync(controllerRol.getRol))

router.get('/permission/:id', validateJWT, catchAsync(controllerRol.getRolPermissions))

router.post('/', validateJWT, catchAsync(controllerRol.postRol))

router.patch('/:id', validateJWT, catchAsync(controllerRol.patchRol))

router.delete('/:id', validateJWT, catchAsync(controllerRol.deleteRol))

module.exports = router
