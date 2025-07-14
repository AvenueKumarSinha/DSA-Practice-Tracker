import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from 'bcrypt'

import {UserData} from "./models/user.js"
import {ProblemData} from "./models/problems.js"

import dotenv from 'dotenv'
dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

await mongoose.connect(process.env.MONGO_URI)

app.post("/backendSignUp",async(req,res)=>{
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const signupData=new UserData({
            username:req.body.username,
            fullname:req.body.fullname,
            password:hashedPassword
        })

        const problemDatabase=new ProblemData({
            username:req.body.username,
            problem:[]
        })

        await signupData.save()
        await problemDatabase.save()

        return res.status(200).json({ success: true, message: "User created successfully" })
    }catch(err){
        return res.send(400).json({success:false, message:"User not Created"})
    }
})

app.post("/backendLogin",async(req,res)=>{
    try{
        const user=await UserData.findOne({username:req.body.username})
        if(user){
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            
            if(isMatch) return res.status(200).json({success:true,message:"User Found",fullname:user.fullname})
            else return res.status(400).json({success:false,userFound:true,message:"User not found"})
        } else return res.status(400).json({success:false,userFound:true,message:"User not found"})
    }catch(err){
        return res.status(500).json({success:false,userFound:false, message:"Server Error"})
    }
})

app.delete("/backendDeleteAccount",async(req,res)=>{
    try{       
        await UserData.deleteOne({username:req.body.username})
        await ProblemData.deleteOne({username:req.body.username})
        return res.status(200).json({success:true})
    }catch(err){
        return res.status(500).json({success:false})
    }
})

app.put("/backendChangePassword",async(req,res)=>{
    try{
        const user=await UserData.findOne({username:req.body.username})
        if(user){
            const isMatch=await bcrypt.compare(req.body.password,user.password)
            if(isMatch){
                const saltRounds=10
                const newPasswordHashed=await bcrypt.hash(req.body.newpassword, saltRounds)
                await UserData.updateOne({username:req.body.username},{password:newPasswordHashed})
                return res.status(200).json({success:true})
            }else return res.status(400).json({success:false, serverError:false})
        }else return res.status(400).json({success:false, serverError:false})
    }catch(err){
        return res.status(500).json({success:false, serverError:true})
    }
})

app.post("/backendAddProblem",async(req,res)=>{
    try{
        const username=req.body.username;
        const problemIdCounter=(await ProblemData.findOne({username:username})).problemIdCounter

        const problemId=problemIdCounter
        const problemName=req.body.problemname
        const problemTopic=req.body.problemtopic
        const problemCodeLink=req.body.codelink
        const problemTutorialLink=req.body.tutoriallink
        const problemNote=req.body.problemnote
        
        let problemStarred=false;
        if(req.body.starred!=null) problemStarred=req.body.starred;
        let problemStatus=false;
        if(req.body.status!=null) problemStatus=req.body.status;

        const problemObject={problemId:problemId,problemName:problemName,problemTopic:problemTopic,problemCodeLink:problemCodeLink,problemTutorialLink:problemTutorialLink,problemNote:problemNote,problemStarred:problemStarred,problemStatus:problemStatus}

        await ProblemData.updateOne({username:username},{problemIdCounter:problemIdCounter+1, $push:{problem:problemObject}})

        return res.status(200).json({success:true})
    }catch(err){
        return res.status(500).json({success:false})
    }
})

app.post("/backendInitialData",async(req,res)=>{
    try{
        const problems=await ProblemData.findOne({username:req.body.username})
        return res.status(200).json({success:true, data:problems})
    }catch(err){
        return res.status(500).json({success:false})
    }
})

app.post("/backendUpdateStarred",async(req,res)=>{
    try{
        await ProblemData.updateOne({$and:[{username:req.body.username}, {"problem.problemId":req.body.id}]},{$set:{"problem.$.problemStarred":req.body.starred}})
        return res.status(200).json({success:true})
    }catch(err){
        return res.status(500).json({success:false})
    }
})

app.post("/backendCurrNote",async(req,res)=>{
    try{
        const target = await ProblemData.findOne({ username: req.body.username });
        const matchedProblem = target.problem.find(p => p.problemId === req.body.id);
        return res.status(200).json({ success: true, note: matchedProblem.problemNote });
    }catch(err){
        return res.status(500).json({success:false})
    }
})

app.post("/backendUpdateNote",async(req,res)=>{
    try{
        await ProblemData.updateOne({$and:[{username:req.body.username}, {"problem.problemId":req.body.id}]},{$set:{"problem.$.problemNote":req.body.note}})

        return res.status(200).json({success:true})
    }catch(err){
        return res.status(500).json({success:false})
    }
})

app.post("/backendUpdateStatus",async(req,res)=>{
    try{
        await ProblemData.updateOne({$and:[{username:req.body.username}, {"problem.problemId":req.body.id}]},{$set:{"problem.$.problemStatus":req.body.status}})
        return res.status(200).json({success:true})
    }catch(err){
        return res.status(500).json({success:false})
    }
})

app.delete("/backendDeleteProblem",async(req,res)=>{
    try{
        await ProblemData.updateOne({ username: req.body.username },{ $pull: { problem: { problemId: req.body.id } } });
        return res.status(200).json({success:true})
    }catch(err){
        return res.status(500).json({success:false})
    }
})

app.listen(process.env.PORT,()=>console.log(`Server started at PORT: ${process.env.PORT}`))