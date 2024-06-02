const response = require('../../helpers/response')
const serviceCustomer = require('./serviceCustomer')

const getCustomers = async (req, res) => {
  try {
    const resp = await serviceCustomer.listAllCustomers()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getCustomer = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceCustomer.listCustomer(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getCustomerByName = async (req, res) => {
  try {
    const { name } = req.params
    const resp = await serviceCustomer.listCustomerByName(name)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postCustomer = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceCustomer.createCustomer(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchCustomer = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await serviceCustomer.updateCustomer(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteCustomer = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceCustomer.inactiveCustomer(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getCustomers,
  getCustomer,
  getCustomerByName,
  postCustomer,
  patchCustomer,
  deleteCustomer
}
