const { Router } = require('express')
const { check } = require('express-validator')
const {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser
} = require('../controllers/users')

const { validateCampos, validateJWT } = require('../middleware/index')

const {
  isUserNameValid,
  isValidPassword,
  isValidEmail
} = require('../helpers/validatorsDB')

const router = Router()

router.get('/', validateJWT, getUsers)

router.get('/:id', validateJWT, getUser)

router.post('/', [
  validateJWT,
  check('uid', 'El uid es requerido.').not().isEmpty(),
  check('username', 'El username debe de ser string y es requerido.').not().isEmpty().isString(),
  check('name', 'El nombre debe de ser string y es requerido.').not().isEmpty().isString(),
  check('password', 'El campo  es requerido y debe de ser inferiror a 16 caracteres.').isLength({ min: 8, max: 16 }),
  check('email', 'El email no es valido.').isEmail(),
  check('rol_id', 'El rol debe de ser numerico y es requerido.').not().isEmpty().isNumeric(),
  check('state_id', 'El estado debe de ser numerico y requrido.').not().isEmpty().isNumeric(),
  check('department_id', 'El departamento es requerido y debe de ser numerico.').not().isEmpty().isNumeric(),
  check('campus_id', 'El campus es requerido y debe de ser numerico.').not().isEmpty().isNumeric(),
  check('username').custom(isUserNameValid),
  check('password').custom(isValidPassword),
  check('email').custom(isValidEmail),
  /*     check('rol_id').custom(),
    check('state_id').custom(),
    check('department_id').custom(),
    check('campus_id').custom(), */
  validateCampos
],
postUser)

router.patch('/:id', [
  validateJWT
], patchUser)

router.delete('/:id', validateJWT, deleteUser)

module.exports = router
