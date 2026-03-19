const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const ticketSchema = new mongoose.Schema({
  user_id:        { type: Number, required: true },
  priority_id:    { type: Number, required: true },
  application_id: { type: Number, required: true },
  state_id:       { type: Number, default: 1 },
  browser_id:     { type: Number, required: true },
  sisope_id:      { type: Number, required: true },
  user_id_resp:   { type: Number },
  subject:        { type: String, required: true },
  description:    { type: String, required: true },
  email:          { type: String, required: true },
  close_date:     { type: Date },
  on_hold:        { type: Boolean, default: false },
  reason_id:      { type: Number }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const TicketMongo = mongoose.models.tickets || mongoose.model('tickets', ticketSchema)

const _mapTicket = (t) => ({
  id:            t._id.toString(),
  username:      t.username,
  name:          t.name,
  email:         t.email,
  asunto:        t.subject,
  descripcion:   t.description,
  prioridad:     t.priority_id,
  aplicacion:    t.application_id,
  estado:        t.state_id,
  sist_opt:      t.sisope_id,
  username_resp: t.user_id_resp,
  name_resp:     t.user_id_resp,
  fecha_cierre:  t.close_date,
  espera:        t.on_hold,
  created_date:  t.created_date,
  updated_date:  t.updated_date,
  razon_cierre:  t.reason_id
})

const listAll = async () => {
  const docs = await TicketMongo.find().lean()
  return docs.map(_mapTicket)
}

const listById = async (id) => {
  const doc = await TicketMongo.findById(id).lean()
  return doc ? _mapTicket(doc) : null
}

const listByCerrados = async () => {
  const docs = await TicketMongo.find({ close_date: { $ne: null } }).lean()
  return docs.map(_mapTicket)
}

const listByAbiertos = async () => {
  const docs = await TicketMongo.find({ close_date: null }).lean()
  return docs.map(_mapTicket)
}

const listByEspera = async () => {
  const docs = await TicketMongo.find({ on_hold: true }).lean()
  return docs.map(_mapTicket)
}

const listByUser = async (user_id) => {
  const docs = await TicketMongo.find({ user_id: Number(user_id) }).lean()
  return docs.map(_mapTicket)
}

const created = async (body) => {
  const doc = await TicketMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await TicketMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

module.exports = { listAll, listById, listByUser, listByCerrados, listByAbiertos, listByEspera, created, update }
