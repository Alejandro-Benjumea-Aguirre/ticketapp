const response = require('../../helpers/response')
const serviceContact = require('./serviceContact')

const getContacts = async (req, res, next) => {
  const resp = await serviceContact.listAllContact()
  response.success(req, res, resp, 200)
}

const getContact = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceContact.listContact(id)
  response.success(req, res, resp, 200)
}

const getContactByName = async (req, res, next) => {
  const { name } = req.params
  const resp = await serviceContact.listContactByName(name)
  response.success(req, res, resp, 200)
}

const postContact = async (req, res, next) => {
  const body = req.body
  const resp = await serviceContact.createContact(body)
  response.success(req, res, resp, 200)
}

const patchContact = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceContact.updateContact(id, body)
  response.success(req, res, resp, 200)
}

const deleteContact = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceContact.inactiveContact(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getContacts,
  getContact,
  getContactByName,
  postContact,
  patchContact,
  deleteContact
}
