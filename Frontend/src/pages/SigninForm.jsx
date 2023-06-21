import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";

export default function SigninForm() {
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
    console.log(data);
    Axios.post("http://localhost:3000/auth/signin", data)
    .then(response =>{
      if (response.data) {
        alert(response.data.token)   
        dispatchEvent({type: "signin success", payload:response.data})         
    
      }
    })
    .catch((error) =>{
      alert (error.response.data.error)

    });
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
