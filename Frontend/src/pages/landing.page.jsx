// import { useState } from 'react'
import "./landing.page.css";

function LandingPage() {
  return (
    <>
      <div id="landing-page">
        <header>
          <div id="logo">BudgetFrenzzie</div>
          <form id="signin-form">
            <div id="signin-inputs">
              <input type="text" placeholder="Username" />
              <input type="password" name="" id="" placeholder="Password" />
            </div>
            <input type="submit" value="sign in" />
          </form>
        </header>
        <main>
          <div id="catch-phrase">
            <div id="title">
              BudgetFrenzzie: Your Personal Finance Companion
            </div>
            <p>
              Take Control of Your Finances with BudgetFrenzzie: Your Personal
              Expense Tracking App
            </p>
          </div>
          <form id="signup-form">
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <input
              type="email"
              name="email"
              id=""
              placeholder="email@example.com"
            />
            <input type="submit" value="Sign up" />
          </form>
        </main>
      </div>
    </>
  );
}

export default LandingPage;
