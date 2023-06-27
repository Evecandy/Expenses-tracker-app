import ExpenseCard from "./Card";
import { useContext} from "react";
import Axios from "axios";
import { AuthContext} from "../context/userContext/Context";
import { useEffect, useState } from "react";

const ExpenseList = () => {
    const { user } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
      if (!user) return;
      const response = await Axios.get(`http://localhost:3000/expenses`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      console.log(response.data);
      setExpenses(response.data);
    };

    useEffect(() => {
      fetchExpenses();
    }, [user]);

    return (
      <div>
        <h1>Expense List</h1>
        <ul>
          {expenses.map(expense => (
            <ExpenseCard key={expense.id} CategoryName={expense.CategoryName
            } Amount={expense.Amount} Date={expense.Date} Description={expense.Description} />
            
          ))}
        </ul>
      </div>
    );
  };

  export default ExpenseList;
