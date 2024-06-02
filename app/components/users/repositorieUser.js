const { QueryTypes } = require('sequelize')
const modelUser = require('./modelUser')

const db = require('../../../config/postgresql')


const listAll = async () => {
  const [result] = await db.query(`SELECT usr.username, usr.name, usr.email, st.name AS estado, rol.name AS rol, dep.name AS department, 
                                       cam.name AS campus, usr.created_date, usr.updated_date, usr.state_id
                                       FROM users usr 
                                       LEFT JOIN states st ON usr.state_id = st.id 
                                       LEFT JOIN roles rol ON usr.rol_id = rol.id 
                                       LEFT JOIN departments dep ON usr.department_id = dep.id 
                                       LEFT JOIN headquarters cam ON usr.campus_id = cam.id`)

  return result
}

const listById = async (id) => {

  const [result] = await db.query(`SELECT usr.username, usr.name, usr.email, st.name AS status, rol.name AS rol, dep.name AS department, 
                                      cam.name AS campus, usr.created_date, usr.updated_date, usr.state_id
                                      FROM users usr 
                                      LEFT JOIN states st ON usr.state_id = st.id 
                                      LEFT JOIN roles rol ON usr.rol_id = rol.id 
                                      LEFT JOIN departments dep ON usr.department_id = dep.id 
                                      LEFT JOIN headquarters cam ON usr.campus_id = cam.id
                                      WHERE usr.id = ${id}`)

  return result[0]
}

const listByUsername = async (username) => {

  const [result] = await db.query(`SELECT usr.id AS uid, usr.username, usr.password, usr.name, usr.email, st.name AS status, rol.name AS rol, dep.name AS department, 
                                      cam.name AS campus, usr.created_date, usr.updated_date, usr.state_id
                                      FROM users usr 
                                      LEFT JOIN states st ON usr.state_id = st.id 
                                      LEFT JOIN roles rol ON usr.rol_id = rol.id 
                                      LEFT JOIN departments dep ON usr.department_id = dep.id 
                                      LEFT JOIN headquarters cam ON usr.campus_id = cam.id
                                      WHERE usr.username like '${username}'`)

  return result[0]
}

const created = async (body) => {
  const user = modelUser.build(body)
  await user.save()
  return user
}

const update = async (id, body) => {
  const user = await modelUser.update(body, { where: { id }, returning: true, })

  return user
}

const remove = async (id) => {
  const user = await modelUser.update({ state_id: '2' }, { where: { id }, returning: true, })

  return user
}

const sendToken = async (token, userId) => {
  const [result] = await db.query(`INSERT rec_pass INTO (user_id, token, created_at) VALUES (${userId}, ${token}, NOW())`)

  return result
}

const compareToken = async (token, userId, time) => {
  const [result] = await db.query(`SELECT token 
                                   FROM rec_pass 
                                   WHERE token = ${token} AND user_id = ${userId} 
                                   AND extract(year from fecha_cre) = extract(year from NOW())
                                   AND extract(month from fecha_cre) = extract(month from NOW())
                                   AND extract(hour from fecha_cre) = extract(hour from NOW())
                                   AND (extract(minute from NOW()) - extract(minute from fecha_cre)) < ${time}`)

  return result
}

module.exports = { 
  listAll, 
  listById, 
  listByUsername, 
  created, 
  update, 
  remove, 
  sendToken, 
  compareToken 
}
