const express = require('express');
const {
    login,
    newToken
} = require('../controllers/auth');

const { validateJWT } = require('../middleware/index');


const router = express.Router();

router.post('/login', login);

router.post('/renew', validateJWT, newToken);


module.exports = router;