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

  const {username}=useContext(usernameContext)
  const {NotesState, setNotes, setpid}=useContext(DialogBoxContext)

  const handleStar=async()=>{
    try{
      const r=await fetch("http://localhost:3000/backendUpdateStarred",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"username":username,"id":id,"starred": !highlighted})})

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

  return (
    <div className='CardContainer'>
      <p id="problemStatus"><input type='checkbox'></input></p>
      <p id="problemName">{name}</p>
      <p id="problemLink"><a href={codeLink} target='_blank'><FaCode size={30}/></a></p>
      <p id="videoLink"><a href={tutorialLink} target='_blank'><FaYoutube size={30}/></a></p>
      <p id="notes" onClick={handleNotes}><GrNotes size={30}/></p>
      <p id="star" onClick={handleStar}><FaStar size={30} className={highlighted?"highlightStar":""}/></p>
      <p id="problemDelete"><MdDelete size={30}/></p>
    </div>
  )
}

export default Card
