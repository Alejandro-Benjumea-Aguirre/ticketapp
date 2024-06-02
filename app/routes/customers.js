const { Router } = require('express')
// const { check } = require('express-validator')

const controllerCustomer = require('../components/customers/controllerCustomer')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/', validateJWT, controllerCustomer.getCustomers)

router.get('/:id', validateJWT, controllerCustomer.getCustomer)

router.get('/:name', validateJWT, controllerCustomer.getCustomerByName)

router.post('/', validateJWT, controllerCustomer.postCustomer)

router.patch('/:id', validateJWT, controllerCustomer.patchCustomer)

router.delete('/:id', validateJWT, controllerCustomer.deleteCustomer)

module.exports = router
