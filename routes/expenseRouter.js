const express = require('express');
const router = express.Router();


//Requirng controllers
const addExpense = require('../controllers/addExpense');

//add expense router
router.post('/addExpense' , addExpense);


module.exports = router; 

