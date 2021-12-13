var express = require('express');
var router = express.Router();
const auth = require('../../middleware/users')

const controller = require('../../controllers/users')

router.post('/register', auth.userRegisterValidation, controller.signUp)

router.post('/', controller.signIn);

router.post('/score', auth.authenticateToken, controller.getScores);

module.exports = router;

// add signup api with validation of email unique in service layer
// Keep passwords encrypted

// Move db calls or logic calls to service or controller layer