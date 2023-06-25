
import sql from "mssql";
import config from "../database/config.js";

//get all expenses

export const getExpenses = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const resultSet = await pool.request().query("SELECT * FROM Expenses");
    res.status(200).json(resultSet.recordsets);
  } catch (error) {
    res.status(220).json(error.message);
  } finally {
    sql.close();
  }
};
//create/add an expense
export const addExpense = async (req, res) => {
    try {
      const {Username} = req.auth
      const { Amount,CategoryName, Description } = req.body;
      let pool = await sql.connect(config.sql);
      await pool
        .request()
        .input("Username", sql.VarChar, Username)
        .input("Amount", sql.Decimal, Amount)
        .input("CategoryName", sql.VarChar, CategoryName)
        .input("Description", sql.VarChar, Description)
        .query(
          "INSERT INTO Expenses ( Username,Amount, CategoryName, Description ) VALUES ( @Username, @Amount, @CategoryName, @Description)"
        );
      res.status(200).json({ message: "expense added successfully" });
    } catch (error) {
      res
        .status(500)
        .json( error.message);
    } finally {
      sql.close();
    }
    
  };


  //delete an expense
  export const deleteExpense = async (req, res) => {
    try {
      const { Date } = req.params;
      let pool = await sql.connect(config.sql);
  
      await sql.query`DELETE FROM Expenses WHERE Date = ${Date}`;
      res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json( error.message);
    } finally {
      sql.close();
    }
  };

  //update an expense

  export const updateExpense = async (req, res) => {
    try{
        // const { Username } = req.params; don't
        const {Amount, CategoryName, Description,ExpenseID} = req.body;
        let pool = await sql.connect(config.sql);
        const resultset = await pool
          .request()
          .input("Username", sql.VarChar, Username)
          .input("Amount", sql.VarChar, Amount)
          .input("CategoryName", sql.VarChar, CategoryName)
          .query(
            "UPDATE Expenses SET Amount=@Amount, CategoryName=@CategoryName WHERE CategoryName=@CategoryName"
          );
          res.status(200).json({message:"User password was updated successfully"});
    } catch (error) {
      
        res.status(400).json(error.message)
        
    }  finally {
      sql.close();
    }
   
  };

