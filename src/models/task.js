import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"low"
    },
    dueDate:{
        type:Date,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Task=mongoose.model('Task',taskSchema);
export default Task;