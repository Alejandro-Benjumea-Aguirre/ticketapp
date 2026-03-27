const response = require('../../helpers/response')
const serviceUsers = require('./serviceUser')

const getUsers = async (req, res) => {
  try {
    const resp = await serviceUsers.listAllUsers()
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceUsers.listUser(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params
    const resp = await serviceUsers.listUserByUsername(username)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const postUser = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceUsers.createUser(body)
    response.success(req, res, resp, 201)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const patchUser = async (req, res) => {
  const { id } = req.params
  const { uid, password, ...body } = req.body

  try {
    const resp = await serviceUsers.updateUser(id, password, body)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const changeStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const resp = await serviceUsers.changeStatus(id, status)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceUsers.inactiveUser(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const changePass = async (req, res) => {
  const { newpass, username } = req.body

  try {
    const resp = await serviceUsers.changePass(newpass, username)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

module.exports = {
  getUsers,
  getUser,
  getUserByUsername,
  postUser,
  patchUser,
  deleteUser,
  changePass,
  changeStatus
}
