const response = require('../../helpers/response')
const serviceCampus = require('./serviceCampus')

const getCampus = async (req, res, next) => {
  const resp = await serviceCampus.listAllCampus()
  response.success(req, res, resp, 200)
}

const getCampu = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceCampus.listCampus(id)
  response.success(req, res, resp, 200)
}

const getCampusByName = async (req, res, next) => {
  const { name } = req.params
  const resp = await serviceCampus.listCampusByName(name)
  response.success(req, res, resp, 200)
}

const getCampusByClient = async (req, res, next) => {
  const { client_id } = req.params
  const resp = await serviceCampus.listCamposByClient(client_id)
  response.success(req, res, resp, 200)
}

const postCampus = async (req, res, next) => {
  const body = req.body
  const resp = await serviceCampus.createCampus(body)
  response.success(req, res, resp, 200)
}

const patchCampus = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceCampus.updateCampus(id, body)
  response.success(req, res, resp, 200)
}

const deleteCampus = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceCampus.inactiveCampus(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getCampus,
  getCampu,
  getCampusByName,
  getCampusByClient,
  postCampus,
  patchCampus,
  deleteCampus
}
