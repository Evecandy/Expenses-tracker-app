import { createExpense, getOneExpense, getExpenses,  deleteExpense, updateExpense } from "../controllers/ExpenseTrackerController.js";


const expensesRoutes = (app) => {
    app.route("/users").get(getExpenses).post(validateExpensesData, createExpense);
    app.route("/users/:Username").get(getOneExpense).put(updateExpense).delete(deleteExpense);
  };

  export default expensesRoutes;

  