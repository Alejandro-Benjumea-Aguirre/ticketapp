const repositorieCustomer = require('./repositorieCustomer')

const listAllCustomers = async () => {
  const resp = await repositorieCustomer.listAll()
  const customers = []
  resp.forEach(customer => {
    customers.push({
      name: customer.name,
      estado: customer.estado,
      fecha_cre: customer.created_date,
      fecha_up: customer.updated_date
    })
  })
  return customers
}

const listCustomer = async (id) => {
  const customer = await repositorieCustomer.listById(id)
  if (customer) {
    return {
      name: customer.name,
      estado: customer.estado,
      fecha_cre: customer.created_date,
      fecha_up: customer.updated_date
    }
  } else {
    return `No existe ningun cliente con el id ${id}`
  }
}

const listCustomerByName = async (name) => {
  const customer = await repositorieCustomer.listByName(name)
  if(customer) {
    return{
      name: customer.name,
      estado: customer.estado,
      fecha_cre: customer.created_date,
      fecha_up: customer.updated_date
    }
  }else {
    return `No existe ningun cliente con el nombre ${name}`
  }
}

const createCustomer = async (body) => {
  const { name } = body

  const customer = {
    name,
    stated_id: 1
  }

  const customerCreate = await repositorieCustomer.created(contact)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'customers', 
    fieldAffect: `${customer}`,
    dataPrev: `${customer}`, 
    dataNew: `${customerCreate}`, 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora)
  return {
    name: customerCreate.getDataValue('name')
  }
}

const updateCustomer = async (id, body) => {
  const customer = await repositorieCustomer.listById(id)

  if (!customer) {
    return `No existe un cliente con el id ${id}`
  }

  const customerUpdated = await repositorieCustomer.update(id, body)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'customers', 
    fieldAffect: `${customer}`,
    dataPrev: `${customer}`, 
    dataNew: `${customerUpdated}`, 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora)

  if (customerUpdated > 0) {
    return {
      name: customerUpdated.name
    }
  } else {
    return `No se pudo modificar el cliente con el id: ${id}`
  }
}

const inactiveCustomer = async (id) => {
  const customer = await repositorieCustomer.listById(id)

  if (!customer) {
    return `No existe un cliente con el id: ${id}`
  }

  const customerInactive = await repositorieCustomer.remove(id)
  const bodyBitacora = {
    eventId: 'por definir', 
    tableAffect: 'customers', 
    fieldAffect: 'state_id',
    dataPrev: '1', 
    dataNew: '2', 
    username: ''
  }
  const bitacora = await serviceBitacora.createBitacora(bodyBitacora)
  if (customerInactive > 0) {
    return {
      name: customerInactive.name
    }
  } else {
    return `No se pudo inactivar el cliente con el id: ${id}`
  }
}

module.exports = { listAllCustomers, listCustomer, listCustomerByName, createCustomer, updateCustomer, inactiveCustomer }
