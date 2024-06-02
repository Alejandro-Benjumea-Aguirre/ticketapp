const response = require('../../helpers/response')
const serviceRol = require('./serviceRol')

const getRoles = async (req, res) => {
  try {
    const resp = await serviceRol.listAllRoles()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getRol = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceRol.listRol(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getRolPermissions = async (req, res) => {
  try {
    const { id } = req. params
    const resp = await serviceRol.listRolPermisions(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, e, 500)
  }
}

const postRol = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceRol.createRol(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchRol = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await serviceRol.updateRol(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteRol = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceRol.inactiveRol(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
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
