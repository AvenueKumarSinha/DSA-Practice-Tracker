import React, { useContext } from 'react'
import { usernameContext } from '../Context/Context'
import "./Dashboard.css"

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Problems from './Problems'

const Dashboard = () => {
    const {username}=useContext(usernameContext)
  return (
    <>
        <Navbar/>
        <div className="binder">
            <Sidebar/>
            <Problems/>
        </div>
    </>
  )
}

export default Dashboard
