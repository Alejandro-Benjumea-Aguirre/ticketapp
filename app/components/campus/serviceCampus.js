const repositorieCampus = require('./repositorieCampus')

const listAllCampus = async () => {
  const resp = await repositorieCampus.listAll()

  if(resp.length > 0){
    const campus = []
    resp.forEach(item => {
        campus.push({
        name: item.name,
        url: item.url_alternative,
        cliente: item.cliente,
        estado: item.estado,
        fecha_cre: item.created_date,
        fecha_up: item.updated_date
      })
    })
    return campus
  }else {
    return 'No hay sedes creadas.'
  }
  
}

const listCampus = async (id) => {
  const campus = await repositorieCampus.listById(id)
  if (campus) {
    return {
      name: campus.name,
      url: campus.url_alternative,
      cliente: campus.cliente,
      estado: campus.estado,
      fecha_cre: campus.created_date,
      fecha_up: campus.updated_date
    }
  } else {
    return `No existe ninguna sede con el id ${id}`
  }
}

const listCampusByName = async (name) => {
  const resp = await repositorieCampus.listCampusByName(name)

  if(resp){
    return {
      name: resp.name,
      url: resp.url_alternative,
      cliente: resp.cliente,
      estado: resp.estado,
      fecha_cre: resp.created_date,
      fecha_up: resp.updated_date
    }
  }else {
    return `No hay sedes creadas con el nombre ${name}.`
  }
}

const listCamposByClient = async (client_id) => {
  const resp = await repositorieCampus.listByClient(client_id)

  if(resp.length > 0){
    const campus = []
    resp.forEach(item => {
        campus.push({
        name: item.name,
        url: item.url_alternative,
        cliente: item.cliente,
        estado: item.estado,
        fecha_cre: item.created_date,
        fecha_up: item.updated_date
      })
    })
    return campus
  }else {
    return 'No hay sedes creadas para el cliente.'
  }
}

const createCampus = async (body) => {
  const { name, client_id } = body

  const campus = {
    name,
    client_id,
    state_id: 1
  }

  const resp = await repositorieCampus.created(campus)
  return {
    name: resp.getDataValue('name')
  }
}

const updateCampus = async (id, body) => {
  const campus = await repositorieCampus.listById(id)

  if (!campus) {
    return `No existe una sede con el id ${id}`
  }

  const campusUpdate = await repositorieCampus.update(id, body)

  if (campusUpdate[0] > 0) {
    return {
      name: campusUpdate[1][0].name
    }
  } else {
    return `No se pudo modificar la sede con el id: ${id}`
  }
}

const inactiveCampus = async (id) => {
  const campus = await repositorieCampus.listById(id)

  if (!campus) {
    return `No existe una sede con el id: ${id}`
  }

  const campusRemove = await repositorieCampus.remove(id)

  if (campusRemove[0] > 0) {
    return {
      name: campusRemove[1][0].name
    }
  } else {
    return `No se pudo inactivar la sede con el id: ${id}`
  }
}

module.exports = { 
    listAllCampus, 
    listCampus,
    listCampusByName,
    listCamposByClient, 
    createCampus, 
    updateCampus, 
    inactiveCampus 
}
