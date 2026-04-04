const response = require('../../helpers/response')
const serviceSurvey = require('./serviceSurvey')

const getSuveys = async (req, res, next) => {
  const resp = await serviceSurvey.listAllSurveys()
  response.success(req, res, resp, 200)
}

const getSurvey = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceSurvey.listSurvey(id)
  response.success(req, res, resp, 200)
}

const getSurveysxClient = async (req, res, next) => {
  const { client_id } = req.params
  const resp = await serviceSurvey.listSurveysxClient(client_id)
  response.success(req, res, resp, 200)
}

const postSurvey = async (req, res, next) => {
  const body = req.body
  const resp = await serviceSurvey.createSurvey(body)
  response.success(req, res, resp, 200)
}

const patchSurvey = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceSurvey.updateSurvey(id, body)
  response.success(req, res, resp, 200)
}

const deleteSurvey = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceSurvey.inactiveSurvey(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getSuveys,
  getSurvey,
  getSurveysxClient,
  postSurvey,
  patchSurvey,
  deleteSurvey
}
