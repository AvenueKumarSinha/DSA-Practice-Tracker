import { useState } from 'react'
import './App.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './Components/Login'
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard'

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/dashboard",
      element:<><Dashboard/></>
    }
  ])

  return (
    <>
        <RouterProvider router={router}/>     
    </>
  )
}

export default App
