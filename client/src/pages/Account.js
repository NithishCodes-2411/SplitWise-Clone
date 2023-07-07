import NavigationMenu from "../components/Navigation";
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios, { Axios } from 'axios';
import Image from 'react-bootstrap/Image';
import userImage from '../pictures/bhavik_sticker.png';



function Account() {


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const emailId = localStorage.getItem("userEmail");
  console.log(emailId + " accounts email");




  if (emailId.trim()) {
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
  else{
    console.log("Email to get Data from backend is not returned properly from the local storage.")
  }





  return (
    <>

      <NavigationMenu />
      <br></br>
      <h1 className="display-4">My Account</h1>
      <br></br>
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col className="text-center">
            <Image src={userImage} fluid width="75%" height="50%" />
          </Col>
          <Col className="m-5 text-dark">
            <br></br>
            <br></br>
            <br></br>
            <div className="p-3">
              <label>FirstName</label>
              <h4 className="mb-4 border rounded shadow text-center">{firstName}</h4>
              <label>LastName</label>
              <h4 className="mb-4 border rounded shadow text-center">{lastName}</h4>
              <label>Email</label>
              <h4 className="mb-4 border rounded shadow text-center">{email}</h4>
            </div>
          </Col>
        </Row>
      </Container>





    </>


  )

}
export default Account;

/*
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function FormFloatingBasicExample() {
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
    </>
  );
}*/