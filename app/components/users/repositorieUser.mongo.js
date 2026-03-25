const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const userSchema = new mongoose.Schema({
  username:      { type: String, required: true, unique: true },
  name:          { type: String, required: true },
  password:      { type: String, required: true },
  email:         { type: String, required: true },
  rol_id:        { type: Number },
  state_id:      { type: Number, default: 1 },
  department_id: { type: Number },
  campus_id:     { type: Number }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const recPassSchema = new mongoose.Schema({
  user_id:    { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  token:      { type: String, required: true },
  created_at: { type: Date, default: Date.now }
})

const UserMongo    = mongoose.models.users    || mongoose.model('users', userSchema)
const RecPassMongo = mongoose.models.rec_pass || mongoose.model('rec_pass', recPassSchema)

const listAll = async () => {
  return await UserMongo.find().lean()
}

const listById = async (id) => {
  return await UserMongo.findById(id).lean()
}

const listByUsername = async (username) => {
  const user = await UserMongo.findOne({ username }).lean()
  if (!user) return null
  return { ...user, uid: user._id.toString() }
}

const created = async (body) => {
  const doc = await UserMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await UserMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const updateStatus = async (id, status) => {
  const result = await UserMongo.updateOne({ _id: id }, { $set: {state_id: status} })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await UserMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

const sendToken = async (token, userId) => {
  return await RecPassMongo.create({ user_id: userId, token })
}

const compareToken = async (token, userId, time) => {
  const limit = new Date(Date.now() - time * 60 * 1000)
  return await RecPassMongo.findOne({
    token,
    user_id: userId,
    created_at: { $gte: limit }
  }).lean()
}

module.exports = { listAll, listById, listByUsername, created, update, remove, sendToken, compareToken }
