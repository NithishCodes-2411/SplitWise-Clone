const express = require('express');
const router = express.Router();


//requirng controllers
const createGroup = require('../controllers/createGroup');

router.post('/createGroup' , createGroup);


module.exports = router;