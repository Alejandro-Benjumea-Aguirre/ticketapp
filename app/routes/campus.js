const { Router } = require('express')

const controllerCampus = require('../components/campus/controllerCampus')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerCampus.getCampus))

router.get('/name/:name', validateJWT, catchAsync(controllerCampus.getCampusByName))

router.get('/client/:client_id', validateJWT, catchAsync(controllerCampus.getCampusByClient))

router.get('/:id', validateJWT, catchAsync(controllerCampus.getCampu))

router.post('/', validateJWT, catchAsync(controllerCampus.postCampus))

router.patch('/:id', validateJWT, catchAsync(controllerCampus.patchCampus))

router.delete('/:id', validateJWT, catchAsync(controllerCampus.deleteCampus))

module.exports = router
