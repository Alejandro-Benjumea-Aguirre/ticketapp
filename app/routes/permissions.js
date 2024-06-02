const { Router } = require('express')
// const { check } = require('express-validator')

const controllerPermission = require('../components/permissions/controllerPermission')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/', validateJWT, controllerPermission.getPermissions)

router.get('/:id', validateJWT, controllerPermission.getPermission)

router.post('/', validateJWT, controllerPermission.postPermission)

router.patch('/:id', validateJWT, controllerPermission.patchPermission)

router.delete('/:id', validateJWT, controllerPermission.deletePermission)

module.exports = router
