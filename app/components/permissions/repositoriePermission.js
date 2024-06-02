const modelPermision = require('./modelPermission')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT per.name, per.description, st.name AS estado, per.created_date, per.updated_date
                                  FROM permissions per 
                                  LEFT JOIN states st ON per.state_id = st.id 
                                  `)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT per.name, per.description, st.name, per.created_date, per.updated_date
                                    FROM permissions per 
                                    LEFT JOIN states st ON per.state_id = st.id
                                  WHERE per.id = ${id}`)

  return result[0]
}

const listByName = async (name) => {
  const [result] = await db.query(`SELECT per.name, per.description, st.name, per.created_date, per.updated_date
                                    FROM permissions per 
                                    LEFT JOIN states st ON per.state_id = st.id
                                  WHERE per.name like '${name}'`)

  return result[0]
}

const created = async (body) => {
  const user = modelPermision.build(body)
  await user.save()
  return user
}

const update = async (id, body) => {
  const user = await modelPermision.update(body, { where: { id }, returning: true })

  return user
}

const remove = async (id) => {
  const cantidad = await modelPermision.update({ state_id: '2' }, { where: { id }, returning: true })

  return cantidad
}

module.exports = { listAll, listById, listByName, created, update, remove }
