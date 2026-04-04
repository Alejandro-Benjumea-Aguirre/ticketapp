const response = require('../../helpers/response')
const serviceUsers = require('./serviceUser')

const getUsers = async (req, res, next) => {
  const resp = await serviceUsers.listAllUsers()
  response.success(req, res, resp, 200)
}

const getUser = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceUsers.listUser(id)
  response.success(req, res, resp, 200)
}

const getUserByUsername = async (req, res, next) => {
  const { username } = req.params
  const resp = await serviceUsers.listUserByUsername(username)
  response.success(req, res, resp, 200)
}

const postUser = async (req, res, next) => {
  const body = req.body
  const resp = await serviceUsers.createUser(body)
  response.success(req, res, resp, 201)
}

const patchUser = async (req, res, next) => {
  const { id } = req.params
  const { uid, password, ...body } = req.body
  const resp = await serviceUsers.updateUser(id, password, body)
  response.success(req, res, resp, 200)
}

const changeStatus = async (req, res, next) => {
  const { id } = req.params
  const { status } = req.body
  const resp = await serviceUsers.changeStatus(id, status)
  response.success(req, res, resp, 200)
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceUsers.inactiveUser(id)
  response.success(req, res, resp, 200)
}

const changePass = async (req, res, next) => {
  const { newpass, username } = req.body
  const resp = await serviceUsers.changePass(newpass, username)
  response.success(req, res, resp, 200)
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
