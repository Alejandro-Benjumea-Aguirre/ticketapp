const { Router } = require('express')
const { check } = require('express-validator')
const { messages, messageValidator } = require('../helpers/response')

const controllerRol = require('../components/roles/controllerRol')
const { validateJWT, validateCampos } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerRol.getRoles))

router.get('/:id', validateJWT, catchAsync(controllerRol.getRol))

router.get('/permission/:id', validateJWT, catchAsync(controllerRol.getRolPermissions))

router.post('/', validateJWT, catchAsync(controllerRol.postRol))

router.patch('/:id', validateJWT, catchAsync(controllerRol.patchRol))

router.delete('/:id', validateJWT, catchAsync(controllerRol.deleteRol))

router.patch('/:id/status', [
    validateJWT,
    check('id', 'El ID debe ser un número válido').isNumeric(), 
    check('status', messageValidator(messages.required, 'status')).not().isEmpty().isNumeric(),
    validateCampos
], catchAsync(controllerRol.updateStatus));

module.exports = router
