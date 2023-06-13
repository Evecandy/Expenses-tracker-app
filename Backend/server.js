import express from "express";
const app = express();

app.get ("/", (req,res)=> {
    res.send("Hello 😋 nice to meet you. Welcome to my Expense tracker API")
});


app.listen(8000, ()=> {
    console.log("server is listening on port 8000");
});