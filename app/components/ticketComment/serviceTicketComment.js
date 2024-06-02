const repositorieTicketComment = require('./repositorieTicketComment')

const listAllComments = async (ticket_id) => {
  const resp = await repositorieTicketComment.listAll(ticket_id)

  if (!resp) {
    return 'No hay comentarios en el ticket.'
  }
  const comments = []
  resp.forEach(comment => {
    comments.push({
      ticket: comment.ticket_id,
      username: comment.username,
      comentario: comment.coment,
      publico: comment.public,
      fecha_cre: comment.created_date,
      fecha_up: comment.updated_date
    })
  })
  return comments
}

const listComment = async (id) => {
  const comment = await repositorieTicketComment.listById(id)
  if (comment) {
    return {
      ticket: comment.ticket_id,
      username: comment.username,
      comentario: comment.coment,
      estado: comment.estado,
      publico: comment.public,
      fecha_cre: comment.created_date,
      fecha_up: comment.updated_date
    }
  } else {
    return `No existe ningun comentario con el id ${id}`
  }
}

const createComment = async (body, files) => {
  const { ticket_id, user_id, coment, public } = body

  const comment = {
    ticket_id,
    user_id,
    coment,
    public,
    state_id: 1
  }

  const resp = await repositorieTicketComment.created(comment)

  if(Array.isArray(files)){
    files.map(async (file) => {
      const { originalname, filename, path, size } = file
      const id = resp.getDataValue('id')

      const body = {
        id_ticket: ticket_id,
        id_coment: id,
        nom_archivo: filename,
        size: size,
        real_name: originalname,
        path: path
      }

      const upload = await repositorieUpload.created(body)

    })
  }

  return {
    name: resp.getDataValue('ticket_id')
  }
}

const updateComment = async (id, body) => {
  const comment = await repositorieTicketComment.listById(id)

  if (!comment) {
    return `No existe un comentario con el id ${id}`
  }

  const commentUpdate = await repositorieTicketComment.update(id, body)

  if (commentUpdate > 0) {
    return {
      name: commentUpdate.ticket_id
    }
  } else {
    return `No se pudo modificar el comentario con el id: ${id}`
  }
}

const inactiveComment = async (id) => {
  const comment = await repositorieTicketComment.listById(id)

  if (!comment) {
    return `No existe un cometario con el id: ${id}`
  }

  const commentInactive = await repositorieTicketComment.remove(id)

  if (commentInactive > 0) {
    return {
      ticket: commentInactive.ticket_id
    }
  } else {
    return `No se pudo inactivar el comentario con el id: ${id}`
  }
}

module.exports = { 
	listAllComments, 
	listComment, 
	createComment, 
	updateComment, 
	inactiveComment 
}
