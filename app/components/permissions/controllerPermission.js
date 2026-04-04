const response = require('../../helpers/response')
const servicePermission = require('./servicePermission')

const getPermissions = async (req, res, next) => {
  const resp = await servicePermission.listAllPermissions()
  response.success(req, res, resp, 200)
}

const getPermission = async (req, res, next) => {
  const { id } = req.params
  const resp = await servicePermission.listPermission(id)
  response.success(req, res, resp, 200)
}

const postPermission = async (req, res, next) => {
  const body = req.body
  const resp = await servicePermission.createPermission(body)
  response.success(req, res, resp, 200)
}

const patchPermission = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await servicePermission.updatePermission(id, body)
  response.success(req, res, resp, 200)
}

const deletePermission = async (req, res, next) => {
  const { id } = req.params
  const resp = await servicePermission.inactivePermission(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getPermissions,
  getPermission,
  postPermission,
  patchPermission,
  deletePermission
}
