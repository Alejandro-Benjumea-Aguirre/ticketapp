const response = require('../../helpers/response')
const serviceCustomer = require('./serviceCustomer')

const getCustomers = async (req, res, next) => {
  const resp = await serviceCustomer.listAllCustomers()
  response.success(req, res, resp, 200)
}

const getCustomer = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceCustomer.listCustomer(id)
  response.success(req, res, resp, 200)
}

const getCustomerByName = async (req, res, next) => {
  const { name } = req.params
  const resp = await serviceCustomer.listCustomerByName(name)
  response.success(req, res, resp, 200)
}

const postCustomer = async (req, res, next) => {
  const body = req.body
  const resp = await serviceCustomer.createCustomer(body)
  response.success(req, res, resp, 200)
}

const patchCustomer = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceCustomer.updateCustomer(id, body)
  response.success(req, res, resp, 200)
}

const deleteCustomer = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceCustomer.inactiveCustomer(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getCustomers,
  getCustomer,
  getCustomerByName,
  postCustomer,
  patchCustomer,
  deleteCustomer
}
