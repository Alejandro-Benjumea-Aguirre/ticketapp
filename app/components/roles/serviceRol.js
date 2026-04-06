const repositorieRol = require('./repositorieRol')

const listAllRoles = async () => {
  const response = await repositorieRol.listAll()

  if (!response) {
    const error = new Error(`No hay roles creados.`)
    error.statusCode = 404
    throw error
  }

  response.forEach(rol => {
    roles.push({
      name: rol.name,
      description: rol.description,
      estado: rol.estado,
      fecha_cre: rol.created_date,
      fecha_up: rol.updated_date
    })
  })
  return roles
}

const listRol = async (id) => {
  const rol = await repositorieRol.listById(id)
  if (!rol) {
    const error = new Error(`No existe ningun rol con el id ${id}`)
    error.statusCode = 404
    throw error
  }

  return {
    name: rol.name,
    description: rol.description,
    estado: rol.estado,
    fecha_cre: rol.created_date,
    fecha_up: rol.updated_date
  }
}

const listRolPermisions = async (id) => {
  const rolPermisions = await repositorieRol.listByRolPermissions(id)
  if (!rolPermisions) {
    const error = new Error('No hay permisos otorgados para el rol.')
    error.statusCode = 404
    throw error
  }

  const permisos = []
  rolPermisions.forEach(permission => {
    permisos.push({
      rol: permission.rol,
      permiso: permission.permiso,
      estado: permission.estado
    })
  })
  return permisos
}

const createRol = async (body) => {
  const { name } = body
  if (!name) {
    const error = new Error('El nombre del rol es obligatorio.')
    error.statusCode = 404
    throw error
  }

  const rol = {
    name,
    state_id: 1
  }

  const resp = await repositorieRol.created(rol)
  return {
    name: resp.getDataValue('name')
  }
}

const updateRol = async (id, body) => {
  const rol = await repositorieRol.listById(id)
  if (!rol) {
    const error = new Error(`No existe un rol con el id ${id}`)
    error.statusCode = 404
    throw error
  }

  const rolUpdate = await repositorieRol.update(id, body)
  if (!rolUpdate) {
    const error = new Error(`No se pudo modificar el rol con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  return {
    name: rolUpdate.name
  }
}

const inactiveRol = async (id) => {
  const rol = await repositorieRol.listById(id)
  if (!rol) {
    const error = new Error(`No existe un rol con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  const rolInactive = await repositorieRol.remove(id)
  if (!rolInactive) {
    const error = new Error(`No se pudo inactivar el rol con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  return {
    name: rolInactive.name
  }
}

const updateStatus = async (id, status) => {
  const rol = await repositorieRol.listById(id)
  if (!rol) {
    const error = new Error(`No existe un rol con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  const rolChange = await repositorieRol.updateStatus(id, status)
  if (!rolChange) {
    const error = new Error(`No se pudo inactivar el rol con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  return {
    name: rolChange.name
  }
}

module.exports = { 
  listAllRoles, 
  listRol, 
  listRolPermisions, 
  createRol, 
  updateRol, 
  inactiveRol,
  updateStatus
}
