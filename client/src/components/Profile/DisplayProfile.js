import { useState } from "react";
import axios, { Axios } from 'axios';

const DisplayProfile = () => {

    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const emailId = localStorage.getItem('userEmail');
    console.log(emailId + " accounts");

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
      else {
        console.log("Email to get Data from backend is not returned properly from the local storage.")
      }
    


    return (
        <div className="p-3">
            <label>FirstName</label>
            <h4 className="mb-4 border rounded shadow text-center">{firstName}</h4>
            <label>LastName</label>
            <h4 className="mb-4 border rounded shadow text-center">{lastName}</h4>
            <label>Email</label>
            <h4 className="mb-4 border rounded shadow text-center">{email}</h4>
        </div>

    )



}
export default DisplayProfile;