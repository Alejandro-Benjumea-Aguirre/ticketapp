const response = require('../../helpers/response')
const serviceTicketComment = require('./serviceTicketComment')

const getComments = async (req, res, next) => {
  const { ticket_id } = req.params
  const resp = await serviceTicketComment.listAllComments(ticket_id)
  response.success(req, res, resp, 200)
}

const getComment = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceTicketComment.listComment(id)
  response.success(req, res, resp, 200)
}

const postComment = async (req, res, next) => {
  const body = req.body
  const file = req.file
  const resp = await serviceTicketComment.createComment(body, file)
  response.success(req, res, resp, 200)
}

const patchComment = async (req, res, next) => {
  const { id } = req.params
  const { id: uid, ...body } = req.body
  const resp = await serviceTicketComment.updateComment(id, body)
  response.success(req, res, resp, 200)
}

const deleteComment = async (req, res, next) => {
  const { id } = req.params
  const resp = await serviceTicketComment.inactiveComment(id)
  response.success(req, res, resp, 200)
}

module.exports = {
  getComments,
  getComment,
  postComment,
  patchComment,
  deleteComment
}
