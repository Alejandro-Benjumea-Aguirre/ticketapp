const { Router } = require('express')

const controllerCustomer = require('../components/customers/controllerCustomer')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerCustomer.getCustomers))

router.get('/name/:name', validateJWT, catchAsync(controllerCustomer.getCustomerByName))

router.get('/:id', validateJWT, catchAsync(controllerCustomer.getCustomer))

router.post('/', validateJWT, catchAsync(controllerCustomer.postCustomer))

router.patch('/:id', validateJWT, catchAsync(controllerCustomer.patchCustomer))

router.delete('/:id', validateJWT, catchAsync(controllerCustomer.deleteCustomer))

module.exports = router
