import mongoose from 'mongoose';


const userSchema =new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["user","manager","admin"]
    }

},{timestamps:true});
const User=mongoose.models.User || mongoose.model("User",userSchema)
export default User;