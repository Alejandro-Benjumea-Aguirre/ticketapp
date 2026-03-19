const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const ticketCommentSchema = new mongoose.Schema({
  ticket_id: { type: Number, required: true },
  user_id:   { type: Number },
  comment:   { type: String },
  state_id:  { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const TicketCommentMongo = mongoose.models.ticket_comments || mongoose.model('ticket_comments', ticketCommentSchema)

const _map = (c) => ({
  id:           c._id.toString(),
  ticket_id:    c.ticket_id,
  user_id:      c.user_id,
  comment:      c.comment,
  estado:       c.state_id === 1 ? 'activo' : 'inactivo',
  created_date: c.created_date,
  updated_date: c.updated_date
})

const listByTicket = async (ticket_id) => {
  const docs = await TicketCommentMongo.find({ ticket_id: Number(ticket_id) }).lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await TicketCommentMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const created = async (body) => {
  const doc = await TicketCommentMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await TicketCommentMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await TicketCommentMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listByTicket, listById, created, update, remove }
