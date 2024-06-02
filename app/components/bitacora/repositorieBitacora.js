const modelBitacora = require('./modelBitacora')

const db = require('../../../config/postgresql')

const listById = async (id) => {
  const [result] = await db.query(`SELECT ev.name AS evento, bi.*
                                    FROM bitacora bi 
                                    LEFT JOIN events ev ON bi.event_id = ev.id
                                  WHERE bi.id = ${id}`)

  return result[0]
}

const created = async (body) => {
  const bitacora = modelBitacora.build(body)
  await bitacora.save()
  return bitacora
}

module.exports = { listById, created }
