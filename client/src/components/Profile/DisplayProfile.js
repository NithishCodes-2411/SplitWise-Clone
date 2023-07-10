import { useState } from "react";
import axios, { Axios } from 'axios';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Button from 'react-bootstrap/Button'


const DisplayProfile = () => {


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const emailId = localStorage.getItem('userEmail');
  console.log(emailId + " accounts");

  if (!emailId.length == 0) {
    try {
      axios.post("http://localhost:5000/api/user/viewUser", {
        emailId: emailId
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(JSON.stringify(res.data.data) + "accounts"
            );
            setFirstName(res.data.data.firstName);
            setLastName(res.data.data.lastName);
            setEmail(res.data.data.emailId);
          }
        })
        .catch(err => {
          console.log(err + "errr");
        });
    } catch (error) {
      console.log(error);
    }
  }
  else {
    //console.log("Email to get Data from backend is not returned properly from the local storage.")
  }


  const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: '#E0E3E7',
      borderWidth: 1,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 4,
      padding: '4px !important', // override inline-style
    },
  });


  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (

    <>
      <div style={{ display: 'flex', flexDirection: 'column', color: "black" }}>


        <ValidationTextField
          label="First Name"
          required
          variant="outlined"
          defaultValue="Success"
          id="validation-outlined-input"
          disabled
          value={firstName}
        />
        <br></br>
        <br></br>

        <ValidationTextField
          label="Last Name"
          required
          variant="outlined"
          defaultValue="Success"
          id="validation-outlined-input"
          disabled
          value={lastName}
        />
        <br></br>
        <br></br>
        <ValidationTextField
          label="Email"
          required
          variant="outlined"
          defaultValue="Success"
          id="validation-outlined-input"
          disabled
          value={email}
        />

      </div>
      <br></br>
      <br></br>


      <div>


        <Button variant="primary" onClick={handleClickOpen}>
          Delete Account
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
            Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>


      </div>
     
    </>
  )



}
export default DisplayProfile;