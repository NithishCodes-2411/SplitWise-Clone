import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, FormControl, InputLabel, OutlinedInput, Select, Box, Chip, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import axios from 'axios';




const AddExpense = (props) => {
 
  const clearExpenseData = () => {
    setExpenseData({
      expenseName: '',
      expenseDescription: '',
      expenseOwner: '',
      expenseMembers: [],
      expenseDate: '',
      expenseCurrency: '',
      expenseAmount: '',
      expenseCategory: '',
    });
  };
  

  const [error, setError] = useState('');
  const [success , setSuccess] = useState('');
  const group = props.Group;
  const groupMembers = group?.groupMembers;



  const [expenseData, setExpenseData ] = useState({
    groupId : props.groupId ,
    expenseName: '',
    expenseDescription: '',
    expenseOwner: '',
    expenseMembers: [],
    expenseDate: '',
    expenseCurrency: '',
    expenseAmount: '',
    expenseCategory: '',
  });


  // Define the Yup validation schema
  const validationSchema = Yup.object({
    expenseName: Yup.string().required('Expense Name is required'),
    expenseDescription: Yup.string().required('Expense Description is required'),
    expenseOwner: Yup.string().required('Expense Owner is required'),
    expenseMembers: Yup.array().min(1, 'Select at least one Expense Member'),
    expenseDate: Yup.date().required('Expense Date is required'),
    expenseCurrency: Yup.string().required('Expense Currency is required'),
    expenseAmount: Yup.number().required('Expense Amount is required').positive('Expense Amount must be positive'),
    expenseCategory: Yup.string().required('Expense Category is required'),
  });

  // Initialize Formik with validation schema
  const formik = useFormik({
    initialValues: {},
    onSubmit: async(values) => {
     
      await validationSchema
        .validate(expenseData, { abortEarly: false })
        .then((validData) => {
          // Validation passed
          setError('');

          //console.log('Form Values:', validData);
          const makeAPICall = addExpenseAPI(validData)
          if(makeAPICall){
            //setExpenseData(initialExpenseData);
            setSuccess("Expense added succesfully")
            clearExpenseData();
            setTimeout(() => {
              setError('')
              setSuccess(''); // Clear the success message after a 3-second delay
            }, 3000);
          }
          else{
            setError("Oops Something went wrong")
          }
        })
        .catch((errors) => {
          //validation failed
          const errorMessages = errors.inner.map((error) => error.message);
          setError(errorMessages.join('\n'));
        });
    },
  });

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250,
      },
    },
  };

  return (
    <div className="container">
      <Grid sx={{ marginTop: 5 }}>
        <div className="add-expense-form">
          <TextField
            fullWidth
            label="Expense Name"
            variant="outlined"
            sx={{ marginBottom: '1rem' }}
            value={expenseData.expenseName}
            onChange={(e) => setExpenseData({ ...expenseData, expenseName: e.target.value })}
          />
          <TextField
            fullWidth
            label="Expense Description"
            variant="outlined"
            sx={{ marginBottom: '1rem' }}
            value={expenseData.expenseDescription}
            onChange={(e) => setExpenseData({ ...expenseData, expenseDescription: e.target.value })}
          />

          <TextField
            id="expenseOwner"
            select
            label="Expense Owner"
            defaultValue=""
            helperText="Required"
            variant="outlined"
            sx={{ marginBottom: '1rem', width: '100%' }}
            value={expenseData.expenseOwner}
            onChange={(e) => setExpenseData({ ...expenseData, expenseOwner: e.target.value })}
          >
            {groupMembers && groupMembers.length > 0 && groupMembers.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <FormControl sx={{ width: '100%', marginBottom: '1rem' }} error={Boolean(formik.touched.expenseMembers && formik.errors.expenseMembers)}>
            <InputLabel id="expense-members-label">Expense Members</InputLabel>
            <Select
              labelId="expense-members-label"
              id="expense-members"
              multiple
              value={expenseData.expenseMembers}
              onChange={(e) => setExpenseData({ ...expenseData, expenseMembers: e.target.value })}
              input={<OutlinedInput id="expense-members" label="Expense Members" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {groupMembers?.map((member) => (
                <MenuItem key={member} value={member}>
                  {member}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formik.touched.expenseMembers && formik.errors.expenseMembers}</FormHelperText>
          </FormControl>

          <TextField
            fullWidth
            id="expenseDate"
            label="Expense Date"
            type="date"
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            sx={{ marginBottom: '1rem', width: '100%' }}
            value={expenseData.expenseDate}
            onChange={(e) => setExpenseData({ ...expenseData, expenseDate: e.target.value })}
          />

          <TextField
            id="expenseCurrency"
            select
            label="Expense Currency"
            defaultValue=""
            variant="outlined"
            sx={{ marginBottom: '1rem', width: '100%' }}
            value={expenseData.expenseCurrency}
            onChange={(e) => setExpenseData({ ...expenseData, expenseCurrency: e.target.value })}
          >
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
          </TextField>

          <TextField
            fullWidth
            id="expenseAmount"
            label="Expense amount"
            multiline
            maxRows={4}
            sx={{ marginBottom: '1rem' }}
            value={expenseData.expenseAmount}
            onChange={(e) => setExpenseData({ ...expenseData, expenseAmount: e.target.value })}
          />

          <TextField
            fullWidth
            id="expenseCategory"
            select
            label="Expense Category"
            variant="outlined"
            sx={{ marginBottom: '1rem', width: '100%' }}
            value={expenseData.expenseCategory}
            onChange={(e) => setExpenseData({ ...expenseData, expenseCategory: e.target.value })}
          >
            <MenuItem value="Food & Drink">Food & Drink</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Home">Home</MenuItem>
            <MenuItem value="Transportation">Transportation</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <Button variant="contained" onClick={formik.handleSubmit} sx={{ marginTop: '1rem', backgroundColor: '#3f51b5', color: '#fff' }}>
            Add Expense
          </Button>

          {error && (
            <Box sx={{ color: 'red', marginTop: '1rem' }}>
              {error}
            </Box>
          )}
             {success && (
            <Box sx={{ color: 'green', marginTop: '1rem' }}>
              {success}
            </Box>
          )}
        </div>
      </Grid>
    </div>
  );
};


async function addExpenseAPI (data) {

  if(data){
    try{
      axios.post('http://localhost:5000/api/expense/addExpense', {
        data
            })
                .then((res) => {
                  console.log(res.status)
                      return true; 
                })
                .catch((error) => {
                    console.log(error);
                    return false 
                });
    }
    catch(err){
      console.log(err)
    }
  }
  return false;
}

export default AddExpense;
