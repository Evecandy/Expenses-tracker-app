import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useContext } from "react";
// import { Context } from "../context/expenseContext/Context";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/userContext/Context";

export default function AddExpense() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:3000/categories`, {
        method: "GET",
        headers: {
          "token": `${user.token}`,
        },
      });
      const data = await res.json();
     
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  });

  const schema = yup.object().shape({
    Username: yup.string().required("Username is required"),
    Amount: yup.number("Amount must be a number").required("Amount is required"),
    CategoryName:yup.string().required("Category is required"),
    Description: yup.string().required("description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    Axios.post("http://localhost:3000/expenses", data, {
      headers: { token: `${user.token}` },
    })
      .then((response) => {
        response.data.message && alert(response.data.message);
        reset();
      })
      .catch(({ response }) => {
        if (response && response.data && response.data.error) {
          alert(response.data.error);
          
        } else {
          
          console.log(response);
        }
      });
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
};



  return (
    <div className="dashboard-container">
         <button onClick={handleClick} style={{width: "20vw", height: "5vh",borderRadius: ".5rem",outline: "none", border: "1px solid brown",background: "transparent"}}>+ Add Expense</button>
      {isFormOpen && (
      <form id="add-expense-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("Username")} placeholder="Username" />
        <p>{errors.Username?.message}</p>
        <input type="number" {...register("Amount")} placeholder="Amount" />
        <p>{errors.Amount?.message}</p>

        {/* {console.log(options)} */}
        <select {...register("CategoryName")} placeholder="CategoryName">
          onChange={(e) => setCategories('select', e.target.value, { shouldValidate: true })}
            <option value="">Select Category</option>
          {categories.map((Categories, i) => (
            <option
              key={i}
              value={Categories.CategoryName}
            >
              {Categories.CategoryName}
            </option>
          ))}
        </select>
        <p>{errors.CategoryName?.message}</p>
        <input
          type="text"
          {...register("Description")}
          placeholder="Description"
        />
        <p>{errors.Description?.message}</p>
        <input className="submitBtn" type="submit" value="save" />
      </form>)
}
    </div>
  );
}
  

  
  