const { Router } = require('express')

const controllerSurvey = require('../components/survey/controllerSurvey')
const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerSurvey.getSuveys))

router.get('/client/:client_id', validateJWT, catchAsync(controllerSurvey.getSurveysxClient))

router.get('/:id', validateJWT, catchAsync(controllerSurvey.getSurvey))

router.post('/', validateJWT, catchAsync(controllerSurvey.postSurvey))

router.patch('/:id', validateJWT, catchAsync(controllerSurvey.patchSurvey))

router.delete('/:id', validateJWT, catchAsync(controllerSurvey.deleteSurvey))

module.exports = router
