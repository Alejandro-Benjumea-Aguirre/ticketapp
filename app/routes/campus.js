const { Router } = require('express')
// const { check } = require('express-validator')

const controllerCampus = require('../components/campus/controllerCampus')
const { validateJWT } = require('../middleware/index')

const router = Router()

router.get('/', validateJWT, controllerCampus.getCampus)

router.get('/:id', validateJWT, controllerCampus.getCampu)

router.get('/:name', validateJWT, controllerCampus.getCampusByName)

router.get('/:cient_id', validateJWT, controllerCampus.getCampusByClient)

router.post('/', validateJWT, controllerCampus.postCampus)

router.patch('/:id', validateJWT, controllerCampus.patchCampus)

router.delete('/:id', validateJWT, controllerCampus.deleteCampus)

module.exports = router
