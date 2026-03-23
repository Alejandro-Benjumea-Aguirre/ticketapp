const { QueryTypes } = require('sequelize')
const modelTicket = require('./modelTicket')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT tic.id, usr.username, usr.name, tic.email, tic.subject AS asunto, tic.description AS descripcion,
                                       pr.name AS prioridad, apli.name AS aplicacion, st.name AS estado, sop.name AS sist_opt,
                                       usr2.username AS username_resp, usr2.name AS name_resp, tic.close_date AS fecha_cierre,
                                       tic.on_hold AS espera, tic.created_date, tic.updated_date, re.name AS razon_cierre
                                       FROM tickets tic
                                       LEFT JOIN users usr ON usr.id = tic.user_id
                                       LEFT JOIN priorities pr ON tic.priority_id = pr.id
                                       LEFT JOIN aplications apli ON tic.application_id = apli.id
                                       LEFT JOIN states st ON tic.state_id = st.id
                                       LEFT JOIN browsers br ON tic.browser_id = br.id
                                       LEFT JOIN sisopes sop ON tic.sisope_id = sop.id
                                       LEFT JOIN users usr2 ON tic.user_id_resp = usr2.id
                                       LEFT JOIN reasons re ON tic.reason_id = re.id`)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT tic.id, usr.username, usr.name, tic.email, tic.subject AS asunto, tic.description AS descripcion,
                                      pr.name AS prioridad, apli.name AS aplicacion, st.name AS estado, sop.name AS sist_opt,
                                      usr2.username AS username_resp, usr2.name AS name_resp, tic.close_date AS fecha_cierre,
                                      tic.on_hold AS espera, tic.created_date, tic.updated_date, re.name AS razon_cierre
                                      FROM tickets tic
                                      LEFT JOIN users usr ON usr.id = tic.user_id
                                      LEFT JOIN priorities pr ON tic.priority_id = pr.id
                                      LEFT JOIN aplications apli ON tic.application_id = apli.id
                                      LEFT JOIN states st ON tic.state_id = st.id
                                      LEFT JOIN browsers br ON tic.browser_id = br.id
                                      LEFT JOIN sisopes sop ON tic.sisope_id = sop.id
                                      LEFT JOIN users usr2 ON tic.user_id_resp = usr2.id
                                      LEFT JOIN reasons re ON tic.reason_id = re.id
                                      WHERE tic.id = :id`,
                                      { replacements: { id } })

  return result[0]
}

const listByCerrados = async () => {
  const [result] = await db.query(`SELECT tic.id, usr.username, usr.name, tic.email, tic.subject AS asunto, tic.description AS descripcion,
                                            pr.name AS prioridad, apli.name AS aplicacion, st.name AS estado, sop.name AS sist_opt,
                                            usr2.username AS username_resp, usr2.name AS name_resp, tic.close_date AS fecha_cierre,
                                            tic.on_hold AS espera, tic.created_date, tic.updated_date, re.name AS razon_cierre
                                            FROM tickets tic
                                            LEFT JOIN users usr ON usr.id = tic.user_id
                                            LEFT JOIN priorities pr ON tic.priority_id = pr.id
                                            LEFT JOIN aplications apli ON tic.application_id = apli.id
                                            LEFT JOIN states st ON tic.state_id = st.id
                                            LEFT JOIN browsers br ON tic.browser_id = br.id
                                            LEFT JOIN sisopes sop ON tic.sisope_id = sop.id
                                            LEFT JOIN users usr2 ON tic.user_id_resp = usr2.id
                                            LEFT JOIN reasons re ON tic.reason_id = re.id
                                            WHERE tic.close_date IS NOT NULL`)

  return result
}

const listByAbiertos = async () => {
  const [result] = await db.query(`SELECT tic.id, usr.username, usr.name, tic.email, tic.subject AS asunto, tic.description AS descripcion,
                                            pr.name AS prioridad, apli.name AS aplicacion, st.name AS estado, sop.name AS sist_opt,
                                            usr2.username AS username_resp, usr2.name AS name_resp, tic.close_date AS fecha_cierre,
                                            tic.on_hold AS espera, tic.created_date, tic.updated_date, re.name AS razon_cierre
                                            FROM tickets tic
                                            LEFT JOIN users usr ON usr.id = tic.user_id
                                            LEFT JOIN priorities pr ON tic.priority_id = pr.id
                                            LEFT JOIN aplications apli ON tic.application_id = apli.id
                                            LEFT JOIN states st ON tic.state_id = st.id
                                            LEFT JOIN browsers br ON tic.browser_id = br.id
                                            LEFT JOIN sisopes sop ON tic.sisope_id = sop.id
                                            LEFT JOIN users usr2 ON tic.user_id_resp = usr2.id
                                            LEFT JOIN reasons re ON tic.reason_id = re.id
                                            WHERE tic.close_date IS NULL`)

  return result
}

const listByEspera = async () => {
  const [result] = await db.query(`SELECT tic.id, usr.username, usr.name, tic.email, tic.subject AS asunto, tic.description AS descripcion,
                                            pr.name AS prioridad, apli.name AS aplicacion, st.name AS estado, sop.name AS sist_opt,
                                            usr2.username AS username_resp, usr2.name AS name_resp, tic.close_date AS fecha_cierre,
                                            tic.on_hold AS espera, tic.created_date, tic.updated_date, re.name AS razon_cierre
                                            FROM tickets tic
                                            LEFT JOIN users usr ON usr.id = tic.user_id
                                            LEFT JOIN priorities pr ON tic.priority_id = pr.id
                                            LEFT JOIN aplications apli ON tic.application_id = apli.id
                                            LEFT JOIN states st ON tic.state_id = st.id
                                            LEFT JOIN browsers br ON tic.browser_id = br.id
                                            LEFT JOIN sisopes sop ON tic.sisope_id = sop.id
                                            LEFT JOIN users usr2 ON tic.user_id_resp = usr2.id
                                            LEFT JOIN reasons re ON tic.reason_id = re.id
                                            WHERE tic.on_hold = true`)

  return result
}

const listByUser = async (user_id) => {
  const [result] = await db.query(`SELECT tic.id, usr.username, usr.name, tic.email, tic.subject AS asunto, tic.description AS descripcion,
                                            pr.name AS prioridad, apli.name AS aplicacion, st.name AS estado, sop.name AS sist_opt,
                                            usr2.username AS username_resp, usr2.name AS name_resp, tic.close_date AS fecha_cierre,
                                            tic.on_hold AS espera, tic.created_date, tic.updated_date, re.name AS razon_cierre
                                            FROM tickets tic
                                            LEFT JOIN users usr ON usr.id = tic.user_id
                                            LEFT JOIN priorities pr ON tic.priority_id = pr.id
                                            LEFT JOIN aplications apli ON tic.application_id = apli.id
                                            LEFT JOIN states st ON tic.state_id = st.id
                                            LEFT JOIN browsers br ON tic.browser_id = br.id
                                            LEFT JOIN sisopes sop ON tic.sisope_id = sop.id
                                            LEFT JOIN users usr2 ON tic.user_id_resp = usr2.id
                                            LEFT JOIN reasons re ON tic.reason_id = re.id
                                            WHERE tic.user_id = :user_id`,
                                            { replacements: { user_id } })

  return result
}


const created = async (body) => {
  const ticket = modelTicket.build(body)
  await ticket.save()
  return ticket
}

const update = async (id, body) => {
  const ticket = await modelTicket.update(body, { where: { id: id } })

  return ticket
}

module.exports = {
  listAll,
  listById,
  listByUser,
  listByCerrados,
  listByAbiertos,
  listByEspera,
  created,
  update
}
