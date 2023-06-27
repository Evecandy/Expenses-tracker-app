import './card.css'
/* eslint-disable react/prop-types */
const ExpenseCard = ({CategoryName, Amount, Date, Description}) => {
  return (
    <div className="expenses">
      <h2>{CategoryName}</h2>
      <p>{Amount}</p>
      <p>{Date}</p>
      <p>{Description}</p>
    </div>
  );
};

export default ExpenseCard;
