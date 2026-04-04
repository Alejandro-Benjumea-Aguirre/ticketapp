const response = require('../../helpers/response')
const serviceRol = require('./serviceRol')

const getRoles = async (req, res, next) => {
  const resp = await serviceRol.listAllRoles()
  response.success(req, res, resp, 200)
}

const getRol = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceRol.listRol(id)
  response.success(req, res, resp, 200)
}

const getRolPermissions = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceRol.listRolPermisions(id)
  response.success(req, res, resp, 200)
}

const postRol = async (req, res, next) => {
  const body = req.body
  const resp = await serviceRol.createRol(body)
  response.success(req, res, resp, 200)
}

const patchRol = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceRol.updateRol(id, body)
  response.success(req, res, resp, 200)
}

const deleteRol = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceRol.inactiveRol(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getRoles,
  getRol,
  getRolPermissions,
  postRol,
  patchRol,
  deleteRol
}
