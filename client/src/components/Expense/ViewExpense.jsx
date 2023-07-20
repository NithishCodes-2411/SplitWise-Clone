import './CssForViewExpense.css';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditExpense from './EditExpense';

function ViewExpense(props) {
    const navigate = useNavigate();
    const expenseId = props.id;
    const [expenseInfo, setExpenseInfo] = useState([]);

    useEffect(() => {
        if (expenseId) {
            axios.post('http://localhost:5000/api/expense/viewExpense', {
                expenseId: expenseId
            })
                .then((res) => {
                    if (res.status === 200) {
                        setExpenseInfo(res.data.exp);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [expenseId]);

  

    return (
        <div className="container">
            <Grid sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: 5, padding: 3, marginTop: 5 }}>
                <div className="cotainerr">
                    <div className="header">
                        <h1 className="title">{expenseInfo?.expenseName}</h1>
                        <span className="description">{expenseInfo?.expenseDescription}</span>
                    </div>

                    <div className="grid-container">

                        <div className="grid-item">
                            <h6 className="grid-item-title">Date: {new Date(expenseInfo?.expenseDate)?.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            })}</h6>
                        </div>

                        <div className="grid-item">
                            <h6 className="grid-item-title">Amount: {expenseInfo?.expenseAmount}</h6>
                        </div>
                        <div className="grid-item">
                            <h6 className="grid-item-title">Payment Method: {expenseInfo?.expenseType}</h6>
                        </div>
                        <div className="grid-item">
                            <h6 className="grid-item-title">Expense Owner: {expenseInfo?.expenseOwner}</h6>
                        </div>
                        <div className="grid-item">
                            <h6 className="grid-item-title">Amount per person: {expenseInfo?.expensePerMember}</h6>
                        </div>
                        <div className="grid-item">
                            <h6 className="grid-item-title">Members:</h6>
                            {expenseInfo?.expenseMembers && expenseInfo.expenseMembers.map((member, index) => (
                                <p className="members" key={index}>{member}</p>
                            ))}
                        </div>
                    </div>

                    <div className="buttons">
                        <button className="cancel-button" onClick={() => navigate(-1)}>Back</button>
                        <button className="edit-button" onClick={()=> navigate('/Expense', { state: { expenseId: expenseId, displayWhat: false } })}  >Edit</button>
                    </div>
                </div>
            </Grid>
        </div>
    );
}

export default ViewExpense;
