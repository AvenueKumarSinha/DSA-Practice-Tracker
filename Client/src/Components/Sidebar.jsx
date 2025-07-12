import React from 'react'
import "./Sidebar.css"
import SidePanelCard from './SidePanelCard'

import { DialogBoxContext } from '../Context/DialogBoxContext'
import { useContext, useEffect } from 'react'
import { useState } from 'react'

const Sidebar = () => {

  const {cards, Refresh}=useContext(DialogBoxContext)
  const [uniqueTopics, setUniqueTopics]=useState([])

  useEffect(() => {
    let helper=[]
    cards.map((card)=>{
      card.topic.map(topic => {
        if(!helper.includes(topic) && topic!="All Topics") helper.push(topic)
      });
    })
  setUniqueTopics(helper)
  }, [Refresh, cards])
  

  return (
    <div className='panel'>
      <SidePanelCard topic={"All Topics"} />
      {uniqueTopics.map((topic, index) => (
        <SidePanelCard key={index} topic={topic} />
      ))}
    </div>
  )
}

export default Sidebar
