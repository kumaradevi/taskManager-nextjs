import mongoose from "mongoose";


const connectDB=async()=>{
  try{
    // await mongoose.connect('mongodb+srv://nextjstaskmanager:Jimah2017sarath@cluster0.cz9mbku.mongodb.net/Next-taskManager');
     await mongoose.connect(process.env.MONGODB_URI)
   
  }
  catch(err){
    console.log(err.message)
  }
}

export default connectDB;







