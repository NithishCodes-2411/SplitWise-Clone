import react from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from 'axios';
//import { useHistory } from 'react-router-dom';
import Account from '../pages/Account';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function Login() {
    //const history = useHistory();

    const [emailaddress, setEmailAddress] = useState("");
    const [emailAddressError, setEmailAddressError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [success, setSuccess] = useState(false);

    const [loginError, setLoginError] = useState("")
    const navigate = useNavigate();



    const handleEmail = (e) => {
        let email = e.target.value;
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let error = "";

        if (!email.trim()) {
            error = "Email Address cannot be empty";
            setSuccess(false);
        }
        else if (!emailRegex.test(email)) {
            error = "Email address is not correct , ex : xyz@outlook.com";
            setSuccess(false);
        }
        else {
            setSuccess(true);
            setEmailAddress(email);
        }
        setEmailAddressError(error);
    }

    const handlePassword = (e) => {
        let passWord = e.target.value;

        let error = "";

        if (!passWord.trim()) {
            error = "Password cannot be empty";
            setPasswordError(error);
            setSuccess(false);
        }
        else {
            setSuccess(true);
            setPasswordError("")
            setPassword(passWord);
        }

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        //console.log(emailaddress);
        //console.log(password);

        try {
            if (success) {

                axios.post("http://localhost:5000/api/user/login", {
                    emailId: emailaddress,
                    password: password
                })
                    .then((res) => {
                        if (res.status === 200) {
                            setEmailAddressError("");
                            setPasswordError("");
                            navigate('/DashBoard');
                            localStorage.setItem("userEmail", emailaddress);

                        }
                    })
                    .catch(err => {
                            console.log(err)
                            //setLoginError(err.response.data.message);
                            alert("Invalid password or email")
                    })
            }

        }
        catch (error) {
            setLoginError(error);
        }

    }


    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100 bg-light" >
                <div className="shadow-lg p-2">
                    <h3>
                        <small className="text-body-secondary">Log in</small>
                    </h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label"></label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" onChange={handleEmail} />
                            <div id="emailError" className="form-text">{emailAddressError}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label"></label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" onChange={handlePassword} />
                            <div id="passwordError" className="form-text">{passwordError}</div>

                        </div>
                        <div className="mb-2 form-check">
                            <label className="form-check-label" htmlFor="exampleCheck1"></label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
                    </form>

                </div>
            </div>
        </>
    );
}
export default Login;

