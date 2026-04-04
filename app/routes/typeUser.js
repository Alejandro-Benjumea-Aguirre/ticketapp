const { Router } = require('express')

const controllerTypeUser = require('../components/typeUser/controllerTypeUser')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerTypeUser.getTypeUsers))

router.get('/:id', validateJWT, catchAsync(controllerTypeUser.getTypeUser))

router.post('/', validateJWT, catchAsync(controllerTypeUser.postTypeUser))

router.patch('/:id', validateJWT, catchAsync(controllerTypeUser.patchTypeUser))

router.delete('/:id', validateJWT, catchAsync(controllerTypeUser.deleteTypeUser))

module.exports = router
