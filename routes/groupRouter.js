const express = require('express');
const router = express.Router();


//requirng controllers
const createGroup = require('../controllers/createGroup');
const viewGroup = require('../controllers/viewGroup');
const findUserGroup = require('../controllers/findUserGroup');
const editGroup = require('../controllers/editGroup');
const deleteGroup = require('../controllers/deleteGroup');

//createGroup router
router.post('/createGroup' , createGroup);

//view group router
router.post('/viewGroup' , viewGroup);

//findUserGroup router
router.post('/findUserGroup' , findUserGroup);

//editUser router
router.post('/editGroup' , editGroup);

//deleteGroup router
router.post('/deleteGroup' , deleteGroup);


module.exports = router;