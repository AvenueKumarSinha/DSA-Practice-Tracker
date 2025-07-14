import React from 'react'
import './Card.css'

import { FaCode } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';

import { usernameContext } from '../Context/Context';
import { useContext, useEffect } from 'react';

import Notes from './Notes';
import { DialogBoxContext } from '../Context/DialogBoxContext';

const Card = ({id, name, topic, codeLink, tutorialLink, note, starred, status}) => {

  const [highlighted, setHighlighted]=useState(starred)
  const [statusState, setStatusState]=useState(status)

  const {username}=useContext(usernameContext)
  const {setNotes, setpid, setAddProblemState,setRefresh,Refresh}=useContext(DialogBoxContext)

  const handleStar=async()=>{
    try{
      const r=await fetch(`${import.meta.env.VITE_BACKEND_URL}/backendUpdateStarred`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"username":username,"id":id,"starred": !highlighted})})

      const res=await r.json()
      if(res.success) setHighlighted(!highlighted)
      else alert("Backend is down")
    }catch(err){
      alert("Backend is down")
    }
  }

  const handleNotes=async()=>{
    setpid(id)
    setNotes(true)
  }

  const handleStatus=async()=>{
    try{
      const r=await fetch(`${import.meta.env.VITE_BACKEND_URL}/backendUpdateStatus`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"username":username,"id":id,"status": !statusState})})

      const res=await r.json()
      if(res.success) setStatusState(!statusState)
      else alert("Backend is down")
    }catch(err){
      alert("Backend is down")
    }
  }

  const handleDelete=async()=>{
    if(confirm("Are you Sure?")){
      try{
        const r=await fetch(`${import.meta.env.VITE_BACKEND_URL}/backendDeleteProblem`,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({"username":username,"id":id})})

        const res=await r.json()

        if(res.success){
          setRefresh(!Refresh) //to re-render problem list, which is dependent on useEffect which depends on [Refresh]
        }else alert("Backend is down")
      }catch(err){
        alert("Backend is down")
      }
    }
  }
  

  return (
    <div className='CardContainer'>
      {statusState && <p id="problemStatus" onClick={handleStatus}><input type='checkbox' defaultChecked></input></p>}
      {!statusState && <p id="problemStatus" onClick={handleStatus}><input type='checkbox'></input></p>}
      <p id="problemName">{name}</p>
      <p id="problemLink"><a href={codeLink} target='_blank'><FaCode className='icon' size={30}/></a></p>
      <p id="videoLink"><a href={tutorialLink} target='_blank'><FaYoutube className='icon' size={30}/></a></p>
      <p id="notes" onClick={handleNotes}><GrNotes className='icon' size={30}/></p>
      <p id="star" onClick={handleStar}><FaStar size={30} className={highlighted?"highlightStar icon":"icon"}/></p>
      <p id="problemDelete" onClick={handleDelete}><MdDelete className='icon' size={30}/></p>
    </div>
  )
}

export default Card
