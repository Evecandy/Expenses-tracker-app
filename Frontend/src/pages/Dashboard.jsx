import { useContext } from "react";
import { AuthContext } from "../context/userContext/Context";
import { FaSignOutAlt } from "react-icons/fa";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import AddExpense from "./AddExpenseForm";
// import { Context } from "..context/expenseContext/Context";
import ExpenseList from "../components/ExpenseList";


export default function Dashboard() {
  
  const { user, dispatch } = useContext(AuthContext);
  const username = user ? user.Username : "";
  const navigate = useNavigate();

  const handleSignout = (e) => {
    e.preventDefault();
    dispatch({ type: "Signout" });
    navigate("/");
  };

  const userInitial = String(user.Username).charAt(0);
  // console.log(user, userInitial)

  return (
    <>
    <div className="header">
      <nav>
        <div className="header-logo">BudgetFrenziee</div>
        <ul>
          <li>
            <a href="#">Expenses</a>
          </li>
          <li>
            <a href="#">Reports</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
        <div className="user-profile">
          <div className="sub-menu-wrap">
            <div className="sub-menu">
              <div id="profile-icon">
              <div className="user-initial">
                <span>{userInitial}</span>
              </div>
              <div className="user-name">{username}</div>
              </div>
              <div className="drop-down">
              <a href="#" className="sub-menu-link">
                  <FiSettings id= "settings"/> Settings
                  <span></span>
              </a>
              <div id="signout">
              <Link onClick={handleSignout}>
     <FaSignOutAlt  /> Signout
    </Link>
              </div>
                 
             
            </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <AddExpense user={user} />

    <ExpenseList/>
    </>
    
    
  );

}
