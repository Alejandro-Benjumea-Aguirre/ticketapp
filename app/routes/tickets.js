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

const router = Router()

router.get('/', validateJWT, getTickets)

router.get('/:id', validateJWT, getTicket)

router.get('/:id_user', validateJWT, getTicketByUser)

router.get('/abiertos', validateJWT, getTicketByAbiertos)

router.get('/cerrados', validateJWT, getTicketByCerrados)

router.get('/enespera', validateJWT, getTicketByEspera)

router.post('/', [
  validateJWT,
  check('user_id', messageValidator(messages.numberRequired, 'user_id')).not().isEmpty().isNumeric(),
  check('priority_id', messageValidator(messages.numberRequired, 'priority_id')).not().isEmpty().isString(),
  check('application_id', messageValidator(messages.numberRequired, 'application_id')).not().isEmpty().isString(),
  check('browser_id', messageValidator(messages.numberRequired, 'browser_id')).not().isEmpty().isString(),
  check('sisope_id', messageValidator(messages.numberRequired, 'sisope_id')).not().isEmpty().isString(),
  check('subject', messageValidator(messages.stringRequired, 'subject')).not().isEmpty().isString(),
  check('description', messageValidator(messages.stringRequired, 'description')).not().isEmpty().isString(),
  check('email', messageValidator(messages.email, 'email')).not().isEmpty().isString(),
  check('user_id').custom(isUserIdValid),
  validateCampos,
  upload.array('file', 6)
],
postTicket)

router.patch('/:id', [
  validateJWT,
  check('name', 'El nombre debe de ser string y es requerido.').isString().optional(),
  check('email', 'El email no es valido.').isEmail(),
  check('password').custom(isValidPassword),
  validateCampos
], patchTicket)

router.post('/close/:id', validateJWT, closeTicket)

module.exports = router
