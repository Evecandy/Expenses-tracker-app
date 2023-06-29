import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Card.css";
import { AuthContext } from "../context/userContext/Context";
import Axios from "axios";

const ExpenseCard = ({
  ExpenseID,
  CategoryName,
  Amount,
  DateOfExpense,
  Description,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleDelete = async (ExpenseID) => {
    await Axios.delete(`http://localhost:3000/expenses/${ExpenseID}`, {
      headers: {
        token: `${user.token}`,
      },
    })
      .then((res) => {
        alert(res.data.message);
      })
      .catch(({ response }) => {
        alert(response.response.data.error);
      });
  };
  //  const res =  await Axios.delete('http://localhost:3000/expenses/${ExpenseID'),
  //       { headers: { "Authorization": '${user.token}' }
  //      }
  //      const mess = res.data.message;

  //     { headers: { "Authorization": '${user.token}' } }
  // )



  const handleEditClick = (id) => {
    localStorage.setItem("expense", JSON.stringify({ExpenseID,
      CategoryName,
      Amount,
      DateOfExpense,
      Description,}))
      navigate("/editexpense/"+id)
    // handleEditExpense(ExpenseID);
  };

  const handleDeleteClick = () => {
    handleDelete(ExpenseID);
  };

  return (
    <div className="expenses">
      <h2>ExpenseID: {ExpenseID}</h2>
      <h3>Category: {CategoryName}</h3>
      <p>Amount: {Amount}</p>
      <p>Date: {DateOfExpense}</p>
      <p>Description: {Description}</p>
<div className="expense-btns">
      <button className="edit-button" onClick={()=>handleEditClick(ExpenseID)}>
        <FaEdit />
      </button>
   
      
      <button className="delete-button" onClick={handleDeleteClick}>
        <FaTrashAlt />
      </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
