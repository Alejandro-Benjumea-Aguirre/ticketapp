const modelPreform = require('./modelPreforms')

const db = require('../../../config/postgresql')

const listAll = async () => {
  const [result] = await db.query(`SELECT pre.title, pre.description, st.name AS estado, su.name AS suceso, pre.created_date, pre.updated_date
                                    FROM preforms pre 
                                    LEFT JOIN states st ON rol.state_id = st.id
                                    LEFT JOIN sucesos su ON pre.suceso_id = su.id`)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT pre.title, pre.description, st.name AS estado, su.name AS suceso, pre.created_date, pre.updated_date
                                    FROM preforms pre 
                                    LEFT JOIN states st ON rol.state_id = st.id
                                    LEFT JOIN sucesos su ON pre.suceso_id = su.id
                                   WHERE pre.id = ${id}`)

  return result[0]
}

const listBySuceso = async (suceso) => {
  const [result] = await db.query(`SELECT pre.title, pre.description, st.name AS estado, su.name AS suceso, pre.created_date, pre.updated_date
                                    FROM preforms pre 
                                    LEFT JOIN states st ON rol.state_id = st.id
                                    LEFT JOIN sucesos su ON pre.suceso_id = su.id
                                  WHERE pre.suceso_id = ${suceso}`)

  return result[0]
}

const created = async (body) => {
  const preform = modelPreform.build(body)
  await preform.save()
  return preform
}

const update = async (id, body) => {
  const preform = await modelPreform.update(body, { where: { id }, returning: true, })

  return preform
}

const remove = async (id) => {
  const preform = await modelPreform.update({ state_id: '2' }, { where: { id }, returning: true, })

  return preform
}

module.exports = { 
  listAll, 
  listById, 
  listBySuceso, 
  created, 
  update, 
  remove 
}
