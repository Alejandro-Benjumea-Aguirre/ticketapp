const modelCustomer = require('./modelCustomer')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT cu.id, cu.name, st.name AS estado, cu.created_date, cu.updated_date
                                  FROM customers cu 
                                  LEFT JOIN states st ON con.state_id = st.id 
                                  `)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT cu.id, cu.name, st.name AS estado, cu.created_date, cu.updated_date
                                  FROM customers cu 
                                  LEFT JOIN states st ON con.state_id = st.id 
                                  WHERE cu.id = ${id}`)

  return result[0]
}

const listByName = async (name) => {
  const [result] = await db.query(`SELECT cu.id, cu.name, st.name AS estado, cu.created_date, cu.updated_date
                                  FROM customers cu 
                                  LEFT JOIN states st ON con.state_id = st.id 
                                  WHERE cu.name like '${name}'`)

  return result[0]
}

const created = async (body) => {
  const customer = modelCustomer.build(body)
  await customer.save()
  return customer
}

const update = async (id, body) => {
  const resp = await modelCustomer.update(body, { where: { id: id }, returning: true })

  return resp
}

const remove = async (id) => {
  const resp = await modelCustomer.update({ state_id: '2' }, { where: { id: id }, returning: true })

  return resp
}

module.exports = { listAll, listById, listByName, created, update, remove }
