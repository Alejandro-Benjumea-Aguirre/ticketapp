const repositoriePreform = require('./repositoriePreforms')

const listAllPreforms = async () => {
  const resp = await repositoriePreform.listAll()
  const preforms = []
  if(resp.length > 0){
    resp.forEach(preform => {
      preforms.push({
        titulo: preform.title,
        description: preform.description,
        estado: preform.estado,
        suceso: preform.suceso,
        created_date: preform.created_date,
        updated_date: preform.updated_date
      })
    })
    return preforms
  }else{
    return 'No hay preformas creadas.'
  }
}

const listAllPreformsxSucesos = async (suceso) => {
  const resp = await repositoriePreform.listBySuceso(suceso)
  const preforms = []
  if(resp.length > 0){
    resp.forEach(preform => {
      preforms.push({
        titulo: preform.title,
        description: preform.description,
        estado: preform.estado,
        suceso: preform.suceso,
        created_date: preform.created_date,
        updated_date: preform.updated_date
      })
    })

    return preforms
  }else{
    return 'No hay preformas para el suceso seleccionado.'
  }
}

const listPreform = async (id) => {
  const preform = await repositoriePreform.listById(id)
  if (preform) {
    return {
      name: preform.title,
      description: preform.description,
      estado: preform.estado,
      suceso: preform.suceso,
      created_date: preform.created_date,
      updated_date: preform.updated_date
    }
  } else {
    return `No existe ninguna preforma con el id ${id}`
  }
}

const createPreform = async (body) => {
  const { title, description, suceso_id } = body

  const preform = {
    title,
    description,
    state_id: 1,
    suceso_id
  }

  const preformCreated = await repositoriePreform.created(preform)
  if(preformCreated.length > 0){
    const bodyBitacora = {
      eventId: 'por definir', 
      tableAffect: 'preforms', 
      fieldAffect: `${preform}`,
      dataPrev: '', 
      dataNew: `${preform}`, 
      username: ''
    }
    const bitacora = await serviceBitacora.createBitacora(bodyBitacora);
    return {
      name: preformCreated.getDataValue('title')
    }
  } else {
    return 'Se presento algun problema al momento de guardar intentalo de nuevo.'
  }
  
}

const updatePreform = async (id, body) => {
  const preform = await repositoriePreform.listById(id)

  if (!preform) {
    return `No existe una preforma con el id ${id}`
  }

  const preformUpdated = await repositoriePreform.update(id, body)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'preforms', 
    fieldAffect: `${preform}`,
    dataPrev: `${preform}`, 
    dataNew: `${preformUpdated}`, 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora);

  if (preformUpdated > 0) {
    return {
      name: preformUpdated.title
    }
  } else {
    return `No se pudo modificar la preforma con el id: ${id}`
  }
}

const inactivePreform = async (id) => {
  const preform = await repositoriePreform.listById(id)

  if (!preform) {
    return `No existe una preforma con el id: ${id}`
  }

  const preformInactive = await repositoriePreform.remove(id)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'preforms', 
    fieldAffect: 'state_id',
    dataPrev: '1', 
    dataNew: '2', 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora);

  if (preformInactive > 0) {
    return {
      name: preformInactive.title
    }
  } else {
    return `No se pudo inactivar la preforma con el id: ${id}`
  }
}

module.exports = { listAllPreforms, listAllPreformsxSucesos, listPreform, createPreform, updatePreform, inactivePreform }
