const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const bitacoraSchema = new mongoose.Schema({
  eventId:      { type: String },
  tableAffect:  { type: String },
  fieldAffect:  { type: String },
  dataPrev:     { type: String },
  dataNew:      { type: String },
  username:     { type: String }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const BitacoraMongo = mongoose.models.bitacora || mongoose.model('bitacora', bitacoraSchema)

const listById = async (id) => {
  const doc = await BitacoraMongo.findById(id).lean()
  if (!doc) return null
  return {
    id:           doc._id.toString(),
    evento:       doc.eventId,
    tabla:        doc.tableAffect,
    campo:        doc.fieldAffect,
    data_prev:    doc.dataPrev,
    data_new:     doc.dataNew,
    username:     doc.username,
    created_date: doc.created_date
  }
}

const created = async (body) => {
  const doc = await BitacoraMongo.create(body)
  return withGetDataValue(doc)
}

module.exports = { listById, created }
