const repositorieSurvey = require('./repositorieSurvey')

const listAllSurveys = async () => {
  const resp = await repositorieSurvey.listAll()

  if (!resp) {
    return 'No hay encuestas creadas.'
  }
  const surveys = []
  resp.forEach(survey => {
    surveys.push({
      ticket: survey.ticket,
      username: survey.username,
      fecha_envio: survey.date_send,
      fecha_respuesta: survey.date_reply,
      estado: survey.estado,
      nota: survey.num_noti,
      fecha_cre: survey.created_date,
      fecha_up: survey.updated_date
    })
  })
  return surveys
}

const listSurvey = async (id) => {
  const survey = await repositorieSurvey.listById(id)
  if (survey) {
    return {
      ticket: survey.ticket,
      username: survey.usuario,
      fecha_envio: survey.date_send,
      fecha_respuesta: survey.date_reply,
      estado: survey.estado,
      nota: survey.num_noti,
      fecha_cre: survey.created_date,
      fecha_up: survey.updated_date
    }
  } else {
    return `No existe ninguna encuesta con el id ${id}`
  }
}

const listSurveysxClient = async (client_id) => {
  const resp = await repositorieSurvey.listByClient(client_id)
	if (!resp) {
    return 'No hay encuestas creadas.'
  }
  const surveys = []
  resp.forEach(survey => {
    surveys.push({
      ticket: survey.ticket,
      username: survey.usuario,
      fecha_envio: survey.date_send,
      fecha_respuesta: survey.date_reply,
      estado: survey.estado,
      nota: survey.num_noti,
      fecha_cre: survey.created_date,
      fecha_up: survey.updated_date
    })
  })
  return surveys
}

const createSurvey = async (body) => {
  const { ticket_id, user_id } = body

  const survey = {
    ticket_id,
    user_id,
    state_id: 1,
  }

  const resp = await repositorieSurvey.created(survey)
  return {
    ticket: resp.getDataValue('ticket_id'),
    user_id: resp.getDataValue('user_id')
  }
}

const updateSurvey = async (id, body) => {
  const survey = await repositorieSurvey.listById(id)

  if (!survey) {
    return `No existe una encuesta con el id ${id}`
  }

  const surveyUpdate = await repositorieSurvey.update(id, body)

  if (surveyUpdate[0] > 0) {
    return {
      ticket_id: surveyUpdate[1][0].getDataValue('ticket_id'),
      user_id: surveyUpdate[1][0].getDataValue('user_id')
    }
  } else {
    return `No se pudo modificar la encuesta con el id: ${id}`
  }
}

const inactiveSurvey = async (id) => {
  const survey = await repositorieSurvey.listById(id)

  if (!survey) {
    return `No existe una encuesta con el id: ${id}`
  }

  const [cantidad] = await repositorieSurvey.remove(id)

  if (cantidad > 0) {
    return {
      ticket_id: survey.ticket
    }
  } else {
    return `No se pudo inactivar la encuesta con el id: ${id}`
  }
}

module.exports = {
	listAllSurveys,
	listSurvey,
	listSurveysxClient,
	createSurvey,
	updateSurvey,
	inactiveSurvey
}
