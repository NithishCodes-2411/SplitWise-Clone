import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const WelcomeMessage = () => {
  const navigate = useNavigate();

  const handleViewGroup = () => {
    navigate('/DisplayGroup');
  };

  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.primary.lighter,
        p: 3,
        borderRadius: 5,
        boxShadow: 2,
      }}
    >
      <Box sx={{ boxShadow: 10, p: 5, borderRadius: 5 }}>
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid item lg={6} md={6} xs={12}>
            <Typography variant="h5" pb={2}>
              Hello there, Welcome back!
            </Typography>
            <Typography variant="body2" pb={2}>
              Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way.
            </Typography>
            <Button variant="contained" onClick={handleViewGroup}>
              View Groups
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
