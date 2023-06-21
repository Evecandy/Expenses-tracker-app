import express from "express";
import config from "./database/config.js";
import ExpenseTrackerRoutes from "./routes/ExpenseTrackerRoutes.js";
import jwt from "jsonwebtoken";
import cors from 'cors';

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(cors());

//jwt middleware
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
          if (err) req.user = undefined;
          req.user = decode;
          next();
      });
  } else {
      req.user = undefined;
      next();
  }
});

ExpenseTrackerRoutes(app);
app.get("/", (req, res) => {
  res.send("Hello 😋 nice to meet you. Welcome to my Expense tracker API");
});

// app.use( '/users',ExpenseTrackerRoutes)

app.listen(config.port, () => {
  console.log(`Server running at ${config.host}:${config.port}...`);
});
