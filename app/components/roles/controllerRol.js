const response = require('../../helpers/response')
const serviceRol = require('./serviceRol')

const getRoles = async (req, res) => {
  try {
    const resp = await serviceRol.listAllRoles()
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const getRol = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceRol.listRol(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const getRolPermissions = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceRol.listRolPermisions(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const postRol = async (req, res) => {
  try {
    const body = req.body
    const resp = await serviceRol.createRol(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const patchRol = async (req, res) => {
  try {
    const { id } = req.params
    const { id: uid, ...body } = req.body
    const resp = await serviceRol.updateRol(id, body)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

const deleteRol = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceRol.inactiveRol(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    const code = e.statusCode || 500
    response.error(req, res, e.message, code)
  }
}

module.exports = {
  getRoles,
  getRol,
  getRolPermissions,
  postRol,
  patchRol,
  deleteRol
}
