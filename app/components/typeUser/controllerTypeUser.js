const response = require('../../helpers/response')
const serviceTypeUser = require('./serviceTypeUser')

const getTypeUsers = async (req, res, next) => {
  const resp = await serviceTypeUser.listAllTypeUsers()
  response.success(req, res, resp, 200)
}

const getTypeUser = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceTypeUser.listTypeUser(id)
  response.success(req, res, resp, 200)
}

const postTypeUser = async (req, res, next) => {
  const body = req.body
  const resp = await serviceTypeUser.createTypeUser(body)
  response.success(req, res, resp, 200)
}

const patchTypeUser = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceTypeUser.updateTypeUser(id, body)
  response.success(req, res, resp, 200)
}

const deleteTypeUser = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceTypeUser.inactiveTypeUser(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getTypeUsers,
  getTypeUser,
  postTypeUser,
  patchTypeUser,
  deleteTypeUser
}
