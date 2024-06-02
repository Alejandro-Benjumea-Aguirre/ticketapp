const modelTypeUser = require('./modelTypeUser')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT tu.name, st.name, tu.created_date, tu.updated_date
                                    FROM type_user tu 
                                    LEFT JOIN states st ON tu.state_id = st.id`)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT tu.name, st.name, tu.created_date, tu.updated_date
                                    FROM type_user tu 
                                    LEFT JOIN states st ON tu.state_id = st.id
                                   WHERE tu.id = ${id}`)

  return result[0]
}

const created = async (body) => {
  const typeUser = modelTypeUser.build(body)
  await typeUser.save()
  return typeUser
}

const update = async (id, body) => {
  const typeUser = await modelTypeUser.update(body, { where: { id }, returning: true })

  return typeUser
}

const remove = async (id) => {
  const typeUser = await modelTypeUser.update({ state_id: '2' }, { where: { id }, returning: true })

  return typeUser
}

module.exports = { 
  listAll, 
  listById, 
  created, 
  update, 
  remove 
}
