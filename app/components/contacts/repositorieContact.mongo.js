const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const contactSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  phone:        { type: String },
  email:        { type: String },
  clientId:     { type: Number },
  campusId:     { type: Number },
  typeUserId:   { type: Number },
  state_id:     { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const ContactMongo = mongoose.models.contacts || mongoose.model('contacts', contactSchema)

const _map = (c) => ({
  id:           c._id.toString(),
  contacto:     c.name,
  phone:        c.phone,
  email:        c.email,
  estado:       c.state_id === 1 ? 'activo' : 'inactivo',
  created_date: c.created_date,
  type_user:    c.typeUserId,
  cliente:      c.clientId,
  sede:         c.campusId
})

const listAll = async () => {
  const docs = await ContactMongo.find().lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await ContactMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const listByName = async (name) => {
  const doc = await ContactMongo.findOne({ name: new RegExp(name, 'i') }).lean()
  return doc ? _map(doc) : null
}

const created = async (body) => {
  const doc = await ContactMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await ContactMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await ContactMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listAll, listById, listByName, created, update, remove }
