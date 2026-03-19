const modelSurvey = require('./modelSurvey')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT su.ticket_id AS ticket, usr.username AS username, date_send, date_reply, 
                                  st.name AS estado, num_noti, created_at, updated_at
                                  FROM survey su 
                                  INNER JOIN tickets ti ON su.ticket_id = ti.id
                                  INNER JOIN users usr ON su.user_id = usr.id
                                  INNER JOIN states st ON su.state_id = st.id
                                  `)

  return result
}
  
const listById = async (id) => {
  const [result] = await db.query(`SELECT su.ticket_id AS ticket, usr.username AS usuario, date_send, date_reply, 
                                  st.name AS estado, num_noti, created_at, updated_at
                                  FROM survey su 
                                  INNER JOIN tickets ti ON su.ticket_id = ti.id
                                  INNER JOIN users usr ON su.user_id = usr.id
                                  INNER JOIN states st ON su.state_id = st.id
                                  WHERE su.id = ${id}`)

  return result[0]
}
  
const listByClient = async (client_id) => {
  const [result] = await db.query(`SELECT su.ticket_id AS ticket, usr.username AS usuario, date_send, date_reply, 
                                  st.name AS estado, num_noti, created_at, updated_at, cl.name AS cliente
                                  FROM survey su 
                                  INNER JOIN tickets ti ON su.ticket_id = ti.id
                                  INNER JOIN users usr ON su.user_id = usr.id
                                  INNER JOIN states st ON su.state_id = st.id
                                  INNER JOIN customers cl ON usr.client_id = cl.id
                                  WHERE usr.client_id like '${client_id}'`)

  return result[0]
}

const created = async (body) => {
  const survey = modelSurvey.build(body)
  await survey.save()
  return survey
}

const update = async (id, body) => {
  const survey = await modelSurvey.update(body, { where: { id }, returning: true })

  return survey
}

const remove = async (id) => {
  const cantidad = await modelSurvey.update({ state_id: '2' }, { where: { id }, returning: true })

  return cantidad
}

module.exports = { listAll, listById, listByClient, created, update, remove }
