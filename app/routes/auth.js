const express = require('express')
const {
  login,
  newToken,
  sendToken,
  compareToken,
  logout
} = require('../components/auth/controllerAuth')

const { validateJWT } = require('../middleware/index')
const catchAsync = require('../utils/catchAsync')

const router = express.Router()

router.post('/login', catchAsync(login))

router.post('/renew', validateJWT, catchAsync(newToken))

router.post('/sendtoken', catchAsync(sendToken))

router.post('/comparetoken', catchAsync(compareToken))

router.post('/logout', validateJWT, logout)

module.exports = router
