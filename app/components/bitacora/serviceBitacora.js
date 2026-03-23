const repositorieBitacora = require('./repositorieBitacora')

const listBitacora = async (id) => {
  const bitacora = await repositorieBitacora.listById(id)
  if (bitacora) {
    return {
      evento: bitacora.evento,
      tabla: bitacora.table_affect,
      campo: bitacora.field_affect,
      data_prev: bitacora.data_prev,
      data_new: bitacora.data_new,
      usuario: bitacora.cod_user,
      fecha_cre: bitacora.created_date
    }
  } else {
    return `No existe ninguna bitacora con el id ${id}`
  }
}

const createBitacora = async (body) => {
  const { eventId, tableAffect, fieldAffect, dataPrev, dataNew, username } = body

  const bitacora = {
    eventId,
    tableAffect,
    fieldAffect,
    dataPrev,
    dataNew,
    username
  }

  const resp = await repositorieBitacora.created(bitacora)
  return {
    name: resp.getDataValue('id')
  }
}

module.exports = { listBitacora, createBitacora }
