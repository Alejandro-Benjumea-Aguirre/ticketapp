const express = require('express')
const {
  login,
  newToken,
  sendToken,
  compareToken
} = require('../components/auth/controllerAuth')

const { validateJWT } = require('../middleware/index')

const router = express.Router()

router.post('/login', login)

router.post('/renew', validateJWT, newToken)

router.post('/sendtoken', sendToken)

router.post('/comparetoken', compareToken)

module.exports = router
