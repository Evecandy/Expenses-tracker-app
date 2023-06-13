import express from "express";
import config from "./database/config.js";
import ExpenseTrackerRoutes from "./routes/ExpenseTrackerRoutes.js"


const app = express();

ExpenseTrackerRoutes(app);
app.get("/", (req, res) => {
  res.send("Hello 😋 nice to meet you. Welcome to my Expense tracker API");
});

app.listen(8000, () => {
  console.log(`Server running at ${config.url}`);
});
