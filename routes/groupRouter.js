const express = require('express');
const router = express.Router();


//requirng controllers
const createGroup = require('../controllers/createGroup');
const viewGroup = require('../controllers/viewGroup');

//createGroup router
router.post('/createGroup' , createGroup);

//view group router
router.post('/viewGroup' , viewGroup);

module.exports = router;