const response = require('../../helpers/response')
const serviceCampus = require('./serviceCampus')

const getCampus = async (req, res) => {
  try {
    const resp = await serviceCampus.listAllCampus()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getCampu = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceCampus.listCampus(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getCampusByName = async (req, res) => {
	try {
		const { name } = req.params
		const resp = await serviceCampus.listCampusByName(name)
		response.success(req, res, resp, 200)
	} catch (e) {
		response.error(req, res, e, 500)
	}
}

const getCampusByClient = async (req, res) => {
	try {
		const { client_id } = req.params
		const resp = await serviceCampus.listCamposByClient(client_id)
		response.success(req, res, resp, 200)
	} catch (e) {
		response.error(req, res, e, 500)
	}

}

const postCampus = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceCampus.createCampus(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchCampus = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await serviceCampus.updateCampus(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteCampus = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceCampus.inactiveCampus(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
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
