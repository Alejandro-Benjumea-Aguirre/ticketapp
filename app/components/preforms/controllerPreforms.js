const response = require('../../helpers/response')
const servicePreform = require('./servicePreforms')

const getPreforms = async (req, res, next) => {
  const resp = await servicePreform.listAllPreforms()
  response.success(req, res, resp, 200)
}

const getPreformsxSucesos = async (req, res, next) => {
  const { suceso } = req.params
  const resp = await servicePreform.listAllPreformsxSucesos(suceso)
  response.success(req, res, resp, 200)
}

const getPreform = async (req, res, next) => {
  const { id } = req.params
  const resp = await servicePreform.listPreform(id)
  response.success(req, res, resp, 200)
}

const postPreform = async (req, res, next) => {
  const body = req.body
  const resp = await servicePreform.createPreform(body)
  response.success(req, res, resp, 200)
}

const patchPreform = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await servicePreform.updatePreform(id, body)
  response.success(req, res, resp, 200)
}

const deletePreform = async (req, res, next) => {
  const { id } = req.params
  const resp = await servicePreform.inactivePreform(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getPreforms,
  getPreformsxSucesos,
  getPreform,
  postPreform,
  patchPreform,
  deletePreform
}
