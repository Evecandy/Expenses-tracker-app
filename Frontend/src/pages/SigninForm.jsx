import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "../context/userContext/Context";


export default function SigninForm() {
  
  const { dispatch } = useContext (AuthContext);
  const navigate = useNavigate();
    const schema = yup.object().shape({
    Username: yup.string().required("Username is required"),
    Password: yup.string().required("Password is required")
  });

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  
  
  
  const onSubmit = (data) => {
    // console.log(data);
    Axios.post("http://localhost:3000/auth/signin", data)
    .then(({data}) =>{
      if (data.token) {
        dispatch({ type:"Signin successful", payload: data})
        navigate("/dashboard") 
      }
    })
    .catch(({ response}) => {
        alert(response.data.error)
    })
  };
  return(
    <form id="signin-form" onSubmit={handleSubmit(onSubmit)} >
    <div id="signin-inputs">
      <>
        <input type="text" {...register("Username")} placeholder="Username" />
        <p>{errors.Username?.message}</p>
      </>
      <input
        type="password"
        {...register("Password")}
        placeholder="Password ..."
      />
      <p>{errors.Password?.message}</p>
    </div>
    <input type="submit" value="sign in" />
  </form>
  

  )
}
