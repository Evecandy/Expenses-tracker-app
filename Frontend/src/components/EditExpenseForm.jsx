
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/userContext/Context';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditExpenseForm = () => {
    const {id }= useParams()
    const expense = JSON.parse(localStorage.getItem("expense"))
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState(expense.Amount);
  const [category, setCategory] = useState(expense.CategoryName);
  const [description, setDescription] = useState(expense.Description);

   const navigate = useNavigate()
  const handleEditExpense = async (updatedExpense ) => {
    await Axios.put(`http://localhost:3000/expenses/${id}`,updatedExpense, {
      headers: {
        token: `${user.token}`,
      },
        })
      .then((res) => {
        alert(res.data.message);
        navigate("/dashboard")
        localStorage.removeItem("expense")
      })
      .catch(({ response }) => {
        alert(response.response.data.error);
      });
  };

const [ setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/categories', {
        headers: {
          Authorization: user.token,
        },
      });
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedExpense = {
      ExpenseID: expense.ExpenseID,
      Amount: amount,
      CategoryName: category,
      Description: description,
    };

    handleEditExpense(updatedExpense);
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpenseForm;
