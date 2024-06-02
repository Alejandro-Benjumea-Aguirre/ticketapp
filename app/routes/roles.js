const { Router } = require('express')
// const { check } = require('express-validator')

const controllerRol = require('../components/roles/controllerRol')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/', validateJWT, controllerRol.getRoles)

router.get('/:id', validateJWT, controllerRol.getRol)

router.get('/permission/:id', validateJWT, controllerRol.getRolPermissions)

router.post('/', validateJWT, controllerRol.postRol)

router.patch('/:id', validateJWT, controllerRol.patchRol)

router.delete('/:id', validateJWT, controllerRol.deleteRol)

module.exports = router
