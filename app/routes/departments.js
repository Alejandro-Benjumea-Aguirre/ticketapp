const { Router } = require('express')

const controllerDepartment = require('../components/departments/controllerDepartment')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerDepartment.getDepartments))

router.get('/:id', validateJWT, catchAsync(controllerDepartment.getDepartment))

router.post('/', validateJWT, catchAsync(controllerDepartment.postDepartment))

router.patch('/:id', validateJWT, catchAsync(controllerDepartment.patchDepartment))

router.delete('/:id', validateJWT, catchAsync(controllerDepartment.deleteDepartment))

router.patch('/:id/status', validateJWT, catchAsync(controllerDepartment.updateStatus))

module.exports = router
