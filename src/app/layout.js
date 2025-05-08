"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./featured/reduxProvider";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Activity from "@/components/Activity";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 

export default function RootLayout({ children }) {
  const [currentUser,setCurrentUser]=useState({});
  const router=useRouter();
  

  const handleLogout=()=>{
    localStorage.clear();
    router.push('/login')
   }

   useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider >
          <Navbar handleLogout={handleLogout}/>
          <div className="flex">
        <Sidebar />
        <div className="flex flex-1">
          <main className="flex-1 p-4">
            {children}
          </main>
          <div className="w-80 p-4 border-l border-gray-200">
            <Activity />
          </div>
        </div>
      </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
