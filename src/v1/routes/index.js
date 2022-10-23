const express = require('express');
const router = express.Router();


router.use('/user',require('./User.routes'))
router.use('/upload',require('./Upload.routes'))
router.use('/search',require('./Search.routes'))

module.exports = router;