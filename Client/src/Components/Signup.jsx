import React from "react";
import "./Login.css";

import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Signup = () => {
    const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try{
        let r = await fetch("http://localhost:3000/backendSignUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });
        let res = await r.json();
        if(res.success){
            alert('Account Created Successfully')
            navigate("/")
        }else{
            alert('Failed to Create Account. Try using a unique user name')
        }
    }catch(err){
        console.log(`Server Error: ${err}`)
        alert('Server not Responding')
    }
  };

  return (
    <div className="LoginBackground">
      <div className="LoginContainer">
        <p id="Welcome">Sign Up</p>
        <p id="signup">
          Go to <NavLink to="/">Login</NavLink> Page
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("username")} type="text" placeholder="Username" />
          <input
            {...register("fullname")}
            type="text"
            placeholder="Full Name"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <button disabled={isSubmitting} type="submit">
            Sign Up
          </button>
          {isSubmitting && <Loader/>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
