const messages = {
  required: `required`,
  stringRequired: `stringRequired`,
  numberRequired: `numberRequired`,
  string: `string`,
  number: `number`,
  email: `email`
}

const messageValidator = function (typeMessage, field) {
  const messages = {
    eequired: `${field} es requerido`,
    stringRequired: `${field} debe ser string y es requerido`,
    numberRequired: `${field} debe ser númerico y es requerido`,
    string: `${field} debe ser string`,
    number: `${field} debe ser númerico`,
    email: `${field} no es valido`    
  }

  return messages[typeMessage]
}

const success = function (req, res, message, status) {
  const statusCode = status || 200
  const statusMessage = message || ''

  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: statusMessage
  })
}

const error = function (req, res, message, status) {
  const statusCode = status || 500
  const statusMessage = message || 'Internal server error'

  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: statusMessage
  })
}

module.exports = {messages, messageValidator, success, error}