const { Router } = require('express')

const controllerTicketComment = require('../components/ticketComment/controllerTicketComment')
const { validateJWT } = require('../middleware/index')
const upload = require('../helpers/uploadFile')
const catchAsync = require('../utils/catchAsync')

const router = Router()

router.get('/:ticket_id', validateJWT, catchAsync(controllerTicketComment.getComments))

router.get('/:id', validateJWT, catchAsync(controllerTicketComment.getComment))

router.post('/', [
    validateJWT,
    upload.array('file', 6)
], catchAsync(controllerTicketComment.postComment))

router.patch('/:id', validateJWT, catchAsync(controllerTicketComment.patchComment))

router.delete('/:id', validateJWT, catchAsync(controllerTicketComment.deleteComment))

module.exports = router
