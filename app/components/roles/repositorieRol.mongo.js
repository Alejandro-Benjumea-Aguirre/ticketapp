const mongoose = require('mongoose')
const { withGetDataValue } = require('../../helpers/mongoHelper')

const rolSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  state_id:    { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const rolPermissionSchema = new mongoose.Schema({
  rol_id:        { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
  permission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'permissions' },
  state_id:      { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } })

const RolMongo           = mongoose.models.roles           || mongoose.model('roles', rolSchema)
const RolPermissionMongo = mongoose.models.rol_permissions || mongoose.model('rol_permissions', rolPermissionSchema)

const _map = (r) => ({
  id:           r._id.toString(),
  name:         r.name,
  description:  r.description,
  estado:       r.state_id === 1 ? 'activo' : 'inactivo',
  created_date: r.created_date,
  updated_date: r.updated_date
})

const listAll = async () => {
  const docs = await RolMongo.find().lean()
  return docs.map(_map)
}

const listById = async (id) => {
  const doc = await RolMongo.findById(id).lean()
  return doc ? _map(doc) : null
}

const listByName = async (name) => {
  const doc = await RolMongo.findOne({ name: new RegExp(name, 'i') }).lean()
  return doc ? _map(doc) : null
}

const listByRolPermissions = async (id) => {
  const docs = await RolPermissionMongo.find({ rol_id: id })
    .populate('rol_id', 'name')
    .populate('permission_id', 'name')
    .lean()
  return docs.map(p => ({
    rol:    p.rol_id?.name,
    permiso: p.permission_id?.name,
    estado: p.state_id === 1 ? 'activo' : 'inactivo'
  }))
}

const created = async (body) => {
  const doc = await RolMongo.create(body)
  return withGetDataValue(doc)
}

const update = async (id, body) => {
  const result = await RolMongo.updateOne({ _id: id }, { $set: body })
  return result.modifiedCount
}

const remove = async (id) => {
  const result = await RolMongo.updateOne({ _id: id }, { $set: { state_id: 2 } })
  return result.modifiedCount
}

module.exports = { listAll, listById, listByName, listByRolPermissions, created, update, remove }
