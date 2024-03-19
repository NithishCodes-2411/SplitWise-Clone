import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GroupBalance from './GroupBalance';
import axios from "axios";
import { Button } from '@mui/material';
import { Container, Link } from '@mui/material';
import NavigationMenu from "../Navigation";
import { Paper } from '@mui/material';
import { Card, CardContent, Box, AvatarGroup, Avatar, Stack, Grid } from '@mui/material';
import Groups2Icon from '@mui/icons-material/Groups2';
import GroupExpense from './GroupExpense';
import { Typography } from '@mui/material';
import AddExpense from '../Expense/AddExpense';




const DisplayGroupInfo = () => {

  const location = useLocation();
  
  const [group, setGroup] = useState([]);

  const groupId = location.state?.groupId; // group ID sent while navigation
  const [groupExpense, setGroupExpense] = useState(true);//a boolean to whether or not to diplay the group expense or not.
  const [groupBalance , setGroupBalance] = useState(false);//a boolean to whether or not to diplay the group balance or not.
  const [addExpense , setAddExpense ] = useState(false);//a boolean to whether or not to diplay the add expense page  or not.


  useEffect(() => {
    if (groupId) {
      axios.post('http://localhost:5000/api/group/viewGroup', {
        groupId: groupId
      })
        .then((res) => {
          if (res.status === 200) {
            setGroup(res.data.group);

          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [groupId]);

  if (!group) {
    return (
      <>
        <NavigationMenu />
        <div>Loading group information...</div>
      </>
    );
  }

  const handleGroupExpense = () => {
    setGroupExpense(true);
    setAddExpense(false);
    setGroupBalance(false);
  }
  const handleAddExpense = () => {
    setAddExpense(true);
    setGroupExpense(false)
    setGroupBalance(false);
  }
  const handleGroupBalance = () => {
    setGroupBalance(true);
    setAddExpense(false);
    setGroupExpense(false)

  }

  


  return (
    <>
      <NavigationMenu />
      <br></br>
      <br>
      </br>
      <h1><Groups2Icon />  {group.groupName} <Groups2Icon /></h1>
      <>
        <Container>
          <Paper elevation={3} sx={{
            padding: '1.5rem', borderRadius: 5, "&:hover": {
              //backgroundColor: 'lightgray',
              cursor: 'pointer',
              transform: 'scale(1.05)',
              transition: '0.4s',

            }
          }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                    Owner:
                  </Typography>
                  <Typography variant="body1">{group.groupOwner}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                    Currency:
                  </Typography>
                  <Typography variant="body1">{group.groupCurrency}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                    Catergory:
                  </Typography>
                  <Typography variant="body1">{group.groupCategory}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                    Descrption:
                  </Typography>
                  <Typography variant="body1">{group.groupDescription}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <br></br>

          <Button
            variant="outlined"
            color="primary"
            className={`button-margin ${groupExpense? 'active' : ''}`}
            onClick={handleGroupExpense}
            style={{ marginRight: '40px' }}
          >
            Group Expense
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={`button-margin ${groupBalance ? 'active' : ''}`}
            onClick={handleGroupBalance}
            style={{ marginRight: '40px' }}
          >
            GroupBalance
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={`button-margin ${addExpense ? 'active' : ''}`}
            onClick={handleAddExpense}
            style={{ marginRight: '40px' }}
          >
            Add Expense
           
          </Button>

          {groupExpense && <GroupExpense groupId={groupId} />}
          {groupBalance && <GroupBalance groupId = {groupId}/>}
          {addExpense && <AddExpense Group = {group} groupId={groupId} />}


        </Container>
      </>

    </>
  );
};



export default DisplayGroupInfo;
