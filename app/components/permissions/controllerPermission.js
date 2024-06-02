const response = require('../../helpers/response')
const servicePermission = require('./servicePermission')

const getPermissions = async (req, res) => {
  try {
    const resp = await servicePermission.listAllPermissions()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getPermission = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await servicePermission.listPermission(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postPermission = async (req, res) => {
  const body = req.body
  try {
    const resp = await servicePermission.createPermission(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchPermission = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await servicePermission.updatePermission(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deletePermission = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await servicePermission.inactivePermission(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getPermissions,
  getPermission,
  postPermission,
  patchPermission,
  deletePermission
}
