import { useContext } from "react";
import { AuthContext } from "../context/userContext/Context";
import { FaSignOutAlt } from "react-icons/fa";
import "./Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, dispatch } = useContext(AuthContext);
  const username = user ? user.Username : "";
  const navigate = useNavigate();
  const handleSignout = () => {
    dispatch({ type: "Signout" });
    navigate("");
  };

  const userInitial = String(user).charAt(0);

  return (
    <header>
      {/* <div className="logo">
        <img src="https://budgetfrenzie.com/logo.png" alt="BudgetFrenzie" />
      </div> */}
      <div className="user-profile">
        <div className="user-initial">
          <span>{userInitial}</span>
        </div>
        <div className="user-name">{username}</div>
        <div className="user-options">
          <a href="#">Settings</a>

          <Link onClick={handleSignout} style={{ color: "red" }}>
            <FaSignOutAlt id="icons" /> Signout
          </Link>
        </div>
      </div>
      <button className="report-button" onClick={() => alert("Report")}>
        Report
      </button>
    </header>
  );
}
