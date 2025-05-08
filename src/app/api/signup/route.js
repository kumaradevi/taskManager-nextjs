import { NextResponse } from "next/server";
import User from "../../../models/user"
import connectDB from "../../../lib/mongoose";
import bcrypt from "bcryptjs";

export async function POST(request) {
 
  try {
    await connectDB();
    const { userName, email, password, role } = await request.json();
    if (!userName || !email || !password || !role) {
      return NextResponse.json({ message: "missing fields" });
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser = new User({
      userName,
      email,
      password:hashedPassword,
      role,
    });

    await newUser.save();
    return NextResponse.json({ success: true , data:newUser}, { status: 201 });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
