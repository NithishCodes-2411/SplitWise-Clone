import React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';
import { response } from 'express';

const ResetPassword = () => {
  const [newPass, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const emailId = localStorage.getItem('userEmail');

  const handleNewPass = (e) => {
    const newPassword = e.target.value;
    if (newPassword.trim()) {
      setNewPassword(newPassword);
      setSuccess(true);
    } else {
      setError('Fields cannot be empty 2');
      setSuccess(false);
    }
  };

  const handleConfirmNewPass = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPass(confirmPassword);
    if (confirmPassword.trim()) {
      if (newPass === confirmPass) {
        setSuccess(true);
      } else {
        setError("Confirm password doesn't match");
        setSuccess(false);
      }
    } else {
      setError('Fields cannot be empty 1');
      setSuccess(false);
    }
  };

  const handleOldPassword = (e) => {
    const oldPassword = e.target.value;
    if (oldPassword.trim()) {
      setOldPass(oldPassword);
      setSuccess(true);
    } else {
      setSuccess(false);
      setError('Fields cannot be empty 2');
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (success) {
        setError('');

        axios
          .post('http://localhost:5000/api/user/resetPassword', {
            emailID: emailId,
            oldPassword: oldPass,
            newPassword: newPass,
          })
          .then((res) => {
            if (res.status === 200) {
              setError('');
              alert('Password changed successfully');
              setNewPassword('');
              setConfirmPass('');
              setOldPass('');
              setSuccessMsg('Password changed successfully');
              return;
            }

           
          })
          .catch((error) => {

            const errorData = JSON.stringify(error.response.data);
            console.log(errorData.message);
            setError(errorData.message);
            


           
            
          });
      } 
    } catch (error) {
      console.log(error );
    }
  };*/
  const handleSubmit = (e) => {
    e.preventDefault();
  
    try {
      if (success) {
        setError("");
        axios
          .post("http://localhost:5000/api/user/resetPassword", {
            emailID: emailId,
            oldPassword: oldPass,
            newPassword: newPass
          })
          .then((res) => {
            if (res.status === 200) {
              setError("");
              alert("Password changed successfully");
              setNewPassword("");
              setConfirmPass("");
              setOldPass("");
              return;
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              setError("Unauthorized: Please check your old password");
            } else {
              setError("An error occurred. Please try again later.");
            }
          });
      } else {
        setError("Credentials might be empty");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };
  

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField id="outlined-basic-3" onChange={handleOldPassword} label="Old Password" variant="outlined" /> <br />
        <TextField onChange={handleNewPass} id="outlined-basic-1" label="New Password" variant="outlined" /> <br />
        <TextField onChange={handleConfirmNewPass} id="outlined-basic-2" label="Confirm New Password" variant="outlined" /> <br />
      </div>
      <p className="text-danger fs-5">{error}</p>
      <br />
      <Button onClick={handleSubmit} variant="contained">
        <PublishIcon />
      </Button>
      <p className="text-success fs-5">{successMsg}</p>
    </>
  );
};

export default ResetPassword;
