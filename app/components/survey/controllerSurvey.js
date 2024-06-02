const response = require('../../helpers/response')
const serviceSurvey = require('./serviceSurvey')

const getSuveys = async (req, res) => {
  try {
    const resp = await serviceSurvey.listAllSurveys()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getSurvey = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceSurvey.listSurvey(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getSurveysxClient = async (req, res) => {
  try {
    const { client_id } = req. params
    const resp = await serviceSurvey.listSurveysxClient(client_id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, e, 500)
  }
}

const postSurvey = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceSurvey.createSurvey(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchSurvey = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await serviceSurvey.updateSurvey(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteSurvey = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceSurvey.inactiveRol(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getSuveys,
  getSurvey,
  getSurveysxClient,
  postSurvey,
  patchSurvey,
  deleteSurvey
}
