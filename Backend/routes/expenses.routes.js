import { createExpense, getOneExpense, getExpenses,  deleteExpense, updateExpense } from "../controllers/ExpenseTrackerController.js";


const expensesRoutes = (app) => {
    app.route("/expenses").get(getExpenses).post(validateExpensesData, createExpense);
    app.route("/expenses").get(getOneExpense).put(updateExpense).delete(deleteExpense);
  };

  export default expensesRoutes;

  