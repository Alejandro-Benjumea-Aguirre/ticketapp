const modelTicketComment = require('./modelTicketComment')

const db = require('../../../config/postgresql')

const listAll = async (ticket_id) => {
  const [result] = await db.query(`SELECT tc.ticket_id AS ticket, usr.username, tc.coment, tc.public, 
                                  tc.created_at, tc.updated_at
                                  FROM ticket_coments tc 
                                  INNER JOIN tickets ti ON tc.ticket_id = ti.id
                                  INNER JOIN users usr ON tc.user_id = usr.id
                                  WHERE tc.ticket_id = ${ticket_id} AND tc.state_id = 1`)

  return result
}
  
const listById = async (id) => {
  const [result] = await db.query(`SELECT tc.ticket_id AS ticket, usr.username, tc.coment, tc.public, st.name AS estado
																	tc.created_at, tc.updated_at
																	FROM ticket_coments tc 
																	INNER JOIN tickets ti ON tc.ticket_id = ti.id
																	INNER JOIN users usr ON tc.user_id = usr.id
                                  INNER JOIN states st ON tc.state_id = st.id
																	WHERE tc.id = ${id}`)

  return result[0]
}

const created = async (body) => {
  const comment = modelTicketComment.build(body)
  await comment.save()
  return comment
}

const update = async (id, body) => {
  const comment = await modelTicketComment.update(body, { where: { id }, returning: true })

  return comment
}

const remove = async (id) => {
  const comment = await modelTicketComment.update({ state_id: '2' }, { where: { id }, returning: true })

  return comment
}

module.exports = { 
  listAll, 
  listById, 
  created, 
  update, 
  remove 
}
