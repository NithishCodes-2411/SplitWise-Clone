import NavigationMenu from "../components/Navigation";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios, { Axios } from 'axios';
import Image from 'react-bootstrap/Image';
import userImage from '../pictures/bhavik_sticker.png';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';



function Account() {

    const location = useLocation();
    const CurrentUser = location.state.emailaddress;

    try {
        //axios

    }
    catch (error) {

    }




    return (
        <>

            <NavigationMenu />
            <br></br>
            <h1 className="display-4">My Account</h1>
            <br></br>
            <Container fluid className="vh-100">
                <Row className="h-100">
                    <Col className=" text-secondary">
                        <Image src={userImage}  fluid width="75%" height = "50%"/>;
                    </Col>
                    <Col className=" text-secondary">
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
              
                </Col>
            </Row>

        </Container >




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