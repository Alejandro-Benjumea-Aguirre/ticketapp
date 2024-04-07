// const { QueryTypes } = require('sequelize')
const db = require('../../../config/postgresql')

const { User, UserSchema } = require('./model')
// const State = require('../states/model')

function setupModel (sequealize) {
  User.init(UserSchema, User.config(sequealize))
}

setupModel(db)

const listAll = async () => {
  const [results] = await db.query(`SELECT users.username, users.name, users.email, 
  users.created_date, users.updated_date, states.name AS estado 
  FROM users AS users 
  INNER JOIN states AS states ON users.state_id = states.id`)

  return results
}

const listById = async (id) => {
  const [results] = await db.query(`SELECT users.username, users.name, users.email, 
  users.created_date, users.updated_date, states.name AS estado 
  FROM users AS users 
  INNER JOIN states AS states ON users.state_id = states.id
  WHERE user.id = ${id}`)

  return results
}

const listByUsername = async (username) => {
  const [results] = await db.query(`SELECT users.username, users.name, users.email, 
  users.created_date, users.updated_date, states.name AS estado 
  FROM users AS users 
  INNER JOIN states AS states ON users.state_id = states.id
  WHERE user.id = ${username}`)

  return results
}

const created = async (body) => {
  const user = await User.build(body)
  await user.save()

  return user
}

const updated = async (id, body) => {
  const user = await User.update(body, { id })

  return user
}

module.exports = { listAll, listById, listByUsername, created, updated }
