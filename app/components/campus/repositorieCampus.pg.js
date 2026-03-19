const modelCampus = require('./modelCampus')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT cam.id, cam.name, cam.url_alternative, cu.name AS cliente, st.name AS estado, 
                                  cam.created_date, cam.updated_date
                                  FROM headquarters cam 
                                  LEFT JOIN customers cu ON cam.client_id = cu.id
                                  LEFT JOIN states st ON rol.state_id = st.id 
                                  `)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT cam.id, cam.name, cam.url_alternative, cu.name AS cliente, st.name AS estado, 
																	cam.created_date, cam.updated_date
																	FROM headquarters cam 
																	LEFT JOIN customers cu ON cam.client_id = cu.id
																	LEFT JOIN states st ON rol.state_id = st.id 
                                  WHERE cam.id = ${id}`)

  return result[0]
}

const listByName = async (name) => {
  const [result] = await db.query(`SELECT cam.id, cam.name, cam.url_alternative, cu.name AS cliente, st.name AS estado, 
																	cam.created_date, cam.updated_date
																	FROM headquarters cam 
																	LEFT JOIN customers cu ON cam.client_id = cu.id
																	LEFT JOIN states st ON rol.state_id = st.id 
                                  WHERE cam.name like '${name}'`)

  return result[0]
}

const listByClient = async (client_id) => {
  const [result] = await db.query(`SELECT cam.id, cam.name, cam.url_alternative, cu.name AS cliente, st.name AS estado, 
																	cam.created_date, cam.updated_date
																	FROM headquarters cam 
																	LEFT JOIN customers cu ON cam.client_id = cu.id
																	LEFT JOIN states st ON rol.state_id = st.id 
                                  WHERE cam.client_id like '${client_id}'`)

  return result[0]
}

const created = async (body) => {
  const campus = modelCampus.build(body)
  await campus.save()
  return campus
}

const update = async (id, body) => {
  const campus = await modelCampus.update(body, { where: { id }, returning: true })

  return campus
}

const remove = async (id) => {
  const campus = await modelCampus.update({ state_id: '2' }, { where: { id }, returning: true })

  return campus
}

module.exports = { 
  listAll, 
  listById, 
  listByName, 
  listByClient, 
  created, 
  update, 
  remove 
}
