const { Router } = require('express')
// const { check } = require('express-validator')

const controllerTypeUser = require('../components/typeUser/controllerTypeUser')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/', validateJWT, controllerTypeUser.getTypeUsers)

router.get('/:id', validateJWT, controllerTypeUser.getTypeUser)

router.post('/', validateJWT, controllerTypeUser.postTypeUser)

router.patch('/:id', validateJWT, controllerTypeUser.patchTypeUser)

router.delete('/:id', validateJWT, controllerTypeUser.deleteTypeUser)

module.exports = router
