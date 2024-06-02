const modelRol = require('./modelRol')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT rol.name, rol.description, st.name AS estado, rol.created_date, rol.updated_date
                                  FROM roles rol 
                                  LEFT JOIN states st ON rol.state_id = st.id 
                                  `)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT rol.name, rol.description, st.name AS estado, rol.created_date, rol.updated_date
                                    FROM roles rol 
                                    LEFT JOIN states st ON rol.state_id = st.id
                                  WHERE rol.id = ${id}`)

  return result[0]
}

const listByName = async (name) => {
  const [result] = await db.query(`SELECT rol.name, rol.description, st.name AS estado, rol.created_date, rol.updated_date
                                    FROM roles rol 
                                    LEFT JOIN states st ON rol.state_id = st.id
                                  WHERE rol.name like '${name}'`)

  return result[0]
}

const listByRolPermissions = async (id, name) => {
  const [result] = await db.query(`SELECT rol.id, rol.name AS rol, per.id, per.name AS permiso, st.name AS estado, pr.created_date, pr.updated_date
                                   FROM rol_permissions pr 
                                   INNER JOIN roles rol ON pr.rol_id = rol.id
                                   INNER JOIN permissions per ON pr.permission_id = per.id
                                   INNER JOIN states st ON pr.state_id = st.id
                                   WHERE rol.id = ${id} OR rol.name = ${name}`)

  return result
}

const created = async (body) => {
  const rol = modelRol.build(body)
  await rol.save()
  return rol
}

const update = async (id, body) => {
  const rol = await modelRol.update(body, { where: { id }, returning: true })

  return usroler
}

const remove = async (id) => {
  const rol = await modelRol.update({ state_id: '2' }, { where: { id }, returning: true })

  return rol
}

module.exports = { listAll, listById, listByName, listByRolPermissions, created, update, remove }
