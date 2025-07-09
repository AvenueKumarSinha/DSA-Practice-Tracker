import React, { useContext } from "react";
import "./DialogBox.css";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
import { ImCancelCircle } from "react-icons/im";

import { DialogBoxContext } from "../Context/DialogBoxContext";
import { usernameContext } from "../Context/Context";

const ChangePassword = () => {
    const {changePassword,setChangePassword}=useContext(DialogBoxContext)
    const {username}=useContext(usernameContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit=async(data)=>{
    try{
        const r=await fetch("http://localhost:3000/backendChangePassword",{method:'PUT',headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})

        const res=await r.json()

        if(!res.success){
            if(res.serverError) alert("Server not Responding")
            else alert("Incorrect Password")
        }
        handleCancel()
    }catch(err){
        alert("Server not Responding")
        handleCancel()
    }
  }

  const handleCancel=()=>{
    setChangePassword(false)
  }

  return (
    <div className="DialogBox">
      <div className="DialogForm">
            <div className="cancel">
                <ImCancelCircle size={30} onClick={handleCancel}/>
            </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Change Password</h1>
            <input {...register("username")} type="text" value={username} disabled hidden/>
            <input {...register("password")} type='password' placeholder='Password'/>
            <input {...register("newpassword")} type='password' placeholder='New Password'/>
            <button disabled={isSubmitting} type='submit'>Change Password</button>
            {isSubmitting && <Loader/>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
