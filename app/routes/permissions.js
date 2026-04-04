const { Router } = require('express')

const controllerPermission = require('../components/permissions/controllerPermission')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerPermission.getPermissions))

router.get('/:id', validateJWT, catchAsync(controllerPermission.getPermission))

router.post('/', validateJWT, catchAsync(controllerPermission.postPermission))

router.patch('/:id', validateJWT, catchAsync(controllerPermission.patchPermission))

router.delete('/:id', validateJWT, catchAsync(controllerPermission.deletePermission))

module.exports = router
