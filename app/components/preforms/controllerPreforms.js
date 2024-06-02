const response = require('../../helpers/response')
const servicePreform = require('./servicePreforms')

const getPreforms = async (req, res) => {
  try {
    const resp = await servicePreform.listAllPreforms()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getPreformsxSucesos = async (req, res) => {
  try {
    const { suceso } = req.params
    const resp = await servicePreform.listAllPreformsxSucesos(suceso)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, e, 500)
  }
}

const getPreform = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await servicePreform.listPreform(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postPreform = async (req, res) => {
  const body = req.body
  try {
    const resp = await servicePreform.createPreform(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchPreform = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await servicePreform.updatePreform(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deletePreform = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await servicePreform.inactivePreform(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getPreforms,
  getPreformsxSucesos,
  getPreform,
  postPreform,
  patchPreform,
  deletePreform
}
