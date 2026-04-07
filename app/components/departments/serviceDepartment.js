const repositorieDepartment = require('./repositorieDepartment')

const listAllDepartments = async () => {
  const response = await repositorieDepartment.listAll()

  if (!response) {
    const error = new Error('No hay departamentos creados.')
    error.statusCode = 404
    throw error
  }

  return response.map(dep => ({
    id: dep.id,
    name: dep.name,
    description: dep.description,
    estado: dep.estado,
    created_date: dep.created_date,
    updated_date: dep.updated_date
  }))
}

const listDepartment = async (id) => {
  const department = await repositorieDepartment.listById(id)

  if (!department) {
    const error = new Error(`No existe ningún departamento con el id ${id}`)
    error.statusCode = 404
    throw error
  }

  return {
    id: department.id,
    name: department.name,
    description: department.description,
    estado: department.estado,
    created_date: department.created_date,
    updated_date: department.updated_date
  }
}

const createDepartment = async (body) => {
  const { name } = body

  if (!name) {
    const error = new Error('El nombre del departamento es obligatorio.')
    error.statusCode = 400
    throw error
  }

  const department = {
    name,
    description: body.description || null,
    state_id: 1
  }

  const resp = await repositorieDepartment.created(department)

  return {
    id: resp.getDataValue('id'),
    name: resp.getDataValue('name')
  }
}

const updateDepartment = async (id, body) => {
  const department = await repositorieDepartment.listById(id)

  if (!department) {
    const error = new Error(`No existe un departamento con el id ${id}`)
    error.statusCode = 404
    throw error
  }

  const depUpdate = await repositorieDepartment.update(id, body)

  if (!depUpdate) {
    const error = new Error(`No se pudo modificar el departamento con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  return { name: body.name || department.name }
}

const inactiveDepartment = async (id) => {
  const department = await repositorieDepartment.listById(id)

  if (!department) {
    const error = new Error(`No existe un departamento con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  const depInactive = await repositorieDepartment.remove(id)

  if (!depInactive) {
    const error = new Error(`No se pudo inactivar el departamento con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  return { name: department.name }
}

const updateDepartmentStatus = async (id, status) => {
  const department = await repositorieDepartment.listById(id)

  if (!department) {
    const error = new Error(`No existe un departamento con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  const depChange = await repositorieDepartment.updateStatus(id, status)

  if (!depChange) {
    const error = new Error(`No se pudo actualizar el estado del departamento con el id: ${id}`)
    error.statusCode = 404
    throw error
  }

  return { name: department.name }
}

module.exports = {
  listAllDepartments,
  listDepartment,
  createDepartment,
  updateDepartment,
  inactiveDepartment,
  updateDepartmentStatus
}
