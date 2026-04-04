const { Router } = require('express')

const controllerContact = require('../components/contacts/controllerContact')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerContact.getContacts))

router.get('/:id', validateJWT, catchAsync(controllerContact.getContact))

router.post('/', validateJWT, catchAsync(controllerContact.postContact))

router.patch('/:id', validateJWT, catchAsync(controllerContact.patchContact))

router.delete('/:id', validateJWT, catchAsync(controllerContact.deleteContact))

module.exports = router
