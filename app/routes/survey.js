const { Router } = require('express')
// const { check } = require('express-validator')

const controllerSurvey = require('../components/survey/controllerSurvey')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/', validateJWT, controllerSurvey.getSuveys)

router.get('/:id', validateJWT, controllerSurvey.getSurvey)

router.get('/:client_id', validateJWT, controllerSurvey.getSurveysxClient)

router.post('/', validateJWT, controllerSurvey.postSurvey)

router.patch('/:id', validateJWT, controllerSurvey.patchSurvey)

router.delete('/:id', validateJWT, controllerSurvey.deleteSurvey)

module.exports = router
