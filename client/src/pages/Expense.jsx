import NavigationMenu from "../components/Navigation";
import EditExpense from ".././components/Expense/EditExpense";
import ViewExpense from "../components/Expense/ViewExpense";

import { useLocation } from "react-router-dom";
function Expense() {
    const location = useLocation();
    const expenseId = location.state?.expenseId;
    const display = location.state?.displayWhat;
    
    if(display){
        return (
            <>
            <NavigationMenu/>
            <ViewExpense  id={expenseId}/>
            </>
            
        )
   
    }
    else{
        return (
            <>
            <NavigationMenu/>
            <EditExpense id={expenseId}/>
            </>
            
        )
    }
   
}
export default Expense;