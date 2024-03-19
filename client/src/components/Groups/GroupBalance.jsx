import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Grid from '@mui/material/Grid';

function GroupBalance(props) {

  const groupId = props?.groupId;
  const [data, setData] = useState([]);
  const [noSettleMent , setNoSettleMent] = useState(false);


  useEffect(() => {

    axios
      .post('http://localhost:5000/api/group/groupBalanceSheet', {
        groupId: groupId,
      })
      .then((res) => {
        if(res.data.daaa.length===0){
          setNoSettleMent(true)
        }
        setData(res.data.daaa);
      })
      .catch((err) => {
        console.log(err);
       
      });
  }, [groupId]);

  if(noSettleMent){
    return(
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
                No SettleMents Required 
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
    )
  }

 

  return (
    <Grid container
      p={10}
      spacing={2}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      {data?.map((settlement, index) => (
        <Grid item xs={12} md={6} key={index} style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '25px' }}>
          <Stack direction="row" spacing={2} alignItems="center">

            <Avatar alt="user avatar" />

            <Stack direction="column" spacing={2}>
              <Typography variant="body1"> {settlement[0].split('@')[0]}</Typography>
              <Typography variant="subtitle1">to <span className="recipient-name"> {settlement[1].split('@')[0]}</span></Typography>
            </Stack>

            <Stack direction="column" spacing={2}>
              <Typography variant="body2">Settlement Amount</Typography>
              <Typography variant="body2">₹ {settlement[2]}</Typography>
            </Stack>

            <Button variant="contained" color="primary">
              Settle
            </Button>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default GroupBalance;
