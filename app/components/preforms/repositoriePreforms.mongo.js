const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const preformSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  state_id:    { type: Number, default: 1 },
  suceso_id:   { type: Number }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const PreformMongo = mongoose.models.preforms || mongoose.model('preforms', preformSchema)

const _map = (p) => ({
  id:           p._id.toString(),
  title:        p.title,
  description:  p.description,
  estado:       p.state_id === 1 ? 'activo' : 'inactivo',
  suceso:       p.suceso_id,
  created_date: p.created_date,
  updated_date: p.updated_date
})

const listAll = async () => {
  const docs = await PreformMongo.find().lean()
  return docs.map(_map)
}

const listBySuceso = async (suceso_id) => {
  const docs = await PreformMongo.find({ suceso_id: Number(suceso_id) }).lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await PreformMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const created = async (body) => {
  const doc = await PreformMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await PreformMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await PreformMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listAll, listBySuceso, listById, created, update, remove }
