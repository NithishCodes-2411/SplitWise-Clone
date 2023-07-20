import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Grid, TextField, Typography } from '@mui/material';
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

  function handleEditExpense  (index) {
    navigate('/Expense', { state: { expenseId: groupExpenses[index]._id, displayWhat: false } })
  }
  function handleViewExpense (index)  {
    navigate('/Expense', { state: { expenseId: groupExpenses[index]._id, displayWhat: true } })
  }


  useEffect(() => {
    if (groupId) {
      axios
        .post('http://localhost:5000/api/expense/viewGroupExpense', {
          groupId: groupId,
        })
        .then((res) => {
          if (res.status === 200) {
            setGroupExpenses(res.data.groupExpense);
          }
        })
        .catch((error) => {
          console.log(error);
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
                  onClick={()=>handleEditExpense(index)} // Call the function onClick
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: '10px', marginTop: '20px' }}
                >
                  <EditIcon />
                </Button>


                <Button onClick={()=>handleViewExpense(index)} variant="outlined" color="primary" style={{ marginRight: '10px', marginTop: '20px' }}>
                  <RemoveRedEyeIcon />
                </Button>
                <Button variant="outlined" color="primary" style={{ marginTop: '20px' }}>
                  <DeleteIcon />
                </Button>
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
