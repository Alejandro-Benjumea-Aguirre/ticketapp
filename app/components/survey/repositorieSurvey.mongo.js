const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const surveySchema = new mongoose.Schema({
  ticket_id: { type: Number },
  user_id:   { type: Number },
  coment:    { type: String },
  state_id:  { type: Number, default: 1 },
  public:    { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const SurveyMongo = mongoose.models.survey || mongoose.model('survey', surveySchema)

const _map = (s) => ({
  id:           s._id.toString(),
  ticket_id:    s.ticket_id,
  user_id:      s.user_id,
  coment:       s.coment,
  estado:       s.state_id === 1 ? 'activo' : 'inactivo',
  public:       s.public,
  created_date: s.created_date,
  updated_date: s.updated_date
})

const listAll = async () => {
  const docs = await SurveyMongo.find().lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await SurveyMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const listByClient = async (client_id) => {
  const docs = await SurveyMongo.find({ user_id: Number(client_id) }).lean()
  return docs.map(_map)
}

const created = async (body) => {
  const doc = await SurveyMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await SurveyMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await SurveyMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listAll, listById, listByClient, created, update, remove }
