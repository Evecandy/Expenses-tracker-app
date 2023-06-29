import ExpenseCard from "./Card";
import { useContext } from "react";
import { AuthContext } from "../context/userContext/Context";
import { useEffect, useState } from "react";

const ExpenseList = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    if (!user) return;

    const res = await fetch(`http://localhost:3000/expenses`, {
      method: "GET",
      headers: {
        token: `${user.token}`,
      },
    });
    const data = await res.json();

    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  return (
    <div>
      <h1>My expenses</h1>
    
      <ul id="expenses">
        {expenses.map((expense,index) => (
          <ExpenseCard ExpenseID={expense.ExpenseID}
            CategoryName={expense.CategoryName}
            Amount={expense.Amount}
            DateOfExpense={new Date(`${expense.DateOfExpense}`).toLocaleString()}
            Description={expense.Description}
          />
        ))}
      </ul>
    </div>
  );
        
        }
   
export default ExpenseList;
