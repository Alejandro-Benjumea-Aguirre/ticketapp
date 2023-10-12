const response = require('../helpers/response')
const userModel = require('../models/users')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
  try {
    const listAll = await userModel.findAll()
    response.success(req, res, listAll, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userModel.findByPk(id)
    if (user) {
      response.success(req, res, user, 200)
    } else {
      response.success(req, res, `No existe ningun usuario con el id ${id}`, 200)
    }
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postUser = async (req, res) => {
  const { body } = req

  try {
    // Encriptacion de la contraseña
    const salt = bcrypt.genSaltSync()
    body.password = bcrypt.hashSync(body.password, salt)

    const usuario = userModel.build(body)
    await usuario.save()

    const respUser = {
      id: usuario.getDataValue('uid'),
      name: usuario.getDataValue('name'),
      username: usuario.getDataValue('username'),
      email: usuario.getDataValue('email')
    }

    response.success(req, res, respUser, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchUser = async (req, res) => {
  const { id } = req.params
  const { uid, password, ...body } = req.body

  if (password) {
    const salt = bcrypt.genSaltSync()
    body.password = bcrypt.hashSync(password, salt)
  }

  try {
    const usuario = await userModel.findByPk(id)

    if (!usuario) {
      response.success(req, res, `No existe un usuario con el id ${id}`, 404)
    }

    await usuario.update(body)

    const respUser = {
      name: usuario.getDataValue('name'),
      username: usuario.getDataValue('username'),
      email: usuario.getDataValue('email')
    }

    response.success(req, res, respUser, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const usuario = await userModel.findByPk(id)

    if (!usuario) {
      response.success(req, res, `No existe un usuario con el id: ${id}`, 404)
    }

    await usuario.update({ state_id: 2 })

    const respUser = {
      name: usuario.getDataValue('name'),
      username: usuario.getDataValue('username'),
      email: usuario.getDataValue('email')
    }

    response.success(req, res, respUser, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser
}
