import React, { useReducer, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';




const initialState = {
  firstName: '',
  lastName: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIRST_NAME':
      return {
        ...state,
        firstName: action.payload,
      };
    case 'CHANGE_LAST_NAME':
      return {
        ...state,
        lastName: action.payload,
      };
    default:
      return state;
  }
};

const EditProfile = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

 

  //assigning the new value to our state
  const handleFirstNameChange = (event) => {
    dispatch({
      type: 'CHANGE_FIRST_NAME',
      payload: event.target.value,
    });
  };

  //assigning the new value to our state 
  const handleLastNameChange = (event) => {
    dispatch({
      type: 'CHANGE_LAST_NAME',
      payload: event.target.value,
    });
  };

  const [error , setError] = useState("");
  const [successMsg , setSuccessMsg] = useState("");
  const emailId = localStorage.getItem('userEmail');

  const handleSubmit = (event) => {

    event.preventDefault();

    //clearing the message to set the message of a new response
    setError("");
    setSuccessMsg(""); 


    if(state.firstName.length == 0 || state.lastName.length == 0){

      setError("Required fields might be empty");
      return

    }else{

      axios
      .post('http://localhost:5000/api/user/editUser', {
        emailId : emailId , 
        firstName : state.firstName ,
        lastName : state.lastName
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccessMsg("Profile Edited successfully");
          dispatch({ type: 'CHANGE_FIRST_NAME', payload: '' });
          dispatch({ type: 'CHANGE_LAST_NAME', payload: '' });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
        setError(error.message);
        }
        else{
          setError("An error Occured , Please try again later");
        }
      });
      
    }

  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          id="outlined-basic-3"
          onChange={handleFirstNameChange}
          label="Edit FirstName"
          variant="outlined"
          value = {state.firstName}
    
        />
        <br></br>
         <TextField
          id="outlined-basic-3"
          onChange={handleLastNameChange}
          label="Edit LastName"
          variant="outlined"
          value = {state.lastName}
      
        />
        <br></br>
      </div>

      {error && <p className="text-danger fs-5">{error}</p>}
      {successMsg && <p className="text-success fs-5">{successMsg}</p>}

      <Button onClick={handleSubmit} variant="contained">
        <PublishIcon />
      </Button>
    </>

  )

  };



export default EditProfile;
