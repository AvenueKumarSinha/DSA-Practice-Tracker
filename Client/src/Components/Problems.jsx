import React from 'react'
import "./Problems.css"
import Card from './Card'

import { useState, useEffect } from 'react'
import AddProblemComponent from './AddProblemComponent'
import { DialogBoxContext } from "../Context/DialogBoxContext";
import { useContext } from 'react'

import Loader from './Loader'
import { usernameContext } from '../Context/Context'
import { useNavigate } from "react-router-dom";
import Notes from './Notes'


const Problems = () => {
  const {username}=useContext(usernameContext)
  const navigate=useNavigate()

  const {AddProblemState,setAddProblemState, NotesState, useNotes, Refresh, cards, setCards, currentTopic}=useContext(DialogBoxContext)

  useEffect(() => {
    async function fetchDataFromDatabase(){
      try{
        const r=await fetch("http://localhost:3000/backendInitialData", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({"username":username})})
        const res=await r.json()

        let fetchedCards;
        if(res.success){
            fetchedCards = res.data.problem.map((object) => ({
            id: object.problemId,
            name: object.problemName,
            topic: object.problemTopic.split(/[^a-zA-Z0-9_ ]+/).concat("All Topics"),
            codeLink: object.problemCodeLink,
            tutorialLink: object.problemTutorialLink,
            note: object.problemNote,
            starred: object.problemStarred,
            status: object.problemStatus,
          }));

          setCards(fetchedCards);
        }else{
          alert("Server not responding")
          navigate("/")
        }
      }catch(err){
        alert("Server not responding")
        navigate("/")
      }
    }
    fetchDataFromDatabase()
  },[Refresh])
  



  const handleAddProblem=()=>{
    setAddProblemState(true)
  }

  return (
    <>
      {AddProblemState && <AddProblemComponent/>}
      {NotesState && <Notes/>}

      <div className='ProblemsContainer'>
        <div className="ProblemsPanel">
          <div id="TopicName">{currentTopic}</div>
          <div><button id="AddProblem" onClick={handleAddProblem}>Add Problem</button></div>
        </div>
        <div className="ProblemsList">
          {cards.map((card) => (
           card.topic.includes(currentTopic) && <Card key={card.id} id={card.id} name={card.name} topic={card.topic} codeLink={card.codeLink} tutorialLink={card.tutorialLink} note={card.note} starred={card.starred} status={card.status} />
        ))}
        </div>
      </div>
    </>
  )
}

export default Problems
