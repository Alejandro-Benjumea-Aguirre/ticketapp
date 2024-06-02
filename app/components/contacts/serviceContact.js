const repositorieContact = require('./repositorieContact')

const listAllContact = async () => {
  const resp = await repositorieContact.listAll()
  const contacts = []
  resp.forEach(contact => {
    contact.push({
      name: contact.contacto,
      telefono: contact.phone,
      email: contact.email,
      estado: contact.estado,
      created_date: contact.created_date,
      type_user: contact.type_user,
      camclientepus: contact.cliente,
      sede: contact.sede
    })
  })
  return contacts
}

const listContact = async (id) => {
  const contact = await repositorieContact.listById(id)
  if (contact) {
    return {
      name: contact.contacto,
      telefono: contact.phone,
      email: contact.email,
      estado: contact.estado,
      created_date: contact.created_date,
      type_user: contact.type_user,
      camclientepus: contact.cliente,
      sede: contact.sede
    }
  } else {
    return `No existe ningun contacto con el id ${id}`
  }
}

const listContactByName = async (name) => {
  const contact = await repositorieContact.listByName(name)
  if (contact) {
    return {
      name: contact.contacto,
      telefono: contact.phone,
      email: contact.email,
      estado: contact.estado,
      created_date: contact.created_date,
      type_user: contact.type_user,
      camclientepus: contact.cliente,
      sede: contact.sede
    }
  } else {
    return `No existe ningun contacto con el nombre ${name}`
  }
}

const createContact = async (body) => {
  const { name, phone, email, clientId, campusId, typeUserId } = body

  const contact = {
    name,
    phone,
    email,
    clientId,
    campusId,
    state_id: 1,
    typeUserId
  }

  const contactCreated = await repositorieContact.created(contact)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'contacts', 
    fieldAffect: `${contact}`,
    dataPrev: `${contact}`, 
    dataNew: `${contactCreated}`, 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora)
  return {
    name: contactCreated.getDataValue('name')
  }
}

const updateContact = async (id, body) => {
  const contact = await repositorieContact.listById(id)

  if (!contact) {
    return `No existe un contacto con el id ${id}`
  }

  const contactUpdated = await repositorieContact.update(id, body)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'contacts', 
    fieldAffect: `${contact}`,
    dataPrev: `${contact}`, 
    dataNew: `${contactUpdated}`, 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora)

  if (cantidad > 0) {
    return {
      name: contactUpdated.name
    }
  } else {
    return `No se pudo modificar el contacto con el id: ${id}`
  }
}

const inactiveContact = async (id) => {
  const contact = await repositorieContact.listById(id)

  if (!contact) {
    return `No existe un contacto con el id: ${id}`
  }

  const contactInactive = await repositorieContact.remove(id)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'contacts', 
    fieldAffect: 'state_id',
    dataPrev: '1', 
    dataNew: '2', 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora)
  if (contactInactive) {
    return {
      name: contactInactive.name
    }
  } else {
    return `No se pudo inactivar el contacto con el id: ${id}`
  }
}

module.exports = { 
  listAllContact, 
  listContact, 
  listContactByName, 
  createContact, 
  updateContact, 
  inactiveContact 
}
