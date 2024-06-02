const { Router } = require('express')
// const { check } = require('express-validator')

const controllerTicketComment = require('../components/ticketComment/controllerTicketComment')
const { validateJWT } = require('../middleware/index')
const upload = require('../helpers/uploadFile')

const router = Router()

router.get('/:ticket_id', validateJWT, controllerTicketComment.getComments)

router.get('/:id', validateJWT, controllerTicketComment.getComment)

router.post('/', [
    validateJWT,
    upload.array('file', 6)
], controllerTicketComment.postComment)

router.patch('/:id', validateJWT, controllerTicketComment.patchComment)

router.delete('/:id', validateJWT, controllerTicketComment.deleteComment)

module.exports = router
