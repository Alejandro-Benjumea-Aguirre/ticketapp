const response = require('../../helpers/response')
const serviceContact = require('./serviceContact')

const getContacts = async (req, res) => {
  try {
    const resp = await serviceContact.listAllContact()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getContact = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceContact.listContact(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getContactByName = async (req, res) => {
  try {
    const { name } = req.params
    const resp = await serviceContact.listContactByName(name)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postContact = async (req, res) => {
  const body = req.body
  try {
    const resp = await serviceContact.createContact(body)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchContact = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await serviceContact.updateContact(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteContact = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceContact.inactiveContact(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getContacts,
  getContact,
  getContactByName,
  postContact,
  patchContact,
  deleteContact
}
