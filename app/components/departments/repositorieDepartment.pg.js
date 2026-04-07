const modelDepartment = require('./modelDepartment')
const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT dep.id, dep.name, dep.description, st.name AS estado, dep.created_date, dep.updated_date
                                   FROM departments dep
                                   LEFT JOIN states st ON dep.state_id = st.id`)
  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT dep.id, dep.name, dep.description, st.name AS estado, dep.created_date, dep.updated_date
                                   FROM departments dep
                                   LEFT JOIN states st ON dep.state_id = st.id
                                   WHERE dep.id = :id`,
                                   { replacements: { id } })
  return result[0]
}

const listByName = async (name) => {
  const [result] = await db.query(`SELECT dep.id, dep.name, dep.description, st.name AS estado, dep.created_date, dep.updated_date
                                   FROM departments dep
                                   LEFT JOIN states st ON dep.state_id = st.id
                                   WHERE dep.name LIKE :name`,
                                   { replacements: { name } })
  return result[0]
}

const created = async (body) => {
  const department = modelDepartment.build(body)
  await department.save()
  return department
}

const update = async (id, body) => {
  const department = await modelDepartment.update(body, { where: { id }, returning: true })
  return department
}

const remove = async (id) => {
  const department = await modelDepartment.update({ state_id: '2' }, { where: { id }, returning: true })
  return department
}

const updateStatus = async (id, status) => {
  const department = await modelDepartment.update({ state_id: status }, { where: { id }, returning: true })
  return department
}

module.exports = {
  listAll,
  listById,
  listByName,
  created,
  update,
  remove,
  updateStatus
}
