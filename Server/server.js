import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from 'bcrypt'

import {UserData} from "./models/user.js"

const app=express()
const PORT=3000

app.use(cors())
app.use(express.json())

await mongoose.connect("mongodb://127.0.0.1:27017/DSAPracticeTracker")

app.post("/backendSignUp",async(req,res)=>{
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const signupData=new UserData({
            username:req.body.username,
            fullname:req.body.fullname,
            password:hashedPassword
        })

        await signupData.save()

        return res.status(200).json({ success: true, message: "User created successfully" })
    }catch(err){
        console.error(err)
        return res.send(400).json({success:false, message:"User not Created"})
    }
})

app.post("/backendLogin",async(req,res)=>{
    try{
        const user=await UserData.findOne({username:req.body.username})
        if(user){
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            
            if(isMatch) return res.status(200).json({success:true,message:"User Found"})
            else return res.status(400).json({success:false,userFound:true,message:"User not found"})
        } else return res.status(400).json({success:false,userFound:true,message:"User not found"})
    }catch(err){
        console.error(err)
        return res.status(500).json({success:false,userFound:false, message:"Server Error"})
    }
})

app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`))