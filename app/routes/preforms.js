const { Router } = require('express')

const controllerPreform = require('../components/preforms/controllerPreforms')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerPreform.getPreforms))

router.get('/suceso/:suceso', validateJWT, catchAsync(controllerPreform.getPreformsxSucesos))

router.get('/:id', validateJWT, catchAsync(controllerPreform.getPreform))

router.post('/', validateJWT, catchAsync(controllerPreform.postPreform))

router.patch('/:id', validateJWT, catchAsync(controllerPreform.patchPreform))

router.delete('/:id', validateJWT, catchAsync(controllerPreform.deletePreform))

module.exports = router
