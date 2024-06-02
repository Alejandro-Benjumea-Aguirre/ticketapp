const modelContact = require('./modelContact')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT con.name AS contacto, con.phone, con.email, st.name AS estado, con.created_date,
                                          tu.name AS type_user, cus.name AS cliente, cam.name AS sede
                                  FROM contacts con 
                                  LEFT JOIN states st ON con.state_id = st.id 
                                  LEFT JOIN headquarters cam ON con.campus_id = cam.id
                                  LEFT JOIN customers cus ON con.client_id = cus.id
                                  LEFT JOIN type_users tu ON con.type_user_id = tu.id`)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT con.name AS contacto, con.phone, con.email, st.name AS estado, con.created_date,
                                    tu.name AS type_user, cus.name AS cliente, cam.name AS sede
                                  FROM contacts con 
                                  LEFT JOIN states st ON con.state_id = st.id 
                                  LEFT JOIN headquarters cam ON con.campus_id = cam.id
                                  LEFT JOIN customers cus ON con.client_id = cus.id
                                  LEFT JOIN type_users tu ON con.type_user_id = tu.id
                                  WHERE con.id = ${id}`)

  return result[0]
}

const listByName = async (name) => {
  const [result] = await db.query(`SELECT con.name AS contacto, con.phone, con.email, st.name AS estado, con.created_date,
                                    tu.name AS type_user, cus.name AS cliente, cam.name AS sede
                                  FROM contacts con 
                                  LEFT JOIN states st ON con.state_id = st.id 
                                  LEFT JOIN headquarters cam ON con.campus_id = cam.id
                                  LEFT JOIN customers cus ON con.client_id = cus.id
                                  LEFT JOIN type_users tu ON con.type_user_id = tu.id
                                  WHERE con.name like '${name}'`)

  return result[0]
}

const created = async (body) => {
  const contact = modelContact.build(body)
  await contact.save()
  return contact
}

const update = async (id, body) => {
  const contact = await modelContact.update(body, { where: { id: id }, returning: true })

  return contact
}

const remove = async (id) => {
  const contact = await modelContact.update({ state_id: '2' }, { where: { id: id }, returning: true })

  return contact
}

module.exports = { listAll, listById, listByName, created, update, remove }
