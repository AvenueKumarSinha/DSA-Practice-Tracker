import React from 'react'
import "./SidePanelCard.css"

import { DialogBoxContext } from '../Context/DialogBoxContext';
import { useContext } from 'react';
import { useState } from 'react';

const SidePanelCard = ({topic}) => {
  const {setCurrentTopic, currentTopic}=useContext(DialogBoxContext)

  const handleSidePanel=()=>{
    setCurrentTopic(topic)
  }

  return (
    <div className={currentTopic===topic?"SideCardContainer highlightSide":"SideCardContainer"} onClick={handleSidePanel}>
      <p id="NameOfTopic">{topic}</p>
    </div>
  )
}

export default SidePanelCard
