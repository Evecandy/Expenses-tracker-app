import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useContext } from "react";
import { Context } from "../context/expenseContext/Context";
import { useEffect, useState } from 'react';

export default function AddExpense () {
    const { user } = useContext(Context)
    const [options, setOptions] = useState([]);
   

    useEffect(() => {
        fetch("http://localhost:3000/categories").then((data)=>data.json()).then((options)=>{
            setOptions(options)
            console.log(options);
        })},[])
        // const fetchOptions = async () => {
        //   try {
        //     const response = await Axios.get('http://localhost:3000/categories', {
        //       headers: { Authorization: user.token },
        //     });
        //     setOptions(response.data);
        //   } catch (error) {
        //     console.error('Error fetching options:', error);
        //   }
        // };
    
    //     fetchOptions();
    //   }, [user.token]);


    const schema = yup.object().shape({
        Username:yup.string().required("Username is required"),
        Amount:yup.number().required("Amount is required"),
        // CategoryName:yup.string().required("Category is required"),
        Description: yup.string().required("description is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = (data) => {
        Axios.post("http://localhost:3000/dashboard", data,
            { headers: { "Authorization": `${user.token}` } })
            .then((response) => {
                response.data.message && alert(response.data.message)
                // reset();
            })
            .catch(({ response }) => {
                alert(response.data.error)
            });
    };

      return (
        <div>
          <form id="add-expense-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("Username")} placeholder="Username" />
            <p>{errors.Username?.message}</p>
            <input  type="number" {...register("Amount")}
              placeholder="Amount"
            />
            <p>{errors.Amount?.message}</p>
            {/* <pre></pre> */}
            {/* <pre>{options}</pre> */}

            <select {...register("CategoryName")} placeholder="CategoryName">
                {/* <p>select</p> */}
          {options.map((option) => {
            
            
            <option key={option.CategoryName} value={option.CategoryName}>
              {option.CategoryName}
            </option>
           
})}
        </select>
        <p>{errors.CategoryName?.message}</p>
            <input type="text" {...register("Description")} placeholder="Description" />
            <p>{errors.Description?.message}</p>
            <input className="submitBtn" type="submit" value="+ add expense" />
          </form>
        </div>
  )
        
    }
    
  
    

