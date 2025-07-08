import React, { useContext } from 'react'
import './Login.css'

import {useForm} from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { usernameContext } from '../Context/Context'

const Login = () => {
    const navigate=useNavigate()
    const {setUsername}=useContext(usernameContext)

    const{
        register,
        handleSubmit,
        watch,
        formState:{errors, isSubmitting},
    }=useForm()

    const onSubmit=async(data)=>{
        try{
            const r=await fetch("http://localhost:3000/backendLogin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
            let res=await r.json()

            if(res.success){
                setUsername(data.username)
                navigate("/dashboard")
            }else{
                if(res.userFound){
                    alert('Username or Password incorrect')
                }else{
                    alert('Server not responding')
                }
            }
        }catch(err){
            console.log(`Server error: ${err}`)
            alert("Server not Responding")
        }
    }

  return (
    <div className='LoginBackground'>
        <div className="LoginContainer">
            <p id='Welcome'>Welcome Back</p>
            <p id='signup'>Don't have an account yet? <NavLink to="/signup">Sign up</NavLink></p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("username")} type='text' placeholder='Username'/>
                <input {...register("password")} type='password' placeholder='Password'/>
                <button disabled={isSubmitting} type='submit'>Login</button>
                {isSubmitting && <Loader/>}
            </form>
        </div>
    </div>
  )
}

export default Login
