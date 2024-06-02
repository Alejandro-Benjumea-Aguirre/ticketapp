const { Router } = require('express')
// const { check } = require('express-validator')

const controllerPreform = require('../components/preforms/controllerPreforms')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/', validateJWT, controllerPreform.getPreforms)

router.get('/', validateJWT, controllerPreform.getPreformsxSucesos)

router.get('/:id', validateJWT, controllerPreform.getPreform)

router.post('/', validateJWT, controllerPreform.postPreform)

router.patch('/:id', validateJWT, controllerPreform.patchPreform)

router.delete('/:id', validateJWT, controllerPreform.deletePreform)

module.exports = router
