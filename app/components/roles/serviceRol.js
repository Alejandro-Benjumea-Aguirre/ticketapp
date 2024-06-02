const repositorieRol = require('./repositorieRol')

const listAllRoles = async () => {
  const resp = await repositorieRol.listAll()

  if(resp.length > 0){
    const roles = []
    resp.forEach(rol => {
      roles.push({
        name: rol.name,
        description: rol.description,
        estado: rol.estado,
        fecha_cre: rol.created_date,
        fecha_up: rol.updated_date
      })
    })
    return roles
  }else {
    return 'No hay roles creados.'
  }
  
}

const listRol = async (id) => {
  const rol = await repositorieRol.listById(id)
  if (rol) {
    return {
      name: rol.name,
      description: rol.description,
      estado: rol.estado,
      fecha_cre: rol.created_date,
      fecha_up: rol.updated_date
    }
  } else {
    return `No existe ningun rol con el id ${id}`
  }
}

const listRolPermisions = async (id) => {
  const rolPermisions = await repositorieRol.listByRolPermissions(id)

  const permisos = []
  if(rolPermisions.length > 0){
    rolPermisions.forEach(permission => {
      permisos.push({
        rol: permission.rol,
        permiso: permission.permiso,
        estado: permission.estado
      })
    })
    return permisos
  }else{
    return 'No hay permisos otorgados para el rol.'
  }

}

const createRol = async (body) => {
  const { name } = body

  const rol = {
    name,
    estado: rol.estado
  }

  const resp = await repositorieRol.created(rol)
  return {
    name: resp.getDataValue('name')
  }
}

const updateRol = async (id, body) => {
  const rol = await repositorieRol.listById(id)

  if (!rol) {
    return `No existe un rol con el id ${id}`
  }

  const rolUpdate = await repositorieRol.update(id, body)

  if (rolUpdate > 0) {
    return {
      name: rolUpdate.name
    }
  } else {
    return `No se pudo modificar el rol con el id: ${id}`
  }
}

const inactiveRol = async (id) => {
  const rol = await repositorieRol.listById(id)

  if (!rol) {
    return `No existe un rol con el id: ${id}`
  }

  const rolInactive = await repositorieRol.remove(id)

  if (rolInactive > 0) {
    return {
      name: rolInactive.name
    }
  } else {
    return `No se pudo inactivar el rol con el id: ${id}`
  }
}

module.exports = { 
  listAllRoles, 
  listRol, 
  listRolPermisions, 
  createRol, 
  updateRol, 
  inactiveRol 
}
