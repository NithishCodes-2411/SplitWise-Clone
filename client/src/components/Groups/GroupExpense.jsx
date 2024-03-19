import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, SubTitle, BarController } from 'chart.js';
import 'chartjs-plugin-datalabels';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
Chart.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, SubTitle, BarController);

function GroupExpense(props) {

  const navigate = useNavigate();
  const groupId = props.groupId;
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [noExpenseMessage, setNoExpenseMessgae] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleEditExpense(index) {
    navigate('/Expense', { state: { expenseId: groupExpenses[index]._id, displayWhat: false } })
  }
  function handleViewExpense(index) {
    navigate('/Expense', { state: { expenseId: groupExpenses[index]._id, displayWhat: true } })
  }

  function handleDeleteExpense(index) {
    try {
      let expId = groupExpenses[index]._id
      console.log(expId)
      axios
        .post('http://localhost:5000/api/expense/deleteExpense', {
          expenseId: expId
        })
        .then((res) => {
          if (res.status === 200) {
            handleClose()
            window.location.reload()
            //alert("Expense Deleted Successfully")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    catch (error) {

    }
  }


  useEffect(() => {
    if (groupId) {
      axios
        .post('http://localhost:5000/api/expense/viewGroupExpense', {
          groupId: groupId,
        })
        .then((res) => {
          if (res.status === 200) {
            setNoExpenseMessgae(false)
            setGroupExpenses(res.data.groupExpense);
          }
        })
        .catch((error) => {
          //console.log(error);
        
            setNoExpenseMessgae(true);
      
        });
    }
  }, [groupId]);

  let expenseLables = new Array();
  let expenseData = new Array();
  for (let i = 0; groupExpenses.length !== 0 && i < groupExpenses.length; i++) {
    expenseLables[i] = groupExpenses[i].expenseName;
    expenseData[i] = groupExpenses[i].expenseAmount;
  }

  const chartData = {
    labels: expenseLables,
    datasets: [
      {
        data: expenseData,
        backgroundColor: ['lightgrey', 'lightblue', 'lightpink'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    legend: {
      position: 'bottom',
    },
    tooltips: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'My Doughnut Chart',
    },
  };

  if (noExpenseMessage) {


    return (
      <>
        <Grid container justifyContent="center" alignItems="center" paddingTop={10}>
          <Grid item xs={6}>
            <Grid
              container
              sx={{
               
                padding: '1.5rem',
                borderRadius: 15,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  padding: '0.5rem',
                  borderRadius: 15,
                  backgroundColor: 'white',
                  textAlign: 'center', // Center the text
                }}
              >
                <Typography variant="subtitle1" sx={{  fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'underline' }}>
                  No Expense found
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
    
   
  }

  return (
    <>
      <Grid container spacing={2} paddingTop={10}>


        <Grid item xs={6}>
          {groupExpenses.map((expense, index) => (
            <Grid
              container
              key={index}
              sx={{
                backgroundColor: 'lightgray',
                padding: '1.5rem',
                borderRadius: 15,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
                '&:hover': {
                  backgroundColor: 'lightblue',
                  cursor: 'pointer',
                  transform: 'scale(1.05)',
                  transition: '0.4s',
                },
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  padding: '0.5rem',
                  borderRadius: 15,
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="subtitle1">
                  <b>Expense Name: </b>
                  {expense.expenseName}
                </Typography>
                <Typography variant="body1">
                  <b>Date : </b>
                  {new Date(expense.expenseDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                  ,
                  <b> Expense Amount : </b>
                  {expense.expenseAmount}
                </Typography>
                <Button
                  onClick={() => handleEditExpense(index)} // Call the function onClick
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: '10px', marginTop: '20px' }}
                >
                  <EditIcon />
                </Button>


                <Button onClick={() => handleViewExpense(index)} variant="outlined" color="primary" style={{ marginRight: '10px', marginTop: '20px' }}>
                  <RemoveRedEyeIcon />
                </Button>
                <Button onClick={handleClickOpen} variant="outlined" color="primary" style={{ marginTop: '20px' }}>
                  <DeleteIcon />
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this expense
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleClose}>Disagree</Button>
                    <Button onClick={() => handleDeleteExpense(index)} autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Doughnut options={chartOptions} data={chartData} />
        </Grid>
      </Grid>
    </>
  );
}



export default GroupExpense;
