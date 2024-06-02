const repositoriePermission = require('./repositoriePermission')

const listAllPermissions = async () => {
  const resp = await repositoriePermission.listAll()
  const permissions = []
  resp.forEach(permission => {
    permissions.push({
      name: permission.name,
      telefono: permission.description,
      email: permission.estado,
      created_date: permission.created_date,
      updated_date: permission.updated_date
    })
  })
  return permissions
}

const listPermission = async (id) => {
  const permission = await repositoriePermission.listById(id)
  if (permission) {
    return {
      name: permission.name,
      telefono: permission.description,
      email: permission.estado,
      created_date: permission.created_date,
      updated_date: permission.updated_date
    }
  } else {
    return `No existe ningun permiso con el id ${id}`
  }
}

const createPermission = async (body) => {
  const { name, description } = body

  const permission = {
    name,
    description,
    state_id: 1
  }

  const resp = await repositoriePermission.created(permission)
  return {
    name: resp.getDataValue('name')
  }
}

const updatePermission = async (id, body) => {
  const permission = await repositoriePermission.listById(id)

  if (!permission) {
    return `No existe un permiso con el id ${id}`
  }

  const permisoUpdate = await repositoriePermission.update(id, body)

  if (permisoUpdate > 0) {
    return {
      name: permisoUpdate.name
    }
  } else {
    return `No se pudo modificar el permiso con el id: ${id}`
  }
}

const inactivePermission = async (id) => {
  const permission = await repositoriePermission.listById(id)

  if (!permission) {
    return `No existe un permiso con el id: ${id}`
  }

  const permisoInactive = await repositoriePermission.remove(id)

  if (permisoInactive > 0) {
    return {
      name: permisoInactive.name
    }
  } else {
    return `No se pudo inactivar el permiso con el id: ${id}`
  }
}

module.exports = { 
  listAllPermissions, 
  listPermission, 
  createPermission, 
  updatePermission, 
  inactivePermission 
}
