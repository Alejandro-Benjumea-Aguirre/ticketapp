const response = require('../../helpers/response')
const serviceUsers = require('./serviceUser')

const getUsers = async (req, res) => {
  try {
    const resp = await serviceUsers.listAllUsers()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceUsers.listUser(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params
    const resp = await serviceUsers.listUserByUsername(username)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postUser = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceUsers.createUser(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchUser = async (req, res) => {
  const { id } = req.params
  const { uid, password, ...body } = req.body

  try {
    const resp = await serviceUsers.updateUser(id, password, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    console.log(error)
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceUsers.inactiveUser(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    console.log(error)
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const changePass = async (req, res) => {
  const { newpass, username } = req.body

  try {
    const resp = await serviceUsers.changePass(newpass, username)
    response.success(req, res, resp, 200)
  } catch (error) {
    console.log(error)
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getUsers,
  getUser,
  getUserByUsername,
  postUser,
  patchUser,
  deleteUser,
  changePass
}
