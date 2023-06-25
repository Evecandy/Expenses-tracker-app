import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    Username: yup.string().required("Username is required"),
    Password: yup.string().required("Password is required"),
    EmailAddress: yup.string().required("EmailAddress is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {   
    Axios.post("http://localhost:3000/auth/signup", data)
      .then(response =>{
        if (response.data.message) {
          alert(response.data.message)
        }
        navigate("/dashboard");
      })
      .catch(({response}) =>{
        alert (response.data.error);
      });
  };

  return (
    <div>
      <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("Username")} placeholder="Username" />
        <p>{errors.Username?.message}</p>
        <input  type="email" {...register("EmailAddress")}
          placeholder="email@example.com"
        />
        <p>{errors.EmailAddress?.message}</p>
        <input type="password" {...register("Password")} placeholder="Password" />
        <p>{errors.Password?.message}</p>
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}
