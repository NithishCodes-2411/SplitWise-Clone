import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function EditExpense(props) {
    const navigate = useNavigate();
    const expenseId = props.id;
    const [successMessage , setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Fetch expense data when the component mounts
        axios.post('http://localhost:5000/api/expense/viewExpense', {
            expenseId: expenseId,
        })
        .then((res) => {
            if (res.status === 200) {
                setFormData(res.data.exp);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, [expenseId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleEditExpense = async () => {
        console.log(formData);
        try {
            // Convert the expenseAmount to a number
            const amountAsNumber = parseFloat(formData.expenseAmount);

            const response = await axios.post(
                'http://localhost:5000/api/expense/editExpense',
                {
                    ...formData,
                    expenseAmount: amountAsNumber,
                }
            );

            if (response.status === 200) {
                console.log("success");
                navigate('/DisplayGroupInfo' , { state: { groupId: formData.groupId } })
            }
            else {
                console.log(response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                id="outlined-basic-3"
                onChange={handleInputChange}
                label="Expense Name"
                variant="outlined"
                name="expenseName"
                value={formData.expenseName || ''}
            />
            <br />
            <TextField
                id="outlined-basic-1"
                label="Expense Description"
                variant="outlined"
                name="expenseDescription"
                value={formData.expenseDescription|| ''}
                onChange={handleInputChange}
            />
            <br />
            <TextField
                id="outlined-basic-2"
                label="Expense Amount"
                variant="outlined"
                name="expenseAmount"
                value={formData.expenseAmount || ''}
                onChange={handleInputChange}
            />
            <br />
            <TextField
                id="outlined-basic-4"
                label="Expense type"
                variant="outlined"
                name="expenseType"
                value={formData.expenseType || ''}
                onChange={handleInputChange}
            />
            <br />
            {successMessage}
            <span>
            <Button style={{ marginRight: '45px' }}onClick={()=>navigate(-1)} variant="contained">
                    Back
                </Button>
                
                <Button  onClick={handleEditExpense} variant="contained">
                    Save Changes
                </Button>
              
            </span>
        </div>
    );
}

export default EditExpense;
