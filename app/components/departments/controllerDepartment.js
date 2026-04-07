const response = require('../../helpers/response')
const serviceDepartment = require('./serviceDepartment')

const getDepartments = async (req, res, next) => {
  const resp = await serviceDepartment.listAllDepartments()
  response.success(req, res, resp, 200)
}

const getDepartment = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceDepartment.listDepartment(id)
  response.success(req, res, resp, 200)
}

const postDepartment = async (req, res, next) => {
  const body = req.body
  const resp = await serviceDepartment.createDepartment(body)
  response.success(req, res, resp, 201)
}

const patchDepartment = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceDepartment.updateDepartment(id, body)
  response.success(req, res, resp, 200)
}

const deleteDepartment = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceDepartment.inactiveDepartment(id)
  response.success(req, res, resp, 200)
}

const updateStatus = async (req, res, next) => {
  const { id } = req.params
  const { status } = req.body
  const resp = await serviceDepartment.updateDepartmentStatus(id, status)
  response.success(req, res, resp, 200)
}

module.exports = {
  getDepartments,
  getDepartment,
  postDepartment,
  patchDepartment,
  deleteDepartment,
  updateStatus
}
