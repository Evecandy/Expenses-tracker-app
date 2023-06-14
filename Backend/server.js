import express from "express";
import config from "./database/config.js";
import ExpenseTrackerRoutes from "./routes/ExpenseTrackerRoutes.js"


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser)

ExpenseTrackerRoutes(app);
app.get("/", (req, res) => {
  res.send("Hello 😋 nice to meet you. Welcome to my Expense tracker API");
});

// app.use( '/users',ExpenseTrackerRoutes)

app.listen(config.port, () => {
  console.log(`Server running at ${config.host}:${config.port}...`);
});
