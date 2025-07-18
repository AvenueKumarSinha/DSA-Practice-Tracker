import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    fullname:{type:String, required:true},
    password:{type:String,required:true}
},{timestamps:true})

export const UserData=mongoose.model("UserData",userSchema)