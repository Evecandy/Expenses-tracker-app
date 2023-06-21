

// export default function Home() {
//     return (
//         <div className="home">
//         </div>

//     )
// }



import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div>
      <div className="profile-card">
        <img src="https://avatars.githubusercontent.com/u/12345678?v=4" alt="Profile Picture" />
        <h2>Your Name</h2>
      </div>
      <div className="expense-card">
        <h3>Expense 1</h3>
        <p>This is a description of expense 1.</p>
      </div>
      <div className="expense-card">
        <h3>Expense 2</h3>
        <p>This is a description of expense 2.</p>
      </div>
      <button className="add-expense-button">Add Expense</button>
    </div>
  );
};

export default Home;
