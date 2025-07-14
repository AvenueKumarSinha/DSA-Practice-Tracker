import React from 'react'
import "./DialogBox.css"
import Loader from './Loader'
import { ImCancelCircle } from "react-icons/im";
import { useForm } from 'react-hook-form';

import { useContext } from 'react';
import { DialogBoxContext } from '../Context/DialogBoxContext';
import { usernameContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const AddProblemComponent = () => {
    const {setAddProblemState, Refresh, setRefresh}=useContext(DialogBoxContext)
    const {username}=useContext(usernameContext)
    const navigate=useNavigate()

    const handleCancel=()=>{
        setAddProblemState(false)
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
      } = useForm();

    const onSubmit=async(data)=>{
        try{

            if (data.starred === "true") { //because radio buttons pass as strings by default and not boolean
              data.starred = true;
            } else {
              data.starred = false;
            }
            if (data.status === "true") { //because radio buttons pass as strings by default and not boolean
              data.status = true;
            } else {
              data.status = false;
            }

            const r=await fetch(`${import.meta.env.VITE_BACKEND_URL}/backendAddProblem`,{method:'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})

            const res=await r.json()

            if(res.success){
                handleCancel()
                setRefresh(!Refresh) //to re-render problem list, which is dependent on useEffect which depends on [Refresh]
                navigate("/dashboard")
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
    <div className='DialogBox'>
      <div className="DialogForm AddProblemSpecialStyling">
        <div className="cancel">
                <ImCancelCircle size={30} onClick={handleCancel}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add Problem</h1>
            <input {...register("username")} type="text" value={username} disabled hidden/>
            <input {...register("problemname")} type='text' placeholder='Enter Problem Name'/>
            <input {...register("problemtopic")} type='text' placeholder='Enter topic of Problem'/>
            <input {...register("codelink")} type='url' placeholder='Enter coding website link'/>
            <input {...register("tutoriallink")} type='url' placeholder='Enter video tutorial link'/>
            <textarea {...register("problemnote")} placeholder='Add a Note'></textarea>
            <label name="starred">
                <p>Mark as Important?</p>
                <input {...register("starred")} type="radio" name='starred' value={true} id='_yes'/>
                <input {...register("starred")} type="radio" name='starred' value={false} id='_no'/>
            </label>
            <label name="status">
                <p>Mark as Done?</p>
                <input {...register("status")} type="radio" name='status' value={true} id='_yes'/>
                <input {...register("status")} type="radio" name='status' value={false} id='_no'/>
            </label>
            <button disabled={isSubmitting} type='submit'>Add Problem</button>
            {isSubmitting && <Loader/>}
        </form>
      </div>
    </div>
  )
}

export default AddProblemComponent
