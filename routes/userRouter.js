const express = require('express');
const router = express.Router();

//Controllers import 
const userRegister = require('../controllers/userRegistration');
const login = require('../controllers/login');


// userRegistration router
router.post('/register', userRegister);

//userLogin router
router.post('/login' , login);



module.exports = router; 

