const repositorieTypeUser = require('./repositorieTypeUser')

const listAllTypeUsers = async () => {
  const resp = await repositorieTypeUser.listAll()
  const typeUsers = []
  if(resp.length > 0){
    resp.forEach(typeUser => {
      typeUsers.push({
        name: typeUser.name,
        estado: typeUser.estado
      })
    })
    return typeUsers
  }else{
    return 'No hay tipos de usuario creados.'
  }
  
}

const listTypeUser = async (id) => {
  const typeUser = await repositorieTypeUser.listById(id)
  if (typeUser) {
    return {
      name: typeUser.name,
      estado: typeUser.estado
    }
  } else {
    return `No existe ningun tipo de usuario con el id ${id}`
  }
}

const createTypeUser = async (body) => {
  const { name } = body

  const typeUser = {
    name,
    state_id: 1
  }

  const resp = await repositorieTypeUser.created(typeUser)
  return {
    name: resp.getDataValue('name')
  }
}

const updateTypeUser = async (id, body) => {
  const typeUser = await repositorieTypeUser.listById(id)

  if (!typeUser) {
    return `No existe un tipo de usuario con el id ${id}`
  }

  const typeUserUpdate = await repositorieTypeUser.update(id, body)

  if (typeUserUpdate > 0) {
    return {
      name: typeUserUpdate.name
    }
  } else {
    return `No se pudo modificar el tipo de usuario con el id: ${id}`
  }
}

const inactiveTypeUser = async (id) => {
  const typeUser = await repositorieTypeUser.listById(id)

  if (!typeUser) {
    return `No existe un tipo de usuario con el id: ${id}`
  }

  const typeUserInactive = await repositorieTypeUser.remove(id)

  if (typeUserInactive > 0) {
    return {
      name: typeUserInactive.name
    }
  } else {
    return `No se pudo inactivar el tipo de usuario con el id: ${id}`
  }
}

module.exports = { 
  listAllTypeUsers, 
  listTypeUser, 
  createTypeUser, 
  updateTypeUser, 
  inactiveTypeUser 
}
