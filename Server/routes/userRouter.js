const express = require('express');
const router = express.Router();

//requring controllers  
const userRegister = require('../controllers/userRegistration');
const login = require('../controllers/login');
const resetPassword = require('../controllers/resetPassword');
const viewUser = require('../controllers/viewUser');
const deleteUser = require('../controllers/deleteUser');
const editUser = require('../controllers/editUser');

//requring helpers
const validateToken = require('../helpers/validateToken');
const validateUser = require('../helpers/validateUser');



// userRegistration router
router.post('/register', userRegister);

//userLogin router
router.post('/login', login);

//reset password router.
router.post('/resetPassword', resetPassword);

//view user router
router.post('/viewUser', viewUser);

//delete user router
router.post('/deleteUser', deleteUser);

//edit user router
router.post('/editUser', editUser);





module.exports = router;

