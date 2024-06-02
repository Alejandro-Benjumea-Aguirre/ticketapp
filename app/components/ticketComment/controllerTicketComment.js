const response = require('../../helpers/response')
const serviceTicketComment = require('./serviceTicketComment')

const getComments = async (req, res) => {
  try {
    const { ticket_id } = req.params
    const resp = await serviceTicketComment.listAllComments(ticket_id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const getComment = async (req, res) => {
  try {
    const { id } = req.params
    const resp = await serviceTicketComment.listComment(id)
    response.success(req, res, resp, 200)
  } catch (e) {
    response.error(req, res, e, 500)
  }
}

const postComment = async (req, res) => {
  const body = req.body
  const file = req.file
  try {
    const resp = await serviceTicketComment.createComment(body, file)
    response.success(req, res, resp, 200)
  } catch (e) {
    console.log(e)
    response.error(req, res, e, 500)
  }
}

const patchComment = async (req, res) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body

  try {
    const resp = await serviceTicketComment.updateComment(id, body)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

const deleteComment = async (req, res) => {
  const { id } = req.params

  try {
    const resp = await serviceTicketComment.inactiveComment(id)
    response.success(req, res, resp, 200)
  } catch (error) {
    response.error(req, res, 'Hable con el administrador', 500)
  }
}

module.exports = {
  getComments,
  getComment,
  postComment,
  patchComment,
  deleteComment
}
