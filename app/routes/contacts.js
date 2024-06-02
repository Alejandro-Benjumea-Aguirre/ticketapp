const { Router } = require('express')
// const { check } = require('express-validator')

const controllerContact = require('../components/contacts/controllerContact')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/', validateJWT, controllerContact.getContacts)

router.get('/:id', validateJWT, controllerContact.getContact)

router.post('/', validateJWT, controllerContact.postContact)

router.patch('/:id', validateJWT, controllerContact.patchContact)

router.delete('/:id', validateJWT, controllerContact.deleteContact)

module.exports = router
