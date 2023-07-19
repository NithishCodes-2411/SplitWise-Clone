import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Button } from '@mui/material';
import { Button, Grid, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, SubTitle, BarController } from 'chart.js';
import 'chartjs-plugin-datalabels';
Chart.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, SubTitle, BarController);
//Chart.register(ChartDataLabels);
// Chart.register(Chart.ArcElement, Chart.Plugins.ChartDataLabels);




function GroupExpense(props) {


  const groupId = props.groupId;
  const [groupExpenses, setGroupExpenses] = useState([]);



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

  //Data for the chart.
  let expenseLables = new Array();
  let expenseData = new Array();
  for (let i = 0; groupExpenses.length != 0 && i < groupExpenses.length; i++) {
    expenseLables[i] = groupExpenses[i].expenseName;
    expenseData[i] = groupExpenses[i].expenseAmount
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

  //options for the chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        // Additional tooltip configuration options
      },
    },
    legend: {
      position: 'bottom',
      // Additional legend configuration options
    },
    tooltips: {
      enabled: true,
      // Additional tooltip configuration options
    },
    title: {
      display: true,
      text: 'My Doughnut Chart',
      // Additional title configuration options
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
                "&:hover": {
                  backgroundColor: 'lightblue',
                  cursor: 'pointer',
                  transform: 'scale(1.05)',
                  transition: '0.4s',
                  //onClick :handleOnClick(index)
                }


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
                  <b>Expense Name: </b>{expense.expenseName}
                </Typography>
                <Typography variant="body1">
                  <b>Date : </b>
                  {new Date(expense.expenseDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })} ,
                  <b>  Expense Amount : </b>{expense.expenseAmount}
                </Typography>
                <Button variant="contained"  >
                  View Groups
                </Button>
              </Grid>

            </Grid>

          ))}
        </Grid>
        <Grid item xs={6} >
          <Doughnut
            options={chartOptions}
            data={chartData}

          />
        </Grid>
      </Grid>
    </>
  );

}
export default GroupExpense;
