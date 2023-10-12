const { modelUser } = require('../models/index')

const isUserNameValid = async (username) => {
  const isExistUsername = await modelUser.findBy({ username })

  if (isExistUsername) {
    throw new Error('El username ya existe.')
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
  isValidPassword,
  isValidEmail
}
