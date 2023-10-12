const { validationResult } = require('express-validator')
const response = require('../helpers/response')

const validateCampos = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return response.error(req, res, errors, 400)
  }

  return next()
}

module.exports = validateCampos
