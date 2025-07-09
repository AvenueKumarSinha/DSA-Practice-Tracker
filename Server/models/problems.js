import mongoose from "mongoose";

const problemSchema=new mongoose.Schema({
    username:{type:String, required:true, unique: true},
    problem:{type:Array}
},{timestamps:true})

export const ProblemData=mongoose.model("ProblemData",problemSchema)

//problem is array of objects. Each object will have various parameters related to a problem like unique id, status, starred, links, etc.