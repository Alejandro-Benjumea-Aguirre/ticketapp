const modelUpload = require('./modelUpload')

const db = require('../../../config/postgresql')

const listAll = async (idticket) => {
  const [result] = await db.query(`SELECT *
                                    FROM uploads 
                                    WHERE id_ticket = ${idticket}`)

  return result
}

const listById = async (id) => {
  const [result] = await db.query(`SELECT *
                                    FROM uploads
                                   WHERE id = ${id}`)

  return result[0]
}

const created = async (body) => {
  const upload = modelUpload.build(body)
  await upload.save()
  return upload
}

const update = async (id, body) => {
  const upload = await modelUpload.update(body, { where: { id }, returning: true })

  return upload
}

const remove = async (id) => {
  const upload = await modelUpload.destroy({ where: id })

  return upload
}

module.exports = { 
  listAll, 
  listById, 
  created, 
  update, 
  remove 
}
