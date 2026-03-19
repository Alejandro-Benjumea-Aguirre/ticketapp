const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const typeUserSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  state_id: { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const TypeUserMongo = mongoose.models.type_users || mongoose.model('type_users', typeUserSchema)

const _map = (t) => ({
  id:           t._id.toString(),
  name:         t.name,
  estado:       t.state_id === 1 ? 'activo' : 'inactivo',
  created_date: t.created_date,
  updated_date: t.updated_date
})

const listAll = async () => {
  const docs = await TypeUserMongo.find().lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await TypeUserMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const created = async (body) => {
  const doc = await TypeUserMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await TypeUserMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await TypeUserMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listAll, listById, created, update, remove }
