const { Router } = require('express')
const { check } = require('express-validator')
const { messages, messageValidator } = require('../helpers/response')

const {
  getTickets,
  getTicket,
  getTicketByUser,
  getTicketByAbiertos,
  getTicketByCerrados,
  getTicketByEspera,
  postTicket,
  patchTicket,
  closeTicket
} = require('../components/tickets/controllerTicket')

const { validateCampos, validateJWT } = require('../middleware/index')

const { isUserIdValid, isValidPassword } = require('../helpers/validatorsDB')

const upload = require('../helpers/uploadFile')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/', validateJWT, catchAsync(getTickets))

router.get('/abiertos', validateJWT, catchAsync(getTicketByAbiertos))

router.get('/cerrados', validateJWT, catchAsync(getTicketByCerrados))

router.get('/enespera', validateJWT, catchAsync(getTicketByEspera))

router.get('/user/:id_user', validateJWT, catchAsync(getTicketByUser))

router.get('/:id', validateJWT, catchAsync(getTicket))

router.post('/', [
  validateJWT,
  check('user_id', messageValidator(messages.numberRequired, 'user_id')).not().isEmpty().isNumeric(),
  check('priority_id', messageValidator(messages.numberRequired, 'priority_id')).not().isEmpty().isNumeric(),
  check('application_id', messageValidator(messages.numberRequired, 'application_id')).not().isEmpty().isNumeric(),
  check('browser_id', messageValidator(messages.numberRequired, 'browser_id')).not().isEmpty().isNumeric(),
  check('sisope_id', messageValidator(messages.numberRequired, 'sisope_id')).not().isEmpty().isNumeric(),
  check('subject', messageValidator(messages.stringRequired, 'subject')).not().isEmpty().isString(),
  check('description', messageValidator(messages.stringRequired, 'description')).not().isEmpty().isString(),
  check('email', messageValidator(messages.email, 'email')).not().isEmpty().isEmail(),
  check('user_id').custom(isUserIdValid),
  validateCampos,
  upload.array('file', 6)
],
catchAsync(postTicket))

router.patch('/:id', [
  validateJWT,
  check('name', 'El nombre debe de ser string y es requerido.').isString().optional(),
  check('email', 'El email no es valido.').isEmail(),
  check('password').custom(isValidPassword),
  validateCampos
], catchAsync(patchTicket))

router.post('/close/:id', validateJWT, catchAsync(closeTicket))

module.exports = router
