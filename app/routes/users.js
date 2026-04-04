const { Router } = require('express')
const { check } = require('express-validator')
const { messages, messageValidator } = require('../helpers/response')

const controllerUsers = require('../components/users/controllerUser')
const { validateCampos, validateJWT } = require('../middleware/index')
const upload = require('../helpers/uploadFile')
const catchAsync = require('../utils/catchAsync')

const {
  isUserNameValid,
  isValidPassword
} = require('../helpers/validatorsDB')

const router = Router()

router.get('/', validateJWT, catchAsync(controllerUsers.getUsers))

router.get('/username/:username', catchAsync(controllerUsers.getUserByUsername))

router.get('/:id', catchAsync(controllerUsers.getUser))

router.post('/', [
  validateJWT,
  check('uid', messageValidator(messages.required, 'uid')).not().isEmpty(),
  check('username', messageValidator(messages.stringRequired, 'username')).not().isEmpty().isString(),
  check('name', messageValidator(messages.stringRequired, 'name')).not().isEmpty().isString(),
  check('email', messageValidator(messages.email, 'email')).isEmail(),
  check('rol_id', messageValidator(messages.numberRequired, 'rol_id')).not().isEmpty().isNumeric(),
  check('state_id', messageValidator(messages.numberRequired, 'state_id')).not().isEmpty().isNumeric(),
  check('department_id', messageValidator(messages.numberRequired, 'department_id')).not().isEmpty().isNumeric(),
  check('campus_id', messageValidator(messages.numberRequired, 'campus_id')).not().isEmpty().isNumeric(),
  check('username').custom(isUserNameValid),
  check('password').custom(isValidPassword),
  validateCampos,
  upload.single('file')
],
catchAsync(controllerUsers.postUser))

router.patch('/:id', [
  validateJWT,
  check('name', messageValidator(messages.stringRequired, 'name')).isString().optional(),
  check('email', messageValidator(messages.email, 'email')).isEmail(),
  check('password').custom(isValidPassword),
  validateCampos
], catchAsync(controllerUsers.patchUser))

router.patch('/status/:id', [
  validateJWT,
  check('status?id', messageValidator(messages.required, 'status')).isNumeric().not().isEmpty()
], catchAsync(controllerUsers.changeStatus))

router.delete('/:id', validateJWT, catchAsync(controllerUsers.deleteUser))

router.post('/changepass/:id', validateJWT, catchAsync(controllerUsers.changePass))

module.exports = router
