import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from "axios";
import { Button } from '@mui/material';
import { Container, Link } from '@mui/material';
import NavigationMenu from "../Navigation";
import { Paper } from '@mui/material';
import { Card, CardContent, Box, AvatarGroup, Avatar, Stack, Grid } from '@mui/material';
import Groups2Icon from '@mui/icons-material/Groups2';
import Nav from 'react-bootstrap/Nav';
import GroupExpense from './GroupExpense';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';



const DisplayGroupInfo = () => {


  const [group, setGroup] = useState(null);
  const location = useLocation();
  const groupId = location.state?.groupId;
  const [groupExpense, setGroupExpense] = useState(false);

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

  const handleGroupExpense = (e) => {
    setGroupExpense(true)
    // the other two are false
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
            padding: '1.5rem', borderRadius: 15, "&:hover": {
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
            //className={`button-margin ${changePassword ? 'active' : ''}`}
            //onClick={handleChangePassword}
            style={{ marginRight: '40px' }}
          >
            GroupBalance
          </Button>
          <Button
            variant="outlined"
            color="primary"
           // className={`button-margin ${editProfile ? 'active' : ''}`}
            //onClick={handleEditProfile}
            style={{ marginRight: '40px' }}
          >
            Your split
           
          </Button>




          {groupExpense && <GroupExpense groupId={groupId} />}


        </Container>
      </>

    </>
  );
};


/*function findOwnerName (email){
  //console.log(emailId + "   kjsbckjbscbdcb")


    axios.post("http://localhost:5000/api/user/viewUser", {
      emailId: email
    })
      .then((res) => {
        //console.log(res.data.data.firstN)
        return res.data.data.firstName
        })
      
      .catch(err => {
        console.log(err);
        return
      });
  
 
  return ;

}*/


export default DisplayGroupInfo;
