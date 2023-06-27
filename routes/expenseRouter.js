const express = require('express');
const router = express.Router();


//Requirng controllers
const addExpense = require('../controllers/addExpense');
const editExpense = require('../controllers/editExpense');
const deleteExpense = require('../controllers/deleteExpense');
const viewExpense =  require('../controllers/viewExpense');
//add expense router.
router.post('/addExpense' , addExpense);

//editExpense router.
router.post('/editExpense' , editExpense);

//deleteExpense router.
router.post('/deleteExpense' , deleteExpense);

//viewExpense router.
router.post('/viewExpense' , viewExpense );




module.exports = router; 

