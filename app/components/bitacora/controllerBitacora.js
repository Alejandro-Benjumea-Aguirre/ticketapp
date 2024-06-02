const response = require('../../helpers/response')
const serviceBitacora = require('./serviceBitacora')

const getBitacora = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceBitacora.listBitacora(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postBitacora = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceBitacora.createBitacora(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

module.exports = {
  getBitacora,
  postBitacora
}
