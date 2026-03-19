const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const campusSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  url_alternative: { type: String },
  client_id:       { type: Number, required: true },
  state_id:        { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const CampusMongo = mongoose.models.headquarters || mongoose.model('headquarters', campusSchema)

const _map = (c) => ({
  id:           c._id.toString(),
  name:         c.name,
  url_alternative: c.url_alternative,
  cliente:      c.client_id,
  estado:       c.state_id === 1 ? 'activo' : 'inactivo',
  created_date: c.created_date,
  updated_date: c.updated_date
})

const listAll = async () => {
  const docs = await CampusMongo.find().lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await CampusMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const listCampusByName = async (name) => {
  const doc = await CampusMongo.findOne({ name: new RegExp(name, 'i') }).lean()
  return doc ? _map(doc) : null
}

const listByClient = async (client_id) => {
  const docs = await CampusMongo.find({ client_id: Number(client_id) }).lean()
  return docs.map(_map)
}

const created = async (body) => {
  const doc = await CampusMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await CampusMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await CampusMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listAll, listById, listCampusByName, listByClient, created, update, remove }
