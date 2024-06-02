const repositorieUser = require('../components/users/repositorieUser')
const repositorieRol = require('../components/roles/repositorieRol')
const repositorieTypeUser = require('../components/typeUser/repositorieTypeUser')
const repositorieCampus = require('../components/campus/repositorieCampus')
const repositorieCustomer = require('../components/customers/repositorieCustomer')

const isUserNameValid = async (username) => {
  const isExistUsername = await repositorieUser.listByUsername(username)

  if (isExistUsername.length > 0) {
    throw new Error('El username ya existe.')
  }
}

const isUserIdValid = async (id) => {
  const isExistUserId = await repositorieUser.listById(id)

  if (isExistUserId.length == 0) {
    throw new Error('El código del usuario no existe.')
  }
}

const isRolValid =  async (rol_id) => {
  const isExistRol = await repositorieRol.listById(rol_id)

  if(!isExistRol) {
    throw new Error('El rol no existe.')
  }
}

const isTypeUserValid = async (typeUser_id) => {
  const isExisteTypeUser = await repositorieTypeUser.listById(typeUser_id)

  if(!isExisteTypeUser){
    throw new Error('El tipo de usuario no existe.')
  }
}

const isCampusValid = async (campus_id) => {
  const isExistCampus = await repositorieCampus.listById(campus_id)

  if(!isExistCampus){
    throw new Error('La sede no existe.')
  }
}

const isClientValid = async (client_id) => {
  const isExistClient = await repositorieCustomer.listById(client_id)

  if(!isExistClient){
    throw new Error('El cliente no existe.')
  }
}

const isValidEmail = async (email) => {
  const expresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const regex = new RegExp(expresion)
  const valida = regex.test(email)

  if (!valida) {
    throw new Error('El email no es valido.')
  }
}

const isValidPassword = async (password) => {
  const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/

  const regex = new RegExp(expresion)
  const valida = regex.test(password)

  if (!valida) {
    throw new Error('La contraseña no es valida debe de tener minimo una letra mayuscula, una letra minuscula y un caracter especial.')
  }
}

module.exports = {
  isUserNameValid,
  isUserIdValid,
  isRolValid,
  isTypeUserValid,
  isCampusValid,
  isClientValid,
  isValidPassword,
  isValidEmail
}
