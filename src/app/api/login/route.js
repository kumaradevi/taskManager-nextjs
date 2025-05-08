import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    const existUser=await User.findOne({email});
    if(!existUser){
        return NextResponse.json({success:false,message:"user not found"},{status:400})
    }
    const verifyPassword=await bcrypt.compare(password,existUser.password);
    if(!verifyPassword){
        return NextResponse.json({success:false,message:"invalid credentials"},{status:400})
    }

    const token=jwt.sign({id:existUser.id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
    const { password: _, ...safeUser } = userWihoutPassword;
    return NextResponse.json({success:true,data:userWihoutPassword,token},{status:200})

  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
          { success: false, message: "Server Error" },
          { status: 500 }
        );
  }
}
