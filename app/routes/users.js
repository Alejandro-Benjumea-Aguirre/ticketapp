const { Router } = require('express')
const { check } = require('express-validator')
const { messages, messageValidator } = require('../helpers/response')

const controllerUsers = require('../components/users/controllerUser')
const { validateCampos, validateJWT } = require('../middleware/index')
const upload = require('../helpers/uploadFile')

const {
  isUserNameValid,
  isValidPassword
} = require('../helpers/validatorsDB')

const router = Router()

router.get('/', validateJWT, controllerUsers.getUsers)
//router.get('/', controllerUsers.getUsers)

router.get('/:id', controllerUsers.getUser)

router.get('/:username', controllerUsers.getUserByUsername)

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
  /*     check('rol_id').custom(),
    check('state_id').custom(),
    check('department_id').custom(),
    check('campus_id').custom(), */
  //validateCampos,
  upload.single('file')
],
controllerUsers.postUser)

router.patch('/:id', [
  validateJWT,
  check('name', messageValidator(messages.stringRequired, 'name')).isString().optional(),
  check('email', messageValidator(messages.email, 'email')).isEmail(),
  check('password').custom(isValidPassword),
  validateCampos
], controllerUsers.patchUser)

router.delete('/:id', validateJWT, controllerUsers.deleteUser)

router.post('/changepass', controllerUsers.changePass)

module.exports = router
