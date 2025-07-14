import React from 'react'
import "./DialogBox.css"

import { useForm } from 'react-hook-form'
import { ImCancelCircle } from 'react-icons/im'
import { DialogBoxContext } from '../Context/DialogBoxContext'
import { useContext } from 'react'
import Loader from './Loader'
import { usernameContext } from '../Context/Context'
import { useEffect, useState } from 'react'

const Notes = () => {

    const {setNotes, pid, setpid}=useContext(DialogBoxContext)
    const {username}=useContext(usernameContext)
    const [currNote,setCurrNote]=useState()

    useEffect(() => {
      async function getCurrNote(){
        try{
            const r=await fetch(`${import.meta.env.VITE_BACKEND_URL}/backendCurrNote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"username":username,"id":pid})})

            const res=await r.json()

            if(res.success){
                setCurrNote(res.note)
            }
            else alert("Backend is down")
        }catch(err){
            alert("Backend is down")
        }
      }
      getCurrNote()
    }, [])
    

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit=async(data)=>{
        try{
            const r=await fetch(`${import.meta.env.VITE_BACKEND_URL}/backendUpdateNote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"username":username,"id":pid,"note": data.problemnote})})

            const res=await r.json()

            if(res.success) handleCancel()
            else alert("Backend is down")
        }catch(err){
            alert("Backend is down")
        }
    }

    const handleCancel=()=>{
        setpid()
        setNotes(false)
    }

  return (
    <div className='DialogBox'>
      <div className="DialogForm">
        <div className="cancel">
            <ImCancelCircle size={30} onClick={handleCancel}/>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Notes</h1>
            <textarea {...register("problemnote")} placeholder='Add a Note' defaultValue={currNote} className='NotesTextArea'></textarea>
            <button disabled={isSubmitting} type='submit'>Save</button>
            {isSubmitting && <Loader/>}
        </form>
      </div>
    </div>
  )
}

export default Notes
