const express = require('express');
const router = express.Router();


//Requirng controllers
const addExpense = require('../controllers/addExpense');
const editExpense = require('../controllers/editExpense');
const deleteExpense = require('../controllers/deleteExpense');
const viewExpense = require('../controllers/viewExpense');
const viewGroupExpense = require('../controllers/viewGroupExpense');
const viewUserExpense =  require('../controllers/viewUserExpense');
const groupMonthlyExpense = require('../controllers/groupMonthlyExpense');
const userMonthlyExpense = require('../controllers/userMonthlyExpense');


//add expense router.
router.post('/addExpense', addExpense);

//editExpense router.
router.post('/editExpense', editExpense);

//deleteExpense router.
router.post('/deleteExpense', deleteExpense);

//viewExpense router.
router.post('/viewExpense', viewExpense);

//view Group Expense router
router.post('/viewGroupExpense' , viewGroupExpense);

//viewUSerExpense router
router.post('/viewUserExpense' , viewUserExpense);

//groupMonthlyExpense router
router.post('/groupMonthlyExpense' , groupMonthlyExpense);

//userMonthly Expense router
router.post('/userMonthlyExpense' , userMonthlyExpense);





module.exports = router;

