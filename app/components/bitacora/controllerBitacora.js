const response = require('../../helpers/response')
const serviceBitacora = require('./serviceBitacora')

const getBitacora = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceBitacora.listBitacora(id)
  response.success(req, res, resp, 200)
}

const postBitacora = async (req, res, next) => {
  const body = req.body
  const resp = await serviceBitacora.createBitacora(body)
  response.success(req, res, resp, 200)
}

module.exports = {
  getBitacora,
  postBitacora
}
