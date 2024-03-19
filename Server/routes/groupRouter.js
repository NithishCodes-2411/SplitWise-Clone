const express = require('express');
const router = express.Router();


//requirng controllers
const createGroup = require('../controllers/createGroup');
const viewGroup = require('../controllers/viewGroup');
const findUserGroup = require('../controllers/findUserGroup');
const editGroup = require('../controllers/editGroup');
const deleteGroup = require('../controllers/deleteGroup');
const makeSettlement = require('../controllers/makeSettlement');
const groupBalanceSheet = require('../controllers/groupBalanceSheet');
const removeGroupMember = require('../controllers/removeGroupMember');
const addGroupMember = require('../controllers/addGroupMember');

//createGroup router
router.post('/createGroup', createGroup);

//view group router
router.post('/viewGroup', viewGroup);

//findUserGroup router
router.post('/findUserGroup', findUserGroup);

//editUser router
router.post('/editGroup', editGroup);

//deleteGroup router
router.post('/deleteGroup', deleteGroup);

//makeSettlement router
router.post('/makeSettlement', makeSettlement);

//groupSettlement router
router.post('/groupBalanceSheet', groupBalanceSheet);

//removeGroupmember router
router.post('/removeGroupMember', removeGroupMember);

//addGroupMemeber router
router.post('/addGroupMember', addGroupMember);


module.exports = router;