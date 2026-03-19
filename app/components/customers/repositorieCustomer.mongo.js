const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const customerSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  state_id: { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const CustomerMongo = mongoose.models.customers || mongoose.model('customers', customerSchema)

const _map = (c) => ({
  id:           c._id.toString(),
  name:         c.name,
  estado:       c.state_id === 1 ? 'activo' : 'inactivo',
  created_date: c.created_date,
  updated_date: c.updated_date
})

const listAll = async () => {
  const docs = await CustomerMongo.find().lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await CustomerMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const listByName = async (name) => {
  const doc = await CustomerMongo.findOne({ name: new RegExp(name, 'i') }).lean()
  return doc ? _map(doc) : null
}

const created = async (body) => {
  const doc = await CustomerMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await CustomerMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await CustomerMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listAll, listById, listByName, created, update, remove }
