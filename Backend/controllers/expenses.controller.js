
import sql from "mssql";
import config from "../database/config.js";

//get all expenses

export const getExpenses = async (req, res) => {
    
  try {
    console.log(req.auth);
    const {Username} = req.auth
    let pool = await sql.connect(config.sql);
    console.log(Username);
    const resultSet = await pool.request()
    .input ("Username", sql.VarChar, Username)
    .query("SELECT * FROM Expenses WHERE Username=@Username"
     );
    res.status(200).json(resultSet.recordset);
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    // sql.close();
  }
};



//create/add an expense
export const addExpense = async (req, res) => {
    try {
      const { Username, Amount,CategoryName, Description } = req.body;
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
      console.log(error.message);
      res
        .status(500)
        .json( error.message);
    } finally {
      // sql.close();
    }
    
  };


  //delete an expense
  export const deleteExpense = async (req, res) => {
    // console.log('deleted succesfully');
    // res.status(204).json({message:"deleted"})
    try {
      const { ExpenseID } = req.params;
      let pool = await sql.connect(config.sql);
  
      await pool .request()
      .input("ExpenseID", sql.Int, ExpenseID)
      .query`DELETE FROM Expenses WHERE ExpenseID = @ExpenseID`;
      res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json( error.message);
    } finally {
      // sql.close();
    }
  };

  //update an expense

  export const updateExpense = async (req, res) => {
    try{
        const {ExpenseID} = req.params
        const {Amount, CategoryName, Description} = req.body;
        console.log(req.body);
        let pool = await sql.connect(config.sql);
        const resultset = await pool
          .request()
          .input("ExpenseID", sql.Int, ExpenseID)
          .input("Amount", sql.Decimal, Amount)
          .input("CategoryName", sql.VarChar, CategoryName)
          .input("Description", sql.VarChar, Description)
          .query(
            "UPDATE Expenses SET Amount=@Amount, CategoryName=@CategoryName, Description=@Description WHERE ExpenseID=@ExpenseID"
          );
          res.status(200).json({message:"Expense was updated successfully"});
    } catch (error) {
      
        res.status(400).json(error.message)
        
    }  finally {
      // sql.close();
    }
   
  };

