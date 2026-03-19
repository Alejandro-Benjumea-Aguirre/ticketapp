const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const uploadSchema = new mongoose.Schema({
  id_ticket:   { type: Number },
  nom_archivo: { type: String },
  size:        { type: Number },
  real_name:   { type: String },
  path:        { type: String }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const UploadMongo = mongoose.models.uploads || mongoose.model('uploads', uploadSchema)

const listAll = async (idticket) => {
  return await UploadMongo.find({ id_ticket: Number(idticket) }).lean()
}

const listById = async (id) => {
  return await UploadMongo.findById(id).lean()
}

const created = async (body) => {
  const doc = await UploadMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await UploadMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await UploadMongo.deleteOne({ _id: id })
  return result.deletedCount
}

module.exports = { listAll, listById, created, update, remove }
