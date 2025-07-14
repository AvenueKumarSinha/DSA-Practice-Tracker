import React from 'react'
import { useContext } from 'react';
import "./DialogBox.css"
import { ImCancelCircle } from "react-icons/im";
import { DialogBoxContext } from '../Context/DialogBoxContext';
import { usernameContext } from '../Context/Context';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader"

const DeleteAccount = () => {

    const {DeleteAccount,setDeleteAccount}=useContext(DialogBoxContext)
    const {username, setUsername, setFullname}=useContext(usernameContext)
    const navigate=useNavigate()
    
      const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
      } = useForm();

    const handleCancel=()=>{
        setDeleteAccount(false)
    }

    const onSubmit=async(data)=>{
        try{
        const r=await fetch(`${import.meta.env.VITE_BACKEND_URL}/backendDeleteAccount`,{method:'DELETE',headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})

        const res=await r.json()

        if(res.success){
            localStorage.removeItem("username")
            localStorage.removeItem("fullname")
            setUsername(null)
            setFullname(null)
            handleCancel()
            navigate("/")
        }else{
            alert("Server not Responding")
            handleCancel()
        }
        }catch(err){
            alert("Server not Responding")
            handleCancel()
        }
    }

  return (
    <div className="DialogBox">
      <div className="DialogForm">
            <div className="cancel">
                <ImCancelCircle size={30} onClick={handleCancel}/>
            </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Delete Account</h1>
            <input {...register("username")} type="text" value={username} disabled hidden/>
            <input {...register("password")} type='password' placeholder='Password to Verify Action'/>
            <button disabled={isSubmitting} type='submit'>Delete Account</button>
            {isSubmitting && <Loader/>}
        </form>
      </div>
    </div>
  )
}

export default DeleteAccount
