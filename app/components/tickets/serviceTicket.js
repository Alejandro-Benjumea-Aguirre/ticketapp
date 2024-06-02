const repositorieTickets = require('./repositorieTicket')
const repositorieUpload = require('../uploads/repositorieUpload')

const listAllTickets = async () => {
  const resp = await repositorieTickets.listAll()
  const tickets = []
  resp.forEach(ticket => {
    tickets.push({
      ticket_id: ticket.id,
      username_cre: ticket.username,
      user_cre: ticket.name,
      email_cre: ticket.email,
      asunto: ticket.asunto,
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
      aplicacion: ticket.aplicacion,
      estado: ticket.estado,
      sistema_ope: ticket.sist_opt,
      username_resp: ticket.username_resp,
      user_resp: ticket.name_resp,
      fecha_cierre: ticket.fecha_cierre,
      en_espera: ticket.espera,
      fecha_cre: ticket.created_date,
      razon_cierre: ticket.razon_cierre
    });
  })
  return tickets
}

async function listTicket(id) {
  const ticket = await repositorieTickets.listById(id)
  if (ticket) {
    return {
      ticket_id: ticket.id,
      username_cre: ticket.username,
      user_cre: ticket.name,
      email_cre: ticket.email,
      asunto: ticket.asunto,
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
      aplicacion: ticket.aplicacion,
      estado: ticket.estado,
      sistema_ope: ticket.sist_opt,
      username_resp: ticket.username_resp,
      user_resp: ticket.name_resp,
      fecha_cierre: ticket.fecha_cierre,
      en_espera: ticket.espera,
      fecha_cre: ticket.created_date,
      razon_cierre: ticket.razon_cierre
    }
  } else {
    return `No existe ningun ticket con el id ${id}`
  }
}

const listTicketByUser = async (idUser) => {
  const resp = await repositorieTickets.listByUser(idUser)
  const tickets = []
  resp.forEach(ticket => {
    tickets.push({
      ticket_id: ticket.id,
      username_cre: ticket.username,
      user_cre: ticket.name,
      email_cre: ticket.email,
      asunto: ticket.asunto,
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
      aplicacion: ticket.aplicacion,
      estado: ticket.estado,
      sistema_ope: ticket.sist_opt,
      username_resp: ticket.username_resp,
      user_resp: ticket.name_resp,
      fecha_cierre: ticket.fecha_cierre,
      en_espera: ticket.espera,
      fecha_cre: ticket.created_date,
      razon_cierre: ticket.razon_cierre
    })
  });
  return tickets
}

const listTicketByAbiertos = async () => {
  const resp = await repositorieTickets.listByAbiertos()
  const tickets = []
  resp.forEach(ticket => {
    tickets.push({
      ticket_id: ticket.id,
      username_cre: ticket.username,
      user_cre: ticket.name,
      email_cre: ticket.email,
      asunto: ticket.asunto,
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
      aplicacion: ticket.aplicacion,
      estado: ticket.estado,
      sistema_ope: ticket.sist_opt,
      username_resp: ticket.username_resp,
      user_resp: ticket.name_resp,
      fecha_cierre: ticket.fecha_cierre,
      en_espera: ticket.espera,
      fecha_cre: ticket.created_date,
      razon_cierre: ticket.razon_cierre
    })
  });
  return tickets
}

const listTicketByCerrados = async () => {
  const resp = await repositorieTickets.listByCerrados()
  const tickets = []
  resp.forEach(ticket => {
    tickets.push({
      ticket_id: ticket.id,
      username_cre: ticket.username,
      user_cre: ticket.name,
      email_cre: ticket.email,
      asunto: ticket.asunto,
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
      aplicacion: ticket.aplicacion,
      estado: ticket.estado,
      sistema_ope: ticket.sist_opt,
      username_resp: ticket.username_resp,
      user_resp: ticket.name_resp,
      fecha_cierre: ticket.fecha_cierre,
      en_espera: ticket.espera,
      fecha_cre: ticket.created_date,
      razon_cierre: ticket.razon_cierre
    })
  });
  return tickets
}

const listTicketByEspera = async () => {
  const resp = await repositorieTickets.listByEspera()
  const tickets = []
  resp.forEach(ticket => {
    tickets.push({
      ticket_id: ticket.id,
      username_cre: ticket.username,
      user_cre: ticket.name,
      email_cre: ticket.email,
      asunto: ticket.asunto,
      descripcion: ticket.descripcion,
      prioridad: ticket.prioridad,
      aplicacion: ticket.aplicacion,
      estado: ticket.estado,
      sistema_ope: ticket.sist_opt,
      username_resp: ticket.username_resp,
      user_resp: ticket.name_resp,
      fecha_cierre: ticket.fecha_cierre,
      en_espera: ticket.espera,
      fecha_cre: ticket.created_date,
      razon_cierre: ticket.razon_cierre
    })
  });
  return tickets
}

const createTicket = async (body, files) => {

  const {
    user_id,
    priority_id,
    application_id,
    browser_id,
    sisope_id,
    subject,
    description,
    email
  } = body

  const ticket = {
    user_id,
    priority_id,
    application_id,
    browser_id,
    sisope_id,
    subject,
    description,
    email,
    state_id: 1
  }
 
  const resp = await repositorieTickets.created(ticket)

  if(Array.isArray(files)){
    files.map(async (file) => {
      const { originalname, filename, path, size } = file
      const id = resp.getDataValue('id')

      const body = {
        id_ticket: id,
        nom_archivo: filename,
        size: size,
        real_name: originalname,
        path: path
      }

      const upload = await repositorieUpload.created(body)

    })
  }
  
  return {
    ticket: resp.getDataValue('ticket_id')
  }
}

const updateTicket = async (id, body) => {
  
  const ticket = await repositorieTickets.listById(id)

  if (!ticket) {
    return `No existe un ticket con el id ${id}`
  }

  const upsertTicket = await repositorieTickets.update(id, body)

  if(upsertTicket){
    return {
      ticket: upsertTicket.ticket_id,
    }
  }else{
    return `No se pudo modificar el ticket con el id: ${id}`
  }
}

const closeTicket = async (id, body) => {
  const ticket = await repositorieTickets.listById(id)

  if (!ticket) {
    return `No existe ningun ticket con el id: ${id}`
  }

  const close_date = Date.now() 

  const {
    reason_id,
    user_id_resp
  } = body

  const upsertTicket = await repositorieTickets.update(id, {close_date, reason_id, user_id_resp})

  if(upsertTicket){
    return {
      ticket: upsertTicket.ticket_id
    }
  }else{
    return `No se pudo cerrar el ticket con el id ${id} intenta de nuevo`
  }

}

module.exports = {
  listAllTickets,
  listTicket,
  listTicketByUser,
  listTicketByAbiertos,
  listTicketByCerrados,
  listTicketByEspera,
  createTicket,
  updateTicket,
  closeTicket
}
