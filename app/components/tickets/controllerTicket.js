const response = require('../../helpers/response')
const serviceTickets = require('./serviceTicket')

const getTickets = async (req, res, next) => {
  const resp = await serviceTickets.listAllTickets()
  response.success(req, res, resp, 200)
}

const getTicket = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceTickets.listTicket(id)
  response.success(req, res, resp, 200)
}

const getTicketByUser = async (req, res, next) => {
  const { id_user } = req.params
  const resp = await serviceTickets.listTicketByUser(id_user)
  response.success(req, res, resp, 200)
}

const getTicketByAbiertos = async (req, res, next) => {
  const resp = await serviceTickets.listTicketByAbiertos()
  response.success(req, res, resp, 200)
}

const getTicketByCerrados = async (req, res, next) => {
  const resp = await serviceTickets.listTicketByCerrados()
  response.success(req, res, resp, 200)
}

const getTicketByEspera = async (req, res, next) => {
  const resp = await serviceTickets.listTicketByEspera()
  response.success(req, res, resp, 200)
}

const postTicket = async (req, res, next) => {
  const body = req.body
  const files = req.files
  const resp = await serviceTickets.createTicket(body, files)
  response.success(req, res, resp, 200)
}

const patchTicket = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceTickets.updateTicket(id, body)
  response.success(req, res, resp, 200)
}

const closeTicket = async (req, res, next) => {
  const { id } = req.params
  const body = req.body
  const resp = await serviceTickets.closeTicket(id, body)
  response.success(req, res, resp, 200)
}

module.exports = {
  getTickets,
  getTicket,
  getTicketByUser,
  getTicketByAbiertos,
  getTicketByCerrados,
  getTicketByEspera,
  postTicket,
  patchTicket,
  closeTicket
}
