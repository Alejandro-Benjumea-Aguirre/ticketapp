const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const permissionSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  state_id:    { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const PermissionMongo = mongoose.models.permissions || mongoose.model('permissions', permissionSchema)

const _map = (p) => ({
  id:           p._id.toString(),
  name:         p.name,
  description:  p.description,
  estado:       p.state_id === 1 ? 'activo' : 'inactivo',
  created_date: p.created_date,
  updated_date: p.updated_date
})

const listAll = async () => {
  const docs = await PermissionMongo.find().lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await PermissionMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const listByName = async (name) => {
  const doc = await PermissionMongo.findOne({ name: new RegExp(name, 'i') }).lean()
  return doc ? _map(doc) : null
}

const created = async (body) => {
  const doc = await PermissionMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await PermissionMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await PermissionMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listAll, listById, listByName, created, update, remove }
