var express = require('express');
var router = express.Router();
const app = express();
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hey there');
});

module.exports = router;
