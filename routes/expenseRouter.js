const express = require('express');
const router = express.Router();


//Requirng controllers
const addExpense = require('../controllers/addExpense');
const editExpense = require('../controllers/editExpense')

//add expense router
router.post('/addExpense' , addExpense);

//editExpense router.
router.post('/editExpense' , editExpense);


module.exports = router; 

