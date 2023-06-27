import './card.css'
/* eslint-disable react/prop-types */
const ExpenseCard = ({ExpenseID,CategoryName, Amount, DateOfExpense, Description}) => {
  return (
    <div className="expenses">
      <h1>{ExpenseID}</h1>
      <h2>Category:{CategoryName}</h2>
      <p>Amount:{Amount}</p>
      <p>Date:{DateOfExpense}</p>
      <p>Description:{Description}</p>
    </div>
  );
};

export default ExpenseCard;
