const response = require('../helpers/response')
const serviceUsers = require('../services/users')

const getUsers = async (req, res) => {
  try {
    response.success(req, res, serviceUsers.listAllUsers, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getUser = (req, res) => {
  try {
    const { id } = req.params
    response.success(req, res, serviceUsers.listUser(id), 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postUser = async (req, res) => {
  const { body } = req.body

  try {
    response.success(req, res, serviceUsers.createUser(body), 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchUser = async (req, res) => {
  const { id } = req.params
  const { uid, password, ...body } = req.body

  try {
    response.success(req, res, serviceUsers.updateUser(id, password, body), 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    response.success(req, res, serviceUsers.inactiveUser(id), 200)
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
