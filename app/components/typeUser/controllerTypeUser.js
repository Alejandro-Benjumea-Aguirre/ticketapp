const response = require('../../helpers/response')
const serviceTypeUser = require('./serviceTypeUser')

const getTypeUsers = async (req, res) => {
  try {
    const resp = await serviceTypeUser.listAllTypeUsers()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getTypeUser = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceTypeUser.listTypeUser(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postTypeUser = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceTypeUser.createTypeUser(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchTypeUser = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await serviceTypeUser.updateTypeUser(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteTypeUser = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceTypeUser.inactiveTypeUser(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getTypeUsers,
  getTypeUser,
  postTypeUser,
  patchTypeUser,
  deleteTypeUser
}
