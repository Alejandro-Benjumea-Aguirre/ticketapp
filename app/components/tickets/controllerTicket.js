const response = require('../../helpers/response')
const serviceTickets = require('./serviceTicket')

const getTickets = async (req, res) => {
  try {
    const resp = await serviceTickets.listAllTickets()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getTicket = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceTickets.listTicket(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getTicketByUser = async (req, res) => {
  try {
    const { id_user } = req.params
    const resp = await serviceTickets.listTicketByUser(id_user)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getTicketByAbiertos = async (req, res) => {
  try {
    const resp = await serviceTickets.listTicketByAbiertos()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getTicketByCerrados = async (req, res) => {
  try {
    const resp = await serviceTickets.listTicketByCerrados()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getTicketByEspera = async (req, res) => {
  try {
    const resp = await serviceTickets.listTicketByEspera()
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postTicket = async (req, res) => {
  const body = req.body
  const files = req.files
  try {
    const resp = await serviceTickets.createTicket(body, files)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchTicket = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await serviceTickets.updateTicket(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const closeTicket = async (req, res) => {
  const { id } = req.params
  const body = req.body

  try {
    const resp = await serviceTickets.closeTicket(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
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
