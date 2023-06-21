
import "./landing.page.css";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";




function LandingPage() {
   
  return (
    <>
      <div id="landing-page">
        <header>
          <div id="logo">BudgetFrenzzie</div>
          <SigninForm />
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
          <SignupForm/>
          
        </main>
      </div>
    </>
  );
}

export default LandingPage;
